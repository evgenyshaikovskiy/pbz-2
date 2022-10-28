import React, { useEffect, useState } from 'react';
import PostService from '../api/post.service';
import OwnerItem from '../components/items/owners';

function Owners() {
  const [owners, setOwners] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const result = PostService.get('http://localhost:3000/api/owners');
    result.then((values) => {
      setOwners(values.data.rows);
    });
  }, [isUpdated]);

  const removeOwner = async (id) => {
    await PostService.delete(`http://localhost:3000/api/owners/${id}`);

    setIsUpdated(!isUpdated);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>
        Список владельцов
      </h1>
      {owners.map((value) => {
        return <OwnerItem owner={value} key={value.id} remove={removeOwner} />;
      })}
    </div>
  );
}

export default Owners;
