import React, { useEffect, useState } from 'react';
import PostService from '../api/post.service';
import EmployeeItem from '../components/items/employee';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const result = PostService.get('http://localhost:3000/api/employees');
    result.then((values) => {
      setEmployees(values.data.rows);
    });
  }, [isUpdated]);

  const removeEmployee = async (id) => {
    const result = await PostService.delete(
      `http://localhost:3000/api/employees/${id}`
    );
    setIsUpdated(!isUpdated);
  };

  return (
    <div className="employees_list">
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Список сотрудников</h1>
      {employees.map((value) => {
        return (
          <EmployeeItem
            employee={value}
            key={value.id}
            remove={removeEmployee}
          ></EmployeeItem>
        );
      })}
    </div>
  );
}

export default Employees;
