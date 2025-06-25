const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Middleware para verificar el token JWT
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'Token de autenticación no proporcionado'
      });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: false,
          message: 'Token inválido o expirado',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }

      try {
        const user = await User.findByPk(decoded.id, {
          include: ['role'],
          attributes: { exclude: ['password'] }
        });

        if (!user || !user.isActive) {
          return res.status(401).json({
            status: false,
            message: 'Usuario no encontrado o cuenta desactivada'
          });
        }

        req.user = user.get({ plain: true });
        next();
      } catch (dbError) {
        console.error('Error al buscar el usuario:', dbError);
        return res.status(500).json({
          status: false,
          message: 'Error al verificar el usuario',
          error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
        });
      }
    });
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    return res.status(500).json({
      status: false,
      message: 'Error en la autenticación',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Middleware para verificar roles de usuario
 * @param {Array} roles - Array de roles permitidos
 */
const authorizedRoles = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: 'Usuario no autenticado'
      });
    }

    if (roles.length === 0) {
      return next();
    }

    if (req.user.role && roles.includes(req.user.role.name)) {
      return next();
    }

    return res.status(403).json({
      status: false,
      message: 'No tienes permiso para acceder a este recurso'
    });
  };
};

module.exports = {
  authenticateToken,
  authorizedRoles
};