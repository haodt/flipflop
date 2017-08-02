const cheerio = require('cheerio');

module.exports = (html, product) => {

  if (html) {
    const $ = cheerio.load(html, {
      xmlMode: false,
      normalizeWhitespace: false,
      decodeEntities: true
    });

    let detail = $('#prd-detail-page');
    let structure;

    if (detail.length == 0) {
      return false;
    }

    let scripts = $('script').filter((i, el) => {
      return $(el).attr('type') == 'application/ld+json';
    }).map((i, el) => {
      return $(el).html();
    }).get()

    try {
      structure = JSON.parse(scripts[0]);

      if (structure.aggregateRating) {
        product.scores.rating = structure.aggregateRating.ratingValue;
        product.scores.total_rating = structure.aggregateRating.ratingCount;
        product.scores.total_review = structure.review.length;
      }
    } catch (err) {

    }

    product.name = $('#prod_title').text().trim();
    if ($('.prod_stock_number.isOutOfStock').length == 1) {
      product.stock = false;
    }

    let warranty = $('.prod-warranty').first();
    if (warranty.length == 1) {
      product.warranty.term = warranty.find('.prod-warranty__term').text().trim();
      product.warranty.type = warranty.find('.prod-warranty__type').text().trim();
      product.warranty.detail = warranty.find('.warranty-popup__copy').text().trim();
    }

    let prices = $('.prod_pricebox_price').first();
    if (prices.length == 1) {
      product.prices.final = parseFloat(prices.find('#product_price').text().trim());
      product.prices.currency = prices.find('#special_currency_box').text().trim();

      let before = $('.price_erase');
      if (before.length == 1) {
        product.prices.before = parseFloat(before.find('#price_box').text().trim().replace(/[^0-9]+/g, ''))
        product.prices.save = parseInt()
      }

      let saving = $('.prod_saving');
      if (saving.length == 1) {
        product.prices.save = parseInt(saving.find('#product_saving_percentage').text().trim());
      }

      product.prices.installments = $('.prod_pricebox_installments .prod_pricebox_installments_note').map((index, el) => {
        return $(el).text().trim().replace(/(\n|  )+/g, '');
      }).get()

    }

    if (structure.review) {
      product.reviews = structure.review.map((r) => {
        return {
          stars: r.reviewRating.ratingValue,
          by: r.author,
          time: r.datePublished,
          title: r.name,
          content: r.reviewBody
        };
      });
    }


    product.categories = $('.breadcrumb__item-anchor').map((i, el) => {
      return $(el).text().trim();
    }).get();

    product.images = detail.find('.prd-moreImagesList li .productImage').map((i, el) => {
      return $(el).data('big');
    }).get();

    product.colors = detail.find('.prod-multi-group__item-color').map((i, el) => {
      return {
        name: $(el).css('background-color'),
        hex: $(el).text().trim()
      };
    }).get();

    product.attributes = detail.find('.prd-attributesList.ui-listBulleted.js-short-description li').map((i, el) => {
      return $(el).text().trim().replace(/[\r\n]/g, ' ');
    }).get()

  }

  return product;
}