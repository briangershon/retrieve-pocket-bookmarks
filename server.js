const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

function allPocketUrls() {
  const results = [];
  contents = fs.readFileSync('./pocket_export.html', 'utf8');
  const $ = cheerio.load(contents);
  $('a').each((i, elm) => {
    const date = new Date($(elm).attr('time_added') * 1000);
    results.push({
      url: $(elm).attr('href'),
      time_added: date,
      tags: $(elm).attr('tags'),
    })
  });
  return results;
}

async function processAll(urls) {
  const len = urls.length;
  for (let i = 0; i < len; i += 1) {
    try {
      const pageMetadata = await grabPageMetadataForUrl(urls[i].url)
      console.log(`${pageMetadata.httpStatusCode} #${i} of ${len-1} ${urls[i].url}\n  imageUrl: ${pageMetadata.imageUrl}\n  title: ${pageMetadata.title}\n  description: ${pageMetadata.description}\n`);
    } catch(err) {
      console.log(`${i} ${urls[i].url}\n  ERROR: ${err.response.status}\n`);
    }
  }
}

async function grabPageMetadataForUrl(url) {
  return axios.get(url)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      return {
        httpStatusCode: response.status,
        title: $('title').text(),
        url: $('meta[property="og:url"]').attr('content'),
        imageUrl: $('meta[property="og:image"]').attr('content'),
        description: $('meta[property="og:description"]').attr('content'),
        excerpt: '',
      };
    }).catch((err)=> {
      if (err.response) {
        return {
          httpStatusCode: err.response.status,
          url,
        }
      }

      return {
        httpStatusCode: 504,
        url,
      }
    });
}

console.time('process-all');
processAll(allPocketUrls()).then(() => {
  console.timeEnd('process-all');
});
