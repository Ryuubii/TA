/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { GetDatasetByUniqueID } from '../../models/dataset/datasetModelLogic.js';
import { betweennessCentrality } from '../../services/BetweennessCentrality.js';
import { degreeCentrality } from '../../services/DegreeCentrality.js';
import { closenessCentrality } from '../../services/ClosenessCentrality.js';

export const getGraphCentrality = async (req, res) => {
    const type = req.body.type;
    let dataset = await GetDatasetByUniqueID(req.params.unique_id);
    dataset = JSON.parse(JSON.stringify(dataset));
    let result;
    if (type.toLowerCase() == 'betweenness') {
        result = await betweennessCentrality(dataset);
    } else if (type.toLowerCase() == 'degree') {
        result = await degreeCentrality(dataset);
    } else if (type.toLowerCase() == 'closeness') {
        result = await closenessCentrality(dataset);
    }
    return res.status(200).json(result);
};
