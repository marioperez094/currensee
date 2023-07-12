import React from 'react'

class AmountInput extends React.Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <input value={value} onChange={(e) => onChange(e)} className='text-center' type='text' placeholder='1.00' />
    )
  }
}

export default AmountInput