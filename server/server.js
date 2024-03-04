const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

const user = { id: 123, username: 'utilisateur' };
const token = jwt.sign(user, 'votreCléSecrète');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../mon-app-client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../mon-app-client/build/index.html'));
});


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chemins des fichiers JSON
const filePath = path.join(__dirname, './json/data.json');
const filePathSignUp = path.join(__dirname, './json/connectDatas.json');
const ticketsFilePath = path.join(__dirname, './json/tickets.json');

// Lecture des fichiers JSON
let data = JSON.parse(fs.readFileSync(filePath));
let users = fs.existsSync(filePathSignUp) ? JSON.parse(fs.readFileSync(filePathSignUp, 'utf-8')) : [];

// Fonctions pour la gestion des tickets
function readTickets() {
  return fs.existsSync(ticketsFilePath) ? JSON.parse(fs.readFileSync(ticketsFilePath, 'utf8')) : [];
}

function writeTickets(tickets) {
  fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2));
}

// Route de bienvenue
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Node.js !');
});



// Route de recherche
app.post('/recherche', (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const searchResults = data.filter((item) => item.contenu_article.includes(searchTerm));
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Route d'ajout
app.post('/ajouter', (req, res) => {
  try {
    const { nom_article, contenu_article } = req.body;
    data.push({ nom_article, contenu_article });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ message: 'Nouvelle entrée ajoutée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Route de connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.username }, 'votreCléSecrète', { expiresIn: '1h' });

    res.json({ 
      success: true, 
      message: 'Connexion réussie', 
      pseudo: user.pseudo, 
      userId: user.username, 
      role: 'utilisateur',
      token: token // Ajout du token dans la réponse
    });
  } else {
    res.status(401).json({ success: false, error: 'Identifiants incorrects' });
  }
});

app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  console.log('Identifiants reçus - Username:', username, 'Password:', password);

  // Recherche de l'utilisateur dans la liste des utilisateurs
  const user = users.find(u => u.username === username && u.password === password);

  if (user && user.role === 'admin') {
    // Si les identifiants correspondent à un administrateur
    const token = jwt.sign({ id: user.username, role: 'admin' }, 'votreCléSecrète', { expiresIn: '1h' });

    res.json({
      success: true,
      message: 'Connexion admin réussie',
      pseudo: user.pseudo,
      userId: user.username,
      role: 'admin',
      token: token
    });
  } else {
    res.status(401).json({ success: false, error: 'Identifiants administrateur incorrects' });
    console.log('pas de connexion')
  }
});






app.put('/tickets/open/:id', (req, res) => {
  const { id } = req.params;
  const tickets = readTickets();
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  tickets[ticketIndex].timeOpened = new Date().toISOString();
  writeTickets(tickets);
  res.json(tickets[ticketIndex]);
});

app.get('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const tickets = readTickets();
  const ticket = tickets.find(ticket => ticket.id === id);

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  res.json(ticket);
});

// Route de SignUp avec attribution de rôle
app.post('/signup', (req, res) => {
  const { username, password, pseudo, role } = req.body; // Ajoutez 'role' ici

  if (users.some(u => u.username === username)) {
    return res.status(400).json({ success: false, error: 'Nom d\'utilisateur déjà utilisé' });
  }

  const newUser = { username, password, pseudo, role }; // Utilisez 'role' ici
  users.push(newUser);
  fs.writeFileSync(filePathSignUp, JSON.stringify(users, null, 2));

  res.json({ success: true, message: 'Inscription réussie' });
});

// Middleware pour vérifier le token JWT et ajouter l'utilisateur à la requête
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    jwt.verify(req.token, 'votreCléSecrète', (err, authData) => {
      if (err) {
        res.sendStatus(403); // Accès refusé en cas d'erreur de vérification
      } else {
        req.user = authData;
        next(); // Passez à la prochaine étape de la route
      }
    });
  } else {
    res.sendStatus(401); // Non autorisé si le token n'est pas fourni
  }
}


// Route pour la mise à jour du rôle d'un utilisateur
app.put('/update-role', (req, res) => {
  const { username, newRole } = req.body;
  const userIndex = users.findIndex(u => u.username === username);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  users[userIndex].role = newRole;
  fs.writeFileSync(filePathSignUp, JSON.stringify(users, null, 2));
  res.json({ success: true, message: 'Rôle mis à jour' });
});

