import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Search } from './search';
import "./home.css";

export function Home() {

  const [addFood, setAddFood] = useState(false);
  const [totalCals, setTotalCals] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  const handleClose = () => {
    setAddFood(false);
  }

  const addCals = (cals) => {
    cals = Number(cals);
    setTotalCals(totalCals + cals);
  }

  const addProtein = (protein) => {
    protein = Number(protein);
    setTotalProtein(totalProtein + protein);
  }

  const addFat = (fat) => {
    fat = Number(fat);
    setTotalFat(totalFat + fat);
  }

  const addCarbs = (carbs) => {
    carbs = Number(carbs);
    setTotalCarbs(totalCarbs + carbs);
  }

  useEffect ( () => {
    async function getTotals(){
      let user = localStorage.getItem("this-user");
      let date = new Date();
      let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

      const response = await fetch(
      `api/totals?user=${user}&date=${date_str}`
      );

      let totals = await response.json();

      setTotalCals(totals.calories);
      setTotalProtein(totals.protein);
      setTotalFat(totals.fat);
      setTotalCarbs(totals.carbs);
    }
    getTotals();
  }, []);

  return (
    <main id='home'>
      <Search show={addFood} handleClose={handleClose} 
      setCals={addCals} 
      setProtein={addProtein}
      setFat={addFat}
      setCarbs={addCarbs}
      >
      </Search>
     <div className="section-container">
        <section>
          <h2>Feed</h2>
          <div></div>
        </section>
      </div>
      <div className="section-container">
        <section>
          <h2>Calories</h2>
          <b>{totalCals}</b>
          <div className='container'>
            <p>Protein:</p>
            <p>{totalProtein}</p>
            <p>g</p>
          </div>
          <div className='container'>
            <p>Fat:</p>
            <p>{totalFat}</p>
            <p>g</p>
          </div>
          <div className='container'>
            <p>Carbohydrates:</p>
            <p>{totalCarbs}</p>
            <p>g</p>
          </div>
          <Button
            variant='info'
            onClick={() => setAddFood(true)}
          >
            +
          </Button>
        </section>
      </div>
    </main>
  );
}