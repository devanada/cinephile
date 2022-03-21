import Header from "../components/Header";
import "../styles/App.css";

export default function Functional() {
  const handleClick = async () => {
    console.log("TEST");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header
          label="save to reload (Functional)"
          data={[
            { id: 1, title: "Test", description: "Test", image: "LINK_URL" },
            { id: 2, name: "Test", description: "Test", image: "LINK_URL" },
          ]}
        />
        <button onClick={() => handleClick()}>CLICK ME</button>
      </header>
    </div>
  );
}
