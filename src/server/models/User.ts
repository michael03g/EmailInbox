import { DataTypes, Sequelize, Model } from "sequelize";

export class User extends Model {}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.STRING,
        defaultValue: new Date()
      },
      updatedAt: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { sequelize, modelName: "user"}
  )
}