import React from 'react';
import Selector from './Selector';
import { checkStatus, json } from './utils/fetchUtils'
import CurrencyTable from './CurrencyTable';
import AmountInput from './AmountInput'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      base: 'EUR',
      quote: 'All',
      baseValue: 1,
      quoteValue: 1,
      rates: null,
      listedCurrencies: [],
      currencyFilter: [],
      loading: true,
      currentRate: 1,
    }
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    fetch('https://api.frankfurter.app/currencies')
      .then(checkStatus)
      .then(json)
      .then((response) => {
        let listedResponse = Object.keys(response).map((dollar) => { return { acronym: dollar, name: response[dollar] } })
        this.setState({ listedCurrencies: listedResponse, currencyFilter: [...listedResponse, { acronym: 'All', name: 'All' }] })
        console.log(this.state.currencyFilter)
        this.getRatesData(this.state.base)
      })
    }

  getRatesData = (base) => {
    this.setState({ loading: true })
    fetch(`https://api.frankfurter.app/latest?from=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const rates = Object.keys(data.rates)
          .map(acronym => ({
            rate: data.rates[acronym],
            name: this.state.listedCurrencies.filter(filter => filter.acronym === acronym),
          }))
          console.log(rates)
          this.setState({ rates, loading: false })
      })
      .catch(error => console.error(error.message));
  }

  getRate = (base, quote) => {
    this.setState({ loading: true});
    fetch(`https://api.frankfurter.app/latest?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const currentRate = data.rates[quote];
        this.setState({
          currentRate,
          baseValue: 1,
          quoteValue: Number((1 * currentRate).toFixed(3)),
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }

  changeBase = (event) => {
    if (this.state.quote !== 'All' && event.target.value !== this.state.quote) { this.getRate(event.target.value, this.state.quote) }
    if (this.state.quote === 'All') {
      this.getRatesData(event.target.value);
    }
    
    this.setState( { base: event.target.value });
  }

  changeQuote = (event) => {
    if (event.target.value !== 'All' && event.target.value !== this.state.base) { this.getRate(this.state.base, event.target.value)}
    this.setState({ quote: event.target.value })
  }

  changeBaseValue = (event) => {
    const quoteValue = this.convert(event.target.value, this.state.currentRate, this.toQuote);
    this.setState({ 
      baseValue: event.target.value,
      quoteValue })
  }

  changeQuoteValue = (event) => {
    const baseValue = this.convert(event.target.value, this.state.currentRate, this.toBase);
    this.setState({
      quoteValue: event.target.value,
      baseValue
    })
  }

  toBase(amount, rate) {
    return amount * (1 / rate);
  }

  toQuote(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(3);
  }


  render() {
    const { base, quote, rates, listedCurrencies, currencyFilter, baseValue, quoteValue, loading } = this.state;
    return (
      <React.Fragment>
        <form className="p-3 form-inline shadow p-3 mb-5 bg-body rounded">
          <div className='selectors d-flex justify-content-around'>
            <Selector value={ base } onSelect={ this.changeBase } options={ listedCurrencies } loading={ loading }></Selector>
            <Selector value={ quote } onSelect={ this.changeQuote } options={ currencyFilter } loading={ loading }></Selector>
          </div>
          <div className='inputs d-flex justify-content-around'>
            <AmountInput value={ baseValue } onChange={ this.changeBaseValue } />
            { quote !== 'All' ? <AmountInput value={ quoteValue } onChange={ this.changeQuoteValue } /> : null }
          </div>
        </form>
        { quote === 'All' ? <CurrencyTable base={ base } rates={ rates } amount={ baseValue } /> : null }
      </React.Fragment>
    )
  }
}

export default Home;