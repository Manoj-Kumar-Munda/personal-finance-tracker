import { useSelector } from "react-redux";
import Header from "../components/ui/Header";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
