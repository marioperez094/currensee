import React from 'react';
import { json, checkStatus } from './utils'
import Selector from './Selector';
import TableItem from './TableItem'
import AmountInput from './AmountInput'

class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primarySearch: 'EUR',
      primarySpelledOut: 'Euro',
      secondarySearch: 'All',
      secondarySpelledOut: 'Hi',
      primaryInput: 1,
      secondaryInput: 'Null',
      listedCurrencies: [],
      currencyFilter: [],
      currencies: [],
      rate: 0,
    };

    this.primaryCurrency = this.primaryCurrency.bind(this);
    this.primaryInputChange = this.primaryInputChange.bind(this);
    this.secondaryCurrency = this.secondaryCurrency.bind(this);
    this.secondaryInputChange = this.secondaryInputChange.bind(this);
  }

  //FrankFurter Currency List
  fetchCurrencies() {
    fetch('https://api.frankfurter.app/currencies')
      .then(checkStatus)
      .then(json)
      .then((response) => {
        let listedResponse = Object.keys(response).map((dollar) => { return { name: dollar, symbol: response[dollar] } })
        this.setState({ listedCurrencies: listedResponse, currencyFilter: [...listedResponse, { name: 'All', symbol: 0 }] })
      })
    setTimeout(() => { console.log(this.state.listedCurrencies) }, 3000)
  }


  //FrankFurter API 
  fetchTable() {
    fetch('https://api.frankfurter.app/latest?from=' + this.state.primarySearch)
      .then(checkStatus)
      .then(json)
      .then((response) => {
        console.log(response)
        let listedResponse = Object.keys(response.rates).map((dollar) => { return { name: dollar, rate: response.rates[dollar] } });
        this.setState({ currencies: [{ name: response.base, rate: response.amount }, ...listedResponse] })
      })
      .catch(error => {
        console.error(error.message);
      })
  }


  //Calculates rate based on previously retrieved object. I went back and forth about just fetching it from the API again but read in the assignment that it wasn't needed. 
  fetchRate(primary, secondary) {
    let rateOne = this.state.currencies.filter((match) => {
      return primary === match.name
    })
    let rateTwo = this.state.currencies.filter((match) => {
      return secondary === match.name
    })

    this.setState({ rate: rateTwo[0].rate / rateOne[0].rate })
  }


  //Mounts on load
  componentDidMount() {
    this.fetchCurrencies()
    this.fetchTable()
  }

  //Event triggered by changing the first selector, can either fetch the table or set the rate depending on what the secondary selector is set to. 
  primaryCurrency(event) {
    let fullName = this.state.listedCurrencies.filter((match) => {
      return event.target.value === match.name
    })
    this.setState({ primarySearch: event.target.value, primarySpelledOut: fullName[0].symbol }, () => { this.state.secondarySearch === 'All' ? this.fetchTable() : this.fetchRate(this.state.primarySearch, this.state.secondarySearch), this.setInputs('secondary') });
  }

  //Secondary selector, also what makes the table appear or disappear
  secondaryCurrency(event) {
    if (event.target.value !== 'All') { this.fetchRate(this.state.primarySearch, event.target.value) }
    let fullName = this.state.currencyFilter.filter((match) => {
      return event.target.value === match.name
    })
    this.setState({ secondarySearch: event.target.value, secondarySpelledOut: fullName[0].symbol }, () => {
      if (this.state.secondarySearch === 'All') { this.fetchTable() }
      this.setInputs('secondary')
    });
  }

  //First input
  primaryInputChange(event) {
    this.setState({ primaryInput: event.target.value }, () => { this.setInputs('secondary') })
  }

  //Secondary input
  secondaryInputChange(event) {
    this.setState({ secondaryInput: event.target.value }, () => { this.setInputs('primary') })
  }

  //Sets the opposite input
  setInputs(inputName) {
    switch (inputName) {
      case 'primary':
        const primaryInput = this.convert(this.state.secondaryInput, this.state.rate, this.toPrimary);
        this.setState({ primaryInput })
        break;
      case 'secondary':
        const secondaryInput = this.convert(this.state.primaryInput, this.state.rate, this.toSecondary);
        this.setState({ secondaryInput })
        break;
    }
  }

  //Conversion commands same from previous conversion project

  toPrimary(amount, rate) {
    return amount * (1 / rate);
  }

  toSecondary(amount, rate) {
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
    const { primarySpelledOut, secondarySpelledOut, listedCurrencies, currencies, currencyFilter, primarySearch, secondarySearch, primaryInput, secondaryInput } = this.state;

    return (
      <div className='container-fluid mt-5 content-wrap'>
        <div className='row d-flex justify-content-around'>
          <div className='col-12 col-lg-8 order-1 shadow p-3 mb-5 bg-body rounded'>
            <div className='selectors d-flex justify-content-around'>
              <Selector options={listedCurrencies} value={primarySearch} onSelect={this.primaryCurrency}></Selector>
              <Selector options={currencyFilter} value={secondarySearch} onSelect={this.secondaryCurrency}></Selector>
            </div>
            <div className='spelledOut d-flex justify-content-around mb-5'>
              <label><h4>{primarySpelledOut}</h4></label>
              {secondarySearch !== 'All' ? <label><h4>{secondarySpelledOut}</h4></label> : null}
            </div>
            <div className='inputs d-flex justify-content-around'>
              <AmountInput value={primaryInput} onChange={this.primaryInputChange}></AmountInput>
              {secondarySearch !== 'All' ? <AmountInput value={secondaryInput} onChange={this.secondaryInputChange}></AmountInput> : null}
            </div>
          </div>
          <div className='chart col-12 col-lg-3 order-3 order-lg-3 shadow p-3 mb-5 bg-body rounded'>
          </div>
          {secondarySearch === 'All' ? <TableItem amount={primaryInput} currencies={currencies}></TableItem> : null}
        </div>
      </div>
    )
  }
}

export default Components;