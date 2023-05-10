import * as dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';
import { sep } from 'node:path';
import { basedir } from '../basedir.js';
import { createFile, deleteFile, fileExists } from '../utilities/FileUtil.js';
import { saveImageS3 } from './aws/s3Service.js';

const graphIDFile = `${basedir}${sep}..${sep}public${sep}Puppeteer${sep}graphID.js`;
const url = 'http://127.0.0.1:3000/static/Puppeteer/';

const useAws = process.env.USE_AWS;

export async function PuppeteerService(graphID, clustering) {
    const graphName = `${basedir}${sep}..${sep}public${sep}rendered${sep}${graphID}.png`;
    let graphLink = `http://127.0.0.1:3000/static/rendered/${graphID}.png`;

    console.log('URL:' + url);
    if (await fileExists(graphName)) return graphLink;

    try {
        await createGraphIDFile(graphID, clustering);
        const browser = await puppeteer.launch({
            headless: true,
            dumpio: true,
            args: ['--disable-gpu'],
        });

        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.waitForSelector('#end');

        if (useAws) {
            const screenshot = await page.screenshot();
            const { ok, url } = await saveImageS3(graphName, screenshot);

            if (!ok) return 'Error saving the graph image';
            graphLink = url;
        } else {
            await page.screenshot({
                path: graphName,
            });
        }

        await browser.close();
    } catch (err) {
        console.error(err);
        return 'Error generating graph';
    }
}

async function createGraphIDFile(graphID, clustering) {
    await deleteFile(graphIDFile);
    await createFile(
        graphIDFile,
        `const graphID = '${graphID}'; const clustering = '${clustering}';`,
    );
}
