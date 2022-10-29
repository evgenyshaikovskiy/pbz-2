import { useNavigate } from 'react-router-dom';
import AppButton from '../button';
import './items.css';

const InspectionItem = (props) => {
  const router = useNavigate();
  return (
    <div className="item_container">
      <div className="item_content">
        <strong className="item_header">
          {props.inspection.id}. Дата: {props.inspection.inspection_date.slice(0, 10)}, Результат:{props.inspection.inspection_result}
        </strong>
        <p className="item_description">
          Номер авто: {props.inspection.plate_number}
        </p>
        <p className="item_description">
          ФИО сотрудника: {props.inspection.employee_full_name}
        </p>
        <div className="items_buttons">
          <AppButton
            onClick={() => router(`/inspections/${props.inspection.id}`)}
          >
            Открыть
          </AppButton>
          <AppButton onClick={() => props.remove(props.inspection.id)}>
            Удалить
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default InspectionItem;
