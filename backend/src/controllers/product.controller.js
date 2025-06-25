const { Product, Category } = require('../models');
const { Op } = require('sequelize');

/**
 * Obtener todos los productos con paginación
 */
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const { minPrice, maxPrice, category, inStock } = req.query;

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
    }

    if (category) {
      whereClause.categoryId = parseInt(category);
    }

    if (inStock === 'true') {
      whereClause.quantity = { [Op.gt]: 0 };
    } else if (inStock === 'false') {
      whereClause.quantity = { [Op.eq]: 0 };
    }

    whereClause.isActive = true;

    const { count, rows: products } = await Product.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
          paranoid: false
        }
      ],
      limit,
      offset,
      order: [['name', 'ASC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      status: true,
      message: 'Productos obtenidos exitosamente',
      data: {
        products,
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
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      status: false,
      message: 'Error al obtener los productos',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Obtener un producto por su ID
 */
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const includeDeleted = req.query.includeDeleted === 'true';
    
    const product = await Product.scope(includeDeleted ? 'withDeleted' : null).findByPk(productId, {
      include: [
        {
          model: Category,
          as: 'category',
          paranoid: false,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      status: true,
      data: product
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({
      status: false,
      message: 'Error al obtener el producto',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Crear un nuevo producto
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, SKU, quantity, categoryId, image } = req.body;
    const userId = req.user.id;

    const existingProduct = await Product.findOne({
      where: {
        [Op.or]: [
          { name },
          { SKU: SKU || null }
        ].filter(Boolean)
      }
    });

    if (existingProduct) {
      return res.status(400).json({
        status: false,
        message: existingProduct.name === name 
          ? 'Ya existe un producto con este nombre' 
          : 'Ya existe un producto con este SKU'
      });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({
        status: false,
        message: 'La categoría especificada no existe'
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      SKU: SKU || null,
      quantity: quantity || 0,
      categoryId,
      image: image || null,
      isActive: true,
      createdBy: userId,
      updatedBy: userId
    });

    const productWithCategory = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(201).json({
      status: true,
      message: 'Producto creado exitosamente',
      data: productWithCategory
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({
      status: false,
      message: 'Error al crear el producto',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Actualizar un producto existente
 */
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, SKU, quantity, categoryId, image, isActive } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Producto no encontrado'
      });
    }

    if (name || SKU) {
      const whereClause = {
        id: { [Op.ne]: productId }
      };

      if (name || SKU) {
        whereClause[Op.or] = [];
        if (name) whereClause[Op.or].push({ name });
        if (SKU) whereClause[Op.or].push({ SKU });
      }

      const existingProduct = await Product.findOne({ where: whereClause });
      
      if (existingProduct) {
        return res.status(400).json({
          status: false,
          message: existingProduct.name === name 
            ? 'Ya existe otro producto con este nombre' 
            : 'Ya existe otro producto con este SKU'
        });
      }
    }

    if (categoryId && categoryId !== product.categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({
          status: false,
          message: 'La categoría especificada no existe'
        });
      }
      product.categoryId = categoryId;
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (SKU !== undefined) product.SKU = SKU || null;
    if (quantity !== undefined) product.quantity = quantity;
    if (image !== undefined) product.image = image || null;
    if (isActive !== undefined) product.isActive = isActive;
    
    product.updatedBy = userId;
    await product.save();

    const updatedProduct = await Product.findByPk(product.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    });

    res.json({
      status: true,
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({
      status: false,
      message: 'Error al actualizar el producto',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Eliminar un producto (soft delete)
 */
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Producto no encontrado'
      });
    }

    await product.update({ 
      deletedBy: userId,
      isActive: false 
    }, {
      where: { id: productId }
    });

    await product.destroy();

    res.json({
      status: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      status: false,
      message: 'Error al eliminar el producto',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Restaurar un producto eliminado (soft delete)
 */
const restoreProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const product = await Product.findOne({
      where: { id: productId },
      paranoid: false
    });

    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Producto no encontrado'
      });
    }

    if (!product.deletedAt) {
      return res.status(400).json({
        status: false,
        message: 'El producto no está eliminado'
      });
    }

    await product.restore();

    await product.update({
      isActive: true,
      updatedBy: userId,
      deletedBy: null
    });

    res.json({
      status: true,
      message: 'Producto restaurado exitosamente',
      data: product
    });
  } catch (error) {
    console.error('Error al restaurar producto:', error);
    res.status(500).json({
      status: false,
      message: 'Error al restaurar el producto',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct
};