const fetchCurrenciesAPI = async () => {
  try {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resolve.json();
    return { status: 'ok', data };
  } catch (error) {
    console.log(error);
    return { status: 'error', data: error };
  }
};

export default fetchCurrenciesAPI;
