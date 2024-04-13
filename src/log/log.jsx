import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./calendar.css";
class Month {
  constructor(name, start_day, num_days, id) {
    this.name = name;
    this.start_day = start_day;
    this.num_days = num_days;
    this.id = id;
  }
}

/*
    sunday - 0
    monday - 1
    tuesday - 2
    wednesday - 3
    thursday - 4
    friday - 5
    saturday - 6
*/

const months = [
  new Month("January", 1, 31, 0),
  new Month("February", 4, 29, 1),
  new Month("March", 5, 31, 2),
  new Month("April", 1, 30, 3),
  new Month("May", 3, 31, 4),
  new Month("June", 6, 30, 5),
  new Month("July", 1, 31, 6),
  new Month("August", 4, 31, 7),
  new Month("September", 0, 30, 8),
  new Month("October", 2, 31, 9),
  new Month("November", 5, 30, 10),
  new Month("December", 0, 31, 11),
];

let username = localStorage.getItem("this-user");
let date = new Date();
let daily_goal = await loadGoal();

export function Log() {
  const [current_month, setCurMonth] = React.useState(months[date.getMonth()]);
  const [buttons, setButtons] = React.useState([]);

  const prevMonth = () => {
    let new_index = current_month.id - 1;
    if (new_index < 0) {
      new_index = 11;
    }
    setCurMonth(months[new_index]);
  }

  const nextMonth = () => {
    setCurMonth(months[(current_month.id + 1) % 12]);
  }

  useEffect( () => {
    setCalendar(current_month, setButtons);
  }, [current_month]);


  return (
    <main id="calendar">
      <div className="datepicker">
        <div className="datepicker-top">
          <div className="month-selector">
            <Button className="arrow" onClick={() => prevMonth()}>
              <i className="material-icons">{String.fromCharCode(8592)}</i>
            </Button>
            <span>{current_month.name}</span>
            <Button className="arrow" onClick={() => nextMonth()}>
              <i className="material-icons">{String.fromCharCode(8594)}</i>
            </Button>
          </div>
        </div>
        <div className="week">
          <span className="day">Su</span>
          <span className="day">Mo</span>
          <span className="day">Tu</span>
          <span className="day">We</span>
          <span className="day">Th</span>
          <span className="day">Fr</span>
          <span className="day">Sa</span>
        </div>
        <div className="datepicker-calendar">
          {
            buttons
          }
        </div>
      </div>
    </main>
  );
}

async function setCalendar(current_month, setButtons){
  const response = await fetch(
    `api/monthly/totals?user=${username}&month=${current_month.id}`
      );
  let log = await response.json();
  
  let lyst = [];
  for(let i =0; i < current_month.start_day; i++){
    lyst.push(<Button className='button' key={-i} variant='light'></Button>)
  }

  for(let i=1; i <= current_month.num_days; i++){

    let day = log[i];

    if(!day){
      lyst.push(<Button className='button' key={i} variant='light'>{i}</Button>);
    }
    else{
      let hit = true;

      if(daily_goal.ltCals){
        if(day.calories > daily_goal.calories){
          hit=false;
        }
      }
      else{
        if(day.calories < daily_goal.calories){
          hit=false;
        }
      }

      if(daily_goal.ltProtein){
        if(day.protein > daily_goal.protein){
          hit=false;
        }
      }
      else{
        if(day.protein < daily_goal.protein){
          hit=false;
        }
      }

      if(daily_goal.ltFat){
        if(day.fat > daily_goal.fat){
          hit=false;
        }
      }
      else{
        if(day.fat < daily_goal.fat){
          hit=false;
        }
      }

      if(daily_goal.ltCarbs){
        if(day.carbs > daily_goal.carbs){
          hit=false;
        }
      }
      else{
        if(day.carbs < daily_goal.carbs){
          hit=false;
        }
      }

      if(hit){
        lyst.push(<Button className='button' key={i} variant='success'>{i}</Button>);
      }
      else{
        lyst.push(<Button className='button' key={i} variant='danger'>{i}</Button>)
      }
    }
  }
  setButtons(lyst);
}

async function loadGoal() {
  const response = await fetch(`api/goal?user=${username}&type=daily`);

  if (response.status === 200) {
    return response.json();
  }
  
  return null;
}
