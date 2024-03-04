import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProgramme = () => {
  const [programName, setProgramName] = useState('');
  const [programDescription, setProgramDescription] = useState('');
  const [selectedUsernames, setSelectedUsernames] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/get-users');
      setUserList(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour générer un ID unique
  const generateUniqueId = () => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'pro';
    for (let i = 0; i < 20; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  };

  // Fonction pour gérer le clic sur un utilisateur
  const handleUserClick = (username) => {
    if (selectedUsernames.includes(username)) {
      setSelectedUsernames(selectedUsernames.filter(u => u !== username));
    } else {
      setSelectedUsernames([...selectedUsernames, username]);
    }
  };

  // Fonction pour créer un programme et l'assigner aux utilisateurs
  const handleCreateProgramme = async (programmeId) => {
    try {
      const response = await axios.post('http://localhost:3001/assign-programme', {
        id: programmeId,
        usernames: selectedUsernames,
        programmeName: programName,
        programmeDescription: programDescription
      });
      console.log("Programme créé avec succès", response.data);
    } catch (error) {
      console.error("Erreur lors de la création du programme", error);
    }
  };

  // Fonction pour envoyer les détails du programme au serveur
const handlePushProgramme = async (programmeId) => {
  try {
    const response = await axios.post('http://localhost:3001/api/programmes', {
      id: programmeId, // Assurez-vous d'inclure l'ID généré
      programmeName: programName,
      programmeDescription: programDescription,
      usernames: selectedUsernames
    });
    console.log("Détails du programme envoyés avec succès", response.data);
    // Réinitialiser le formulaire ou d'autres actions après le succès
  } catch (error) {
    console.error("Erreur lors de l'envoi des détails du programme", error);
    // Gérer l'erreur
  }
};

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = () => {
    const programmeId = generateUniqueId();
    handleCreateProgramme(programmeId);
    handlePushProgramme(programmeId);
  };

  // Filtrer les utilisateurs basés sur le terme de recherche
  useEffect(() => {
    if (searchTerm !== '') {
      const filteredUsers = userList.filter(user =>
        user.username.includes(searchTerm) || user.pseudo.includes(searchTerm)
      );
      setUserList(filteredUsers);
    } else {
      fetchUsers();
    }
  }, [searchTerm, userList]);

  return (
    <div>
      <input
        type="text"
        value={programName}
        onChange={(e) => setProgramName(e.target.value)}
        placeholder="Nom du programme"
      />
      <textarea
        value={programDescription}
        onChange={(e) => setProgramDescription(e.target.value)}
        placeholder="Description du programme"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Chercher un utilisateur"
      />
      <ul>
        {userList.map(user => (
          <li
            key={user.username}
            onClick={() => handleUserClick(user.username)}
            style={{
              cursor: 'pointer',
              fontWeight: selectedUsernames.includes(user.username) ? 'bold' : 'normal'
            }}
          >
            {user.username} ({user.pseudo})
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Créer</button>
    </div>
  );
};

export default AddProgramme;
