import React from 'react';
import cl from './button.module.css';

const AppButton = ({ children, ...props }) => {
  return (
    <button {...props} className={cl.appBtn}>
      {children}
    </button>
  );
};

export default AppButton;
