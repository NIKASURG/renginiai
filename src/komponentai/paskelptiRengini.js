import React from 'react';
import { auth,db } from '../firebase';
import { collection, addDoc } from "firebase/firestore"; 
function PaskelptiRengini() {
    async function paskelptiRengini(e) {
        
        e.preventDefault();
        const form = e.target;
        const pavadinimas = form.elements.pavadinimas.value;
        await addDoc(collection(db, "renginiai"), {
            renginys: pavadinimas,
            uid: auth.currentUser.uid
          
          });
        console.log(pavadinimas);
        form.reset();
    }
  
    return (
        <div>
        <form onSubmit={paskelptiRengini}>  
        
            <input name='pavadinimas' placeholder='pavadinimas'></input>
            <button type='submit'>Paskelpti</button>
            </form>
        </div>
    );
}
export default PaskelptiRengini;