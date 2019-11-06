import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Redirect } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Home from './components/Home';
import Auth from './auth';
import * as serviceWorker from './serviceWorker';
import history from './history';

const auth = new Auth();
console.log(auth.loggedIn());
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.loggedIn() ? (
          <Component {...props} auth={auth}/>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

ReactDOM.render(
   <Router history={history}>
        <Route path="/" render={(props) => <App {...props} auth={auth}/>} />
        <PrivateRoute exac path="/home" auth={auth} component={Home}/>
  </Router>
   , document.getElementById('root'));

serviceWorker.register();
