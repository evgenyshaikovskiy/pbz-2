import React from 'react';
import cl from './select.module.css';

const AppSelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select className={cl.appSelect} value={value} onChange={(event) => onChange(event.target.value)}>
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default AppSelect;
