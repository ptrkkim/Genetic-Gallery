import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Intro from './Intro';
import Create from '../containers/CreateContainer';

export default () => (
  <main>
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route path="/create" component={Create} />
      <Route path="/learn" component={Intro} />
    </Switch>
  </main>
);
