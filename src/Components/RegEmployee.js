import React, { useEffect } from "react";
import Axios from "axios";

export const RegEmployee = () => {
  useEffect(() => {
    Axios.get("https://dryexpress.herokuapp.com/getApartments")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {});
  }, []);
  return <div>RegEmployee</div>;
};
