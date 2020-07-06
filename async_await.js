// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

const fetch = require('node-fetch');

// to use async await you must use it within a `async function`
async function usePromise() {
  // inside a async function you have the keyword `await`
  // `await` should be used only on promises. It will wait for the promise to resolve or reject before moving on to the next line
  try {
    const res = await fetch('https://google.ca');
    const payload = await res.text();
    console.log(payload);
  } catch (error) {
    console.log(error);
  }
}

function usePromiseWithoutAsync() {
  fetch('https://google.ca')
    .then(res => res.text())
    .then(payload => console.log(payload))
    .catch(err => console.log(err));
}

usePromise();