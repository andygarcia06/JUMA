import React from 'react';
import './Reward.css';

import RewardComments from './RewardComment/RewardComment';
import RewardLearnings from './RewardLearnings/RewardLearnings';
import RewardResponse from './RewardResponse/RewardResponse';
import RewardReact from './RewardReact/RewardReact';
import RewardCreate from './RewardCreate/RewardCreate';


function Reward() {
    return (
      <div className="rewards-container">
      <h2 className = 'box-trophie' id='champion'>Obtenez des trophées de <span id='champion-span'>champion</span></h2>
        <RewardCreate />
        <RewardReact />
        <h2 className = 'box-trophie' id='learner'>Obtenez des trophées de <span id='learner-span'>apprenant</span></h2>

        <RewardResponse />
        <RewardLearnings />
        <RewardComments />

      </div>
    );
  }
  
  export default Reward;