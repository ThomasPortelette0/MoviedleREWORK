const axios = require('axios');
const cheerio = require('cheerio');

// URL de base des pages à scraper
const baseUrls = ["https://letterboxd.com/dave/list/official-top-250-narrative-feature-films/page/",
                  "https://letterboxd.com/dave/list/imdb-top-250/page/"];

// Crée un ensemble pour stocker les noms des films
let filmNames = new Set();

// Fonction pour scraper une page
async function scrapePage(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const filmLinks = $('div.film-poster');
    filmLinks.each((i, link) => {
        const filmName = $(link).attr('data-film-slug').replace('/film/', '').replace('/', '');
        filmNames.add(filmName);
    });
}

// Itère sur les deux listes de films
(async () => {
    for (let baseUrl of baseUrls) {
        // Itère sur les trois pages de chaque liste
        for (let i = 1; i <= 3; i++) {
            // Crée l'URL de la page à scraper
            const url = baseUrl + i + "/";
            await scrapePage(url);
        }
    }

    // Affiche la liste des noms de films
    for (let name of filmNames) {
        console.log(name);
    }
})();
