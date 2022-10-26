import { useNavigate } from 'react-router-dom';
import AppButton from '../button';
import './items.css';

const CarItem = (props) => {
  const router = useNavigate();
  return (
    <div className="item_container">
      <div className="item_content">
        <strong className="item_header">
          {props.car.id}. {props.car.brand}
        </strong>
        <p className="item_description">Цвет: {props.car.color}</p>
        <div className="items_buttons">
          <AppButton onClick={() => router(`/cars/${props.car.id}`)}>
            Открыть
          </AppButton>
          <AppButton onClick={() => props.remove(props.car.id)}>
            Удалить
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
