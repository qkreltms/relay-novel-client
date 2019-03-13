import React, { Component } from "react";
import Appbar from "./components/header/Appbar";

interface IProps {
  setLocale: (lang: string) => void;
}

class App extends Component {
  public render() {
    return (
      <div className="App">
        <Appbar/>
      </div>
    );
  }
}

export default App;
