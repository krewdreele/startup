import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { MealCard } from './card';
import { Add } from './add';
import "./meals.css";

export function Meals() {
  const [meals, setMeals] = useState([]);

  const [mode, setMode] = React.useState("Breakfast");
  const [showAdd, setShowAdd] = React.useState(false);

  const handleClose = () => {
    setShowAdd(false);
  };

  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  }

  const deleteMeal = (name) => {
    setMeals(meals.filter((meal) => meal.name !== name));
  }

  useEffect(() => {
    let user = localStorage.getItem("this-user");
    async function loadMeals(){
      let response = await fetch(`api/meals?user=${user}`);

      if(response.ok){
        let meals = await response.json();
        setMeals(meals);
      }
    } loadMeals();
  }, []);

  return (
    <main id="meals">
      <Add show={showAdd} handleClose={handleClose} type={mode} handleAdd={addMeal}></Add>
      <Tabs
        activeKey={mode}
        onSelect={(k) => setMode(k)}
        className="mb-3"
      >
      <Tab eventKey="Breakfast" title="Breakfast">
        <h2>Breakfast</h2>
        <div className="card-container">{
          meals.filter((meal) => meal.type === "Breakfast").map(function(meal) {
            return <MealCard key={meal.name} item={meal} handleDelete={deleteMeal}></MealCard>;
          })
          }
        </div>
        <Button onClick={() => {setShowAdd(true);}}> + </Button>
      </Tab>
      <Tab eventKey="Lunch" title="Lunch">
        <h2>Lunch</h2>
        <div className="card-container">{
          meals.filter((meal) => meal.type === "Lunch").map(function(meal){
            return <MealCard key={meal.name} item={meal} handleDelete={deleteMeal}></MealCard>;
          })
          }
        </div>
        <Button onClick={() => {setShowAdd(true);}}> + </Button>
      </Tab>
      <Tab eventKey="Dinner" title="Dinner">
        <h2>Dinner</h2>
        <div className="card-container">{
          meals.filter((meal) => meal.type === "Dinner").map(function(meal){
            return <MealCard key={meal.name} item={meal} handleDelete={deleteMeal}></MealCard>;
          })
          }
        </div>
        <Button onClick={() => {setShowAdd(true);}}> + </Button>
      </Tab>
    </Tabs>  
    </main>
  );
}


