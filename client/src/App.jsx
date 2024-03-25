import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";
import ProtectedRoutes from "./Layouts/ProtectedRoutes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Budgets from "./pages/Budgets/Budgets";
import ExpensesPage from "./pages/ExpensesPage";
import Profile from "./pages/Profile";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />

          },
          {
            path: "/budgets",
            element: <Budgets />,
          },
          {
            path: "/expenses",
            element: <ExpensesPage />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
