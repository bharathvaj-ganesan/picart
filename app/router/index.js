import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={Home} exact />
    </Switch>
  </HashRouter>
);

export default Routes;
