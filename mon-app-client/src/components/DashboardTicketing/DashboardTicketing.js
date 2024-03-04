import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserContext from '../../contexts/UserContext'; // Importez UserContext


import UserIcon from '../UserConnected/UserConnected'; // Assurez-vous que le chemin est correct
import TicketList from './TicketList/TicketList';
import TicketFilters from './TicketFilters/TicketFilters';
import TicketStats from './TicketStats/TicketStats';
import MenuTicketing from '../ticketing/MenuTickets/MenuTickets'
import './style.css';

const DashboardTicketing = () => {
  const user = useSelector((state) => state.user.userData);
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);



  const handleTicketClick = async (ticketId) => {
    try {
      // Envoyer une requête pour marquer le ticket comme ouvert
      await axios.put(`http://localhost:3001/tickets/${ticketId}/open`);
      console.log("Réponse du serveur:", `http://localhost:3001/tickets/${ticketId}/open`);

  
      // Mettre à jour l'état local des tickets
      const updatedTickets = userTickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, isOpened: true } : ticket
      );
      setUserTickets(updatedTickets);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du ticket", error);
    }
  };
  

  useEffect(() => {

    console.log('le pseudo user dans dashboard est ')
    const fetchUserTickets = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem('token');
        if (user) {
          const response = await axios.get('http://localhost:3001/tickets', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          const filteredTickets = user.role === 'admin' ? response.data : response.data.filter(ticket => ticket.creator === user.pseudo);

          setUserTickets(filteredTickets.map(ticket => ({ ...ticket, isOpened: false }))); // Initialise isOpened à false
        } else {
          setUserTickets([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des tickets', error);
      }
      setLoading(false);
    };

    fetchUserTickets();
  }, [user]);

  if (loading) {
    return <div>Chargement des tickets...</div>;
  }

  console.log('Le pseudo de l’utilisateur dans DashBoard est:', user.pseudo);

  return (
    <UserContext.Provider value={{ userPseudo: user.pseudo || 'Pseudo inconnu', userTickets }}>
    <div className="dashboard">
      <MenuTicketing />
      <div className="user-connected">
        {user ? (
          <UserIcon pseudo={user.pseudo} />
        ) : (
          <p>Chargement des données utilisateur...</p>
        )}
      </div>
      <div className='menu-tickets-center'>
        <TicketFilters />
        <TicketList tickets={userTickets} />
        <TicketStats tickets={userTickets} />
      </div>
    </div>
  </UserContext.Provider>
  );
};

export default DashboardTicketing;
