import * as types from '../constants/ActionTypes';
import qs from 'qs';

export const submitUrl = value => ({
  type: types.SUBMIT_URL,
  value: value,
  payload: {
    request: {
      url: '/lookup?' + qs.stringify({
        url: value
      }),
    }
  }
});
export const duplicateUrl = value => ({ type: types.SUBMIT_DUPLICATE_URL, value });
export const updateUrl = value => ({ type: types.UPDATE_URL, value });