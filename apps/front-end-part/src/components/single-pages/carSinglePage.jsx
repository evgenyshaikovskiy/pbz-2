import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppInput from '../input';
import AppSelect from '../select';
import AppButton from '../button';
import PostService from '../../api/post.service';

const CarPage = () => {
  const router = useNavigate();
  const params = useParams();
  const [car, setCar] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [owners, setOwners] = useState([]);
  const [visibilitySaveButton, setVisibilitySaveButton] = useState('hidden');
  const [visibilityEditButton, setVisibilityEditButton] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // fetch all owners

    async function fetchData() {
      await PostService.get(`http://localhost:3000/api/owners`).then(
        (value) => {
          setOwners(
            value.data.rows.map((value) => {
              return { value: value.id, name: value.full_name };
            })
          );
        }
      );

      await PostService.get(`http://localhost:3000/api/cars/${params.id}`).then(
        (value) => {
          setCar(...value.data.rows);
        }
      );
    }

    fetchData();
  }, [isUpdated, params.id]);

  const removeCar = async () => {
    await PostService.delete(`http://localhost:3000/api/cars/${params.id}`);
    router(-1);
  };

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

    console.log(car);

    await PostService.put(`http://localhost:3000/api/cars/${params.id}`, car);
    setIsUpdated(true);
  };

  return (
    <div>
      <div className="page-wrapper">
        <h1>Информация о автомобиле:</h1>
        <div>ID в базе данных: {car.id}</div>
        <div>
          <p style={{ textAlign: 'center' }}>Марка автомобиля:</p>
          <AppInput
            value={car.brand}
            type="text"
            placeholder="Марка автомобиля"
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Цвет: </p>
          <AppInput
            value={car.color}
            type="text"
            placeholder="Цвет"
            onChange={(e) => setCar({ ...car, color: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Номер двигателя: </p>
          <AppInput
            value={car.engine_number}
            type="text"
            placeholder="Номер двигателя"
            onChange={(e) => setCar({ ...car, engine_number: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Номер автомобиля: </p>
          <AppInput
            value={car.plate_number}
            type="text"
            placeholder="Номер автомобиля"
            onChange={(e) => setCar({ ...car, plate_number: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>ФИО владельца: </p>
          <AppSelect
            value={car.owner_id}
            onChange={(value) => setCar({ ...car, owner_id: value })}
            defaultValue="ФИО владельца"
            options={owners}
            style={{ textAlign: 'center' }}
          ></AppSelect>
        </div>
      </div>
      <div className="page-buttons">
        <AppButton onClick={removeCar}>Удалить</AppButton>
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

export default CarPage;
