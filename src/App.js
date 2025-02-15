import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch,useRoutes } from 'react-router-dom';
import Register from './komponentai/register';
import Login from './komponentai/login';
import 'bootstrap/dist/css/bootstrap.min.css';
const dalys =[{
  path: "/register",
    element: <Register />,
},
{
  path: "/login",
    element: <Login />,
}]
const AppRoutes = () => useRoutes(dalys);

function App() {

  return (
    <div className="App">
        <BrowserRouter> 
        <AppRoutes />      
         </BrowserRouter>

      </div>
  );
}

export default App;
