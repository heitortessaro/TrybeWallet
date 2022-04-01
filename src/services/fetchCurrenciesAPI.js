const fetchCurrenciesAPI = async () => {
  try {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resolve.json();
    const currencies = Object.keys(data).filter((curr) => curr !== 'USDT');
    // console.log(currencies);
    return ['ok', currencies];
  } catch (error) {
    console.log(error);
    return ['error', error];
  }
};

export default fetchCurrenciesAPI;
