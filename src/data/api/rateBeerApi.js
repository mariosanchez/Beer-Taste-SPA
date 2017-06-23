const request = require('request');
const cheerio = require('cheerio');

const BASE_URL = "http://ratebeer.com";

exports.getByPermalink = function(permalink) {
  const url = BASE_URL + permalink;

  return requestBeerProfileData(url)
    .then(data => mergeBreweryData(data))
    .then(data => JSON.stringify(data));
};

function requestBeerProfileData(url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, html) {

      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const rootElement = cheerio.load($('#container').html());

        const id = url.split('/').filter(String).pop();
        const name = rootElement('[itemprop="name"]').text();
        const picture = rootElement('[itemprop="image"]').attr('src');
        const brewery = rootElement('[itemprop="brand"] [itemprop="name"]').text();
        const breweryUrl = rootElement('[itemprop="brand"]').attr('href');
        const style = rootElement('#styleTopFifty').prev().text();
        const ibu = rootElement('*:contains("IBU") + big').text();
        const abv = rootElement('*:contains("ABV") + big').text();
        const glass = Array.map(rootElement('.aggregate-rating-container [rel="modal:open"]')
          , glass => ({ name: rootElement(glass).text() }));
        const description = rootElement('.commercial-description-container .text-wrapper').text().trim();

        const data = {
          id: id,
          name: name,
          picture: picture,
          brewery: brewery,
          breweryUrl: BASE_URL + breweryUrl,
          style: style,
          glass: glass,
          ibu: ibu,
          abv: abv,
          description: description,
        };

        resolve(data);
      } else {
        reject(response.statusCode);
      }
    });
  });
}

function mergeBreweryData(data){
  return new Promise((resolve, reject) => {
    request(data.breweryUrl, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const rootElement = cheerio.load($('.container-fluid').html());

        const city = rootElement('[itemprop="addressLocality"]').text();
        const country = rootElement('[itemprop="addressCountry"]').text();

        data['location'] = {
          city: city,
          country: country,
        };

        resolve(data);
      } else {
        reject(response.statusCode);
      }
    });
  });
}
