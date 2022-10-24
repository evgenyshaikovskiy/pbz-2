import React from 'react';
import cl from './input.module.css';

const AppInput = ({ ...props }) => {
  return <input {...props} className={cl.appInput}></input>;
};

export default AppInput;
