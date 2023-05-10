import { DataTypes, Model } from 'sequelize';
import { sequelize } from './database/getDB.js';
import { userModel } from './userModel.js';

export default class DatasetModel extends Model {}

DatasetModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        col1_data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        col2_data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unique_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.UUID,
            references: {
                model: userModel,
                key: 'clientId',
            },
        },
    },
    {
        sequelize,
        modelName: 'DatasetModel',
    },
);
