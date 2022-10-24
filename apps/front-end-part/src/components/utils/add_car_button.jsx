import React, { useState } from 'react';
import AppButton from '../button';
import CarsForm from '../crud/cars_create';
import AppModal from '../modal';

export function CreateCarButton() {
  const [modal, setModal] = useState(false);

  const createCar = (car) => {
    console.log(car);
    setModal(false);
  };

  return (
    <div>
      <AppButton onClick={() => setModal(true)}>Добавить автомобиль</AppButton>
      <AppModal visible={modal} setVisible={setModal}>
        <CarsForm create={createCar}></CarsForm>
      </AppModal>
    </div>
  );
}

export default CreateCarButton;
