import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext'; 
import './style.css';

const MenuTickets = () => {
  const { userPseudo } = useContext(UserContext); // Utilisation de useContext pour accéder à userPseudo
  const navigate = useNavigate();



  const handleAutomatisationClick = () => {
    navigate('/automatisation', { state: { userPseudo } });
    console.log('Le pseudo de l’utilisateur dans MenuTickets est:', userPseudo);
  };

  return (
    <div className="menu-left">
      <ul className="menu-items">
        <li onClick={handleAutomatisationClick}>Automatisation</li>
        <li><Link to="/autre-section">Autre Section</Link></li>
        {/* ... autres liens */}
      </ul>
    </div>
  );
};

export default MenuTickets;
