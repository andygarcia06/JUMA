import React from 'react';
import BR from './Br/Br'; // Assurez-vous d'importer le composant BR
import '../../Programme.css'; // Assurez-vous que le chemin est correct

const Lot = ({ nom, brs }) => {
  return (
    <div className="lot">
      <h4>{nom}</h4>
      {brs.map(br => <BR key={br.id} nom={br.nom} phases={br.phases} />)}
    </div>
  );
};

export default Lot;