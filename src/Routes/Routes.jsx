import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/DashboradComp/AddProduct/AddProduct";
import ProductsDetails from "../Components/FrontendComp/ProductsDetails/ProductsDetails";
import ErroPage from "../Components/SharedComp/ErrorPage/ErroPage";
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
        path: "/addProducts",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);

export default router;
