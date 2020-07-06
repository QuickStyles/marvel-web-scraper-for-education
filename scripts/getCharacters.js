// node-fetch is a library that mimics the fetch() api on the server-side
// we're using it because fetch() is a client side library not available in node
const fetch = require('node-fetch');

// fs module used to save stuff to files
const fs = require('fs').promises;

// our secrets location
const secrets = require('../secrets');

// md5 is a hashing algorithm. We downloaded a npm package that gives us a function that uses md5
// we need md5 because marvel documentation tells us to use it for authentication on the server side: https://developer.marvel.com/documentation/authorization.
const md5 = require('md5');

const { MARVEL_API_KEY, MARVEL_PRIVATE_KEY } = secrets;
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';
const limit = 100;

// file we will save results to
// process.cwd() will return the directory that the script is running in
const outFile = `${process.cwd()}/data/characters_page`;

for (let i = 0; i <= 500; i+=100) {
  // async function.
  // async functions give us syntax sugar for using promises. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  (async () => {
    try {
      await sleep(2000);
      // get the current time
      const ts = Date.now();
      // creating a hash using the md5 algorithim. Marvel docs require us to hash `ts + Private Key + Public Key`
      const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_API_KEY);

      // sending a fetch()
      const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${i}&ts=${ts}&apikey=${MARVEL_API_KEY}&hash=${hash}`);
      // parsing the body with json()
      const payload = await res.json();
      // grabbing the results of requests
      const charactersList = payload.data.results;
      // save charactersList to a file
      await fs.appendFile(`${outFile}_${i}.json`, JSON.stringify(charactersList), { encoding: 'utf8' });
    } catch (e) {
      console.log(e);
    }
  })();
}

// sleep is a function that pauses running the script for a set time
// we're using it because we don't want the script to send a fetch() request too fast
// sometimes an api may block requests from an ip address because it's sending too many requests too fast.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

