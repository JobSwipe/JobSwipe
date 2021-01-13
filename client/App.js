import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './views/login.js';
import savedJobs from './views/savedJobs.js';
import { Button } from '@chakra-ui/react';
import landingPage from './views/landingPage.js';
function App() {
  // check if cookies exists: if exist, update the auth to true

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Switch>
          <Route exact path="/" component={landingPage} />

          <Route path="/login" component={LoginPage} />

          <Route exact path="/savedJobs" component={savedJobs} />
        </Switch>
      </div>
      <div
        style={{
          height: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
        }}
      >
        <p>
          We are poor and young software engineers who have passion to help
          other engineers grow and find a job. Show some love by:
        </p>
        <Button size="xs">Donate Us ❤️</Button>
      </div>
    </Suspense>
  );
}
export default App;
