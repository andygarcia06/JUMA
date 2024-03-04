// Dans votre composant parent
import React from 'react';
import Lot from './Lot/Lot';
import '../Programme.css';

const projetsData = [
  //... Votre structure de données pour les projets, lots, BRs et phases
];

const Projet = () => {
  // Supposons que projetsData est votre structure de données
  return (
    <div className="projet">
      {projetsData.map(projet => (
        <div key={projet.id} className="projet">
          <h3>{projet.nom}</h3>
          {projet.lots.map(lot => (
            <Lot key={lot.id} nom={lot.nom} brs={lot.brs} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Projet;
