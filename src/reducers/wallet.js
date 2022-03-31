// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOADING':
    return {
      ...state,
      loading: true,
    };
  case SAVE_CURRENCIES:
    return {
      ...state,
      loading: false,
      currencies: [...state.currencies, ...action.payload],
    };
  default:
    return state;
  }
}
