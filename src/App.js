import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { push } from "connected-react-router";

import { Container, GlobalStyles } from "./styles";
import { Login, Display } from "./features";
import { FlashMsg } from "./components";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("x-test-app-jwt-token")) {
      dispatch(push("/display"));
    } else {
      dispatch(push("/"));
    }
  });

  return (
    <>
      <GlobalStyles />
      <FlashMsg />
      <Container>
        <Switch>
          <Route path="/display" component={Display} />
          <Route path="/" component={Login} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
