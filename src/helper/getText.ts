import superagent from 'superagent';
import * as cheerio from 'cheerio';

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 3000;
const TIMEOUT_MS = 60000; // 60 seconds

export const fetchHTML = async (url: string, retries = MAX_RETRIES, delay = INITIAL_DELAY_MS): Promise<string | null> => {
    try {
        const response = await superagent.get(url).timeout({ response: TIMEOUT_MS }); // Increased timeout to 60 seconds

        const html = response.text;
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
        console.error('Error:', error);

        if (error.code === 'ETIMEDOUT' && retries > 0) {
            console.error(`Request timed out (will retry in ${delay / 1000} seconds):`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchHTML(url, retries - 1, delay * 2); // Exponential backoff
        } else if (error.code === 'ENETUNREACH' && retries > 0) {
            console.error('Network unreachable:', error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchHTML(url, retries - 1, delay * 2); // Exponential backoff
        } else {
            console.error('Error fetching HTML (no more retries):', error.message);
            return null;
        }
    }
    return null; // Return null if all retries fail or for other errors
};

