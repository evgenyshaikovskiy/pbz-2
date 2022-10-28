import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Cars from '../../pages/cars';
import Owners from '../../pages/owners';
import Inspections from '../../pages/inspections';
import Employees from '../../pages/employees';
import '../../styles/app.css';
import Home from '../../pages/home';
import EmployeePage from '../single-pages/employeeSinglePage';
import OwnerPage from '../single-pages/ownerSinglePage';
import CarPage from '../single-pages/carSinglePage';
import InspectionPage from '../single-pages/inspectionSinglePage';
import CountOfCarsByDate from '../../pages/searchCarsByDate';

function ApplicationRouter() {
  return (
    <div className="navbar">
      <BrowserRouter>
        <ul className="navbar_list">
          <li className="list_item">
            <Link to="/">Home</Link>
          </li>
          <li className="list_item">
            <Link to="/owners">Владельцы</Link>
          </li>
          <li className="list_item">
            <Link to="/employees">Сотрудники ГИБДД</Link>
          </li>
          <li className="list_item">
            <Link to="/cars">Автомобили</Link>
          </li>
          <li className="list_item">
            <Link to="/inspections">Проведенные инспекции</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/owners" element={<Owners />}></Route>
          <Route path="/employees" element={<Employees />}></Route>
          <Route path="/cars" element={<Cars />}></Route>
          <Route path="/inspections" element={<Inspections />}></Route>
          <Route path="/employees/:id" element={<EmployeePage />}></Route>
          <Route path="/owners/:id" element={<OwnerPage />}></Route>
          <Route path="/cars/:id" element={<CarPage />}></Route>
          <Route path="/inspections/:id" element={<InspectionPage />}></Route>
          <Route
            path="/search-inspections"
            element={<CountOfCarsByDate />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default ApplicationRouter;
