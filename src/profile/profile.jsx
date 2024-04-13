import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./profile.css";
import { Edit } from "./edit";
import { Add } from "./add";
import { Settings } from './settings';
import { MealCard } from '../meals/card';


export function Profile({ws}) {
  let user = localStorage.getItem("this-user");
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState("");
  const [settings, setSettings] = useState(false);
  const [add, setAdd] = useState(false);
  const [posts, setPosts] = useState([]);
  const [meals, setMeals] = useState([]);

  const handleCloseEdit = () => {
    setEdit(false);
  }

  const handleCloseAdd = () => {
    setAdd(false);
  }

  const handleCloseSettings = () => {
    setSettings(false);
  }

  const addPost = (post) => {
    setPosts([...posts, post]);
  }

  const deletePost = (name) => {
    setPosts(posts.filter((post) => post.title !== name));
  }

  useEffect(() => {
    async function loadProfile(){
      
      const response = await fetch(`api/profile?user=${user}`);
      let info = await response.json();
      setBio(info.biography);

      const response2 = await fetch(`api/posts?user=${user}`);
      let posts = await response2.json();
      setPosts(posts);
    }
    loadProfile();
  }, []);

  useEffect(() => {
    async function loadMeals(){

      const response = await fetch(`api/meals?user=${user}`);

      if(response.ok){
        let meals = await response.json();
        setMeals(meals);
      }
    } loadMeals();
  }, []);

  return (
    <main id="profile">
      <Add show={add} handleClose={handleCloseAdd} ws={ws} addPost={addPost}></Add>
      <Edit show={edit} handleClose={handleCloseEdit} bio={bio} setBio={setBio}></Edit>
      <Settings show={settings} handleClose={handleCloseSettings}></Settings>
      <div className="section-container" id="profile-header">
        <div className="container">
          <img src="Portrait.png" />
          <p>{user}</p>
          <Button
            variant="link"
          >
            Friends
          </Button>
          <Button
            variant='outline-primary'
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button
            variant='secondary'
            onClick={() => setSettings(true)}
          >
            Settings
          </Button>
        </div>
        <div>{bio}</div>
      </div>
      <div className="section-container" >
        <section id="profile-content">
          <h2>Posts</h2>
          <Button
            variant='info'
            onClick={() => setAdd(true)}
          >
            +
          </Button>
          <div id='posts'>            {
            posts.map(function(post) {
              let meal = meals.find((m) => m.name === post.meal);
              return (
              <div key={post.title} className="post">
                <div className='post-header'>{post.username} 
                  <Button onClick={() => {
                    deletePostDB(post.title, post.username);
                    deletePost(post.title);
                  }}
                  variant='danger'
                  >
                    X
                  </Button>
                </div>
                <div className='post-body'>
                  <p>{post.title}</p>
                  <p>{post.date}</p>
                  <p>{post.desc}</p>
                </div>
                {meal && <MealCard item={meal}></MealCard>}
              </div>
              );
            })
          }
          </div>
        </section>
      </div>
    </main>
  );
}

async function deletePostDB(title, username) {
  let request = {
    title: title,
    username: username,
  };

  const response = await fetch("api/post", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(request),
  });
}