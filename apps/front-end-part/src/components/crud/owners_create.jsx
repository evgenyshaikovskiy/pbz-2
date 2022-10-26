import React, { useState } from 'react';
import AppButton from '../button';
import AppInput from '../input';
import AppSelect from '../select';
import './creation.css';

const OwnerForm = ({ create }) => {
  const [owner, setOwner] = useState({
    full_name: '',
    driving_license_number: '',
    address: '',
    year_of_birth: '',
    sex: '',
    // auto number plate??
  });

  const addNewOwner = async (e) => {
    e.preventDefault();
    console.log(owner);
    const newOwner = {
      ...owner,
      // id field?
    };

    await create(newOwner);
    setOwner({
      full_name: '',
      driving_license_number: '',
      address: '',
      year_of_birth: '',
      sex: '',
    });
  };

  return (
    <form className="create_form">
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
      <AppSelect
        value={owner.sex}
        onChange={(value) => setOwner({ ...owner, sex: value })}
        defaultValue="Пол"
        options={[
          { value: 'М', name: 'Мужской' },
          { value: 'Ж', name: 'Женский' },
        ]}
      ></AppSelect>

      <AppButton onClick={addNewOwner}>Добавить</AppButton>
    </form>
  );
};

export default OwnerForm;
