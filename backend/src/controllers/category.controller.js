const { Category } = require('../models');
const { Op } = require('sequelize');
const { Product } = require('../models');

/**
 * Obtener todas las categorías con paginación
 */
const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const includeInactive = req.query.includeInactive === 'true';

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (!includeInactive) {
      whereClause.isActive = true;
    }

    const { count, rows: categories } = await Category.scope('withDeleted').findAndCountAll({
      where: {
        ...whereClause,
        ...(includeInactive ? {} : { isActive: true })
      },
      limit,
      offset,
      order: [['name', 'ASC']],
      paranoid: false
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      status: true,
        message: 'Categorías obtenidas exitosamente',
      data: {
          categories,
          pagination: {
              totalItems: count,
              totalPages,
              currentPage: page,
              itemsPerPage: limit,
              hasNextPage: page < totalPages,
              hasPreviousPage: page > 1
          }
      }
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      status: false,
      message: 'Error al obtener las categorías',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Obtener una categoría por su ID
 */
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const includeDeleted = req.query.includeDeleted === 'true';
    
    const category = await Category.scope(includeDeleted ? 'withDeleted' : null).findByPk(categoryId, {
      paranoid: !includeDeleted
    });

    if (!category) {
      return res.status(404).json({
        status: false,
        message: 'Categoría no encontrada'
      });
    }

    res.json({
      status: true,
      data: category
    });
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({
      status: false,
      message: 'Error al obtener la categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Crear una nueva categoría
 */
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({
        status: false,
        message: 'Ya existe una categoría con este nombre'
      });
    }

    const category = await Category.create({
      name,
      description,
      isActive: true,
      createdBy: userId,
      updatedBy: userId
    });

    res.status(201).json({
      status: true,
      message: 'Categoría creada exitosamente',
      data: category
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({
      status: false,
      message: 'Error al crear la categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Actualizar una categoría existente
 */
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description, isActive } = req.body;
    const userId = req.user.id;

    const category = await Category.scope('withDeleted').findOne({
      where: { id: categoryId },
      paranoid: false
    });
    if (!category) {
      return res.status(404).json({
        status: false,
        message: 'Categoría no encontrada'
      });
    }

    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ where: { name } });
      if (existingCategory) {
        return res.status(400).json({
          status: false,
          message: 'Ya existe otra categoría con este nombre'
        });
      }
    }

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;
    
    category.updatedBy = userId;
    await category.save();

    res.json({
      status: true,
      message: 'Categoría actualizada exitosamente',
      data: category
    });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({
      status: false,
      message: 'Error al actualizar la categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Eliminar una categoría (soft delete)
 */
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const userId = req.user.id;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: 'Categoría no encontrada'
      });
    }

    const productsCount = await Product.count({
      where: { categoryId }
    });

    if (productsCount > 0) {
      category.isActive = false;
      category.updatedBy = userId;
      await category.save();
      
      return res.json({
        status: true,
        message: 'La categoría ha sido desactivada ya que tiene productos asociados',
        data: category
      });
    }

    await category.destroy();

    res.json({
      status: true,
      message: 'Categoría eliminada exitosamente',
      data: category
    });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({
      status: false,
      message: 'Error al eliminar la categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Restaurar una categoría eliminada
 */
const restoreCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const userId = req.user.id;

    const category = await Category.findOne({
      where: { id: categoryId },
      paranoid: false
    });

    if (!category) {
      return res.status(404).json({
        status: false,
        message: 'Categoría no encontrada'
      });
    }

    if (!category.deletedAt) {
      return res.status(400).json({
        status: false,
        message: 'La categoría no está eliminada'
      });
    }

    await category.restore();
    category.isActive = true;
    category.updatedBy = userId;
    await category.save();

    res.json({
      status: true,
      message: 'Categoría restaurada exitosamente',
      data: category
    });
  } catch (error) {
    console.error('Error al restaurar categoría:', error);
    res.status(500).json({
      status: false,
      message: 'Error al restaurar la categoría',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory
};