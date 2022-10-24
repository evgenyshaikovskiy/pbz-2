import React, { useState } from 'react';
import AppButton from '../button';
import OwnerForm from '../crud/owners_create';
import AppModal from '../modal';

export function CreateOwnerButton() {
  const [modal, setModal] = useState(false);

  const createOwner = (owner) => {
    console.log(owner);
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
