import React, { useState } from 'react';
import AppButton from '../button';
import InspectionsForm from '../crud/inspections_create';
import AppModal from '../modal';

export function CreateInspectionButton() {
  const [modal, setModal] = useState(false);

  const createInspection = (inspection) => {
    console.log(inspection);
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
