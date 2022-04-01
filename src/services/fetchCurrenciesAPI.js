const fetchCurrenciesAPI = async () => {
  try {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resolve.json();
    const currencies = Object.keys(data).filter((curr) => curr !== 'USDT');
    // console.log(currencies);
    return { status: 'ok', data: currencies };
  } catch (error) {
    console.log(error);
    return { status: 'error', data: error };
  }
};

export default fetchCurrenciesAPI;
