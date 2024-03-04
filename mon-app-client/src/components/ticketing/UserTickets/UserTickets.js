import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTickets = ({ userId }) => {
  const [userTickets, setUserTickets] = useState([]);
  const [token, setToken] = useState(null); // Ajoutez le token d'authentification ici

  // Fonction pour récupérer les tickets de l'utilisateur
  const fetchUserTickets = async () => {
    try {
      if (!token) {
        // Gérer le cas où le token n'est pas défini (l'utilisateur n'est pas connecté)
        console.error('Token non défini. L\'utilisateur n\'est probablement pas connecté.');
        return;
      }

      const response = await axios.get(`http://localhost:3001/user-tickets/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserTickets(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets de l\'utilisateur:', error);
    }
  };

  // Utilisez useEffect pour récupérer le token d'authentification, par exemple lors de la connexion de l'utilisateur
  useEffect(() => {
    // Supposons que vous stockiez le token dans une variable nommée 'tokenObtenu'
    const tokenObtenu = 'votre_token'; // Remplacez 'votre_token' par le token réel obtenu lors de la connexion

    if (tokenObtenu) {
      setToken(tokenObtenu); // Stockez le token dans l'état du composant
    }
  }, []); // Cette partie du code s'exécute une seule fois lors du montage du composant

  // Utilisez useEffect pour appeler fetchUserTickets lorsque le composant est monté ou lorsque le token ou l'ID de l'utilisateur change
  useEffect(() => {
    fetchUserTickets(); // Appelez fetchUserTickets lorsque le composant est monté ou que le token/ID de l'utilisateur change
  }, [token, userId]); // Le tableau de dépendances indique quand cette fonction doit être réexécutée

  return (
    <div>
      <h2>Tickets de l'utilisateur</h2>
      <ul>
        {userTickets.map((ticket) => (
          <li key={ticket.id}>
            <h3>Titre du ticket : {ticket.title}</h3>
            <p>Contenu du ticket : {ticket.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTickets;
