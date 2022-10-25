import React, { useState } from 'react';
import PostService from '../../api/post.service';
import AppButton from '../button';
import InspectionsForm from '../crud/inspections_create';
import AppModal from '../modal';

export function CreateInspectionButton() {
  const [modal, setModal] = useState(false);

  const createInspection = async (inspection) => {
    const response = await PostService.post(
      'https://localhost:3000/api/inspections',
      inspection
    );

    console.log(response);
    setModal(false);
  };

  return (
    <div>
      <AppButton onClick={() => setModal(true)}>Добавить инспекцию</AppButton>
      <AppModal visible={modal} setVisible={setModal}>
        <InspectionsForm create={createInspection}></InspectionsForm>
      </AppModal>
    </div>
  );
}

export default CreateInspectionButton;
