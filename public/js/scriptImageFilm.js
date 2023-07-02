const axios = require('axios');
const cheerio = require('cheerio');


///////////////////// ca a pas marché ahah
/*

const filmName = process.argv[2];
const url = `https://letterboxd.com/film/${filmName}/`;

async function scrapeCoverImage() {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // episode 1 : alt = "[nom du film]" donc ca marche pas
    const imageUrl = $('img[alt="Poster"]').attr('src');
    console.log(imageUrl);
}

scrapeCoverImage();

/////////////////// ca a pas marché ahah 


async function getMovieCover(movieName) {
    const url = `https://letterboxd.com/film/${movieName}/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // episode 2 : alt = "[nom du film]" sauf que ca marche pas non plus ca renvoie ca
    // https://s2.ltrbxd.com/static/img/empty-poster-500.825678f0.png 😎
    const coverImage = $('img[alt="Come and See"]').attr('src');
    console.log(coverImage);
}

// test
getMovieCover("come-and-see");
*/


const filmName = process.argv[2];

// Pour l'url de la page
const url = `https://letterboxd.com/film/${filmName}/`;

// Fonct scrap image de couverture
// ca va chercher le script qui contient les infos du film pcq c'est seul endroit du code
// source ou on peut trouver le lien de l'image de couverture apparemment (?) 🐈‍⬛🐈‍⬛🐈‍⬛
async function scrapeCoverImage() {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const scriptContent = $('script[type="application/ld+json"]').html();
    const startIndex = scriptContent.indexOf('{');
    const endIndex = scriptContent.lastIndexOf('}');
    const jsonStr = scriptContent.slice(startIndex, endIndex + 1);
    const jsonData = JSON.parse(jsonStr);
    //pour avoir le lien de l'image avec la qualité la plus haute
    // parce que j'arrive pas a scrap directement la version haute resolution
    const imageUrl = jsonData.image.replace('0-230-0-345', '0-500-0-750');
    console.log(imageUrl);
}



scrapeCoverImage();
