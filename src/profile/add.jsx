
import React, { useEffect, useState }from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Add({...props}) {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    let user = localStorage.getItem("this-user");

    useEffect(() => {
    async function loadMeals(){
      let response = await fetch(`api/meals?user=${user}`);

      if(response.ok){
        let meals = await response.json();
        setMeals(meals);
      }
    } loadMeals();
  }, []);

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="create-post-container">
                    <p>Title</p>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <p>Description:</p>
                    <textarea type="text" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    <p>Add a meal:</p>
                    <input
                    type="text"
                    placeholder="start typing..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <div
                    id="meal-search-container"
                    >
                    {   
                        meals
                        .filter(function(meal) {
                            return meal.name.toLowerCase().startsWith(search.toLowerCase());
                        })
                        .map(function(meal) { 
                            return <Button key={meal.name} 
                            variant="outline-info"
                            onClick={() => {
                              setSelected(meal);
                              setSearch(meal.name);
                            }}
                            >
                            {meal.name}
                            </Button>;
                        })
                    }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary'
                        onClick={() => props.handleClose()}
                >
                Cancel
                </Button>
                <Button
                onClick={() => {
                    props.handleClose();

                    let date = new Date();
                    let date_str = `${
                    date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`;

                    let post = {
                    username: user,
                    desc: desc,
                    meal: selected.name ?? "none",
                    date: date_str,
                    title: title,
                    };
                    
                    props.addPost(post);
                    savePost(post);
                    if(props.ws){
                    props.ws.send(JSON.stringify(post));
                    }
                  }}  
                >
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

async function savePost(post) {
  const response = await fetch(`api/post`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  });
}

