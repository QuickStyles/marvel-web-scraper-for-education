const characterList = require('../data/html/page_0.json');
const cheerio = require('cheerio');
const fs = require('fs').promises;

async function main(outfile) {
  const charactersWithStats = addStatsToCharacters(characterList);
  await fs.writeFile(outfile, JSON.stringify(charactersWithStats), { encoding: 'utf8'} );
}

function addStatsToCharacters(characterList) {
  return characterList.map(character => {
    const $ = cheerio.load(character.wikiHTML);
    const powerCircles = $('.power-circle__wrapper')
    if (powerCircles.length > 0) {
      const attributes = {};
      powerCircles.each((index, element) => {
        const label = $(element).find('.power-circle__label').text();
        const value = $(element).find('.power-circle__rating').text();
        attributes[label] = value;
      })
      character.attributes = attributes;
      return character;
    }
  }).filter(character => character);
}

main(`${process.cwd()}/data/final/page_0.json`);