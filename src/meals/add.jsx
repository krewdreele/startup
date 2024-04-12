import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Add({show, handleClose, type, handleLoad}) {
    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [cals, setCals] = React.useState(0);
    const [protein, setProtein] = React.useState(0);
    const [fat, setFat] = React.useState(0);
    const [carbs, setCarbs] = React.useState(0);

    const [alert, setAlert] = React.useState("");
    const [search, setSearch] = React.useState("");

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Meal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="add-meal-container">
                    <div>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> 
                        Description:
                        <textarea
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                        Calories:
                        <input type="text" value={cals} onChange={(e) => setCals(e.target.value)}/> 
                        Protein:
                        <input
                        type="text"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        />
                        Fat:
                        <input type="text" value={fat} onChange={(e) => setFat(e.target.value)}/> 
                        Carbs:
                        <input
                        type="text"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Search for ingredient:</label>
                        <input
                        type="text"
                        placeholder="ex: 1oz rice"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                        variant='outline-info'
                        onClick={() => getThirdPartyMeal(setAlert, search, desc, setDesc, cals, setCals, protein, setProtein, fat, setFat, carbs, setCarbs)}
                        >
                        &#128269;
                        </Button>

                        {alert && 
                        <div
                        className="alert alert-danger"
                        >{alert}</div>}
                    </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary'
                        onClick={() => handleClose()}
                >
                Cancel
                </Button>
                <Button
                onClick={() => {
                  handleClose();
                  handleLoad();
                  saveMeal(name, desc, cals, protein, fat, carbs, type);}}  
                >
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

async function saveMeal(name, desc, cals, protein, fat, carbs, type){
    let request = {
      username: localStorage.getItem("this-user"),
      type: type,
      name: name,
      description: desc,
      calories: cals,
      protein: protein,
      fat: fat,
      carbs: carbs,
    };

    const response = await fetch(`api/meal`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });
}

async function getThirdPartyMeal(setAlert, search, desc, setDesc, cals, setCals, protein, setProtein, fat, setFat, carbs, setCarbs) {
  /*
  ID - 37ab6c8a
  key - 6bd1526b7c00fd3d34cdf6b579bc8a89	
  */

  setAlert("");

  const response = await fetch(
    `https://api.edamam.com/api/nutrition-data?app_id=37ab6c8a&app_key=6bd1526b7c00fd3d34cdf6b579bc8a89&ingr=${search}`
  );

  try {
    let food = await response.json();

    if (
      food &&
      food.ingredients &&
      food.calories &&
      food.totalNutrients["PROCNT"].quantity &&
      food.totalNutrients["FAT"].quantity &&
      food.totalNutrients["CHOCDF.net"].quantity
    ) {
      for (let i in food.ingredients) {
        setDesc(desc.concat(
          `${food.ingredients[i].text}\n`
        ));
      }

      setCals(cals + food.calories);

      setProtein(
        protein +
        Math.round(food.totalNutrients["PROCNT"].quantity));

      setFat(
        fat + Math.round(food.totalNutrients["FAT"].quantity));

      setCarbs(
        carbs + 
        Math.round(food.totalNutrients["CHOCDF.net"].quantity));
    } else {
      throw new Error("Couldn't find food");
    }
  } catch (error) {
    setAlert(error.message);
  }
}