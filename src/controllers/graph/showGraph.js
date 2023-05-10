/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import { GraphDatasetExists } from '../../models/dataset/datasetModelLogic.js';
import { PuppeteerService } from '../../services/PuppeteerService.js';

export const showGraph = async (req, res) => {
    if (!req.params) res.status(400).json({ error: 'graph_id is required!' });
    if (!req.params.unique_id)
        res.status(400).json({ error: 'graph_id is required!' });

    if (!(await GraphDatasetExists(req.params.unique_id)))
        return res.status(404).json({ error: 'Graph not found!' });
    try {
        const message = await PuppeteerService(
            req.params.unique_id,
            req.params.type,
        );
        return res.status(200).json({ message });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
