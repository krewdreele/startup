import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Search } from './search';
import "./home.css";
import { Post } from '../profile/post';

export function Home({ws}) {

  const [addFood, setAddFood] = useState(false);
  const [totalCals, setTotalCals] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [posts, setPosts] = useState([]);
  let user = localStorage.getItem("this-user");

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

  const addPost = (post) => {
    setPosts([...posts, post]);
  }

  useEffect ( () => {
    async function getTotals(){
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

    async function websocket(){
      if(ws){
      ws.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        addPost(msg);
      }
    }
    }
    async function loadPosts() {
      const response2 = await fetch(`api/posts?user=${user}`);
      let posts = await response2.json();
      setPosts(posts);
    }
    loadPosts();
    websocket();
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
          <div id='posts'>            {
            posts.map(function(post) {
              return <Post key={post.title} post={post}></Post>
            })
          }
          </div>
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