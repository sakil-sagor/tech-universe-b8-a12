import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/DashboradComp/AddProduct/AddProduct";
import ManageUsers from "../Components/DashboradComp/ManageUsers/ManageUsers";
import MyProducts from "../Components/DashboradComp/MyProducts/MyProducts";
import ProductReview from "../Components/DashboradComp/ProductReview/ProductReview";
import ReportedContents from "../Components/DashboradComp/ReportedContents/ReportedContents";
import ViewProfile from "../Components/DashboradComp/ViewProfile/ViewProfile";
import ProductsDetails from "../Components/FrontendComp/ProductsDetails/ProductsDetails";
import ErroPage from "../Components/SharedComp/ErrorPage/ErroPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Home from "../Pages/FrontendPages/Home/Home";
import Products from "../Pages/FrontendPages/Products/Products";
import Registration from "../Pages/FrontendPages/RegistrationPage/Registration";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <ProductsDetails></ProductsDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <ViewProfile></ViewProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/myproduct",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reviewproduct",
        element: (
          <PrivateRoute>
            <ProductReview></ProductReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reportedcontent",
        element: (
          <PrivateRoute>
            <ReportedContents></ReportedContents>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manageusers",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
