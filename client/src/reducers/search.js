import { SUBMIT_URL, SUBMIT_DUPLICATE_URL, UPDATE_URL } from './../constants/ActionTypes';

export const DOMAINS = [
  'lazada.vn',
  'lazada.sg'
];

const initialStates = [{
  value: '',
  isValidDomain: true
}];

export default function search(state = initialStates, action) {
  switch (action.type) {
    case SUBMIT_DUPLICATE_URL:
      return [{
        value: action.value,
        isValidDomain: true,
        isDuplicate: true
      }, ...state]

    case SUBMIT_URL:
      return [{
        value: '',
        isValidDomain: true,
        isDuplicate: false
      }, ...state]

    case UPDATE_URL:

      let pattern = `(http|https):\/\/(www\.)?(${DOMAINS.map(domain => domain.replace('.','\.')).join('|')})(.*)`

      return [{
          value: action.value,
          isValidDomain: action.value.match(new RegExp(pattern, 'g'))
        },
        ...state
      ]
    default:
      return state;
  }
}