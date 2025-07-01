const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';
const JWT_COOKIE_EXPIRES = parseInt(process.env.JWT_COOKIE_EXPIRES) || 8 * 60 * 60 * 1000; // 8 horas en milisegundos
const NODE_ENV = process.env.NODE_ENV || 'development';

const tokenBlacklist = new Set();

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role ? user.role.name : null
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Registro de nuevo usuario
 */
const register = async (req, res) => {
  try {
    const { username, email, password, roleId = 2 } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: 'El nombre de usuario o correo electrónico ya está en uso'
      });
    }

    const role = await Role.findOne({ where: { id: roleId } });
    
    if (!role) {
      return res.status(400).json({
        status: false,
        message: 'Rol no válido'
      });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      roleId: role.id,
      isActive: true
    });

    const token = generateToken(newUser);
    const userResponse = newUser.get({ plain: true });
    delete userResponse.password;

    // Configura la cookie httpOnly
    const cookieOptions = {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRES),
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    };

    res.cookie('jwt', token, cookieOptions);

    res.status(201).json({
      status: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: userResponse
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      status: false,
      message: 'Error al registrar el usuario',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Inicio de sesión de usuario
 */
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        status: false,
        message: 'Por favor proporcione nombre de usuario/correo y contraseña'
      });
    }

    const user = await User.scope("withPassword").findOne({
      where: {
        [Op.or]: [
          username ? { username } : null,
          email ? { email } : null
        ].filter(Boolean),
        isActive: true
      },
      include: ['role']
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Credenciales inválidas o cuenta inactiva'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: 'Credenciales inválidas'
      });
    }

    const token = generateToken(user);
    const userResponse = user.get({ plain: true });
    delete userResponse.password;

    // Configura la cookie httpOnly
    const cookieOptions = {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRES),
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    };

    res.cookie('jwt', token, cookieOptions);

    res.json({
      status: true,
      data: {
        user: userResponse
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      status: false,
      message: 'Error al iniciar sesión',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Cerrar sesión
 */
const logout = (req, res) => {
  try {
    // Limpia la cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    // También manejamos el token del header por si acaso
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      tokenBlacklist.add(token);
    }

    res.json({
      status: true,
      message: 'Sesión cerrada correctamente'
    });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      status: false,
      message: 'Error al cerrar sesión'
    });
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      exclude: ['password'],
      include: ['role']
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
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      status: false,
      message: 'Error al obtener el perfil'
    });
  }
};

/**
 * Middleware para verificar si un token está en la lista negra
 */
const checkTokenRevoked = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({
        status: false,
        message: 'Token revocado. Por favor inicie sesión nuevamente.'
      });
    }
  }
  
  next();
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  checkTokenRevoked
};