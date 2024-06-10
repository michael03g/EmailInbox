import { DataTypes, Sequelize, Model } from "sequelize";

export class Email extends Model {}

export const initEmail = (sequelize: Sequelize) => {
  Email.init(
    {
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      receiver: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
    },
    { sequelize, modelName: "email"}
  )
}