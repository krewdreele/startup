import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export function Goals() {
  /*
    sw - start weight
    gw - goal weight
    sd - start date
    gd - goal date
  */

  const [cals, setCals] = React.useState(0);
  const [protein, setProtein] = React.useState(0);
  const [fat, setFat] = React.useState(0);
  const [carbs, setCarbs] = React.useState(0);
  
  return (
    <main>
      <div className="section-container">
        <MainGoal></MainGoal>
      </div>
      <div className="section-container">
        <section>
          <h2>Daily Goals</h2>
          <p>Calories: {cals}</p>
          <p>Protein: {protein}</p>
          <p>Fat: {fat}</p>
          <p>Carbs: {carbs}</p>
          <Button
            variant='info'
          >
            Edit
          </Button>
        </section>
      </div>
    </main>
  );
}

async function loadGoals(set_sw, set_gw, set_sd, set_gd, user){
  const response = await fetch(`api/goal?user=${user}&type=main`)
  
  if(response.ok){
    const main = await response.json();
    set_sw(main.start_weight);
    set_sd(main.start_date);
    set_gw(main.goal_weight);
    set_gd(main.goal_date);
  }
}

function MainGoal() {
  const [edit, setEdit] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);
  const [sw, setSW] = React.useState("0");
  const [gw, setGW] = React.useState("0");
  const [sd, setSD] = React.useState("none");
  const [gd, setGD] = React.useState("none");

  const user = localStorage.getItem("this-user") ?? "none";

  useEffect(() => {
      loadGoals(setSW, setGW, setSD, setGD, user);
    }, [cancel]);

  if(!edit){
  return (
    <section id="main-goal-section">
      <h2>Main Goal</h2>
        <p>Start weight: {sw}</p>
        <p>Start date: {sd}</p>
        <p>Goal weight: {gw}</p>
        <p>Goal date: {gd}</p>
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
    <section id="main-goal-section">
      <h2>Main Goal</h2>
        <p>Start weight: <input value={sw} onChange={(e) => setSW(e.target.value)}></input></p>
        <p>Start date: <input value={sd} onChange={(e) => setSD(e.target.value)}></input></p>
        <p>Goal weight: <input value={gw} onChange={(e) => setGW(e.target.value)}></input></p>
        <p>Goal date: <input value={gd} onChange={(e) => setGD(e.target.value)}></input></p>
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
          let main_goal = {
          start_date: sd,
          start_weight: sw,
          goal_weight: gw,
          goal_date: gd,
        };
          const response = await fetch(`api/goal?user=${user}&type=main`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(main_goal),
          });
        }}
      >
      Save
      </Button>
    </section>
)}
}

