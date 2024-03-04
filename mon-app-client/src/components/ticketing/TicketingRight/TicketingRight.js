import React, { useEffect, useState } from 'react';
import axios from 'axios';

import UserTickets from '../UserTickets/UserTickets'; // Assurez-vous que le chemin est correct


function TicketingRight() {
  const [tickets, setTickets] = useState([]);
  const userId = "userId"; // Remplacer par l'ID de l'utilisateur actuel


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
    <div className="ticket-list">
      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <div className="ticket-item">
              <h3>{ticket.title}</h3>
              <p>{ticket.content}</p>
              {/* Ajoutez d'autres détails du ticket si nécessaire */}
            </div>
          </li>
        ))}
      </ul>
    </div>
    <UserTickets userId={userId} />
    </div>
  );
}

export default TicketingRight;
