// BR.js
import React from 'react';
import '../../../Programme.css'; // Assurez-vous que le chemin est correct

const BR = ({ nom, phases }) => {
  return (
    <div className="br">
      <h5>{nom}</h5>
      {phases.map((phase, index) => (
        <div key={index} className="phase">
          <span>{phase}</span>
        </div>
      ))}
    </div>
  );
};

export default BR;