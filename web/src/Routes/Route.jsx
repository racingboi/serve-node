import { Outlet, useRoutes } from "react-router-dom";
import Home from "../pages/admin/home/Home";
import DrawerAppBar from "../layout/admin/Dashboarh";
import List from "../pages/admin/products/List";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import User from "../pages/admin/user/User";
import CreateProduct from "../pages/admin/products/add/ProductForm";
import Category from "../pages/admin/category";
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
        { path: "products", element: <List /> },
        { path: "products/add", element: <CreateProduct />},
        { path: "user", element: <User /> },
        { path: "category", element: <Category /> },
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
