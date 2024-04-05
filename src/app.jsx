import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div>
    <header>
      <h1>Tracker</h1>
      <nav>
        <a href="main.html">Home</a>
        <a href="goals.html">Goals</a>
        <a href="meals.html">Meals</a>
        <a href="calendar.html">Log</a>
      </nav>
      <div>
        <a href="profile.html" id="username">username</a>
        <img src="Portrait.png" />
      </div>
    </header>
    <main>
        App content will go here
    </main>
    <footer>
      <a href="https://github.com/krewdreele/startup">Drew Keele</a>
    </footer>
  </div>
   );
}