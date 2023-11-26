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

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS file

import Home from './pages/Home/index';
import About from './components/About';
import Layout from './components/Layout/index'

function App() {
  return (
    <main>
      <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home/>} />
                <Route path='/about' element={<About/>} />
            </Route>
          </Routes>
      </Router>
    </main>
  );
}

export default App;