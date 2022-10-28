import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PostService from '../../api/post.service';
import AppButton from '../button';
import AppInput from '../input';
import AppSelect from '../select';
import './pageStyles.css';

const InspectionPage = () => {
  const router = useNavigate();
  const params = useParams();
  const [inspection, setInspection] = useState({});
  const [carsInfo, setCarsInfo] = useState([]);
  const [employeesInfo, setEmployeesInfo] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [visibilitySaveButton, setVisibilitySaveButton] = useState('hidden');
  const [visibilityEditButton, setVisibilityEditButton] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await PostService.get(`http://localhost:3000/api/cars`).then((value) => {
        setCarsInfo(
          value.data.rows.map((car) => {
            return { value: car.id, name: car.plate_number };
          })
        );
      });

      await PostService.get(`http://localhost:3000/api/employees`).then(
        (value) => {
          setEmployeesInfo(
            value.data.rows.map((employee) => {
              return { value: employee.id, name: employee.full_name };
            })
          );
        }
      );

      await PostService.get(
        `http://localhost:3000/api/inspections/${params.id}`
      ).then((value) => {
        setInspection(...value.data.rows);
      });

      console.log(inspection);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated, params.id]);

  const removeInspection = async () => {
    await PostService.delete(
      `http://localhost:3000/api/inspections/${params.id}`
    );
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

    console.log(inspection);

    await PostService.put(
      `http://localhost:3000/api/inspections/${params.id}`,
      inspection
    );
    setIsUpdated(true);
  };

  return (
    <div>
      <div className="page-wrapper">
        <h1>Информация о инспекциях: </h1>
        <div>ID в базе данных: {inspection.id}</div>
        <div>
          <p style={{ textAlign: 'center' }}>Дата проведения:</p>
          <AppInput
            value={inspection.date}
            type="text"
            placeholder="Дата проведения"
            onChange={(e) =>
              setInspection({ ...inspection, date: e.target.value })
            }
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Результат прохождения:</p>
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
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Номер автомобиля:</p>
          <AppSelect
            value={inspection.car_id}
            onChange={(value) =>
              setInspection({ ...inspection, car_id: value })
            }
            defaultValue="Номер автомобиля"
            options={carsInfo}
          ></AppSelect>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>ФИО сотрудника:</p>
          <AppSelect
            value={inspection.employee_id}
            onChange={(value) =>
              setInspection({ ...inspection, employee_id: value })
            }
            defaultValue="ФИО сотрудника"
            options={employeesInfo}
          ></AppSelect>
        </div>
      </div>
      <div className="page-buttons">
        <AppButton onClick={removeInspection}>Удалить</AppButton>
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

export default InspectionPage;
