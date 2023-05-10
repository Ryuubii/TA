/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { GetDatasetByUniqueID } from '../../models/dataset/datasetModelLogic.js';

export const getGraphDatasetByID = async (req, res) => {
    const dataset = await GetDatasetByUniqueID(req.params.unique_id);
    return res.status(200).json(dataset);
};
