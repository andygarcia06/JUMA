import React, { useEffect, useState } from 'react';
import MessageDisplay from '../../MessageComponents/MessageDisplay/MessageDisplay';
import MessageInput from '../../MessageComponents/MessageInput/MessageInput';

const TicketingCenter = () => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    // Créer une instance WebSocket
    const ws = new WebSocket('ws://localhost:3002');

    // Écouter les événements WebSocket
    ws.onopen = () => {
      console.log('WebSocket connecté');
      setWebSocket(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket déconnecté');
    };

    ws.onerror = (error) => {
      console.error('Erreur WebSocket:', error);
    };

    return () => {
      // Fermer la connexion WebSocket lorsque le composant est démonté
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      // Envoyer le message si la connexion WebSocket est ouverte
      webSocket.send(message);
    } else {
      console.error('WebSocket n\'est pas connecté');
    }
  };

  return (
    <div className="ticketing-center">
      {/* Votre contenu du centre de billetterie */}
      <MessageDisplay />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default TicketingCenter;
