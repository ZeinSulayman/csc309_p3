/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
/*
import React from 'react';
import './App.css';
import home from './components/home';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

class MyApp extends React.Component {
  render() {
    return (
      home()
    );
  }
}

export default MyApp;
*/

import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS file

import { UserProvider } from './contexts/UserContext';
import Home from './pages/Home/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import Finder from './pages/Finder/index';
import SeekerAccount from './pages/SeekerAccount/index';
import EditSeekerAccount from './pages/SeekerAccount/ind';
import EditShelterAccount from './pages/ShelterAccount/index';
import ShelterAccount from './pages/ExistingShelter/index';
import PetApplication from "./pages/PetApplication/index";
import PetDetail from "./pages/PetDetails/index";
import PetCreate from "./pages/CreatePet/index";
import PetEdit from "./pages/UpdatePet/index";

import About from './components/About';
import Layout from './components/Layout/index'
import Map from './components/Map/index'


function App() {
  return (
    <main>
      <UserProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/finder' element={<Finder/>} />
                <Route path='/seeker' element={<SeekerAccount/>} />
                <Route path='/shelter' element={<ShelterAccount/>} />
                <Route path='/map' element={<Map/>} />
                <Route path='/pets/create' element={<PetCreate/>} />
                <Route path="/pets/:petId" element={<PetDetail />} />
                <Route path="/pets/edit/:petId" element={<PetEdit />} />
                <Route path="/pets/:petId/application" element={<PetApplication />}/>
            </Route>
            <Route path='/api/newuser' element={<Register/>} />
            <Route path='/api/user' element={<Login/>} />
            <Route path='/newuser/seeker' element={<EditSeekerAccount/>} />
            <Route path='/newuser/shelter' element={<EditShelterAccount/>} />
          </Routes>
      </Router>
      </UserProvider>
    </main>
  );
}

export default App;