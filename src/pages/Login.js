import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { makeLogin } from '../actions';
import '../pageStyle/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mail: '',
      password: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    // console.log(value);
    this.setState({
      [name]: value,
    }, () => this.checkLoginInfo());
  }

  checkLoginInfo = () => {
    const { mail, password } = this.state;
    // regex retirado de https://regexr.com/3e48o
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
    history.push('/carteira');
  }

  render() {
    const { mail, password, btnDisabled } = this.state;
    return (
      <div>
        <h2 className="titleLogin"> LOGIN </h2>
        <input
          className="inputLogin"
          type="text"
          placeholder="e-mail"
          name="mail"
          value={ mail }
          onChange={ this.handleChange }
          id="login-user-mail"
          data-testid="email-input"
        />

        <input
          className="inputLogin"
          type="password"
          name="password"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
          id="login-user-password"
          data-testid="password-input"
        />

        { btnDisabled
          && (
            <span className="spanLogin">Confira e-mail e senha</span>)}
        <button
          className="buttonLogin"
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
