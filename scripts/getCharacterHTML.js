const fetch = require('node-fetch');
const fs = require('fs').promises;
const page_0 = require('../data/characters_page_0.json');

async function main(outfile) {
  const validCharacters = filterValidCharacters(page_0); // filter only the characters with a "wiki" URL
  const charactersWithWIKI = await includeWikiPage(validCharacters); // add a property to all the characters containing the HTML retrieved from the wiki
  await fs.writeFile(outfile, JSON.stringify(charactersWithWIKI), { encoding: 'utf8' });
}


function filterValidCharacters(charactersList) {
  return charactersList.map(character => {
    // wiiUrlFound will be an array of objects where the object `type` property is equal to 'wiki'
    // this filter methdo will return an array of length 1 if a "wiki" url is found or length 0 if not found.
    const wikiUrlFound = character.urls.filter((urlNode) => {
      return urlNode.type === 'wiki';
    })[0]; // we grab the 0 index of the array. 
    if (wikiUrlFound) {
      return character;
    }
  }).filter(character => {
    // charaterlist at this point is an array of objects or undefined.
    return character
  });
}

function includeWikiPage(charactersList) {
  return Promise.all(charactersList.map((character) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(getCharacterWikiUrl(character));
        const text = await res.text();
        character.wikiHTML = text;
        resolve(character);
      } catch (error) {
        reject(error);
      }
    })
  }))
}

function getCharacterWikiUrl(character) {
  return character.urls.filter(urls => {
    return urls.type === 'wiki';
  })[0].url
};

main(`${process.cwd()}/data/html/page_0.json`);