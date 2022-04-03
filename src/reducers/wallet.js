// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE_EXPENSE,
  SAVE_CURRENCIES,
  SAVE_EXPENSE,
  SUM_ALL_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  nextId: 0,
  totalExpenses: 0,
  editing: true,
};

// function reduceSum(acc, elem) {
//   return acc += elem.value;
// }

function sumExpenses(state) {
  if (state.expenses.length > 0) {
    const sumAll = state.expenses
      .map((expense) => parseFloat(expense.value)
      * parseFloat(expense.exchangeRates[expense.currency].ask))
      .reduce((acc, atual) => acc + atual);
    return sumAll;
  }
}

function removeExpense(state, id) {
  const remaningExpenses = state.expenses.filter((expense) => expense.id !== id);
  return remaningExpenses;
}

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
  case SUM_ALL_EXPENSES:
    return {
      ...state,
      totalExpenses: sumExpenses(state),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: removeExpense(state, action.payload),
    };
  default:
    return state;
  }
}
