import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export const AddUser = () => {
  const [scanResults, setScanResults] = useState(null);
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

      try {
        await Axios.post(`https://dryexpress.herokuapp.com/usersQR`, {
          userID: scanResults,
          apartmentId: "testing",
        });
      } catch (error) {
        console.error(error);
      }
    }

    function error(err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      {scanResults ? <div>{scanResults}</div> : <div id="reader"></div>}
    </div>
  );
};
