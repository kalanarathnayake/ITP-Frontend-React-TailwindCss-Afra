import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";

import { CreateTicket } from "./components/ticket-add.component";
import { TicketList } from './components/ticket-list.component';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/createTicket" element={<CreateTicket />} />
          <Route exact path="/ticket" element={<TicketList />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
