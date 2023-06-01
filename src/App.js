import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [firstName, setFirstName] = useState("ok");
  const [lastName, setLastName] = useState("ok");

  useEffect(() => {
    Axios.get("https://dryexpress.herokuapp.com/readUser")
      .then((res) => {
        console.log(res.data);
        setPeople(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addUser = () => {
    Axios.post("https://dryexpress.herokuapp.com/create", {
      firstName: firstName,
      lastName: lastName,
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="App">
      test
      <div>
        <h2>Create User</h2>
        <label>First Name</label>
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
        />
        <label
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        >
          Last Name
        </label>
        <input onClick={addUser} type="text" />

        <button>Create User</button>
      </div>
      <div>
        <h2>Users</h2>
        {people.map((item) => {
          return <div>{item.firstName}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
