import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./profile.css";
import { Edit } from "./edit";
import { Add } from "./add";
import { Settings } from './settings';
import { Post } from './post';

export function Profile({ws}) {
  let user = localStorage.getItem("this-user");
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState("");
  const [settings, setSettings] = useState(false);
  const [add, setAdd] = useState(false);
  const [posts, setPosts] = useState([]);
  

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
    deletePostDB(name, user);
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
              return <Post key={post.title} post={post} deletePost={deletePost}></Post>
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