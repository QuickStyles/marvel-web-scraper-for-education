const fetch = require('node-fetch');
const fs = require('fs').promises;
const secrets = require('../secrets');
const md5 = require('md5');
​
const { MARVEL_API_KEY, MARVEL_PRIVATE_KEY } = secrets;
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';
const limit = 100;
​
const outFile = `${process.cwd()}/data/characters_page`;
​
for (let i = 0; i <= 500; i+=100) { 
  (async () => {
    try {
      await sleep(2000);
      const ts = Date.now();
      const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_API_KEY);
      const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${i}&ts=${ts}&apikey=${MARVEL_API_KEY}&hash=${hash}`);
      console.log(res);
      const payload = await res.json();
      console.log(payload);
      const charactersList = payload.data.results;
      await fs.appendFile(`${outFile}_${i}.json`, JSON.stringify(charactersList), { encoding: 'utf8' });
    } catch (e) {
      console.log(e);
    }
  })();
}
​
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}