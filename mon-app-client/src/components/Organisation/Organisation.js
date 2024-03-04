import React from 'react';
import { FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour la navigation

function OrganisationComponent() {
  const navigate = useNavigate(); // Hook pour accéder à la fonction de navigation

  // La fonction qui navigue vers ListOrganisation
  const navigateToListOrganisation = () => {
    navigate('/list-organisations'); // Utilisez navigate au lieu de history.push
  };

  const navigateToAddProgram = () => {
    navigate('/add-program'); // Utilisez navigate au lieu de history.push
  };

  return (
    <div className="organisation-component">
      <button onClick={navigateToListOrganisation} className="icon-button">
        <FaList />
        <span>Liste des Organisations</span>
      </button>

      <button onClick={navigateToAddProgram} className="icon-button">
        <FaList />
        <span>Add a programm</span>
      </button>
    </div>
  );
}

export default OrganisationComponent;
