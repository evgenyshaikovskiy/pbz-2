import { useNavigate } from 'react-router-dom';
import AppButton from '../button';
import './items.css';

const OwnerItem = (props) => {
  const router = useNavigate();
  return (
    <div className="item_container">
      <div className="item_content">
        <strong className="item_header">
          {props.owner.id}. {props.owner.full_name}
        </strong>
        <p className="item_description">Пол: {props.owner.sex}</p>
        <div className="items_buttons">
          <AppButton onClick={() => router(`/owners/${props.owner.id}`)}>
            Открыть
          </AppButton>
          <AppButton onClick={() => props.remove(props.owner.id)}>
            Удалить
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default OwnerItem;
