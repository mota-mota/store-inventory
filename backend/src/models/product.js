'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        paranoid: false
      });

      Product.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });

      Product.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater'
      });

      Product.belongsTo(models.User, {
        foreignKey: 'deletedBy',
        as: 'deleter'
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    SKU: {
      type: DataTypes.STRING,
      unique: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    image: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    deletedAt: DataTypes.DATE,
    deletedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true,
    defaultScope: {
      where: {
        isActive: true,
        deletedAt: null
      }
    },
    scopes: {
      withInactive: {
        where: { isActive: false }
      },
      withDeleted: {
        paranoid: false
      },
      withCategory: {
        include: [{
          model: sequelize.models.Category,
          as: 'category',
          paranoid: false
        }]
      }
    }
  });
  return Product;
};