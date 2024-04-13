import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./profile.css";
import { Edit } from "./edit";

import { MealCard } from '../meals/card';

export function Profile() {
  let user = localStorage.getItem("this-user");
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState("");

  const handleClose = () => {
    setEdit(false);
  }

  useEffect(() => {
    async function loadProfile(){
      
      const response2 = await fetch(`api/profile?user=${user}`);
      let info = await response2.json();
      setBio(info.biography);
    }
    loadProfile();
  }, []);

  return (
    <main id="profile">
      <Edit show={edit} handleClose={handleClose} bio={bio} setBio={setBio}></Edit>
      <div className="section-container">
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
          >
            Settings
          </Button>
        </div>
        <div>{bio}</div>
      </div>
      <div className="section-container">
        <section>
          <h2>Posts</h2>
          <Button
            variant='info'
          >
            +
          </Button>
          <div>POSTS</div>
        </section>
      </div>
      <div
        className="alert alert-danger"
        role="alert"
      ></div>
    </main>
  );
}