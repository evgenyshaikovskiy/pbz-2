import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppInput from '../input';
import AppSelect from '../select';
import AppButton from '../button';
import PostService from '../../api/post.service';
import AppModal from '../modal';
import InspectionItem from '../items/inspection';

const CarPage = () => {
  const router = useNavigate();
  const params = useParams();

  const [modal, setModal] = useState(false);
  const [car, setCar] = useState({});
  const [owners, setOwners] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const [visibilitySaveButton, setVisibilitySaveButton] = useState('hidden');
  const [visibilityEditButton, setVisibilityEditButton] = useState('');

  const [isUpdating, setIsUpdating] = useState(false);

  const [inspectionsInfo, setInspectionsInfo] = useState([]);

  useEffect(() => {
    // fetch all owners

    async function fetchData() {
      await PostService.get(`http://localhost:3000/api/owners`).then(
        (value) => {
          setOwners(
            value.data.rows.map((value) => {
              return { value: value.id, name: value.full_name };
            })
          );
        }
      );

      await PostService.get(`http://localhost:3000/api/cars/${params.id}`).then(
        (value) => {
          setCar(...value.data.rows);
        }
      );

      await PostService.get(
        `http://localhost:3000/api/cars/${params.id}/inspections`
      ).then((value) => {
        setInspectionsInfo(value.data.rows);
      });
    }

    fetchData();
  }, [isUpdated, params.id]);

  const removeCar = async () => {
    await PostService.delete(`http://localhost:3000/api/cars/${params.id}`);
    router(-1);
  };

  const removeInspection = async (id) => {
    await PostService.delete(`http://localhost:3000/api/inspections/${id}`);
    setIsUpdated(!isUpdated);
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

    console.log(car);

    await PostService.put(`http://localhost:3000/api/cars/${params.id}`, car);
    setIsUpdated(true);
  };

  return (
    <div>
      <div className="page-wrapper">
        <h1>???????????????????? ?? ????????????????????:</h1>
        <div>ID ?? ???????? ????????????: {car.id}</div>
        <div>
          <p style={{ textAlign: 'center' }}>?????????? ????????????????????:</p>
          <AppInput
            value={car.brand}
            type="text"
            placeholder="?????????? ????????????????????"
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>????????: </p>
          <AppInput
            value={car.color}
            type="text"
            placeholder="????????"
            onChange={(e) => setCar({ ...car, color: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>?????????? ??????????????????: </p>
          <AppInput
            value={car.engine_number}
            type="text"
            placeholder="?????????? ??????????????????"
            onChange={(e) => setCar({ ...car, engine_number: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>?????????? ????????????????????: </p>
          <AppInput
            value={car.plate_number}
            type="text"
            placeholder="?????????? ????????????????????"
            onChange={(e) => setCar({ ...car, plate_number: e.target.value })}
            disabled={!isUpdating}
            style={{ textAlign: 'center' }}
          ></AppInput>
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>?????? ??????????????????: </p>
          <AppSelect
            value={car.owner_id}
            onChange={(value) => setCar({ ...car, owner_id: value })}
            defaultValue="?????? ??????????????????"
            options={owners}
            style={{ textAlign: 'center' }}
          ></AppSelect>
        </div>
      </div>
      <div className="page-buttons">
        <AppButton onClick={removeCar}>??????????????</AppButton>
        <AppButton onClick={() => router(-1)}>??????????</AppButton>
        <AppButton
          style={{ visibility: visibilityEditButton }}
          onClick={updateBtnClick}
        >
          ??????????????????????????
        </AppButton>
        <AppButton
          style={{ visibility: visibilitySaveButton }}
          onClick={saveBtnClick}
        >
          ??????????????????
        </AppButton>
        <AppButton onClick={() => setModal(true)}>
          ?????????????????????? ?????????????? ??????????????????.
        </AppButton>
        <AppModal visible={modal} setVisible={setModal}>
          {inspectionsInfo.map((value) => {
            return (
              <InspectionItem
                id={value.id}
                inspection={value}
                remove={removeInspection}
              ></InspectionItem>
            );
          })}
        </AppModal>
      </div>
    </div>
  );
};

export default CarPage;
