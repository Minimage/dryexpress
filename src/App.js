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
  const [address, setAddress] = useState("");
  const [scanResults, setScanResults] = useState(null);
  const [userId, setUserId] = useState("");
  const [getuserInfo, setGetUserInfo] = useState("");

  useEffect(() => {
    Axios.post("http://dryexpress.herokuapp.com/createOrder", {
      userId: scanResults,
    });
  }, scanResults);

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
      address: address,
    }).catch((err) => {
      console.log(err);
    });
  };

  const sendUserId = () => {
    Axios.get(`https://dryexpress.herokuapp.com/users/${userId}`)
      .then((response) => {
        console.log(response.data); // Handle the response data
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
  };

  // const getUserInfo = () => {
  //   Axios.get("http://dryexpress.herokuapp.com/getUserInfo")
  //     .then((res) => {})
  //     .catch((err) => {});
  // };

  return (
    <div className="App">
      test
      <div className="create">
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

        <label>Address</label>
        <input
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        {address}

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
      <div>
        Test Id's
        <input
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <button onClick={createOrder}>Check Id</button>
      </div>
    </div>
  );
}

export default App;
