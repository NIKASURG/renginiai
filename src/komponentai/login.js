
import React from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
function Login(){
    function prisijungti(e){
        e.preventDefault();
        const form = e.target;
        const elPastas = form.elements.elPastas.value;
        const slaptazodis = form.elements.slaptazodis.value;
        signInWithEmailAndPassword(auth, elPastas, slaptazodis)
            .then(() => {
                alert('Prisijungta sėkmingai!');
                form.reset();
            })
            .catch((error) => {
                alert('Klaida: ' + error.message);
            });
    }
    return(
        <div>
            <h1>Prisijungimas</h1>
            <form onSubmit={prisijungti}>
                <input type="email" name="elPastas" placeholder="El. paštas" required />
                <input type="password" name="slaptazodis" placeholder="Slaptažodis" required />
                <button type="submit">Prisijungti</button>
            </form>
        </div>
    )
}
export default Login;