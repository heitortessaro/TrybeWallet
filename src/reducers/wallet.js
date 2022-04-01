// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURRENCIES, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  nextId: 0,
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
      currencies: [...action.payload],
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      nextId: (state.nextId + 1),
    };
  default:
    return state;
  }
}
