const charactersWithStats = require('../data/final/page_0.json');

console.log(charactersWithStats.length);
charactersWithStats.forEach(element => {
  console.log(element.name);
  console.log(element.attributes);
});