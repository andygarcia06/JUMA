import React, { useState } from 'react';
import axios from 'axios';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [module, setModule] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
        const response = await axios.post('http://localhost:3001/tickets', {
          title,
          content,
          caseNumber,
          module,
          creator: userId, // Inclure l'ID de l'utilisateur
        });
      // Gestion après la création du ticket (par exemple, afficher un message ou rediriger l'utilisateur)
      console.log('Ticket créé avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
    }
  };

  return (
    <div>
      <h2>Créer un Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre du Ticket :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Contenu du Ticket :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>N° Case Éditeur :</label>
          <input
            type="text"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Module / Solution / Area / Theme :</label>
          <input
            type="text"
            value={module}
            onChange={(e) => setModule(e.target.value)}
          />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateTicket;

