//  This component is used to scan the users QRcode and add the
//  apartmentID to the user's document on the mongodb Database

import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export const AddUser = ({ employee }) => {
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

    function success(result) {
      scanner.clear();
      setScanResults(result);
    }

    function error(err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    async function updateUserWithApartment() {
      if (scanResults) {
        try {
          await Axios.patch("https://dryexpress.herokuapp.com/usersQR", {
            userID: scanResults, // Use the scanned QR code result here
            apartmentId: localStorage.getItem("ApartmentID"), // Gets apartmentID from localstorage instead of from employee
          });
        } catch (error) {
          console.error(error);
        }
      }
    }

    updateUserWithApartment();
  }, [scanResults]);

  return (
    <div>
      {scanResults ? <div>{scanResults}</div> : <div id="reader"></div>}
    </div>
  );
};
