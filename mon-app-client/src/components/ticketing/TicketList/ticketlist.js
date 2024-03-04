import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

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
      <h2>Liste des Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.content}</p>
            {/* Ajouter plus de détails si nécessaire */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
