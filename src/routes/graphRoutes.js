import express from 'express';
import multer from 'multer';
import { checkFileType } from '../utilities/FileUtil.js';
import graphController from '../controllers/graph/graphController.js';
import { uploadeDatasetS3 } from '../middleware/uploadDatasetS3.js';
import { logger } from '../services/loggingService.js';
const useAws = process.env.USE_AWS;

const router = express.Router();

const upload = multer({
    dest: 'public/',
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    },
});

if (useAws) {
    router.post('/dataset', uploadeDatasetS3.single('file'), (req, res) => {
        logger.info(`S3upload dataset: ${JSON.stringify(req.file)}`);
        res.json({ message: 'done' });
    });
} else {
    router.post('/dataset', upload.single('file'), graphController.saveDataset);
}

router.get('/:unique_id/dataset', graphController.getGraphDatasetByID);

router.get('/:unique_id/show', graphController.showGraph);

router.get('/:unique_id/centrality', graphController.getGraphCentrality);

router.get('/:unique_id/markov', graphController.getMarkov);

export default router;
