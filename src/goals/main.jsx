import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';

export function MainGoal() {
  const [edit, setEdit] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);
  const [sw, setSW] = React.useState("0");
  const [gw, setGW] = React.useState("0");
  const [sd, setSD] = React.useState("none");
  const [gd, setGD] = React.useState("none");

  const user = localStorage.getItem("this-user") ?? "none";

  useEffect(() => {
    async function loadMain(){
      const response = await fetch(`api/goal?user=${user}&type=main`)
  
      if(response.ok){
        const main = await response.json();
        setSW(main.start_weight);
        setSD(main.start_date);
        setGW(main.goal_weight);
        setGD(main.goal_date);
        }
      
    }
    loadMain();
    }, [cancel]);

  if(!edit){
  return (
    <section id="goal-section">
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
    <section id="goal-section">
      <h2>Main Goal</h2>
      <div id="row-section">
      <div>
        <p>Start weight:</p> 
        <p>Start date:</p>    
        <p>Goal weight:</p>   
        <p>Goal date:</p> 
      </div>    
      <div>
        <input value={sw} onChange={(e) => setSW(e.target.value)}></input>
        <input type='date' value={sd} onChange={(e) => setSD(e.target.value)}></input>
        <input value={gw} onChange={(e) => setGW(e.target.value)}></input>
        <input type='date' value={gd} onChange={(e) => setGD(e.target.value)}></input>
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
      </div>
    </section>
)}
}