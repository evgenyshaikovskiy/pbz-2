// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { useState } from 'react';
import AppButton from '../components/button';
import OwnerForm from '../components/crud/owners_create';
import AppInput from '../components/input';
import AppModal from '../components/modal';
import '../styles/app.css';


export function App() {
  const [modal, setModal] = useState(false);

  const createOwner = (eas: any) => {
    console.log(eas);
    setModal(false);
  }

  return <div className="app">
    <AppButton onClick={() => setModal(true)}>Click me</AppButton>
    <AppModal visible={modal} setVisible={setModal}>
      <OwnerForm create={createOwner}></OwnerForm>
    </AppModal>
    <AppInput></AppInput>
  </div>;
}

export default App;
