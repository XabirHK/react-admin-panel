import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';
import "./App.css";

import AuthService from "./services/auth.service";
import {ProtectedRoute} from "./services/protected.route";

import Login from "./components/login.component";
import SignUp from "./components/register.component";

class App extends Component {
  
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  
  render() {
    return (
      <div>
        <div>
          <Switch> 
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <ProtectedRoute component={DashboardLayout} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
