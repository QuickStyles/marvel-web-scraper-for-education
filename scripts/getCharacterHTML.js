const fetch = require('node-fetch');
const fs = require('fs').promises;
const page_0 = require('../data/characters_page_0.json');

async function main(outfile) {
  const validCharacters = filterValidCharacters(page_0); // filter only the characters with a "wiki" URL
  const charactersWithWIKI = await includeWikiPage(validCharacters); // add a property to all the characters containing the HTML retrieved from the wiki
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

async function includeWikiPage(charactersList) {

}

main(`${process.cwd()}/data/html/page_0.json`);