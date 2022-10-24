import React, { useState } from 'react';
import AppButton from '../button';
import EmployeesForm from '../crud/employees_create';
import AppModal from '../modal';

export function CreateEmployeesButton() {
  const [modal, setModal] = useState(false);

  const createEmployee = (employee) => {
    console.log(employee);
    setModal(false);
  };

  return (
    <div>
      <AppButton onClick={() => setModal(true)}>Добавить сотрудника</AppButton>
      <AppModal visible={modal} setVisible={setModal}>
        <EmployeesForm create={createEmployee}></EmployeesForm>
      </AppModal>
    </div>
  );
}

export default CreateEmployeesButton;
