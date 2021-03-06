import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './table.css';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import { deleteExpense, editExpense, sumAllExpenses } from '../actions';

class Table extends Component {
  // componentDidMount() {
  //   const { updateHeader } = this.props;
  //   updateHeader();
  // }

  // componentDidMount() {
  //   const { updateHeader } = this.props;
  //   updateHeader();
  // }

  // componentDidUpdate() {
  //   const { updateHeader } = this.props;
  //   updateHeader();
  // }

  originalExchange = (expense) => {
    const currencyInfo = expense.exchangeRates[expense.currency].name;
    const original = currencyInfo.slice(0, currencyInfo.indexOf('/'));
    // if (original === 'Dólar Americano') {
    //   original = 'Dólar Comercial';
    // }
    return original;
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

  editAndRemove = (id) => {
    const { sendToEdit, removeExpense } = this.props;
    // console.log('teste edit');
    sendToEdit(id);
    removeExpense(id);
    // this.removeAndUpdate(id);
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
    const posComparation = 1;
    const negComparation = -1;
    console.log(expenses);
    return (
      <div className="divTable">
        <table>
          <thead>
            <tr>
              {header.map((item, index) => <th key={ `header${index}` }>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 && expenses
              .sort((a, b) => (a.id > b.id ? posComparation : negComparation))
              .map((expense) => (
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
                      className="edit"
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editAndRemove(expense.id) }
                    >
                      <FiEdit3 size="1x" />
                    </button>
                    <button
                      className="trash"
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.removeAndUpdate(expense.id) }
                    >
                      <FiTrash2 size="1x" />
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
  sendToEdit: (id) => dispatch(editExpense(id)),
  updateHeader: () => dispatch(sumAllExpenses()),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf({}).isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateHeader: PropTypes.func.isRequired,
  sendToEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
