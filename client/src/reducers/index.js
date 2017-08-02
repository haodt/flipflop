import { combineReducers } from 'redux';

import search from './search';
import products from './products';

const rootReducer = combineReducers({
  search,
  products
})

export default rootReducer