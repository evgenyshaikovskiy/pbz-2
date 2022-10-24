import React, { useState } from 'react';
import AppButton from '../button';
import AppInput from '../input';
import AppSelect from '../select';
import './owners.css';

const OwnerForm = ({ create }) => {
  const [owner, setOwner] = useState({
    full_name: '',
    driving_license_number: '',
    address: '',
    year_of_birth: '',
    sex: '',
    auto_number_plates: '',
    // auto number plate??
  });

  const addNewOwner = (e) => {
    e.preventDefault();
    const newOwner = {
      ...owner,
      // id field?
    };

    create(newOwner);
    setOwner({
      full_name: '',
      driving_license_number: '',
      address: '',
      year_of_birth: '',
      sex: 'Пол',
      auto_number_plates: '',
    });
  };

  return (
    <form className="create_owner">
      <AppInput
        value={owner.full_name}
        type="text"
        onChange={(e) => setOwner({ ...owner, full_name: e.target.value })}
        placeholder="ФИО Владельца"
      ></AppInput>
      <AppInput
        value={owner.driving_license_number}
        type="text"
        onChange={(e) =>
          setOwner({ ...owner, driving_license_number: e.target.value })
        }
        placeholder="Номер водительского удостоверения"
      ></AppInput>
      <AppInput
        value={owner.address}
        type="text"
        onChange={(e) => setOwner({ ...owner, address: e.target.value })}
        placeholder="Адрес"
      ></AppInput>
      <AppInput
        value={owner.year_of_birth}
        type="text"
        onChange={(e) => setOwner({ ...owner, year_of_birth: e.target.value })}
        placeholder="Год рождения"
      ></AppInput>
      <AppInput
        value={owner.auto_number_plates}
        type="text"
        onChange={(e) =>
          setOwner({ ...owner, auto_number_plates: e.target.value })
        }
        placeholder="Номер авто (через точку с запятой)"
      ></AppInput>
      <AppSelect
        value={owner.sex}
        onChange={(value) => setOwner({ ...owner, sex: value })}
        defaultValue="Пол"
        options={[
          { value: 'М', name: 'Мужской' },
          { value: 'Ж', name: 'Женский' },
        ]}
      ></AppSelect>

      <AppButton onClick={addNewOwner}>Создать</AppButton>
    </form>
  );
};

export default OwnerForm;
