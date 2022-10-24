// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { useState } from 'react';
import CreateCarButton from '../components/utils/add_car_button';
import CreateEmployeesButton from '../components/utils/add_employees_button';
import CreateInspectionButton from '../components/utils/add_inspection_button';
import CreateOwnerButton from '../components/utils/add_owner_button';
import ApplicationRouter from '../components/utils/router';
import '../styles/app.css';

export function App() {
  return (
    <div className="app">
      <div className="add_btns">
        <ApplicationRouter></ApplicationRouter>
        <CreateCarButton></CreateCarButton>
        <CreateOwnerButton></CreateOwnerButton>
        <CreateEmployeesButton></CreateEmployeesButton>
        <CreateInspectionButton></CreateInspectionButton>
      </div>
    </div>
  );
}

export default App;
