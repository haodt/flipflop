import { SEARCH_PRODUCT, REMOVE_PRODUCT, SORT_PRODUCT, SUBMIT_URL, SUBMIT_URL_SUCCESS, SUBMIT_URL_FAIL } from './../constants/ActionTypes';
import * as criteria from './../constants/Criteria';
import { List } from 'immutable';

const initialStates = [{
  products: List([]),
  isFetching: false,
  error: null,
  criteria: criteria.ALL[0]
}];

const doSort = (c, products) => {
  return products.sort((a, b) => {
    switch (c) {
      case criteria.HIGHEST_PRICE:
        return b.prices.final - a.prices.final;
      case criteria.LOWEST_PRICE:
        return a.prices.final - b.prices.final;
      case criteria.MOST_RATES:
        return b.scores.rating - a.scores.rating;
      case criteria.MOST_STARS:
        return b.scores.total_rating - a.scores.total_rating;
      case criteria.MOST_REVIEWS:
        return b.scores.total_review - a.scores.total_review;
      default:
        return -1;
    }
  });
}

export default function search(state = initialStates, action) {
  let products = state[0].products;

  switch (action.type) {
    case SORT_PRODUCT:
      return [{
        products: doSort(action.criteria, products),
        isFetching: false,
        criteria: action.criteria,
      }, ...state];
    case REMOVE_PRODUCT:
      return [{
        products: products.filter(p => p.url !== action.product.url),
        isFetching: false,
        criteria: state[0].criteria,
      }, ...state];
    case SUBMIT_URL_FAIL:
      return [{
        products: products,
        isFetching: false,
        error: action.error.response.data.message,
        criteria: state[0].criteria,
      }, ...state];
    case SUBMIT_URL_SUCCESS:
      return [{
        products: doSort(state[0].criteria, products.push(action.payload.data)),
        isFetching: false,
        criteria: state[0].criteria,
      }, ...state];
    case SUBMIT_URL:
      return [{
        products: products,
        criteria: state[0].criteria,
        isFetching: true
      }, ...state];
    case SEARCH_PRODUCT:
      return [{
        products: products,
        criteria: state[0].criteria,
      }, ...state];
    default:
      return state;
  }
}