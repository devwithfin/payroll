'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Departement extends Model {
    static associate(models) {
      Departement.hasMany(models.Employee, {
        foreignKey: 'departement_id'
      });
    }
  }

  Departement.init({
    department_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Departement',
    tableName: 'departements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return Departement;
};
