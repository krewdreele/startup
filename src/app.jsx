import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login } from './login/login';
import {Home} from './home/home';
import {Goals} from './goals/goals';
import {Meals} from './meals/meals';
import {Log} from './log/log';
import {Profile} from './profile/profile';

export default function App() {
  const [ws, setWS] = React.useState();
  let user = localStorage.getItem("this-user");
  return (
    <div id='page'>
    <BrowserRouter>
    <header>
      <NavLink to='' className='title'>Tracker</NavLink>
      <nav>
        <NavLink to="home">Home</NavLink>
        <NavLink to="goals">Goals</NavLink>
        <NavLink to="meals">Meals</NavLink>
        <NavLink to="log">Log</NavLink>
      </nav>
      <div>
        <NavLink id="username" to='profile'>{user}</NavLink>
        <img src="Portrait.png" />
      </div>
    </header>
        <Routes>
            <Route path='/' element={<Login setWS={setWS} />} exact />
            <Route path='/home' element={<Home ws={ws}/>} />
            <Route path='/goals' element={<Goals />} />
            <Route path='/meals' element={<Meals />} />
            <Route path='/log' element={<Log />} />
            <Route path='/profile' element={<Profile ws={ws}/>} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    <footer>
      <a href="https://github.com/krewdreele/startup">Drew Keele</a>
    </footer>
  </BrowserRouter>
  </div>
   );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
