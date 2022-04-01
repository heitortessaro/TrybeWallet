import React, { Component } from 'react';
import { connect } from 'react-redux';

// regex currency test: ^\$?\d+(\,\d*)?$,
// font: https://stackoverflow.com/questions/11799539/regex-for-money-values-in-javascript

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      moeda: '',
      metodoPag: '',
      categoria: '',
      descricao: '',
    };
  }

  hangleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    const { valor: oldValue } = this.state;
    const re = /^\$?\d+(,\d*)?$/;
    if (name === 'valor' && !value.match(re)) {
      console.log(`foi ${value} -- ${oldValue}`);
      // value = oldValue;
      this.setState({ [name]: oldValue });
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    const { valor } = this.state;
    return (
      <div>
        <h2>FORMS</h2>
        <form className="forms">
          <label htmlFor="valor">
            Valor
            <input
              onChange={ this.hangleChange }
              data-testid="value-input"
              type="text"
              name="valor"
              value={ valor }
            />
          </label>
        </form>
      </div>
    );
  }
}

export default connect(null, null)(Forms);
