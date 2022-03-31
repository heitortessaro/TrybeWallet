import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { makeLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mail: '',
      password: '',
      btnDisabled: true,
    };
  }

  hangleChange = ({ target }) => {
    const { name, value } = target;
    // console.log(value);
    this.setState({
      [name]: value,
    }, () => this.checkLoginInfo());
  }

  checkLoginInfo = () => {
    const { mail, password } = this.state;
    // regex retirado de https://regexr.com/3e48o
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minPasswordSize = 6;
    if (password.length >= minPasswordSize && mail.match(re)) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  };

  sendInformation = () => {
    const { history, userLogin } = this.props;
    const { mail } = this.state;
    userLogin(mail);
    history.push('/wallet');
  }

  render() {
    const { mail, password, btnDisabled } = this.state;
    // console.log(this.props.history.push);
    return (
      <div>
        <h1> Login </h1>
        <input
          type="text"
          placeholder="e-mail"
          name="mail"
          value={ mail }
          onChange={ this.hangleChange }
          id="login-user-mail"
          data-testid="email-input"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="senha"
          value={ password }
          onChange={ this.hangleChange }
          id="login-user-password"
          data-testid="password-input"
        />
        <br />
        { btnDisabled
          && (
            <>
              <span>Confira e-mail e senha</span>
              <br />
            </>)}
        <button
          type="button"
          disabled={ btnDisabled }
          onClick={ this.sendInformation }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (data) => dispatch(makeLogin(data)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
