import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Timestamp from './pages/Timestamp';
import Works from './pages/Works';

function App() {
  return (
    <>
      <Router>
        <Navigation/>
        <Container>
          <Route exact path='/' component={Home}/>
          <Route exact path='/timestamp' component={Timestamp}/>
          <Route exact path='/works' component={Works}/>
        </Container>
      </Router>
    </>
  );
}
export default App;
