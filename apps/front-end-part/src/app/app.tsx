// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { useState } from 'react';
import AppButton from '../components/button';
import OwnerForm from '../components/crud/owners_create';
import AppInput from '../components/input';
import AppModal from '../components/modal';
import CreateCarButton from '../components/utils/add_car_button';
import CreateEmployeesButton from '../components/utils/add_employees_button';
import CreateInspectionButton from '../components/utils/add_inspection_button';
import CreateOwnerButton from '../components/utils/add_owner_button';
import '../styles/app.css';


export function App() {
  return <div className="app">
    <CreateCarButton></CreateCarButton>
    <CreateOwnerButton></CreateOwnerButton>
    <CreateEmployeesButton></CreateEmployeesButton>
    <CreateInspectionButton></CreateInspectionButton>

  </div>;
}

export default App;
