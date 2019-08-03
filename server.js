const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

fs.readFile('./pocket_export.html', 'utf8', function(err, contents) {
  const $ = cheerio.load(contents);
  $('a').each((i, elm) => {
    const date = new Date($(elm).attr('time_added') * 1000);
    // console.log('href', $(elm).attr('href'), 'time_added', date, 'tags', $(elm).attr('tags'));
  });
});

grabPageMetadataForUrl('https://aws.amazon.com/blogs/architecture/ten-things-serverless-architects-should-know/')
  .then((result)=>{
    console.log('Title:', result.title);
  }).catch(function (error) {
    console.error(error);
  });

async function grabPageMetadataForUrl(url) {
  console.log('Fetching', url); 
  return axios.get(url)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      // const allMetas = $('head').children().length;
      // console.log('TITLE:', $('title').text());
      // console.log('og:url:', $('meta[property="og:url"]').attr('content'));
      // console.log('og:image:', $('meta[property="og:image"]').attr('content'));
      // console.log('og:description:', $('meta[property="og:description"]').attr('content'));
      return {
        title: $('title').text()
      };
    });
}


