import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1> Login </h1>
        <input
          type="text"
          name="userMail"
          // value={}
          // onChange={}
          id="login-user-mail"
          data-testid="email-input"
        />
        <input
          type="text"
          name="userPassword"
          // value={}
          // onChange={}
          id="login-user-password"
          data-testid="password-input"
        />
        <button
          type="button"
          // disabled={}
          // onClick={}
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
