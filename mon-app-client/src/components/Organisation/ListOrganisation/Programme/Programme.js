import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'; // Importez l'icône FaPlus
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import Projet from './Projet/Projet';
import './Programme.css';
import { Link } from 'react-router-dom'; // Importez Link depuis React Router


const Programme = () => {
  const [programmes, setProgrammes] = useState([]);
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation


  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/programmes');
        const programmesData = response.data;
        const uniqueProgrammes = {};
        programmesData.forEach(programme => {
          uniqueProgrammes[programme.programmeName] = programme;
        });
        setProgrammes(Object.values(uniqueProgrammes));
      } catch (error) {
        console.error("Erreur lors de la récupération des programmes", error);
      }
    };

    fetchProgrammes();
  }, []);

  useEffect(() => {
    console.log("ID des programmes:", programmes.map(programme => programme.id));
  }, [programmes]);

  // Fonction pour naviguer vers AddProject
  const handleAddProject = (programmeId) => {
    navigate(`/add-project/${programmeId}`); // Utilisez `navigate` avec le paramètre `programmeId`
  };
  return (
    <div className='programme-container'>
      <h1>Programmes</h1>
      <div className="programme">
        {programmes.map((programme, index) => (
          <div key={programme.id}>
            <h3>{programme.programmeName}</h3>
            <Projet programmeId={programme.id} />
            <Link to={`/add-project/${programme.id}`}>
            <button className="add-project-btn" onClick={handleAddProject}>
          <FaPlus /> {/* Icône de plus */}
        </button>
        </Link>
          </div>
        ))}
        {/* Bouton pour ajouter un projet */}
      </div>
    </div>
  );
};

export default Programme;
