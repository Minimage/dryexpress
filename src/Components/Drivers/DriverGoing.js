import Axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useState, useEffect } from "react";


export const DriverGoing = () => {
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
      const aptID = localStorage.getItem("apartmentID");
      console.log(result);
      console.log(localStorage.getItem("apartmentID"));
      console.log(aptID);
      try {
        await Axios.post(`https://dryexpress.herokuapp.com/createOrder`, {
          userId: result,
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
      <div id="reader"></div>
    </div>
  );
 
};
