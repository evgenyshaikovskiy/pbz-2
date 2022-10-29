import { useState } from 'react';
import AppInput from '../components/input';
import AppButton from '../components/button';
import AppModal from '../components/modal';
import PostService from '../api/post.service';
import CarItem from '../components/items/cars';
import './style.css';

function CountOfCarsByDate() {
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [modal, setModal] = useState(false);
  const [cars, setCars] = useState([]);

  const removeCar = async (id) => {
    await PostService.delete(`http://localhost:3000/api/cars/${id}`);
    setModal(false);
    loadCars();
  };

  const loadCars = async () => {
    await PostService.post(`http://localhost:3000/api/search/cars`, {
      begin_date: beginDate,
      end_date: endDate,
    }).then((value) => {
      setCars(value.data.rows);
    });

    // at last
    setModal(true);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Выборка по дате:</h1>
      <div className="inputs-for-dates">
        <p style={{ textAlign: 'center' }}>Начальная дата:</p>
        <AppInput
          value={beginDate}
          type="text"
          placeholder="Начальная дата"
          onChange={(e) => setBeginDate(e.target.value)}
          style={{ textAlign: 'center' }}
        ></AppInput>
        <p style={{ textAlign: 'center' }}>Конечная дата:</p>
        <AppInput
          value={endDate}
          type="text"
          style={{ textAlign: 'center' }}
          placeholder="Конечная дата"
          onChange={(e) => setEndDate(e.target.value)}
        ></AppInput>

        <AppButton onClick={() => loadCars()}>Найти</AppButton>
        <AppModal visible={modal} setVisible={setModal}>
          <h1>
            Кол-во автомобилей за заданный промежуток времени: {cars.length}
          </h1>
          <h4>Информация о автомобилях:</h4>
          {cars.map((value) => {
            return (
              <CarItem car={value} key={value.id} remove={removeCar}></CarItem>
            );
          })}
        </AppModal>
      </div>
    </div>
  );
}

export default CountOfCarsByDate;
