import React from 'react'

class TableItem extends React.Component {
  render() {
    const { currencies, amount } = this.props;

    return (
      <div className='col-12 order-2 order-lg-4 shadow p-3 mb-5 bg-body rounded'>
        <table className='table table-responsive'>
          <thead>
            <tr>
              <th scope='col'>Currency</th>
              <th scope='col'>Rate</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => {
              const {
                name,
                rate,
              } = currency;

              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{rate * amount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableItem