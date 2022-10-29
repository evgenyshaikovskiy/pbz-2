import { useNavigate } from 'react-router-dom';
import AppButton from '../button';

export function SearchEmployeesButton() {
  const router = useNavigate();

  return (
    <div>
      <AppButton onClick={() => router('/search-employees')}>Поиск сотрудников по дате.</AppButton>
    </div>
  );
}


export default SearchEmployeesButton;
