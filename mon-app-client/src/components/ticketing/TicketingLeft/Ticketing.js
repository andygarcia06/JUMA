import React, { useState } from 'react';

import './style.css';


function TicketingLeft() {
  const [formData, setFormData] = useState({
    requester: '',
    assignedTo: '',
    group: '',
    priority: '',
    contract: '',
    clientTicketReview: '',
    caseNumber: '',
    moduleSolutionAreaTheme: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous enverriez les données au backend
    console.log('Form Data:', formData);
  };

  return (
    <div className="support-ticket-form">
      <form onSubmit={handleSubmit}>
        {/* ...autres champs de formulaire */}
        
        <label htmlFor="requester">Demandeur</label>
        <input
          type="text"
          id="requester"
          name="requester"
          value={formData.requester}
          onChange={handleChange}
        />

        <label htmlFor="assignedTo">Assigné à</label>
        <input
          type="text"
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        />

        <label htmlFor="group">Groupes</label>
        <select id="group" name="group" value={formData.group} onChange={handleChange}>
          {/* Les options de groupe ici */}
        </select>

        <label htmlFor="priority">Priorité</label>
        <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
          {/* Options de priorité ici */}
        </select>

        <label htmlFor="contract">Contrat</label>
        <select id="contract" name="contract" value={formData.contract} onChange={handleChange}>
          {/* Options de contrat ici */}
        </select>

        <label htmlFor="clientTicketReview">Réévaluation du ticket par le client</label>
        <select id="clientTicketReview" name="clientTicketReview" value={formData.clientTicketReview} onChange={handleChange}>
          {/* Options d'évaluation ici */}
        </select>

        <label htmlFor="caseNumber">N° Case Éditeur</label>
        <input
          type="text"
          id="caseNumber"
          name="caseNumber"
          value={formData.caseNumber}
          onChange={handleChange}
        />

        <label htmlFor="moduleSolutionAreaTheme">Module / Solution / Area / Theme</label>
        <input
          type="text"
          id="moduleSolutionAreaTheme"
          name="moduleSolutionAreaTheme"
          value={formData.moduleSolutionAreaTheme}
          onChange={handleChange}
        />

        <button type="submit">Envoyer le Ticket</button>
      </form>
    </div>
  );
}

export default TicketingLeft;
