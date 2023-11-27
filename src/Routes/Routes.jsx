import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/DashboradComp/AddProduct/AddProduct";
import MyProducts from "../Components/DashboradComp/MyProducts/MyProducts";
import ViewProfile from "../Components/DashboradComp/ViewProfile/ViewProfile";
import ProductsDetails from "../Components/FrontendComp/ProductsDetails/ProductsDetails";
import ErroPage from "../Components/SharedComp/ErrorPage/ErroPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Home from "../Pages/FrontendPages/Home/Home";
import Products from "../Pages/FrontendPages/Products/Products";
import Registration from "../Pages/FrontendPages/RegistrationPage/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErroPage></ErroPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "products",
        element: <Products></Products>,
      },
      {
        path: "product/:_id",
        element: <ProductsDetails></ProductsDetails>,
      },

      {
        path: "registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "dashboard",
        element: <ViewProfile></ViewProfile>,
      },
      {
        path: "dashboard/addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "dashboard/myproduct",
        element: <MyProducts></MyProducts>,
      },
    ],
  },
]);

export default router;
