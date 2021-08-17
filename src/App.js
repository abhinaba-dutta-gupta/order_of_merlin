import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './modules/login/login';
import Signup from './modules/signup/signup';
import ForgotPassword from './modules/forgotpass/forgotpass';
import Dashboard from './modules/dashboard/dashboard';
import Candidate from './modules/candidate/candidate';
import Subject from './modules/subject/subject';
import Question from './modules/question/question';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/forgotpass" exact component={ForgotPassword} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/candidate" exact component={Candidate} />
        <Route path="/subject" exact component={Subject} />
        <Route path="/question" exact component={Question} />
      </Router>
    </div>
  );
}

export default App;