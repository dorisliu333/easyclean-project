/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/General/Header';
import ContactPage from './pages/ContactPage';
import BrowseTaskPage from './pages/BrowseTaskPage';
import MyTasksPage from './pages/MyTasksPage';
import UserProfilePage from './pages/UserProfilePage';
import HomePageBanner from './pages/Home';
import getJwt from './helper/jwt';
import requestApi from './api/fetchDetails';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: undefined,
        userName: undefined,
      },
      isLogIn: false,
      // showModal: undefined,
    };
    this.handleLoginState = this.handleLoginState.bind(this);
  }

  componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
      this.setState({
        isLogIn: false,
      });
      return;
    }
    requestApi
      .get('/getUser')
      .then((res) => {
        const userData = {
          id: res.data._id,
          userName: res.data.username,
          postCode: res.data.postcode,
          eMail: res.data.email,
          tasks: res.data.tasks,
          userType: res.data.Type,
        };
        this.setState({
          isLogIn: true,
          user: userData,
        });
      })
      .catch(() => {
        localStorage.removeItem('oor-jwt');
      });
  }

  handleLoginState(user) {
    if (user) {
      this.setState({
        isLogIn: true,
        user: user,
      });
    }
    if (!user) {
      this.setState({
        isLogIn: false,
        user: {
          id: undefined,
          userName: undefined,
        },
      });
    }
  }

  render() {
    const { user, isLogIn } = this.state;
    return (
      <div>
        <Router>
          <Header logInUser={user} isLogIn={isLogIn} handleLoginState={this.handleLoginState} />
          <Switch>
            <Route path="/" exact>
              <HomePageBanner
                logInUser={user}
                isLogIn={isLogIn}
                handleLoginState={this.handleLoginState}
              />
            </Route>
            <Route path="/my-tasks" exact>
              <MyTasksPage user={user} />
            </Route>
            <Route
              // {...props props}
              path="/browse-tasks/:taskId"
              // eslint-disable-next-line react/jsx-props-no-spreading
              render={(props) => <BrowseTaskPage {...props} user={user} isLogin={isLogIn} />}
            />
            <Route
              // {...props props}
              path="/browse-tasks"
              // eslint-disable-next-line react/jsx-props-no-spreading
              render={(props) => <BrowseTaskPage {...props} user={user} isLogin={isLogIn} />}
            />
            <Route path="/contact" exact component={ContactPage} />
            <Route path="/profile" exact>
              <UserProfilePage user={user} getUserDataWithId={this.getUserDataWithId} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
