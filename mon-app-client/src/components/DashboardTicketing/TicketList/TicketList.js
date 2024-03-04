import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import '../style.css';

const TicketList = ({ tickets, onTicketClick }) => {
  console.log("Tickets in TicketList:", tickets);

  const getTicketIcon = (ticket) => {
    console.log("État isOpened pour le ticket:", ticket.isOpened);
    const iconColor = ticket.isOpened ? 'green' : 'red';
    return <FontAwesomeIcon icon={faCircle} color={iconColor} />;
  };

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <div className="ticket-list-item" key={ticket.id}>
          {getTicketIcon(ticket)}
          <Link
            to={`/ticketing-global/${ticket.id}`}
            onClick={() => onTicketClick(ticket.id)}
          >
            <p>Nom du ticket : {ticket.title}</p>
            <p>Contenu du ticket : {ticket.content}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
