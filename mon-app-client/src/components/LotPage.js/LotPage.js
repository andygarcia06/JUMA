import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LotPage = () => {
  const location = useLocation();
  const { lot, projectData } = location.state;

  // État local pour stocker les BR (besoins/réalisations) du lot
  const [brList, setBrList] = useState([]);

  // Fonction pour ajouter un BR au lot
  const addBR = () => {
    // Implémentez la logique pour ajouter un BR au lot
    // Cela peut inclure une fenêtre contextuelle ou un formulaire pour saisir les détails du BR
    // Après avoir ajouté le BR, mettez à jour l'état de la liste des BR
    const newBr = {}; // Remplacez {} par les détails du nouveau BR
    setBrList([...brList, newBr]);
  };

  return (
    <div>
      <h2>Détails du Lot</h2>
      <p>Nom du lot : {lot.lotName}</p>
      <p>Description du lot : {lot.lotDescription}</p>
      <p>ID du projet associé : {projectData.id}</p>
      <p>Nom du projet associé : {projectData.projectName}</p>

      {/* Afficher les participants du lot */}
      <h3>Participants du Lot:</h3>
      <ul>
        {lot.participants && lot.participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>

      {/* Onglet pour afficher les BR */}
      <div>
        <h3>Besoins/Réalisations (BR)</h3>
        {/* Implémentez l'affichage des BR ici */}
      </div>

      {/* Bouton pour ajouter un nouveau BR */}
      <button onClick={addBR}>Ajouter un BR</button>
    </div>
  );
};

export default LotPage;
