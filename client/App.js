import React, { Suspense, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./views/login.js";
import savedJobs from "./views/savedJobs.js";
import { Button } from "@chakra-ui/react";
import landingPage from "./views/landingPage.js";
import { UserContext } from "./context/userContext.js";
function App() {
  // check if cookies exists: if exist, update the auth to true
  const [user, setUser] = useState({
    _id: 0,
    name: "",
    loggedIn: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching.................");
      const result = await axios(
        `http://localhost:3333/auth/google/redirect` // _id:2
      );
      console.log(result.data, "this is the result from auth/google/redirect");

      setUser(result.data);
    };

    fetchData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path="/" component={landingPage} />

            <Route path="/login" component={LoginPage} />

            <Route path="/savedJobs" component={savedJobs} />
          </Switch>
        </UserContext.Provider>
      </div>
      <div
        style={{
          height: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
        }}
      >
        <p>
          We are poor and young software engineers who are passionate to help
          other engineers grow and find a job. Show some love by:
        </p>
        <Button size="xs">Donate ❤️</Button>
      </div>
    </Suspense>
  );
}
export default App;
