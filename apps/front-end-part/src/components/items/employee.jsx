import { useNavigate } from 'react-router-dom';
import AppButton from '../button';
import './items.css';

const EmployeeItem = (props) => {
  const router = useNavigate();
  return (
    <div className="item_container">
      <div className="item_content">
        <strong className="item_header">
          {props.employee.id}. {props.employee.full_name}
        </strong>
        <p className="item_description">Должность: {props.employee.position}</p>
        <div className="items_buttons">
          <AppButton onClick={() => router(`/employees/${props.employee.id}`)}>
            Открыть
          </AppButton>
          <AppButton onClick={() => props.remove(props.employee.id)}>
            Удалить
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
