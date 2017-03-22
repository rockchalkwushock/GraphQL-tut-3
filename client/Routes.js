import React from 'react';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import {
  App,
  Dashboard,
  LoginForm,
  requireAuth,
  SignupForm } from './components';

export default () => (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route path='login' component={LoginForm} />
      <Route path='signup' component={SignupForm} />
      <Route path='dashboard' component={requireAuth(Dashboard)} />
    </Route>
  </Router>
);