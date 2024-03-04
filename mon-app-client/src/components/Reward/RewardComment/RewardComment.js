import React from 'react';
import '../Reward.css'; // Assurez-vous que ce fichier est créé et situé dans le même dossier

function RewardComment() {
  // Définissez un objet qui contient le pourcentage de complétion pour chaque niveau
  const levels = {
    level1: '1%',
    level2: '5%',
    level3: '25%',
    level4: '100%'
  };

  return (
    <div className='container'>
    <h4>En recevant des réactions positives dans votre propre module</h4>

    <div className="reward">
    {Object.entries(levels).map(([level, percentage], index) => (
      <div key={index} className={`icon level-${index + 1} ${percentage === '100%' ? 'completed' : ''}`}>
        <span className="material-icons">
          {percentage === '100%' ? 'check_circle' : 'radio_button_unchecked'}
        </span>
        <div className="percentage">{percentage}</div>
        <div className="label">{`Niveau ${index + 1}`}</div>
      </div>
    ))}
  </div>
    </div>
  );
}

export default RewardComment;