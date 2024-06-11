import React from 'react';
import './Button.css';

const Button = ({ handleClick, children, className }) => (
  <button 
    className={`button ${className}`}
    onClick={(e) => handleClick(e)}
    aria-label={typeof children === 'string' ? children : 'button'}
  >
    {children}
  </button>
);

export default Button;