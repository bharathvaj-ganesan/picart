import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import EditorPage from '../containers/EditorPage';

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/editor" component={EditorPage} />
    </Switch>
  </HashRouter>
);

export default Routes;
