import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
  async function trinti(id) {
    await deleteDoc(doc(db, "renginiai", id));

  }
  const [vidus, pvidu] = useState('')
  const [vieta, nustatyVieta] = useState()

  function retaguoti(reng, index) {
    pvidu(vidus => reng)
    nustatyVieta(vieta => index)
  }
  async function pakeisti(e, id) {
    e.preventDefault();
    const form = e.target;
    const keitimo = form.elements.keitimo.value;
    console.log(vidus.id)
    await updateDoc(doc(db, 'renginiai', id), {
      renginys: keitimo
    })
    setRenginiai((prev) =>
      prev.map((renginys, i) =>
        i === vieta ? { ...renginys, renginys: keitimo } : renginys
      )
    );
    
    
    console.log(renginiai[vieta])
  }
  return (
    <div>
      <p>pakroviau</p>
      {renginiai.map((renginys, index) => (
        <div key={renginys.id}>

          <p>{renginys.renginys}</p>
          <button onClick={() => trinti(renginys.id)}>Trinti</button>
          {console.log(renginiai)}

          <button onClick={() => retaguoti(renginys, index)}>Redaguoti</button>
        </div>
      ))}
      <form onSubmit={(e) => pakeisti(e, vidus.id)}>
        <input name='keitimo' defaultValue={vidus.renginys} />
        <button type='submit'>Redaguoti</button>
      </form>

    </div>
  );
}

export default ManoIrasai;
