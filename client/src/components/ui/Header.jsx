import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Button from "../form/Button";
import useLogout from "../../hooks/useLogout";
import { logout } from "../../utils/slices/authSlice";
import Logo from "./Logo";
import { TfiDashboard } from "react-icons/tfi";


const Header = () => {
  const { userInfo } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await useLogout();

      console.log(" res: ", res);
      dispatch(logout());
    } catch (error) {
      console.log("error: ", error);
      dispatch(logout());
    }
  };
  return (
    <header className="shadow-md">
      <nav className="px-2 lg:w-4/5 mx-auto flex justify-between items-center py-4">
        <Logo />

        <ul className="flex gap-4 items-center">
          <li>
            <NavLink 
              to={"/dashboard"}
              className={({ isActive }) => `font-semibold text-gray-700 transition-colors ${isActive && "text-indigo-500"}`}
            >
              
                Dashboard
            
            </NavLink>
          </li>
        </ul>

        <ul className="flex gap-4 items-center">
          {userInfo && (
            <li className="" title="Profile">
              <div className="rounded-full overflow-hidden">
                <Link to={"/profile"}>
                  <img src={userInfo.avatar} className="w-12 h-12 " />
                </Link>
              </div>
            </li>
          )}

          {userInfo ? (
            <li>
              <Button
                className="text-white text-sm font-semibold transition-colors bg-red-500 hover:bg-red-400"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  `font-semibold bg-white  border-2 border-primary px-6 py-2 rounded-xl transition-all ${
                    isActive && "text-white  bg-primary "
                  }`
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
