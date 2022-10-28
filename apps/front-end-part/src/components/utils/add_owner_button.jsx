import { useState } from 'react';
import PostService from '../../api/post.service';
import AppButton from '../button';
import OwnerForm from '../crud/owners_create';
import AppModal from '../modal';

export function CreateOwnerButton() {
  const [modal, setModal] = useState(false);

  const createOwner = async (owner) => {
    console.log(owner);
    const response = await PostService.post(
      'http://localhost:3000/api/owners',
      owner
    );

    console.log(response);
    setModal(false);
  };

  return (
    <div>
      <AppButton onClick={() => setModal(true)}>Добавить владельца</AppButton>
      <AppModal visible={modal} setVisible={setModal}>
        <OwnerForm create={createOwner}></OwnerForm>
      </AppModal>
    </div>
  );
}

export default CreateOwnerButton;
