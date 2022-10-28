import React, { useEffect, useState } from 'react';
import PostService from '../api/post.service';
import CarItem from '../components/items/cars';

function Cars() {
  const [cars, setCars] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const result = PostService.get('http://localhost:3000/api/cars');
    result.then((values) => {
      setCars(values.data.rows);
    });
  }, [isUpdated]);

  const removeCar = async (id) => {
    await PostService.delete(`http://localhost:3000/api/cars/${id}`);

    setIsUpdated(!isUpdated);
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>
        Список автомобилей
      </h1>
      {cars.map((value) => {
        return (
          <CarItem car={value} key={value.id} remove={removeCar}></CarItem>
        );
      })}
    </div>
  );
}

export default Cars;
