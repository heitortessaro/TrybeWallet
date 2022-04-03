import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './table.css';
import { deleteExpense, sumAllExpenses } from '../actions';

class Table extends Component {
  // componentDidMount() {
  //   const { updateHeader } = this.props;
  //   updateHeader();
  // }

  originalExchange = (expense) => {
    const currencyInfo = expense.exchangeRates[expense.currency].name;
    // let original = currencyInfo.slice(0, currencyInfo.indexOf('/'));
    // if (original === 'Dólar Americano') {
    //   original = 'Dólar Comercial';
    // }
    return currencyInfo;
  }

  finalExchange = (expense) => {
    const currencyInfo = expense.exchangeRates[expense.currency].name;
    const final = currencyInfo.slice(currencyInfo.indexOf('/') + 1);
    return final;
  }

  convertValue = (expense) => {
    const originalValue = expense.value;
    const conversionRate = expense.exchangeRates[expense.currency].ask;
    return (originalValue * conversionRate).toFixed(2);
  }

  removeAndUpdate = (id) => {
    const { removeExpense, updateHeader } = this.props;
    removeExpense(id);
    updateHeader();
  }

  render() {
    const header = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir'];
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <div>
        <table>
          <thead>
            <tr>
              {header.map((item, index) => <th key={ `header${index}` }>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 && expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                {/* {console.log(typeof expense.value)} */}
                <td>{this.originalExchange(expense)}</td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>{this.convertValue(expense)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.removeAndUpdate(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
                {}
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
  updateHeader: () => dispatch(sumAllExpenses()),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf({}).isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateHeader: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
