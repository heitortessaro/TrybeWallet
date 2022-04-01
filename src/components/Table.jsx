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
      <table>
        <tr>
          {header.map((item, index) => <th key={ `header${index}` }>Company</th>)}
        </tr>
      </table>
    );
  }
}

export default connect(null, null)(Table);
