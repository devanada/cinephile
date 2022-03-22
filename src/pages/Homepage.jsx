import { Component } from "react";
import { Layout } from "../components/Layout";
import Header from "../components/Header";
import "../styles/App.css";

export default class Homepage extends Component {
  constructor(props) {
    super();
    this.state = {
      label: "save to reload (Class)",
      data: [],
      isReady: false,
      idTodos: 0,
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const datas = JSON.parse(localStorage.getItem("data"));
    this.setState({ data: datas ? datas : [], isReady: true });
  }

  render() {
    if (this.state.isReady) {
      return (
        <div className="main-con">
          <Header />
          <Layout>
            <p className="text-white">Test</p>
          </Layout>
        </div>
      );
    } else {
      return (
        <div className="container">
          <p>LAGI LOADING</p>
        </div>
      );
    }
  }
}
