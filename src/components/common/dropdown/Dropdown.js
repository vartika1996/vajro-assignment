import React from 'react';
import './Dropdown.css';

const Dropdown = ({ options, value, onChange, label, id }) => {
  return (
    <div className='dropdown-container'>
      <label htmlFor={id} className="dropdown-label">{label}</label>
      <select 
        id={id} 
        className="dropdown-select" 
        value={value} 
        onChange={onChange} 
        aria-label={label} 
        aria-required="true"
      >
        {options.map(option => (
          <option 
            key={option.value} 
            className="dropdown-option" 
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
