import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import CreateProject from "./pages/CreateProject";
import EditMode from "./pages/EditMode";

// css
import "./styles.scss";

const App = () => (
  <React.Fragment>
    <Router>

      <Route exact path="/" component={CreateProject} />
      <Route path="/editmode" component={EditMode}/>

    </Router>
  </React.Fragment>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
