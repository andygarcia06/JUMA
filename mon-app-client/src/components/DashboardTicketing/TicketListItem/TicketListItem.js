
import React from 'react';
import '../style.css'; // Assurez-vous d'importer votre CSS ici


const TicketListItem = ({ ticket }) => {
  return (
    <div className="ticket-list-item">
      <h3>{ticket.title}</h3>
      <p>ID du Ticket: {ticket.id}</p>
      {/* Ajoutez d'autres informations du ticket ici. */}
    </div>
  );
};

export default TicketListItem;