// Routes pour les tickets...
app.get('/tickets', (req, res) => {
  const tickets = readTickets();
  res.json(tickets);
});

app.post('/tickets', (req, res) => {
  const newTicket = req.body;
  const conditions = req.body.conditions; // Récupérez les conditions associées au ticket
  const tickets = readTickets();
  newTicket.id = Date.now().toString(); // Générer un ID simple
  tickets.push(newTicket);
  writeTickets(tickets);
  res.status(201).json(newTicket);

});

// Ajoutez une route pour mettre à jour les conditions d'un ticket existant
app.put('/tickets/:id/conditions', (req, res) => {
  const { id } = req.params;
  const updatedConditions = req.body.conditions; // Récupérez les nouvelles conditions à mettre à jour
  const tickets = readTickets();
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  tickets[ticketIndex].conditions = updatedConditions; // Mettez à jour les conditions du ticket
  writeTickets(tickets);
  res.json(tickets[ticketIndex]);
});

// Ajoutez une route pour récupérer les conditions associées à un ticket
app.get('/tickets/:id/conditions', (req, res) => {
  const { id } = req.params;
  const tickets = readTickets();
  const ticket = tickets.find(ticket => ticket.id === id);

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  const conditions = ticket.conditions || []; // Récupérez les conditions du ticket
  res.json(conditions);
});

app.put('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const updatedTicketInfo = req.body;
  const tickets = readTickets();
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  tickets[ticketIndex] = { ...tickets[ticketIndex], ...updatedTicketInfo };
  writeTickets(tickets);
  res.json(tickets[ticketIndex]);
});

app.get('/api/ticketservice', (req, res) => {
  const filePath = path.join(__dirname, './json/tickets.json'); // Mettez à jour le chemin selon votre structure de dossiers
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Erreur lors de la lecture du fichier');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

app.delete('/tickets/:id', (req, res) => {
  const { id } = req.params;
  let tickets = readTickets();
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  tickets = tickets.filter(ticket => ticket.id !== id);
  writeTickets(tickets);
  res.status(204).send();
});

app.get('/user-tickets/:userId', verifyToken, (req, res) => {
  const { userId } = req.params;
  const allTickets = readTickets();

  let ticketsToReturn;
  if (req.user.role === 'admin' || req.user.id === userId) {
    ticketsToReturn = allTickets;
  } else {
    ticketsToReturn = allTickets.filter(ticket => ticket.creator === userId);
  }

  res.json(ticketsToReturn);
});


app.put('/tickets/:id/open', (req, res) => {
  const { id } = req.params;
  console.log("Mise à jour du ticket avec l'ID:", id);

  // Rechercher le ticket par ID et mettre à jour son statut d'ouverture
  let tickets = readTickets(); 
  const ticketIndex = tickets.findIndex(ticket => ticket.id === id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket non trouvé' });
  }

  tickets[ticketIndex].isOpened = true; // Mettre à jour le statut d'ouverture
  writeTickets(tickets);

  res.json({ message: "Ticket mis à jour avec succès" });
});

// Route pour récupérer tous les utilisateurs
app.get('/api/get-users', (req, res) => {
  // Lecture du fichier connectDatas.json
  fs.readFile('./json/connectDatas.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier", err);
      res.status(500).send("Erreur serveur lors de la récupération des utilisateurs");
    } else {
      const users = JSON.parse(data);
      res.json(users); // Envoie la liste des utilisateurs au client
    }
  });
});




app.post('/assign-programme', (req, res) => {
  const { usernames, programmeName } = req.body; // usernames est un tableau

  // Lire le fichier connectDatas.json
  fs.readFile('./json/connectDatas.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier", err);
      return res.status(500).send("Erreur serveur");
    }
    
    const users = JSON.parse(data);

    // Parcourir les noms d'utilisateur et ajouter le programme à chaque utilisateur
    usernames.forEach(username => {
      const user = users.find(u => u.username === username);
      if (user) {
        if (!user.programmes) {
          user.programmes = [];
        }
        user.programmes.push(programmeName);
      }
    });
    
    // Réécrire le fichier JSON avec la nouvelle liste d'utilisateurs
    fs.writeFile('./json/connectDatas.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier", err);
        return res.status(500).send("Erreur serveur");
      }
      res.send("Programme(s) attribué(s) avec succès");
    });
  });
});

