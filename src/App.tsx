import React, { Component } from "react";
import Router from "./router";
import socketio from "./config/socketio";
socketio()

class App extends Component {
  public render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
