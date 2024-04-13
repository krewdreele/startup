import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { MealCard } from '../meals/card';

export function Post({...props}){
    const [meals, setMeals] = useState([]);
    let post = props.post;
    let meal = meals.find((m) => m.name === post.meal);
    
    useEffect(() => {
    async function loadMeals(){

      const response = await fetch(`api/meals?user=${post.username}`);

      if(response.ok){
        let meals = await response.json();
        setMeals(meals);
      }
    } loadMeals();
  }, []);

  return (
    <div className="post">
    <div className='post-header'>{post.username} 
     {props.deletePost && <Button onClick={() => {
        props.deletePost(post.title);
        }}
        variant='danger'
        >
        X
        </Button>}
    </div>
    <div className='post-body'>
        <p>{post.title}</p>
        <p>{post.date}</p>
        <p>{post.desc}</p>
    </div>
    {meal && <MealCard item={meal}></MealCard>}
    </div>
    );
}