// Route pour ajouter un programme dans programmeDatas.json
app.post('/create-programme', (req, res) => {
  const {id, programmeName, programmeDescription, usernames } = req.body;
  console.log("Creating Programme:", programmeName, "Description:", programmeDescription, "for Users:", usernames);

  // Lire le fichier programmeDatas.json
  fs.readFile('./json/programmeData.json', (err, data) => {
      let programmes = [];
      if (!err) {
          programmes = JSON.parse(data);
      }
      // Ajouter le nouveau programme
      programmes.push({ programmeName, programmeDescription, usernames });
      // Réécrire le fichier programmeDatas.json
      fs.writeFile('./json/programmeData.json', JSON.stringify(programmes, null, 2), err => {
          if (err) {
            console.error("Error writing to programmeDatas.json", err);
              console.error(err);
              return res.status(500).send('Erreur lors de l\'écriture du fichier');
          }
          console.log("Programme added to programmeDatas.json with ID:", id);

          res.send('Programme créé avec succès');
      });
  });
});

// Route pour récupérer des programmes 

const filePathProgramme = path.join(__dirname, 'json/programmeData.json');

// Route pour ajouter un nouveau programme dans programmeData.json
app.post('/api/programmes', (req, res) => {
  const newProgramme = req.body; // Récupère les données du nouveau programme envoyées par le client

  // Lire le fichier existant
  fs.readFile(filePathProgramme, (err, data) => {
    let programmes = [];
    if (!err && data.length > 0) {
      programmes = JSON.parse(data); // Parse le JSON existant s'il n'y a pas d'erreur et que le fichier n'est pas vide
    }

    programmes.push(newProgramme); // Ajoute le nouveau programme au tableau

    // Réécrit le fichier avec le nouveau tableau de programmes
    fs.writeFile(filePathProgramme, JSON.stringify(programmes, null, 2), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture dans le fichier programmeData.json", err);
        return res.status(500).send("Erreur lors de l'enregistrement des données de programme");
      }
      res.send("Programme ajouté avec succès");
    });
  });
});

app.get('/api/programmes', (req, res) => {
  const filePath = path.join(__dirname, 'json/programmeData.json');
  
  // Vérifie si le fichier existe avant de tenter de le lire
  fs.exists(filePath, exists => {
    if (!exists) {
      return res.status(404).send("Le fichier programmeDatas.json n'a pas été trouvé.");
    }
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier programmeDatas.json", err);
        return res.status(500).send("Erreur lors de la lecture des données de programme");
      }
      res.json(JSON.parse(data));
    });
  });
});

app.post('/api/add-project-in-program/:programId', (req, res) => {
  const { programId } = req.params; // Récupérez l'ID du programme depuis les paramètres d'URL
  const { projectName, projectId, description, users } = req.body; // Récupérez les données du projet depuis le corps de la requête

  // Lisez le fichier programmeData.json
  const filePath = path.join(__dirname, 'json/programmeData.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier programmeData.json", err);
      return res.status(500).send("Erreur lors de la lecture des données de programme");
    }

    // Parsez le contenu JSON
    const programmes = JSON.parse(data);

    // Recherchez le programme correspondant par ID
    const programmeToUpdate = programmes.find(programme => programme.id === programId);

    if (!programmeToUpdate) {
      return res.status(404).send("Programme non trouvé.");
    }

    // Créez un objet représentant le projet
    const newProject = {
      id: `${programName}${generateUniqueId()}`, // Générez un ID unique
      projectName,
      description,
      users
    };

    // Ajoutez le nouveau projet au programme
    programmeToUpdate.projects.push(newProject);

    // Écrivez les données mises à jour dans le fichier
    fs.writeFile(filePath, JSON.stringify(programmes, null, 2), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier programmeData.json", err);
        return res.status(500).send("Erreur lors de l'écriture des données de programme");
      }
      console.log(`Projet ajouté au programme avec succès. ID du projet : ${newProject.id}`);
      res.json(newProject); // Répondez avec les détails du projet ajouté
    });
  });
});









// Lancement du serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
