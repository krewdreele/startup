import React from 'react';
import Button from 'react-bootstrap/Button';
import "./home.css";

export function Home() {
  return (
    <main id='home'>
     <div className="section-container">
        <section>
          <h2>Feed</h2>
          <div></div>
        </section>
      </div>
      <div className="section-container">
        <section>
          <h2>Calories</h2>
          <b></b>
          <div className='container'>
            <p>Protein:</p>
            <p></p>
            <p>g</p>
          </div>
          <div className='container'>
            <p>Fat:</p>
            <p></p>
            <p>g</p>
          </div>
          <div className='container'>
            <p>Carbohydrates:</p>
            <p></p>
            <p>g</p>
          </div>
          <Button
            variant='info'
          >
            +
          </Button>
        </section>
      </div>
    </main>
  );
}