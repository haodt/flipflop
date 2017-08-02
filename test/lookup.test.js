const chai = require('chai');

chai.use(require('chai-http'));
chai.use(require('chai-string'));

let app = require('../index');
let { assets, expect } = chai;

let request = chai.request(app);

let lookup = (url) => {
  return request
    .get('/lookup')
    .query({
      url: url
    })
}

describe('As a user i', () => {
  it('shouldnt be able to input empty url', (done) => {
    lookup(null).end((err, res) => {
      expect(err.status).to.be.eq(412, 'Url is empty');
      done();
    })
  })
  it('shouldnt be able to input url that is not in lazada.sg|lazada.vn', (done) => {
    lookup('http://google.com').end((err, res) => {
      expect(err.status).to.be.eq(400, 'Url is not in supported domains');
      done();
    })
  })

  it('should be able to see a product', (done) => {
    lookup('http://www.lazada.sg/samsung-galaxy-s8-64gb-midnight-black-18155589.html').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);

      let product = res.body;

      expect(product.name).to.be.a('string');
      expect(product.url).to.be.a('string');
      expect(product.stock).to.be.a('boolean');


      expect(product.warranty).to.be.an('object');
      expect(product.prices).to.be.an('object');
      expect(product.scores).to.be.an('object');

      expect(product.categories).to.be.an('array');
      expect(product.images).to.be.an('array');
      expect(product.colors).to.be.an('array');
      expect(product.attributes).to.be.an('array');
      expect(product.reviews).to.be.an('array');

      done();
    })
  })
});

/**
{
        name: 'Samsung Galaxy S8 64GB (Midnight Black)',
        url: 'http://www.lazada.sg/samsung-galaxy-s8-64gb-midnight-black-18155589.html',
        categories: ['Mobiles & Tablets', 'Mobiles'],
        images: [
          'http://sg-live-01.slatic.net/images/spinbasket/placeholder/placeholder_xs_4.jpg'
        ],
        warranty: {
          term: '1 year',
          type: 'Local (Singapore) manufacturer warranty',
          detail: 'The warranty service is offered by the local manufacturer based in Singapore. Warranty can be claimed at any authorized service center within Singapore. Please refer to the warranty card and the invoice for guidelines on the claim process.'
        },
        colors: [{
          name: 'gold',
          hex: '#CB9B2B'
        }, {
          name: 'black',
          hex: '#000000'
        }],
        attributes: [
          '5.8" Quad HD (1440 x 2960 pixel) Super AMOLED display',
        ],
        prices: {
          final: 858.00,
          currency: 'SGD',
          before: 1068.00,
          save: '20%',
          installments: [
            'Up to 12 months 0% Interest Installment Plan, as low as SGD 71.50 per month',
            'Up to 6 months 0% Interest Installment Plan, as low as SGD 143.00 per month'
          ]
        },
        stock: false,

        scores: {
          rating: 4.5,
          total_rating: 5519,
          total_review: 44
        },

        reviews: [{
          stars: 4,
          by: 'Ong P',
          purchased: true,
          time: '3 weeks ago',
          title: 'Good',
          content: 'Good but the materials will get yellowish'
        }]
      }
 */