import React from "react";
import { FaPaw } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <FaPaw className="icon" />
        <h1> Coin<span className="orange">Zoo</span></h1>
      </div>
    </div>
  );
};

export default Navbar;
