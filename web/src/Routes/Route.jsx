import { Outlet, useRoutes } from "react-router-dom";
import Home from "../pages/admin/home/Home";
import DrawerAppBar from "../layout/admin/Dashboarh";
import List from "../pages/admin/products/List";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import User from "../pages/admin/user/User";
import CreateProduct from "../pages/admin/products/add/ProductForm";
import Category from "../pages/admin/category";
import EditProducts from "../pages/admin/products/edit/EditProducts";
import AddCategory from "../pages/admin/category/category/add/Add";
import EditCategory from "../pages/admin/category/category/edit/EditCategory";
import { Web } from "../pages/web/home";
import Product from "../pages/web/shop/product";
import ShowProduct from "../pages/web/shop/ShowProduct";
import Profile from "../pages/web/profile/Profile";
export default function RootRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element:
        <DrawerAppBar>
          <Outlet />
        </DrawerAppBar>, 
      children: [
        { path: "dashboard", element: <Home /> },
        { path: "dashboard/products", element: <List /> },
        { path: "dashboard/products/add", element: <CreateProduct /> },
        { path: `/dashboard/products/:id`, element: <EditProducts /> },
        { path: "/dashboard/user", element: <User /> },
        { path: "/dashboard/category", element: <Category /> },
        { path: "/dashboard/category/add", element: <AddCategory /> },
        { path: "/dashboard/category/edit/:id", element: <EditCategory /> },
      ],
    }, {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Web />,
    },
       {
      path: "/product",
      element: <Product />,
    },
    {
      path: `/product/show/:id`,
      element: <ShowProduct />,
    }, {
      path: "/profile",
      element: <Profile />,
    }
  ]);
  return routes;
}
