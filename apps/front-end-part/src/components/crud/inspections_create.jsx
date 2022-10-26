import React, { useState } from 'react';
import AppButton from '../button';
import AppInput from '../input';
import AppSelect from '../select';
import './creation.css';

const InspectionsForm = ({ create }) => {
  const [inspection, setInspection] = useState({
    car_plate_number: '',
    employee_full_name: '',
    inspection_result: '',
    date: '',
  });

  const addNewInspection = (e) => {
    e.preventDefault();
    const newInspection = {
      ...inspection,
      // id field?
    };

    create(newInspection);
    setInspection({
      car_plate_number: '',
      employee_full_name: '',
      date: '',
      inspection_result: 'Результат прохождения',
    });
  };

  return (
    <form className="create_form">
      <AppInput
        value={inspection.car_plate_number}
        type="text"
        onChange={(e) =>
          setInspection({ ...inspection, car_plate_number: e.target.value })
        }
        placeholder="Номер автомобиля"
      ></AppInput>
      <AppInput
        value={inspection.employee_full_name}
        type="text"
        onChange={(e) =>
          setInspection({ ...inspection, employee_full_name: e.target.value })
        }
        placeholder="ФИО сотрудника"
      ></AppInput>
      <AppInput
        value={inspection.date}
        type="text"
        onChange={(e) => setInspection({ ...inspection, date: e.target.value })}
        placeholder='Дата(M/D/Y)'
      ></AppInput>
      <AppSelect
        value={inspection.inspection_result}
        onChange={(value) =>
          setInspection({ ...inspection, inspection_result: value })
        }
        defaultValue="Результат прохождения"
        options={[
          { value: 'Успешно', name: 'Успешно' },
          { value: 'Отказ', name: 'Отказ' },
        ]}
      ></AppSelect>

      <AppButton onClick={addNewInspection}>Добавить</AppButton>
    </form>
  );
};

export default InspectionsForm;
