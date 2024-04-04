import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../form/Button";
import useLogout from "../../hooks/useLogout";
import { logout } from "../../utils/slices/authSlice";
import Logo from "./Logo";
import { FaAngleDown } from "react-icons/fa";
import HamburgurMenu from "./HamburgurMenu";
import { removeAllBudgets } from "../../utils/slices/budgetSlice";

const Header = () => {
  const { userInfo } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await useLogout();
      dispatch(logout());
    } catch (error) {
      dispatch(logout());
      dispatch(removeAllBudgets())
    }
  };
  return (
    <header className="shadow-md">
      <nav className=" px-2 w-full max-w-screen-xl mx-auto flex justify-between items-center py-4">
        <Logo />

        <ul className="hidden sm:flex gap-4 items-center">
          <li>
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `font-semibold text-gray-700 transition-colors ${
                  isActive && "text-indigo-500"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/budgets"}
              className={({ isActive }) =>
                `font-semibold text-gray-700 transition-colors ${
                  isActive && "text-indigo-500"
                }`
              }
            >
              Budgets
            </NavLink>
          </li>
        </ul>

        <ul className="hidden sm:flex gap-4 items-center">
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
                  `font-semibold  border-2 border-primary px-6 py-2 rounded-xl transition-all`
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

        <div className="flex sm:hidden items-center gap-2 relative">
          <span className="font-Poppins">Menu</span>
          <button onClick={() => setShowMenu(prev => !prev)}>
            <FaAngleDown />
          </button>

          {
            showMenu && <HamburgurMenu handleLogout={handleLogout} />
          }

         
        </div>
      </nav>
    </header>
  );
};

export default Header;
