import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <h2>HEADER</h2>
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
          {total.toFixed(2)}
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
  total: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
