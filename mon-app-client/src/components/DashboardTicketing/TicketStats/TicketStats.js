import React from 'react';
import AverageSLA from './AverageSLA/AverageSla'; // Assurez-vous du chemin d'importation
import '../style.css'; 

const TicketStats = ({ tickets }) => {
  const satisfaction = tickets.reduce((acc, ticket) => acc + ticket.satisfaction, 0) / tickets.length;
  const slaAverage = tickets.reduce((acc, ticket) => acc + ticket.sla, 0) / tickets.length;

  return (
    <div className="ticket-stats">
      <p className="stat">Taux de satisfaction: {satisfaction.toFixed(2)}%</p>
      {/* Utilisation d'AverageSLA pour afficher le SLA moyen */}
      <AverageSLA slaAverage={slaAverage} />
      {/* Ajoutez d'autres statistiques ici si nécessaire */}
    </div>
  );
};

export default TicketStats;
