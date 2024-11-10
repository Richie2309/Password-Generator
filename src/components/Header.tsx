import React from "react";
import RPG_logo from '../assets/RPG_logo.jpg'
const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={RPG_logo} alt="RPG Logo" className="h-24 w-24" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
