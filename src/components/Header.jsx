import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { sumAllExpenses } from '../actions';
import './header.css';

class Header extends Component {
  componentDidMount() {
    const { updateHeader } = this.props;
    updateHeader();
  }

  render() {
    const { email, total } = this.props;
    return (
      <div className="divHeader">
        <h1>TrybeWallet</h1>
        <div className="content">
          <span
            data-testid="email-field"
          >
            {`Usuário: ${email}`}
          </span>
          <span
            data-testid="total-field"
          >
            {`Despesas totais: ${(total === 0 || total === undefined)
              ? 0 : total.toFixed(2)} R$`}
          </span>
        </div>
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
