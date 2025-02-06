import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class permissions extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    permission_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    permission_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "permission_name"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'permissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "permission_id" },
        ]
      },
      {
        name: "permission_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "permission_name" },
        ]
      },
    ]
  });
  }
}
