/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { GetDatasetByUniqueID } from '../../models/dataset/datasetModelLogic.js';
import { markov } from '../../services/Markov.js';

export const getMarkov = async (req, res) => {
    let dataset = await GetDatasetByUniqueID(req.params.unique_id);
    dataset = JSON.parse(JSON.stringify(dataset));
    return res.status(200).json(await markov(dataset));
};
