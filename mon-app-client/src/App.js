import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store'; // Assurez-vous que le chemin vers store.js est correct

import LoginPage from './components/LoginPage/LoginPage';
import LoginAdminPage from './components/LoginAdminPage/LoginAdminPage';
import SearchPage from './components/SearchPage/searchpage';
import SignUpPage from './components/SignUp/SignUp';
import CreateTicket from './components/ticketing/CreateTicket/CreateTicket'; 
import TicketList from './components/ticketing/TicketList/ticketlist'; 
import Dashboard from './components/Dashboard/Dashboard';
import DashboardTicketing from './components/DashboardTicketing/DashboardTicketing'; // Ajoutez cette ligne
import TicketingGlobal from './components/ticketing/TicketingGlobal/TicketingGlobal';
import AutomatisationForm from './components/AutomatisationForm/AutomatisationForm';
import HomePage from './components/HomePage/HomePage';
import Organisation from './components/Organisation/Organisation';
import ListOrganisation from './components/Organisation/ListOrganisation/ListOrganisation';
import AddProgram from './components/Organisation/AddProgram/AddProgram';
import AddProject from './components/Organisation/ListOrganisation/Programme/Projet/AddProject';
import Reward from './components/Reward/Reward';




function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<LoginAdminPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/ticketing-global/:ticketId" element={<TicketingGlobal />} />
          <Route path="/createticket" element={<CreateTicket />} />
          <Route path="/ticketlist" element={<TicketList />} />
          <Route path="/dashboardticketing" element={<DashboardTicketing />} />
          <Route path="/ticketing-global" element={<TicketingGlobal />} />
          <Route path="/automatisation" element={<AutomatisationForm />} />
          <Route path="/projects" element={<Organisation />} />
          <Route path="/rewards" element={<Reward />} />
          <Route path='/list-organisations' element={<ListOrganisation />} />
          <Route path='/add-program' element={<AddProgram />} />
          <Route path="/add-project/:programmeId" element={<AddProject />} />


        </Routes>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
