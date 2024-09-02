import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Update the path as needed
import logo from '../assets/leaf3.svg';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 text-[#e2dbbe]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 object-cover"
          />
          <NavLink
            to="/"
            className="text-2xl font-bold hover:underline decoration-wavy underline-offset-2"
            onClick={() => setIsMenuOpen(false)}
          >
            LoFlo
          </NavLink>
        </div>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden p-2 rounded-md text-[#e2dbbe] hover:bg-[#5a7a5c] focus:outline-none focus:ring-2 focus:ring-[#a1a87d]"
          onClick={handleMenuToggle}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
          {isAuthenticated ? (
            <div className="flex gap-6 items-center">
              {/* ToDos Tab */}
              <NavLink
                to="/index"
                className={({ isActive }) =>
                  `text-[#e2dbbe] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform ${
                    isActive ? 'underline decoration-wavy decoration-[#739573] underline-offset-4' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                ToDos
              </NavLink>

              {/* Bored? Tab */}
              <NavLink
                to="/bored"
                className={({ isActive }) =>
                  `text-[#e2dbbe] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform ${
                    isActive ? 'underline decoration-wavy decoration-[#739573] underline-offset-4' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Bored?
              </NavLink>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-[#e2dbbe] px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:underline decoration-wavy underline-offset-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-8">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-xl font-bold hover:underline decoration-wavy underline-offset-2 transition ${
                    isActive ? 'underline decoration-wavy decoration-[#739573] underline-offset-4' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-xl font-bold hover:underline decoration-wavy underline-offset-2 transition ${
                    isActive ? 'underline decoration-wavy decoration-[#739573] underline-offset-4' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
