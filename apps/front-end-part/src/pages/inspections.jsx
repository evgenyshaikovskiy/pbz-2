import React, { useEffect, useState } from 'react';
import PostService from '../api/post.service';
import InspectionItem from '../components/items/inspection';

function Inspections() {
  const [inspections, setInspections] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const result = PostService.get('http://localhost:3000/api/inspections');
    result.then((values) => {
      setInspections(values.data.rows);


    });
  }, [isUpdated]);

  const removeInspection = async (id) => {
    await PostService.delete(`http://localhost:3000/api/inspections/${id}`);
    setIsUpdated(!isUpdated);
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '10px' }}>Список инспекций</h1>
      {inspections.length === 0 ? (
        <div>puso</div>
      ) : (
        inspections.map((value) => {
          return (
            <InspectionItem
              id={value.id}
              inspection={value}
              remove={removeInspection}
            />
          );
        })
      )}
    </div>
  );
}

export default Inspections;
