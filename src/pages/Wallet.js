import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchCurrencies } from '../actions/index';
import Header from '../components/Header';
import Forms from '../components/Forms';
import Table from '../components/Table';
import FormsEditing from '../components/FormsEditing';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { editing } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
        {editing
          ? <FormsEditing />
          : <Forms />}

        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editing: state.wallet.editing,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
