import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HamburgurMenu = ({handleLogout}) => {
    const userInfo = useSelector(store => store.auth)
  return (
    <div className="absolute font-Poppins z-30 top-[calc(100%+1rem)] right-1 border bg-white px-4 py-3 rounded-xl w-56">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-2">
          <span className="cursor-pointer">
            <Link to={"/dashboard"}>Dashboard</Link>
          </span>
          <span className="cursor-pointer">
            <Link to={"/budgets"}>Budgets</Link>
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {userInfo ? (
            <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
          ) : (
            <>
              <span className="cursor-pointer">
                <Link to={"/login"}>Login</Link>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HamburgurMenu;
