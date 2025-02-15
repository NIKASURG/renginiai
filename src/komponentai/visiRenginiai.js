import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function VisiRenginiai() {
    
  const [renginiai, setRenginiai] = useState([]);

  useEffect(() => {
    async function fetchRenginiai() {
      const renginiaiCollectionRef = collection(db, 'renginiai');
      const querySnapshot = await getDocs(renginiaiCollectionRef);
      const renginiaiList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRenginiai(renginiaiList);
    }

    fetchRenginiai();
  }, []);

  return (
    <div>
      <h1>Visi renginiai</h1>
      {renginiai.map((renginys) => (
        <div key={renginys.id}>
          <p>Pavadinimas: {renginys.renginys}</p>
          {/* <p>UID: {renginys.uid}</p> */}
          <hr />
        </div>
      ))}
     
    </div>
  );
}

export default VisiRenginiai;
