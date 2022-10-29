import { useState } from 'react';
import PostService from '../api/post.service';
import AppButton from '../components/button';
import AppInput from '../components/input';
import AppModal from '../components/modal';
import './style.css';

function SearchEmployeesByDate() {
  const [date, setDate] = useState('');

  const [modal, setModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    await PostService.post(`http://localhost:3000/api/search/employees`, {
      date: date,
    }).then((value) => {
      setEmployees(value.data.rows);
    });

    setModal(true);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Выборка по дате:</h1>
      <div className="inputs-for-dates">
        <p style={{ textAlign: 'center' }}>Дата:</p>
        <AppInput
          value={date}
          type="text"
          placeholder="Дата"
          onChange={(e) => setDate(e.target.value)}
          style={{ textAlign: 'center' }}
        ></AppInput>

        <AppButton onClick={() => fetchData()}>Найти</AppButton>
        <AppModal visible={modal} setVisible={setModal}>
          <h3>Информация о сотрудниках проводивших осмотр на дату: {date}</h3>
          <div className="modal-info-wrapper"></div>
          {employees.map((employees) => {
            return (
              <div className="info-item">
                <div>
                  <strong>ФИО: </strong>
                  {employees.full_name}
                </div>
                <div>
                  <strong>Номерный знак осматриваемого авто: </strong>{' '}
                  {employees.plate_number}
                </div>
                <div>
                  <strong>Звание: </strong>
                  {employees.position}
                </div>
              </div>
            );
          })}
        </AppModal>
      </div>
    </div>
  );
}

export default SearchEmployeesByDate;
