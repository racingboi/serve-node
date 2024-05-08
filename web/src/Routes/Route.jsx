import { Outlet, useRoutes } from "react-router-dom";
import Home from "../pages/admin/home/Home";
import DrawerAppBar from "../layout/admin/Dashboarh";
import List from "../pages/admin/products/List";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";

export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element:
        <DrawerAppBar>
          <Outlet />
        </DrawerAppBar>, 
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <List />},
      ],
    }, {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    }
  ]);
  return routes;
}
