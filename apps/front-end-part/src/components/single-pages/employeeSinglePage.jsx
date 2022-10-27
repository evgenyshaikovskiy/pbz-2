import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PostService from '../../api/post.service';
import AppButton from '../button';
import AppInput from '../input';
import './pageStyles.css';

const EmployeePage = () => {
  const router = useNavigate();
  const params = useParams();
  const [employee, setEmployee] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [visibilitySaveButton, setVisibilitySaveButton] = useState('hidden');
  const [visibilityEditButton, setVisibilityEditButton] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    PostService.get(`http://localhost:3000/api/employees/${params.id}`).then(
      (value) => {
        setEmployee(...value.data.rows);
      }
    );
  }, [isUpdated, params.id]);

  const removeEmployee = async () => {
    await PostService.delete(
      `http://localhost:3000/api/employees/${params.id}`
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

    await PostService.put(
      `http://localhost:3000/api/employees/${params.id}`,
      employee
    );
    setIsUpdated(true);
  };

  return (
    <div>
      <div className="page-wrapper">
        <h1>Информация о сотруднике:</h1>
        <div>ID в базе данных: {employee.id}</div>
        <div>
          <p style={{ textAlign: 'center' }}>ФИО сотрудника:</p>
          <AppInput
            value={employee.full_name}
            type="text"
            placeholder="ФИО сотрудника"
            onChange={(e) =>
              setEmployee({ ...employee, full_name: e.target.value })
            }
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Должность</p>
          <AppInput
            value={employee.position}
            placeholder="Должность"
            onChange={(e) => {
              setEmployee({ ...employee, position: e.target.value });
            }}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
      </div>
      <div className="page-buttons">
        <AppButton onClick={removeEmployee}>Удалить</AppButton>
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

export default EmployeePage;
