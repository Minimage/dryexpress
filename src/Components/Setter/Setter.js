import React, { useEffect, useState } from "react";
import Axios from "axios";

export const Setter = () => {
  const [apartments, setApartments] = useState([]);
  useEffect(() => {
    Axios.get("https://dryexpress.herokuapp.com/getApartments")
      .then((response) => {
        setApartments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getApartments = () => {
    return <div></div>;
  };

  const handleClick = (item) => {
    console.log(item);
  };

  return (
    <div>
      {apartments.map((item, index) => {
        return (
          <div className="wrapper">
            <div className="apartmentName">{item.apparmentName}</div>
            <div className="apartmentAddress">{item.address}</div>
            <button
              onClick={() => {
                localStorage.setItem("ApartmentID", item._id);
              }}
            >
              Set Apartment
            </button>
            <br />
            <br />
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};
