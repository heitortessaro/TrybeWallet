import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import fetchCurrenciesAPI from '../services/fetchCurrenciesAPI';
// import { fetchCurrencies } from '../actions/index';

// regex currency test: ^\$?\d+(\,\d*)?$,
// font: https://stackoverflow.com/questions/11799539/regex-for-money-values-in-javascript

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      moeda: 'USD',
      metodo: 'dinheiro',
      categoria: 'alimentacao',
      descricao: '',
    };
  }

  saveExpenses = async () => {
    const { expenseId } = this.props;
    const { valor, moeda, metodo, categoria, descricao } = this.state;
    // console.log(await fetchCurrenciesAPI());
    // console.log(currencies);
    // console.log(valor, moeda, metodo, categoria, descricao);
    const response = await fetchCurrenciesAPI();
    if (response.status === 'ok') {
      // console.log(response.data);
      const infoObj = {
        id: expenseId,
        value: valor,
        description: descricao,
        currency: moeda,
        method: metodo,
        tag: categoria,
        exchange: response.data,
      };
      console.log(infoObj);
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    const { valor: oldValue } = this.state;
    const re = /^\$?\d+(,\d*)?$/;
    if (name === 'valor' && !value.match(re)) {
      // console.log(`foi ${value} -- ${oldValue}`);
      // value = oldValue;
      this.setState({ [name]: oldValue });
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    const { valor, descricao } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <h2>FORMS</h2>
        <form className="forms">
          <label htmlFor="valor">
            Valor:
            <input
              onChange={ this.handleChange }
              data-testid="value-input"
              type="text"
              name="valor"
              id="valor"
              value={ valor }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              onChange={ this.handleChange }
              data-testid="description-input"
              type="text"
              name="descricao"
              id="descricao"
              value={ descricao }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              data-testid="currency-input"
              name="moeda"
              id="moeda"
              onChange={ this.handleChange }
            >
              {currencies.map((moeda) => (
                <option
                  key={ `moeda${moeda}` }
                  value={ moeda }
                >
                  {moeda}
                </option>))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="metodo"
              id="metodo"
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            <select
              data-testid="tag-input"
              name="categoria"
              id="categoria"
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.saveExpenses }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseId: state.wallet.nextId,
});

// const mapDispatchToProps = (dispatch) => ({
//   getCurrencies: () => dispatch(fetchCurrencies()),
// });

Forms.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseId: PropTypes.number.isRequired,
  // getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Forms);
