import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { MealCard } from './card';
import { Add } from './add';
import "./meals.css";

export function Meals() {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

  const [mode, setMode] = React.useState("Breakfast");
  const [showAdd, setShowAdd] = React.useState(false);

  const [load, setLoad] = React.useState(true);

  const handleClose = () => {
    setShowAdd(false);
  };

  const handleLoad = () => {
    setLoad(!load);
  }

  useEffect(() => {
    let user = localStorage.getItem("this-user");
    async function loadMeals(){
      let response = await fetch(`api/meals?user=${user}`);

      if(response.ok){
        let meals = await response.json();

        setBreakfast(meals.filter((meal) => meal.type == "Breakfast"));
        setLunch(meals.filter((meal) => meal.type == "Lunch"));
        setDinner(meals.filter((meal) => meal.type == "Dinner"));
      }
    } loadMeals();
  }, [load]);

  return (
    <main id="meals">
      <Add show={showAdd} handleClose={handleClose} type={mode} handleLoad={handleLoad}></Add>
      <Tabs
        activeKey={mode}
        onSelect={(k) => setMode(k)}
        className="mb-3"
      >
      <Tab eventKey="Breakfast" title="Breakfast">
        <h2>Breakfast</h2>
        <div className="card-container">{
          breakfast.map(function(meal) {
            return <MealCard key={meal.name} item={meal} handleLoad={handleLoad}></MealCard>;
          })
          }
        </div>
        <Button onClick={() => {setShowAdd(true); setMode("Breakfast");}}> + </Button>
      </Tab>
      <Tab eventKey="Lunch" title="Lunch">
        <h2>Lunch</h2>
        <div className="card-container">{
          lunch.map(function(meal){
            return <MealCard key={meal.name} item={meal} handleLoad={handleLoad}></MealCard>;
          })
          }
        </div>
        <Button onClick={() => {setShowAdd(true); setMode("Lunch");}}> + </Button>
      </Tab>
      <Tab eventKey="Dinner" title="Dinner">
        <h2>Dinner</h2>
        <div className="card-container">{
          dinner.map(function(meal){
            return <MealCard key={meal.name} item={meal} handleLoad={handleLoad}></MealCard>;
          })
          }
        </div>
        <Button onClick={() => {setShowAdd(true); setMode("Dinner");}}> + </Button>
      </Tab>
    </Tabs>  
    </main>
  );
}


