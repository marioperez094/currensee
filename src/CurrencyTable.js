import React from "react";

const CurrencyTable = (props) => {
  const { base, rates, amount } = props;
  if (!rates) { return null; }

  return (
    <div className='col-12 order-2 order-lg-4 shadow p-3 mb-5 bg-body rounded'>
      <table className='table table-responsive table-sm bg-light mt-4'>
        <thead>
          <tr>
            <th scope='col'>{ base }</th>
            <th scope='col'>{ amount }</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(currency => {
            const rate = currency.rate * amount
            const acronym = currency.name[0].acronym
            const name = currency.name[0].name
            return (
              <tr key={ acronym }>
                <td className="pl-4 py-2">{ name } <small>({ acronym })</small></td>
                <td className="text-right pr-4 py-2">{ rate.toFixed(6) }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CurrencyTable