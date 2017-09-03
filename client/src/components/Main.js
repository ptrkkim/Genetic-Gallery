import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Intro from './Intro';
import Gallery from '../containers/GalleryContainer';
import Create from '../containers/CreateContainer';


export default () => (
  <main>
    <Switch>
      <Route exact path="/" component={Gallery} />
      <Route path="/create" component={Create} />
      <Route path="/learn" component={Intro} />
      <Route component={Intro} />
    </Switch>
  </main>
);
