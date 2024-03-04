import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const AddProject = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projects, setProjects] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsernames, setSelectedUsernames] = useState([]);

  const { programmeId } = useParams();



  // Fonction pour générer un ID unique pour un projet
  const generateProjectId = (programmeName) => {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = programmeName; // Utilisez le nom du programme comme préfixe
    for (let i = 0; i < 10; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  };

  // Fonction pour ajouter un nouveau projet
  const handleAddProject = () => {
    const newProjectId = generateProjectId(projectName);
    const newProject = {
      id: newProjectId,
      projectName: projectName,
      projectDescription: projectDescription,
      assignedUsers: selectedUsernames // Ajoutez la liste des utilisateurs assignés au projet
    };

    console.log("Données du projet à envoyer au serveur :", newProject);

    console.log(`Projet assigné au programme : ${programmeId}`);



    // Mettez à jour la liste des projets avec le nouveau projet
    setProjects([...projects, newProject]);

    // Réinitialisez les champs du formulaire
    setProjectName('');
    setProjectDescription('');
    setSelectedUsernames([]); // Réinitialisez la liste des utilisateurs sélectionnés
  };

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
    // Chargez la liste des utilisateurs lorsque le composant est monté
    fetchUsers();
  }, []);

  // Filtrer les utilisateurs basés sur le terme de recherche
  useEffect(() => {
    if (searchTerm !== '') {
      const filteredUsers = userList.filter(user =>
        user.username.includes(searchTerm) || user.pseudo.includes(searchTerm)
      );
      setUserList(filteredUsers);
    } else {
      setUserList(userList); // Réinitialisez la liste des utilisateurs
    }
  }, [searchTerm]);
  
  // Effet pour charger la liste des utilisateurs au montage
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour gérer le clic sur un utilisateur
  const handleUserClick = (username) => {
    // Toggle la sélection de l'utilisateur
    if (selectedUsernames.includes(username)) {
      setSelectedUsernames(selectedUsernames.filter(u => u !== username));
    } else {
      setSelectedUsernames([...selectedUsernames, username]);
    }
  };

  return (
    <div>
      <h2>Ajouter un projet au programme {programmeId}</h2>
      <div>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Nom du projet"
        />
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Description du projet"
        />
        <button onClick={handleAddProject}>Ajouter le projet</button>
      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un utilisateur"
        />
        <h3>Liste des utilisateurs</h3>
        <ul>
          {userList.map((user) => (
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
      </div>
    </div>
  );
};

export default AddProject;
