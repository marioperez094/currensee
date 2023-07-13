import React from 'react';

class Selector extends React.Component {
  render() {
    const { options, value, onSelect } = this.props;

    return (
      <select value={value} onChange={(e) => onSelect(e)} className='text-center shadow p-3 mb-5 bg-body rounded'>
        {options.length > 0 ? options.map((option, index) => {
          return <option key={index}
            value={option.name}>
            {option.name}
          </option>

        }) : <option>No options</option>}
      </select>
    )
  }
}


export default Selector;