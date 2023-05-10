/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
import crawlerService from '../instagram-crawler/crawlerService.js';

const postCrawlerPosts = async (req, res) => {
    const { user } = req.body;
    try {
        const posts = await crawlerService.handlePostsByUser(user);
        console.log(posts);
        res.status(200).json({
            status: 'success',
            data: posts,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            error: err,
        });
    }
};

const postCrawlerPostsHashtag = async (req, res) => {
    const { user, hashtag } = req.body;
    try {
        const posts = await crawlerService.handlePostsHashtag(user, hashtag);
        console.log(posts);
        res.status(200).json({
            status: 'success',
            data: posts,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            error: err,
        });
    }
};

export default {
    postCrawlerPosts,
    postCrawlerPostsHashtag,
};
