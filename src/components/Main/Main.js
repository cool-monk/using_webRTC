import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoRecording from '../doRecording/DoRecording';
import AboutUs from '../about/AboutUs';

function Main() {
  return (
    <div>
      {/* routes */}
      <Switch>
        <Route exact path='/'>
          <DoRecording />
        </Route>
        <Route path='/about'>
          <AboutUs />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
