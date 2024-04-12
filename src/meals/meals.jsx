import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { MealCard } from './card';

let breakfast = [];
let lunch = [];
let dinner = [];

export function Meals() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    loadMeals(breakfast, lunch, dinner);
  }, []);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className='container-fluid bg-secondary text-center'>
        <h2>Breakfast</h2>
        <div className="card-container">{breakfast}</div>
      </Carousel.Item>
      <Carousel.Item className='container-fluid bg-secondary text-center'>
        <h2>Lunch</h2>
        <div className="card-container">{lunch}</div>
      </Carousel.Item>
      <Carousel.Item className='container-fluid bg-secondary text-center'>
        <h2>Dinner</h2>
        <div className="card-container">{dinner}</div>
      </Carousel.Item>
    </Carousel>
  );
}

async function loadMeals(breakfast, lunch, dinner) {

  let user = localStorage.getItem("this-user");

  let response = await fetch(`api/meals?user=${user}`);

  if(response.ok){
    let meals = await response.json();

    for (let i in meals) {
      let item = meals[i];
      if (item.type == "Breakfast") {
        breakfast.push(<MealCard name={item.name} description={item.description} key={i}></MealCard>)
      } else if (item.type == "Lunch") {
        lunch.push(<MealCard name={item.name} description={item.description} key={i}></MealCard>)
      } else if (item.type == "Dinner") {
        dinner.push(<MealCard name={item.name} description={item.description} key={i}></MealCard>)
      }
    } 
  }
}
