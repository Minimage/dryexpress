import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

export const HomePage = ({ user, onLogout }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    onLogout(); // Call the onLogout callback
  };

  console.log(user);

  return (
    <div>
      <h1>Welcome, {user.firstName}</h1>
      <QRCode size={120} value={user._id} />

      {/* Other content */}
    </div>
  );
};
