import React, { useState } from 'react';
import AppButton from '../button';
import AppInput from '../input';
import './creation.css'

const CarsForm = ({ create }) => {
  const [car, setCar] = useState({
    plate_number: '',
    engine_number: '',
    color: '',
    brand: '',
    owner_full_name: '',
  });

  const addNewCar = (e) => {
    e.preventDefault();
    const newCar = {
      ...car,
      // id field?
    };

    create(newCar);
    setCar({
      plate_number: '',
      engine_number: '',
      color: '',
      brand: '',
      owner_full_name: '',
    });
  };

  return (
    <form className="create_form">
      <AppInput
        value={car.plate_number}
        type="text"
        onChange={(e) => setCar({ ...car, plate_number: e.target.value })}
        placeholder="Номер автомобиля"
      ></AppInput>
      <AppInput
        value={car.engine_number}
        type="text"
        onChange={(e) => setCar({ ...car, engine_number: e.target.value })}
        placeholder="Серийный номер двигателя"
      ></AppInput>
      <AppInput
        value={car.color}
        type="text"
        onChange={(e) => setCar({ ...car, color: e.target.value })}
        placeholder="Цвет автомобиля"
      ></AppInput>
      <AppInput
        value={car.brand}
        type="text"
        onChange={(e) => setCar({ ...car, brand: e.target.value })}
        placeholder="Марка автомобиля"
      ></AppInput>
      <AppInput
        value={car.owner_full_name}
        type="text"
        onChange={(e) => setCar({ ...car, owner_full_name: e.target.value })}
        placeholder="ФИО владельца"
      ></AppInput>

      <AppButton onClick={addNewCar}>Добавить</AppButton>
    </form>
  );
};

export default CarsForm;
