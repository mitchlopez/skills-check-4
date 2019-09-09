import React from "react";
import "./App.css";
import Greeting from "./components/Greeting";
import ReduxExample from "./components/ReduxExample";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <Greeting />
      <ReduxExample />
      {routes}
    </div>
  );
}

export default App;
