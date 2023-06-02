import "./App.css";
import logo from "./logo.svg";

import Axios from "axios";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [people, setPeople] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [scanResults, setScanResults] = useState(null);

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

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResults(result);
    }

    function error() {
      console.log(error);
    }

    scanner.render();
  }, []);

  const addUser = () => {
    console.log("test");
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
        <label>Last Name</label>
        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
        />

        <button onClick={addUser}>Create User</button>
      </div>
      <div>
        <h2>Users</h2>
        {people.map((item) => {
          const test = <QRCode size={120} value={item._id} />;
          return (
            <div className="user">
              {item.firstName} {test}
            </div>
          );
        })}
      </div>
      <div id="reader"></div>
    </div>
  );
}

export default App;
