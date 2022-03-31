import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        HEADER
        <br />
        <span
          data-testid="email-field"
        >
          {`Usuário ${email}`}
        </span>
        <br />
        <span
          data-testid="total-field"
        >
          0
        </span>
        <br />
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
