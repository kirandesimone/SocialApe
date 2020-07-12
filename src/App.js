import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAction';

//Navbar
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import axios from 'axios';

axios.defaults.baseURL = 
    'https://us-central1-socialape-9f523.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if(token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    store.dispatch(logoutUser());

  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  };
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar></Navbar>
        <div className="container">
          <Switch>
            <Route exact path="/" component={home}></Route>
            <AuthRoute exact path="/login" component={login} ></AuthRoute>
            <AuthRoute exact path="/signup" component={signup} ></AuthRoute>
            <Route exact path="/users/:handle" component={user}></Route>
            <Route exact path="/users/:handle/scream/:screamId" component={user}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
