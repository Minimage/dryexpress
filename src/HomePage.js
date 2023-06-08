import React from "react";

export const HomePage = (props) => {
  console.log(props.user.firstName);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
};
