import './App.css';
import { BrowserRouter, Route, Switch, useRoutes } from 'react-router-dom';
import Register from './komponentai/register';
import Login from './komponentai/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaskelptiRengini from './komponentai/paskelptiRengini';
import { auth } from './firebase';
import { useState ,useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import VisiRenginiai from './komponentai/visiRenginiai';
import ManoIrasai from './komponentai/manoIrasai';
const dalys = [{
  path: "/register",
  element: <Register />,
},
{
  path: "/login",
  element: <Login />,
},
{
  path: "/paskelptiRengini",
  element: <PaskelptiRengini />,
},
{
  path: "/visiRenginiai",
  element: <VisiRenginiai />,
},
{
  path: "/manoIrasai",
  element: <ManoIrasai />,
}]
const AppRoutes = () => useRoutes(dalys);
function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="App">
    {user ? (
      <button onClick={() => auth.signOut()}>Atsijungti</button>
    ) : (
      <button style={{ backgroundColor: 'red' }} onClick={() => { window.location.href = "/login"; }}>NEPRISIJUNKTA</button>
    )}
   {
  dalys.map((dalys) => {
    return (
      <button key={dalys.path} onClick={() => { window.location.href = dalys.path; }}>
        {dalys.path}
      </button>
    );
  })
}

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

    </div>
  );
}

export default App;
