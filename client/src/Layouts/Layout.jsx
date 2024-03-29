
import Header from "../components/ui/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen relative grid grid-rows-[auto,1fr] ">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
