import React from 'react';
import grass from '../assets/grass2.svg';

function Footer() {
  return (
    <footer className="relative flex justify-center text-[#f4e285] py-12">
      <div className="absolute inset-0">
        <img 
          src={grass}
          alt="Footer Image" 
          className="w-full h-full object-cover opacity-30" 
        />
      </div>
      <div className="container mx-auto px-40 relative z-10"> {/* Ensure text is above the image */}
        <div className="flex flex-wrap justify-center mb-12">
          <p className="text-center">
            🌿Made by <a href="https://www.linkedin.com/in/neha-katiyar/" className="hover:underline decoration-wavy underline-offset-2">Neha Katiyar</a> who wants you to finish your ToDos🌿
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;