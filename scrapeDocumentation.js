const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeDocumentation(url, platform) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const content = {};

        $('h2, h3').each((i, elem) => {
            const heading = $(elem).text().trim();
            const body = $(elem).nextUntil('h2, h3').text().trim();
            if (heading && body) {
                content[heading] = body;
            }
        });

        fs.writeFileSync(`docs/${platform}.json`, JSON.stringify(content, null, 2));
        console.log(`${platform} documentation saved.`);
    } catch (error) {
        console.error('Error scraping documentation:', error);
    }
}

// Example URL for Segment
scrapeDocumentation('https://segment.com/docs/', 'Segment');
