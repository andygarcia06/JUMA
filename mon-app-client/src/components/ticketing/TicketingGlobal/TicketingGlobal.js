import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TicketingLeft from '../TicketingLeft/Ticketing';
import TicketingCenter from '../TicketingCenter/TicketingCenter';
import TicketingRight from '../TicketingRight/TicketingRight';
import './style.css';

function TicketingGlobal() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { ticketId } = useParams();

  useEffect(() => {
    // Supposons que vous récupérez les détails du ticket ici
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tickets/${ticketId}`);
        const ticketDetails = await response.json();
        setSelectedTicket(ticketDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du ticket:', error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  return (
    <div className="ticket-global-container">
      <TicketingLeft />
      {/* Passer l'objet selectedTicket en tant que prop à TicketingCenter */}
      <TicketingCenter ticket={selectedTicket} />
      <TicketingRight interactions={[]} />
    </div>
  );
}

export default TicketingGlobal;
