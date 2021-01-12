import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './views/login.js';
import savedJobs from './views/savedJobs.js';

import landingPage from './views/landingPage.js';
function App() {
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
          We are poor and young software engineers who has passion to help other
          engineers grow and find a job. Show some love by:
        </p>
        <button>Donate Us</button>
      </div>
    </Suspense>
  );
}
export default App;
