import { useNavigate } from 'react-router-dom';
import AppButton from '../button';

export function SearchCarsButton() {
  const router = useNavigate();
  return (
    <div>
      <AppButton onClick={() => router(`/search-cars`)}>
        Поиск автомобилей прошедших техосмотр по датам
      </AppButton>
    </div>
  );
}

export default SearchCarsButton;
