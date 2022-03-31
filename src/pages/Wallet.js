import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchCurrencies } from '../actions/index';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { fetchCur } = this.props;
    fetchCur();
    console.log('teste');
  }

  render() {
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCur: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  fetchCur: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
