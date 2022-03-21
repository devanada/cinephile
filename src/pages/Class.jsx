import { Component } from "react";
import Header from "../components/Header";
import "../styles/App.css";

export default class Class extends Component {
  constructor(props) {
    super();
  }

  async handleClick() {
    console.log("test");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header
            label="save to reload (Class)"
            data={[
              { id: 1, title: "Test", description: "Test", image: "LINK_URL" },
              { id: 2, name: "Test", description: "Test", image: "LINK_URL" },
            ]}
            component="Class"
          />
          <button onClick={() => this.handleClick()}>CLICK ME</button>
        </header>
      </div>
    );
  }
}
