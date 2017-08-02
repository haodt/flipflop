import * as types from '../constants/ActionTypes'

export const searchProduct = url => ({ type: types.SEARCH_PRODUCT, url });
export const removeProduct = product => ({ type: types.REMOVE_PRODUCT, product });
export const sortProducts = criteria => ({ type: types.SORT_PRODUCT, criteria })