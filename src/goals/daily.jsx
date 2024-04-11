import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';

export function DailyGoal() {
  const [edit, setEdit] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);

  const [cals, setCals] = React.useState(0);
  const [protein, setProtein] = React.useState(0);
  const [fat, setFat] = React.useState(0);
  const [carbs, setCarbs] = React.useState(0);

  const [ltCals, setLtCals] = React.useState(true);
  const [ltProtein, setLtProtein] = React.useState(true);
  const [ltFat, setLtFat] = React.useState(true);
  const [ltCarbs, setLtCarbs] = React.useState(true);

  const user = localStorage.getItem("this-user") ?? "none";

  useEffect(() => {
    async function loadDaily() {
      const response = await fetch(`api/goal?user=${user}&type=daily`);
      if(response.ok){
        const daily = await response.json();
        setCals(daily.calories);
        setProtein(daily.protein);
        setFat(daily.fat);
        setCarbs(daily.carbs);
        setLtCals(daily.ltCals);
        setLtProtein(daily.ltProtein);
        setLtFat(daily.ltFat);
        setLtCarbs(daily.ltCarbs);
      }
    }
    loadDaily();
    }, [cancel]);

  if(!edit){
  return (
    <section id="goal-section">
      <h2>Daily Goals</h2>
        <p>Calories: {ltCals ? '<' : '>'} {cals}</p>
        <p>Protein: {ltProtein ? '<' : '>'} {protein}</p>
        <p>Fat: {ltFat ? '<' : '>'} {fat}</p>
        <p>Carbs: {ltCarbs ? '<' : '>'} {carbs}</p>
      <Button
        variant='info'
        onClick={() => setEdit(true)}
      >
      Edit
      </Button>
    </section>
  )
}
else{
  return (
    <section id="goal-section">
      <h2>Daily Goals</h2>
      <div id="row-section">
        <div>
          <p>Calories: </p>
          <p>Protein: </p>
          <p>Fat: </p>
          <p>Carbs: </p>
        </div>
        <div>
          <Button onClick={() => setLtCals(!ltCals)}>{ltCals ? '<' : '>'}</Button>
          <Button onClick={() => setLtProtein(!ltProtein)}>{ltProtein ? '<' : '>'}</Button>
          <Button onClick={() => setLtFat(!ltFat)}>{ltFat ? '<' : '>'}</Button>
          <Button onClick={() => setLtCarbs(!ltCarbs)}>{ltCarbs ? '<' : '>'}</Button>
        </div>
        <div>
          <input value={cals} onChange={(e) => setCals(e.target.value)}></input>
          <input value={protein} onChange={(e) => setProtein(e.target.value)}></input>
          <input value={fat} onChange={(e) => setFat(e.target.value)}></input>
          <input value={carbs} onChange={(e) => setCarbs(e.target.value)}></input>
        </div>
      </div>
      <div>
      <Button 
      variant='secondary-outline'
      onClick={() => {
        setEdit(false);
        setCancel(!cancel);
      }}
      >
      Cancel
      </Button>
      <Button
        variant='primary'
        onClick={async () => {
          setEdit(false); 

          let daily = {
          calories: cals,
          protein: protein,
          fat: fat,
          carbs: carbs,
          ltCals: ltCals,
          ltProtein: ltProtein,
          ltFat: ltFat,
          ltCarbs: ltCarbs
        };
          const response = await fetch(`api/goal?user=${user}&type=daily`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(daily),
          });
        }}
      >
      Save
      </Button>
      </div>
    </section>
)}
}

