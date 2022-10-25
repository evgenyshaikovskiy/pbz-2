import React, { useState } from 'react';
import PostService from '../../api/post.service';
import AppButton from '../button';
import EmployeesForm from '../crud/employees_create';
import AppModal from '../modal';

export function CreateEmployeesButton() {
  const [modal, setModal] = useState(false);

  const createEmployee = async (employee) => {
    const response = await PostService.post(
      'https://localhost:3000/api/employees',
      employee
    );

    console.log(response);
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
