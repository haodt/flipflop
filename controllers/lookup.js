const request = require('request');
const lazada = require('./strategies/lazada');

const DOMAINS = [
  'lazada.vn',
  'lazada.sg'
];

module.exports = (req, res) => {

  if (!req.query.url) {
    return res.status(412).send({
      message: 'Url is required'
    });
  }

  let url = decodeURI(req.query.url);

  /**
   * Validate url
   */

  let pattern = `(http|https):\/\/(www\.)?(${DOMAINS.map(domain => domain.replace('.','\.')).join('|')})(.*)`

  if (!url.match(new RegExp(pattern, 'g'))) {
    return res.status(400).send({
      message: `Url is not valid, only accept ${DOMAINS.join(', ')}`
    });
  }

  /**
   * Fetch data from url
   */

  request
    .get(url, (err, response, body) => {
      if (err) {
        return res.status(err.status).send({
          message: 'Cannot fetch data'
        });
      }

      let host = response.req._headers.host;
      let product = {
        name: '',
        url: url,
        stock: true,
        warranty: {},
        prices: {},
        scores: {
          rating: 0,
          total_rating: 0,
          total_review: 0
        },
        categories: [],
        images: [],
        colors: [],
        attributes: [],
        reviews: []
      };

      switch (host) {
        default: product = lazada(body, product);
        break;
      }

      if (!product) {
        return res.status(404).send({
          message: 'Cannot find product'
        });
      }

      res.send(product);
    })


}