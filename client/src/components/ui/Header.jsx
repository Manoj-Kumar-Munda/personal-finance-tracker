import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Button from "../form/Button";
import useLogout from "../../hooks/useLogout";
import { logout } from "../../utils/slices/authSlice";

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
    <header className="bg-white  shadow-md">
      <nav className="px-2 lg:w-4/5 mx-auto flex justify-between items-center py-4">
        <div>
          <div className="inline-flex items-center gap-2">
            <IoWalletOutline size={35} color="#f87171" />
            <h2 className="text-3xl font-bold  text-blue-600 font-Poppins cursor-pointer">
              FinTrack
            </h2>
          </div>
        </div>

        <ul className="flex gap-4 items-center">
          {userInfo && (
            <li className="" title="Profile">
             
              <div className="rounded-full border border-blue-600 overflow-hidden">
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
                  `font-semibold text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-xl transition-all ${
                    isActive && "text-white bg-blue-600 "
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
