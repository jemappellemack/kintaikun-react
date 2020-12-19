import React, { FC } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Timestamp from './pages/Timestamp';
import Works from './pages/Works';

const App: FC = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/timestamp" component={Timestamp} />
            <Route path="/works" component={Works} />
            <Route component={Home} />
          </Switch>
        </Container>
      </Router>
    </>
  );
};
export default App;
