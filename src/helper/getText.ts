import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export const fetchHTML = async (url: string, retries = 3, delay = 3000): Promise<string | null> => {
    try {
        const timeout :any = 10000
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch HTML content. Status code: ${response.status}`);
        }

        const html = await response.text();
        if (!html) {
            throw new Error('Received empty HTML content');
        }

        const $ = cheerio.load(html);
        const text = $('body').text().trim();
        if (!text) {
            throw new Error('Failed to extract text from HTML content');
        }

        return text;
    } catch (error: any) {
        if (retries > 0) {
            console.error(`Error fetching HTML (will retry in ${delay / 1000} seconds):`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchHTML(url, retries - 1, delay);
        } else {
            console.error('Error fetching HTML (no more retries):', error.message);
            return null;
        }
    }
};

