import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    Axios.get("https://dryexpress.herokuapp.com/readUser")
      .then((res) => {
        setPeople(res.data);
        console.log("test");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {people.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
}

export default App;
