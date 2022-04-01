import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
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
    return (
      <div>
        <table>
          <tr>
            {header.map((item, index) => <th key={ `header${index}` }>{item}</th>)}
          </tr>
        </table>
      </div>
    );
  }
}

export default connect(null, null)(Table);
