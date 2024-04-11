import React from 'react';
import { MainGoal } from './main';
import { DailyGoal } from './daily';
import "./goals.css";
export function Goals() {
  return (
    <main id="main-goal">
      <div className="section-container">
        <MainGoal></MainGoal>
      </div>
      <div className="section-container">
        <DailyGoal></DailyGoal>
      </div>
    </main>
  );
}



