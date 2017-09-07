import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Learn from '../containers/LearnContainer';
import Gallery from '../containers/GalleryContainer';
import Create from '../containers/CreateContainer';


export default () => (
  <main>
    <Switch>
      <Route exact path="/" component={Gallery} />
      <Route path="/create" component={Create} />
      <Route path="/learn" component={Learn} />
      <Route component={Gallery} />
    </Switch>
  </main>
);
