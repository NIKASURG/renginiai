import React from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
    function sukurtiPaskyra(e) {
        e.preventDefault();
        const form = e.target;
        const elPastas = form.elements.elPastas.value;
        const slaptazodis = form.elements.slaptazodis.value;
        const slaptazodis2 = form.elements.slaptazodis2.value;

        if (slaptazodis !== slaptazodis2) {
            alert('Slaptažodžiai nesutampa');
            return;
        }

        createUserWithEmailAndPassword(auth, elPastas, slaptazodis)
            .then(() => {
                alert('Paskyra sėkmingai sukurta!');
                form.reset(); // Išvalyti formą po sėkmingos registracijos
            })
            .catch((error) => {
                alert('Klaida: ' + error.message);
            });
    }

    return (
        <form onSubmit={sukurtiPaskyra}>
            <input type="email" name="elPastas" placeholder="El. paštas" required />
            <input type="password" name="slaptazodis" placeholder="Slaptažodis" required />
            <input type="password" name="slaptazodis2" placeholder="Pakartokite slaptažodį" required />
            <button type="submit">Registruotis</button>
        </form>
    );
}

export default Register;
