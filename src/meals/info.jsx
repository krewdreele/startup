import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Info({show, handleClose, item, handleDelete}) {
    const [edit, setEdit] = React.useState(false);
    const [cancel, setCancel] = React.useState(false);
    const [cals, setCals] = React.useState(item.calories);
    const [protein, setProtein] = React.useState(item.protein);
    const [fat, setFat] = React.useState(item.fat);
    const [carbs, setCarbs] = React.useState(item.carbs);

    let username = localStorage.getItem("this-user");

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="info">
                    <p>Calories: {edit ? <input value={cals} onChange={(e) => setCals(e.target.value)}></input> : cals}</p>
                    <p>Protein: {edit ? <input value={protein} onChange={(e) => setProtein(e.target.value)}></input> : protein}</p>
                    <p>Fat: {edit ? <input value={fat} onChange={(e) => setFat(e.target.value)}></input> : fat}</p>
                    <p>Carbs: {edit ? <input value={carbs} onChange={(e) => setCarbs(e.target.value)}></input> : carbs}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {edit && handleDelete && <Button 
                onClick={() => {
                    deleteMeal(item.name, username); 
                    handleClose();
                    handleDelete(item.name);
                }}
                variant='danger'
                >
                    Delete
                </Button>}

                {!edit && <Button 
                onClick={() => setEdit(true)}
                variant='info'
                >
                    Edit
                </Button>}

                {edit && <Button 
                onClick={() => 
                {setEdit(false); setCancel(!cancel)}}
                variant='outline-secondary'
                >
                    Cancel
                </Button>}

                {edit && <Button onClick={() => {
                    setEdit(false);
                    
                    async function saveMeal() {

                    let new_meal = {
                    username: username,
                    type: item.type,
                    name: item.name,
                    description: item.description,
                    calories: cals,
                    protein: protein,
                    fat: fat,
                    carbs: carbs,
                };

                    const response = await fetch(`api/meal`, {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(new_meal),
                    });
                } saveMeal();
                }}>
                    Save Changes
                </Button>}
            </Modal.Footer>
        </Modal>
    )
}

async function deleteMeal(name, username) {
    
  const response = await fetch("api/meal", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: username, meal_name: name }),
  });
}