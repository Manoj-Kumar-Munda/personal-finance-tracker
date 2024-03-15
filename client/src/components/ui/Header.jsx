import React from "react";
import { NavLink } from "react-router-dom";
import { IoWalletOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Header = () => {
    const { userInfo } = useSelector( (store) => store.auth)
  return (
    <header className="bg-white  shadow-md">
      <nav className="lg:w-4/5 mx-auto flex justify-between items-center py-4">
        <div>
          <div className="inline-flex items-center gap-2">
            <IoWalletOutline size={35} color="red" />
            <h2 className="text-3xl font-bold  text-blue-600 font-Poppins cursor-pointer">
              FinTrack
            </h2>
          </div>
        </div>

        <ul className="flex gap-4"> 
          <li>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                `font-semibold text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-xl transition-all ${isActive && "text-white bg-blue-600 "}`
              }
            >
                Login
              
            </NavLink>
          </li>

          
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
