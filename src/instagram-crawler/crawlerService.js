import { error } from 'console';
import { PythonShell } from 'python-shell';

const opts = {
    mode: 'json',
    scriptPath: 'src/instagram-crawler/python',
};

const handleHello = async () => {
    try {
        const message = await PythonShell.run('main.py', {
            ...opts,
            args: ['hello'],
        });
        return message[0];
    } catch (error) {
        return error;
    }
};

const handleHelloName = async name => {
    try {
        const message = await PythonShell.run('main.py', {
            ...opts,
            args: ['hello_name', name],
        });
        return message[0];
    } catch (error) {
        return error;
    }
};

const handlePostsByUser = async user => {
    try {
        const message = await PythonShell.run('main.py', {
            ...opts,
            args: ['get_posts_of_user', user],
        });
        // if (shell.exitCode != 0) throw error(message[0]);
        return message[0];
    } catch (error) {
        return error;
    }
};

const handlePostsHashtag = async (user, hashtag) => {
    try {
        const message = await PythonShell.run('main.py', {
            ...opts,
            args: ['get_posts_from_user_hashtag', user, hashtag],
        });
        // if (shell.exitCode != 0) throw error(message[0]);
        return message[0];
    } catch (error) {
        return error;
    }
};

export default {
    handleHello,
    handleHelloName,
    handlePostsByUser,
    handlePostsHashtag,
};
