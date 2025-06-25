'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        paranoid: false
      });

      Category.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });

      Category.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater'
      });

      Category.belongsTo(models.User, {
        foreignKey: 'deletedBy',
        as: 'deleter'
      });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING,
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
    modelName: 'Category',
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
      }
    }
  });
  return Category;
};