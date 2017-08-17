import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Intro from './Intro';

export default () => (
  <main>
    <Switch>
      <Route path="/" component={Intro} />
    </Switch>
  </main>
);
