import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { finishEditExpense } from '../actions';
import './form.css';

class Forms extends Component {
  constructor(props) {
    super(props);
    const { editingExpense } = this.props;
    // console.log(editingExpense);
    this.state = {
      valor: editingExpense.value,
      moeda: editingExpense.currency,
      metodo: editingExpense.method,
      categoria: editingExpense.tag,
      descricao: editingExpense.description,
    };
  }

  finishEditing = () => {
    const { valor, moeda, metodo, categoria, descricao } = this.state;
    const { editingExpense, saveEditedExpense } = this.props;
    saveEditedExpense({
      id: editingExpense.id,
      value: valor,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag: categoria,
      exchangeRates: editingExpense.exchangeRates,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    const { valor: oldValue } = this.state;
    const re = /^\$?\d+(\.\d*)?$/;
    if (name === 'valor' && !value.match(re)) {
      this.setState({ [name]: oldValue });
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    const { valor, descricao, moeda, metodo, categoria } = this.state;
    const { currencies } = this.props;
    return (
      <div className="divForm">
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
              value={ moeda }
              onChange={ this.handleChange }
            >
              {currencies.map((curr) => (
                <option
                  key={ `moeda${curr}` }
                  value={ curr }
                >
                  {curr}
                </option>))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="metodo"
              id="metodo"
              value={ metodo }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            <select
              data-testid="tag-input"
              name="categoria"
              id="categoria"
              value={ categoria }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.finishEditing }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  // expenseId: state.wallet.nextId,
  editingExpense: state.wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  // actSaveExpense: (expense) => dispatch(saveExpense(expense)),
  // updateAllExpenses: () => dispatch(sumAllExpenses()),
  saveEditedExpense: (expense) => dispatch(finishEditExpense(expense)),
});

Forms.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  // expenseId: PropTypes.number.isRequired,
  editingExpense: PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.shape({}).isRequired,
  }).isRequired,
  // actSaveExpense: PropTypes.func.isRequired,
  // updateAllExpenses: PropTypes.func.isRequired,
  saveEditedExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
