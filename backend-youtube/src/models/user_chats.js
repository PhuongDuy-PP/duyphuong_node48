import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user_chats extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    chat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_chats',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "user1_id",
        using: "BTREE",
        fields: [
          { name: "user1_id" },
        ]
      },
      {
        name: "user2_id",
        using: "BTREE",
        fields: [
          { name: "user2_id" },
        ]
      },
    ]
  });
  }
}
