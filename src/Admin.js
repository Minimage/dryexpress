import "./App.css";
import logo from "./logo.svg";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";

import Axios from "axios";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export const Admin = () => {
  const [people, setPeople] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [scanResults, setScanResults] = useState(null);
  const [userId, setUserId] = useState("");
  const [getuserInfo, setGetUserInfo] = useState("");
  const [test, setTest] = useState("");
  const [orders, setOrders] = useState([]);
  const [signup, setSignup] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    Axios.get("https://dryexpress.herokuapp.com/orders")
      .then((response) => {
        const data = response.data;
        setOrders(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Gets all users and stores them in the setPeople variable
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

    async function success(result) {
      scanner.clear();
      setScanResults(result);
      setTest(result);

      try {
        await Axios.post(
          `https://dryexpress.herokuapp.com/createOrder?userId=${result}`,
          {
            userId: result,
            apartmentID: localStorage.getItem(apartmentID),
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    function error(err) {
      console.log(err);
    }
  }, []);

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner("reader", {
  //     qrbox: {
  //       width: 250,
  //       height: 250,
  //     },
  //     fps: 5,
  //   });

  //   scanner.render(success, error);

  //   function success(result) {
  //     scanner.clear();
  //     setScanResults(result);
  //   }

  //   function error() {
  //     console.log(error);
  //   }

  //   scanner.render();
  // });

  // useEffect(() => {
  //   if (scanResults !== null) {
  //     Axios.post("http://dryexpress.herokuapp.com/createOrder", {
  //       userId: scanResults.userId,
  //     })
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [scanResults]);

  // // Rest of your code...

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

  // This allows me to to get the user information by sending the userid in a get request via params
  const sendUserId = () => {
    Axios.get(`https://dryexpress.herokuapp.com/users/${userId}`)
      .then((response) => {
        console.log(response.data); // Handle the response data
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
  };

  const userAuth = () => {
    Axios.get("https://dryexpress.herokuapp.com/isUserAuthenticated", {
      headers: { "x-access-token": localStorage.getItem("token") },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getUserInfo = () => {
  //   Axios.get("http://dryexpress.herokuapp.com/getUserInfo")
  //     .then((res) => {})
  //     .catch((err) => {});
  // };

  // useEffect(() => {
  //   if (scanResults !== null) {
  //     Axios.post("https://dryexpress.herokuapp.com/createOrder", {
  //       userId: scanResults,
  //     })
  //       .then((response) => {})
  //       .catch((error) => {
  //         console.error(error); // Handle any errors
  //       });
  //   }
  // }, [scanResults]);

  return (
    <div className="App">
      <Signup />
      <Login />
      <button>Signup</button>
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
      <div>
        Test Id's
        <input
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
      </div>
      {scanResults ? <div>{scanResults}</div> : <div id="reader"></div>}
      {orders
        ? orders.map((order) => (
            <div key={order._id}>
              <p>First Name: {order.firstName}</p>
              <p>Last Name: {order.lastName}</p>
              <p>Date and Time: {order.formattedDateTime}</p>
            </div>
          ))
        : ""}
      <button onClick={userAuth}>Check auth</button>
    </div>
  );
};
