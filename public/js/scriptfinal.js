const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseUrls = ["https://letterboxd.com/dave/list/official-top-250-narrative-feature-films/page/",
                  "https://letterboxd.com/dave/list/imdb-top-250/page/"];

let filmNames = new Set();

async function scrapePage(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const filmLinks = $('div.film-poster');
    filmLinks.each((i, link) => {
        const filmName = $(link).attr('data-film-slug').replace('/film/', '').replace('/', '');
        filmNames.add(filmName);
    });
}

async function scrapeCoverImage(filmName) {
    const url = `https://letterboxd.com/film/${filmName}/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const scriptContent = $('script[type="application/ld+json"]').html();
    const startIndex = scriptContent.indexOf('{');
    const endIndex = scriptContent.lastIndexOf('}');
    const jsonStr = scriptContent.slice(startIndex, endIndex + 1);
    const jsonData = JSON.parse(jsonStr);
    const imageUrl = jsonData.image.replace('0-230-0-345', '0-500-0-750');
    return imageUrl;
}

(async () => {
    for (let baseUrl of baseUrls) {
        // Itère sur les trois pages de chaque liste
        for (let i = 1; i <= 3; i++) {
            // Crée l'URL de la page à scraper
            const url = baseUrl + i + "/";
            await scrapePage(url);
        }
    }

    let films = {};

    for (let name of filmNames) {
        const imageUrl = await scrapeCoverImage(name);
        films[name] = imageUrl;
        console.log(`"${name}": "${imageUrl}"`);
    }

    fs.writeFileSync('films.json', JSON.stringify(films, null, 2));
})();
