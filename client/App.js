import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './views/login.js';
import savedJobs from './views/savedJobs.js';
import footer from './views/footer.js';
import landingPage from './views/landingPage.js';
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={landingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/savedJobs" component={savedJobs} />
      </Switch>
      <footer />
    </Suspense>
  );
}
export default App;
