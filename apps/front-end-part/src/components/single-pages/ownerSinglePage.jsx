import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PostService from '../../api/post.service';
import AppButton from '../button';
import AppInput from '../input';
import AppSelect from '../select';
import './pageStyles.css';

const OwnerPage = () => {
  const router = useNavigate();
  const params = useParams();
  const [owner, setOwner] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [visibilitySaveButton, setVisibilitySaveButton] = useState('hidden');
  const [visibilityEditButton, setVisibilityEditButton] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    PostService.get(`http://localhost:3000/api/owners/${params.id}`).then(
      (value) => {
        setOwner(...value.data.rows);
      }
    );
  }, [isUpdated, params.id]);

  const updateBtnClick = () => {
    setIsUpdating(true);
    setVisibilityEditButton('hidden');
    setVisibilitySaveButton('');
  };

  const saveBtnClick = async (e) => {
    e.preventDefault();
    setVisibilityEditButton('');
    setVisibilitySaveButton('hidden');
    setIsUpdating(false);

    await PostService.put(
      `http://localhost:3000/api/owners/${params.id}`,
      owner
    );

    setIsUpdated(true);
  };

  const removeOwner = async () => {
    await PostService.delete(`http://localhost:3000/api/owners/${params.id}`);
    router(-1);
  };

  return (
    <div>
      <div className="page-wrapper">
        <h1>Информация о владельце:</h1>
        <div>ID в базе данных: {owner.id}</div>
        <div>
          <p style={{ textAlign: 'center' }}>ФИО владельца:</p>
          <AppInput
            value={owner.full_name}
            type="text"
            placeholder="ФИО владельца"
            onChange={(e) => setOwner({ ...owner, full_name: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div className='broken-div' style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <p style={{ textAlign: 'center' }}>
            Номер водительского удостоверения:
          </p>
          <AppInput
            style={{ textAlign: 'center' }}
            value={owner.driving_license_number}
            placeholder="Номер водительского удостоверения"
            onChange={(e) =>
              setOwner({ ...owner, driving_license_number: e.target.value })
            }
            disabled={!isUpdating}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Адрес:</p>
          <AppInput
            value={owner.address}
            placeholder="Адрес"
            onChange={(e) => setOwner({ ...owner, address: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Год рождения:</p>
          <AppInput
            value={owner.year_of_birth}
            placeholder="Год рождения"
            onChange={(e) =>
              setOwner({ ...owner, year_of_birth: e.target.value })
            }
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Пол:</p>
          <AppSelect
            value={owner.sex}
            onChange={(value) => setOwner({ ...owner, sex: value })}
            defaultValue="Пол"
            options={[
              { value: 'М', name: 'Мужской' },
              { value: 'Ж', name: 'Женский' },
            ]}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppSelect>
        </div>
      </div>
      <div className="page-buttons">
        <AppButton onClick={removeOwner}>Удалить</AppButton>
        <AppButton onClick={() => router(-1)}>Назад</AppButton>
        <AppButton
          style={{ visibility: visibilityEditButton }}
          onClick={updateBtnClick}
        >
          Редактировать
        </AppButton>
        <AppButton
          style={{ visibility: visibilitySaveButton }}
          onClick={saveBtnClick}
        >
          Сохранить
        </AppButton>
      </div>
    </div>
  );
};

export default OwnerPage;
