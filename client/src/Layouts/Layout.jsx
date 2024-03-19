
import Header from "../components/ui/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen relative grid">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
