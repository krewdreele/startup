import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export function Search({...props}){

    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState({});

     useEffect(() => {
    
    async function loadMeals(){
        let user = localStorage.getItem("this-user");
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
                <Modal.Title>Search Your Meals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    onClick={() => setSelected(meal)}
                    >{meal.name}
                    </Button>;
                })
            }
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
                
                  async function saveTotals(){
                  let add = {
                    calories: selected.calories,
                    protein: selected.protein,
                    fat: selected.fat,
                    carbs: selected.carbs,
                    };

                    props.setCals(selected.calories);
                    props.setProtein(selected.protein);
                    props.setFat(selected.fat);
                    props.setCarbs(selected.carbs);

                    let date = new Date();
                    let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
                    let user = localStorage.getItem("this-user");
                    
                    const response = await fetch(
                    `api/totals?user=${user}&date=${date_str}`,
                    {
                        method: "PUT",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(add),
                    }
                
                    );
                  } if(selected) saveTotals(); 
                }  
                } 
                >
                Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}