import React from 'react';
import { MainGoal } from './main';
import { DailyGoal } from './daily';

export function Goals() {
  return (
    <main>
      <div className="section-container">
        <MainGoal></MainGoal>
      </div>
      <div className="section-container">
        <DailyGoal></DailyGoal>
      </div>
    </main>
  );
}



