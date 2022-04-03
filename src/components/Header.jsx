import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { sumAllExpenses } from '../actions';

class Header extends Component {
  componentDidMount() {
    const { updateHeader } = this.props;
    updateHeader();
  }

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
          {(total === 0 || total === undefined) ? 0 : total.toFixed(2)}
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

const mapDispatchToProps = (dispatch) => ({
  updateHeader: () => dispatch(sumAllExpenses()),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  updateHeader: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
