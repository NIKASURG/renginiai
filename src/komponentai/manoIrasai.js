import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function ManoIrasai() {
  const [renginiai, setRenginiai] = useState([]);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userUid) return;

    async function fetchRenginiai() {
      const renginiaiCollectionRef = collection(db, 'renginiai');
      const querySnapshot = await getDocs(renginiaiCollectionRef);

      const renginiaiList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((renginys) => renginys.uid === userUid);

      setRenginiai(renginiaiList);
    }

    fetchRenginiai();
  }, [userUid]);

  return (
    <div>
      <p>pakroviau</p>
      {renginiai.map((renginys) => (
        <div key={renginys.id}>
          <p>{renginys.renginys}</p>
          <p>{renginys.uid}</p>
        </div>
      ))}
    </div>
  );
}

export default ManoIrasai;
