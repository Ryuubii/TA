import express from 'express';
import crawlerController from '../controllers/crawlerController.js';

const router = express.Router();

router.post('/posts', crawlerController.postCrawlerPosts);
router.post('/hashtag', crawlerController.postCrawlerPostsHashtag);

export default router;
