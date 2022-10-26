import React from 'react';
import CreateCarButton from '../components/utils/add_car_button';
import CreateOwnerButton from '../components/utils/add_owner_button';
import CreateEmployeesButton from '../components/utils/add_employees_button';
import CreateInspectionButton from '../components/utils/add_inspection_button';
import '../styles/app.css';

function Home() {
  return (
    <div className='home_page'>
      <div className="add_btns">
        <CreateCarButton></CreateCarButton>
        <CreateOwnerButton></CreateOwnerButton>
        <CreateEmployeesButton></CreateEmployeesButton>
        <CreateInspectionButton></CreateInspectionButton>
      </div>
    </div>
  );
}

export default Home;
