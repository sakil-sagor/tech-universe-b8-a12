import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/DashboradComp/AddProduct/AddProduct";
import ManageUsers from "../Components/DashboradComp/ManageUsers/ManageUsers";
import MyProducts from "../Components/DashboradComp/MyProducts/MyProducts";
import ProductReview from "../Components/DashboradComp/ProductReview/ProductReview";
import ReportedContents from "../Components/DashboradComp/ReportedContents/ReportedContents";
import UpdateProduct from "../Components/DashboradComp/UpdateProduct/UpdateProduct";
import ViewProfile from "../Components/DashboradComp/ViewProfile/ViewProfile";
import ProductsDetails from "../Components/FrontendComp/ProductsDetails/ProductsDetails";
import ErroPage from "../Components/SharedComp/ErrorPage/ErroPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Home from "../Pages/FrontendPages/Home/Home";
import Products from "../Pages/FrontendPages/Products/Products";
import Registration from "../Pages/FrontendPages/RegistrationPage/Registration";
import AdminRoute from "./AdminRoute";
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
        element: <ViewProfile></ViewProfile>,
      },
      {
        path: "/dashboard/addproduct",
        element: <AddProduct></AddProduct>,
      },

      {
        path: "/dashboard/myproduct",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/updateproduct/:_id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "/dashboard/reviewproduct",
        element: (
          <AdminRoute>
            <ProductReview></ProductReview>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportedcontent",
        element: (
          <AdminRoute>
            <ReportedContents></ReportedContents>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageusers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
