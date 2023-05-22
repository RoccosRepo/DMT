const fetch = require('node-fetch');

const url = 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=38.206591&lon=-92.416691&per_page=1000&radius=100';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c5657e40e6msh2b21adccd4a33fap1b4602jsnbcc74fccdc2f',
    'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
  }
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
