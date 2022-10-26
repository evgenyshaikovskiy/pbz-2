// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import CreateCarButton from '../components/utils/add_car_button';
import CreateEmployeesButton from '../components/utils/add_employees_button';
import CreateInspectionButton from '../components/utils/add_inspection_button';
import CreateOwnerButton from '../components/utils/add_owner_button';
import ApplicationRouter from '../components/utils/router';
import '../styles/app.css';

export function App() {
  // TODO: home page, separate router, post requests more routing
  return (
    <div className="app">
      <ApplicationRouter></ApplicationRouter>
    </div>
  );
}

export default App;
