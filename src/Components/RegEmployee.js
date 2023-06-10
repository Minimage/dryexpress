import React, { useEffect } from "react";
import Axios from "axios";

useEffect(() => {
  Axios.get("https://dryexpress.herokuapp.com/getApartments")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {});
}, []);

export const RegEmployee = () => {
  return <div>RegEmployee</div>;
};
