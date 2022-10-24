import React, { useState } from 'react';
import AppButton from '../button';
import AppInput from '../input';
import './creation.css';

const EmployeesForm = ({ create }) => {
  const [employee, setEmployee] = useState({
    full_name: '',
    position: '',
  });

  const addNewEmployee = (e) => {
    e.preventDefault();
    const newEmployee = {
      ...employee,
      // id field?
    };

    create(newEmployee);
    setEmployee({
      full_name: '',
      position: '',
    });
  };

  return (
    <form className="create_form">
      <AppInput
        value={employee.full_name}
        type="text"
        onChange={(e) => setEmployee({ ...employee, full_name: e.target.value })}
        placeholder="ФИО сотрудника"
      ></AppInput>
      <AppInput
        value={employee.position}
        type="text"
        onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
        placeholder="Должность"
      ></AppInput>

      <AppButton onClick={addNewEmployee}>Добавить</AppButton>
    </form>
  );
};

export default EmployeesForm;
