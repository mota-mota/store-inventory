const Joi = require('joi');

module.exports = {
    registerSchema: Joi.object({
        username: Joi.string()
            .alphanum()
            .trim()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': 'El nombre de usuario debe ser un texto',
                'string.empty': 'El nombre de usuario no puede estar vacío',
                'string.alphanum': 'El nombre de usuario solo puede contener caracteres alfanuméricos',
                'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
                'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres',
                'any.required': 'El nombre de usuario es requerido'
            }),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io', 'org', 'es', 'gt'] } })
            .trim()
            .required()
            .messages({
                'string.base': 'El correo electrónico debe ser un texto',
                'string.email': 'Debe proporcionar un correo electrónico válido',
                'string.empty': 'El correo electrónico no puede estar vacío',
                'any.required': 'El correo electrónico es requerido'
            }),

        password: Joi.string()
            .trim()
            .min(8)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
            .required()
            .messages({
                'string.base': 'La contraseña debe ser un texto',
                'string.min': 'La contraseña debe tener al menos 8 caracteres',
                'string.pattern.base': 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
                'string.empty': 'La contraseña no puede estar vacía',
                'any.required': 'La contraseña es requerida'
            }),

        roleId: Joi.number()
            .integer()
            .min(1)
            .default(2)
            .messages({
                'number.base': 'El ID del rol debe ser un número',
                'number.integer': 'El ID del rol debe ser un número entero',
                'number.min': 'El ID del rol no es válido'
            }),

        confirmPassword: Joi.string()
            .trim()
            .required()
            .valid(Joi.ref('password'))
            .messages({
                'string.base': 'La confirmación de contraseña debe ser un texto',
                'any.only': 'Las contraseñas no coinciden',
                'string.empty': 'La confirmación de contraseña no puede estar vacía',
                'any.required': 'La confirmación de contraseña es requerida'
            })
    }).options({ abortEarly: false }),

    loginSchema: Joi.object({
        username: Joi.string()
            .trim()
            .messages({
                'string.base': 'El nombre de usuario debe ser un texto',
                'string.empty': 'El nombre de usuario no puede estar vacío',
            }),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io', 'org', 'es', 'gt'] } })
            .trim()
            .messages({
                'string.base': 'El correo electrónico debe ser un texto',
                'string.email': 'Debe proporcionar un correo electrónico válido',
                'string.empty': 'El correo electrónico no puede estar vacío',
            }),

        password: Joi.string()
            .trim()
            .required()
            .messages({
                'string.base': 'La contraseña debe ser un texto',
                'string.empty': 'La contraseña no puede estar vacía',
                'any.required': 'La contraseña es requerida'
            })
    }).options({ abortEarly: false })
        .or('username', 'email')
        .messages({
            'object.missing': 'Se requiere nombre de usuario o correo electrónico'
        }),

    getUsersQuerySchema: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).default(10)
    }).options({ abortEarly: false }),

    updateUserSchema: Joi.object({
        username: Joi.string()
            .alphanum()
            .trim()
            .min(3)
            .max(30)
            .messages({
                'string.base': 'El nombre de usuario debe ser un texto',
                'string.empty': 'El nombre de usuario no puede estar vacío',
                'string.alphanum': 'El nombre de usuario solo puede contener caracteres alfanuméricos',
                'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
                'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres'
            }),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io', 'org', 'es', 'gt'] } })
            .trim()
            .messages({
                'string.base': 'El correo electrónico debe ser un texto',
                'string.email': 'Debe proporcionar un correo electrónico válido',
                'string.empty': 'El correo electrónico no puede estar vacío',
            }),
        roleId: Joi.number()
            .integer()
            .min(1)
            .messages({
                'number.base': 'El ID del rol debe ser un número',
                'number.integer': 'El ID del rol debe ser un número entero',
                'number.min': 'El ID del rol no es válido'
            }),
        isActive: Joi.boolean()
            .messages({
                'boolean.base': 'El estado debe ser un booleano',
            })
    })
        .min(1)
        .messages({
            'object.min': 'Debes proporcionar al menos un campo para actualizar el usuario.'
        })
        .options({ abortEarly: false }),

    createProductSchema: Joi.object({
        name: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.base': 'El nombre del producto debe ser un texto',
                'string.empty': 'El nombre del producto no puede estar vacío',
                'string.min': 'El nombre del producto debe tener al menos {#limit} caracteres',
                'string.max': 'El nombre del producto no puede tener más de {#limit} caracteres',
                'any.required': 'El nombre del producto es requerido'
            }),
        description: Joi.string()
            .trim()
            .max(1000)
            .allow('', null)
            .optional()
            .messages({
                'string.base': 'La descripción debe ser un texto',
                'string.max': 'La descripción no puede tener más de {#limit} caracteres'
            }),
        price: Joi.number()
            .precision(2)
            .min(0.01)
            .required()
            .messages({
                'number.base': 'El precio debe ser un número',
                'number.min': 'El precio debe ser mayor a 0',
                'any.required': 'El precio es requerido'
            }),
        SKU: Joi.string()
            .trim()
            .max(50)
            .allow('', null)
            .optional()
            .messages({
                'string.base': 'El SKU debe ser un texto',
                'string.max': 'El SKU no puede tener más de {#limit} caracteres'
            }),
        quantity: Joi.number()
            .integer()
            .min(0)
            .default(0)
            .messages({
                'number.base': 'La cantidad debe ser un número entero',
                'number.min': 'La cantidad no puede ser negativa'
            }),
        categoryId: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                'number.base': 'La categoría debe ser un número',
                'number.integer': 'El ID de categoría debe ser un número entero',
                'number.min': 'El ID de categoría no es válido',
                'any.required': 'La categoría es requerida'
            }),
        image: Joi.string()
            .trim()
            .uri()
            .allow('', null)
            .optional()
            .messages({
                'string.uri': 'La URL de la imagen no es válida'
            })
    }),
    updateProductSchema: Joi.object({
        name: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .optional()
            .messages({
                'string.base': 'El nombre del producto debe ser un texto',
                'string.empty': 'El nombre del producto no puede estar vacío',
                'string.min': 'El nombre del producto debe tener al menos {#limit} caracteres',
                'string.max': 'El nombre del producto no puede tener más de {#limit} caracteres'
            }),
        description: Joi.string()
            .trim()
            .max(1000)
            .allow('', null)
            .optional()
            .messages({
                'string.base': 'La descripción debe ser un texto',
                'string.max': 'La descripción no puede tener más de {#limit} caracteres'
            }),
        price: Joi.number()
            .precision(2)
            .min(0.01)
            .optional()
            .messages({
                'number.base': 'El precio debe ser un número',
                'number.min': 'El precio debe ser mayor a 0'
            }),
        SKU: Joi.string()
            .trim()
            .max(50)
            .allow('', null)
            .optional()
            .messages({
                'string.base': 'El SKU debe ser un texto',
                'string.max': 'El SKU no puede tener más de {#limit} caracteres'
            }),
        quantity: Joi.number()
            .integer()
            .min(0)
            .optional()
            .messages({
                'number.base': 'La cantidad debe ser un número entero',
                'number.min': 'La cantidad no puede ser negativa'
            }),
        categoryId: Joi.number()
            .integer()
            .min(1)
            .optional()
            .messages({
                'number.base': 'La categoría debe ser un número',
                'number.integer': 'El ID de categoría debe ser un número entero',
                'number.min': 'El ID de categoría no es válido'
            }),
        image: Joi.string()
            .trim()
            .uri()
            .allow('', null)
            .optional()
            .messages({
                'string.uri': 'La URL de la imagen no es válida'
            }),
        isActive: Joi.boolean()
            .optional()
            .messages({
                'boolean.base': 'El estado activo debe ser verdadero o falso'
            })
    }).options({ abortEarly: false })
};
