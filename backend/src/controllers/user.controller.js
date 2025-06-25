const { User, Role } = require('../models');
const { Op } = require('sequelize');

/**
 * Obtener un usuario por su ID
 */
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(userId, {
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'name']
      }]
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      status: true,
      data: user
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      status: false,
      message: 'Error al obtener el usuario',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Obtener lista de usuarios con paginación
 */
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const whereClause = {
      [Op.or]: [
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ]
    };

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      status: true,
      message: 'Usuarios obtenidos correctamente',
      data: {
        users,
        pagination: {
          total: count,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      },
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      status: false,
      message: 'Error al obtener los usuarios',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Actualizar un usuario
 */
const updateUser = async (req, res) => {
  const transaction = await User.sequelize.transaction();
  
  try {
    if(!req.body) {
      await transaction.rollback();
      return res.status(400).json({
        status: false,
        message: 'No se proporcionaron datos para actualizar'
      });
    }

    const { userId } = req.params;
    const { username = null, email = null, roleId = null } = req.body;

    const user = await User.findByPk(userId, { transaction });
    
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({
        status: false,
        message: 'Usuario no encontrado'
      });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if(roleId) updateData.roleId = roleId;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        where: { email },
        transaction
      });

      if (emailExists) {
        await transaction.rollback();
        return res.status(400).json({
          status: false,
          message: 'El correo electrónico ya está en uso'
        });
      }
    }

    await user.update(updateData, { transaction });
    await transaction.commit();

    const updatedUser = await User.findByPk(userId, {
      include: [{
        model: Role,
        as: 'role',
        attributes: ['id', 'name']
      }]
    });
    res.json({
      status: true,
      message: 'Usuario actualizado correctamente',
      data: updatedUser
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      status: false,
      message: 'Error al actualizar el usuario',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Desactivar cuenta de usuario
 * Los administradores pueden desactivar cualquier cuenta
 * Los usuarios normales solo pueden desactivar su propia cuenta (requiere contraseña)
 */
const deactivateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userToDeactivate = await User.findByPk(userId, {
      include: ['role']
    });

    if (!userToDeactivate) {
      return res.status(404).json({
        status: false,
        message: 'Usuario no encontrado'
      });
    }

    if (userToDeactivate.role.name === 'admin') {
      throw new Error('Un administrador no puede ser desactivado por otro administrador');
    }

    userToDeactivate.isActive = false;
    await userToDeactivate.save();

    res.json({
      status: true,
      message: 'Cuenta desactivada correctamente'
    });
  } catch (error) {
    console.error('Error al desactivar cuenta:', error);
    res.status(500).json({
      status: false,
      message: error?.message || 'Error al desactivar la cuenta',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const activateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userToActivate = await User.findByPk(userId, {
      include: ['role']
    });

    if (!userToActivate) {
      return res.status(404).json({
        status: false,
        message: 'Usuario no encontrado'
      });
    }

    userToActivate.isActive = true;
    await userToActivate.save();

    res.json({
      status: true,
      message: 'Cuenta activada correctamente'
    });
  } catch (error) {
    console.error('Error al activar cuenta:', error);
    res.status(500).json({
      status: false,
      message: error?.message || 'Error al activar la cuenta',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getUserById,
  getUsers,
  updateUser,
  deactivateUser,
  activateUser
};