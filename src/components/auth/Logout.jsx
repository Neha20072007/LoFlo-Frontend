import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // To redirect after logout

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page or any other page
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
    >
      Logout
    </button>
  );
};

export default Logout;
