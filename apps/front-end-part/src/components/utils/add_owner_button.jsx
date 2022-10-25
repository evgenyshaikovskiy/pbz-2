import React, { useState } from 'react';
import PostService from '../../api/post.service';
import AppButton from '../button';
import OwnerForm from '../crud/owners_create';
import AppModal from '../modal';

export function CreateOwnerButton() {
  const [modal, setModal] = useState(false);

  const createOwner = async (owner) => {
    owner.auto_number_plates = owner.auto_number_plates.split(';');
    const response = await PostService.post('http://localhost:3000/api/owners');

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
