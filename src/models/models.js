import DatasetModel from './datasetModel.js';
import UserModel from './userModel.js';

UserModel.hasMany(DatasetModel);

export { DatasetModel, UserModel };
