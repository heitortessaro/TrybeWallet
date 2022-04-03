import fetchCurrenciesAPI from '../services/fetchCurrenciesAPI';

// Coloque aqui suas actions
// LOGIN ----------------------------------------
export const LOGIN = 'LOGIN';

export const makeLogin = (payload) => ({
  type: LOGIN, payload,
});

// Wallet ----------------------------------------
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SUM_ALL_EXPENSES = 'SUM_ALL_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loading = () => ({
  type: 'LOADING',
});

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES, payload,
});

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE, payload,
});

export const sumAllExpenses = () => ({
  type: SUM_ALL_EXPENSES,
});

export const deleteExpense = () => ({
  type: DELETE_EXPENSE, payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(loading());
    const response = await fetchCurrenciesAPI();
    if (response.status === 'ok') {
      const currencies = Object.keys(response.data).filter((curr) => curr !== 'USDT');
      dispatch(saveCurrencies(currencies));
    }
  };
}
// try {
//   const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await resolve.json();
//   const currencies = Object.keys(data).filter((curr) => curr !== 'USDT');
//   // console.log(currencies);
//   dispatch(saveCurrencies(currencies));
// } catch (error) {
//   console.log(error);
// }
// };
// return () => {
//   // dispatch(loading());
//   fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//   // .then((json) => dispatch(getImage(json)))
//     .catch((error) => console.log(error));
// };
