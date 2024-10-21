import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DeviceCodeFlow from './pages/DeviceCodeFlow';
import AuthCodeGrantFlow from './pages/AuthCodeGrantFlow';
import ClientCredentialsGrantFlow from './pages/ClientCredentialsGrantFlow';
import './App.css';


function App() {
  return (
    {/* <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/device-code-flow">Device Code Flow1</Link>
            </li>
            <li>
              <Link to="/auth-code-flow">Authorization Code Flow</Link>
            </li>
            <li>
              <Link to="/ccgf">Client Credentials Grant Flow</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/device-code-flow">
            <DeviceCodeFlow />
          </Route>
          <Route path="/auth-code-flow">
            <AuthCodeGrantFlow />
          </Route>
          <Route path="/ccgf">
            <ClientCredentialsGrantFlow />
          </Route>
          <Route path="/">
            <h1>Authorization Flow Testbed app</h1>
          </Route>
        </Switch>
      </div>
    </Router> */}
  );
}

export default App;
