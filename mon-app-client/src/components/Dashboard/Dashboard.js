import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../UserConnected/UserConnected';
import UserProfile from '../UserProfile/UserProfile';
import './style.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // État initial false

  const user = useSelector((state) => state.user.userData);

  // Fonction pour gérer le clic sur l'icône des tickets
  const handleTicketsClick = () => {
    navigate('/dashboardticketing'); // Mettez à jour ce chemin
  };

  // Fonction pour gérer le clic sur l'icône des récompenses
  const handleRewardsClick = () => {
    navigate('/rewards');
  };

  // Fonction pour gérer le clic sur l'icône des projets
  const handleProjectsClick = () => {
    navigate('/projects'); // Changer le chemin pour accéder à la page des projets
  };

  // Utilisez useEffect pour déterminer si l'utilisateur est administrateur
  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]); // Assurez-vous de dépendre de 'user'

  return (
    <div className="dashboard">
     <UserProfile pseudo={user.pseudo || 'Pseudo inconnu'} />
      <nav className="dashboard-icons">
        {/* Icône pour les tickets */}
        <div className="icon-item" onClick={handleTicketsClick}>
          <span className="material-icons-outlined">description</span>
          <p>Tickets</p>
        </div>
        {/* Icône pour les récompenses */}
        <div className="icon-item" onClick={handleRewardsClick}>
          <span className="material-icons-outlined">verified</span>
          <p>Récompenses</p>
        </div>
        {isAdmin && (
          // Afficher l'icône des projets uniquement pour les administrateurs
          <div className="icon-item" onClick={handleProjectsClick}>
            <span className="material-icons-outlined">group</span>
            <p>Projets</p>
          </div>
        )}
      </nav>

    </div>
  );
};

export default Dashboard;
