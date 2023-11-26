import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Components/DashboradComp/AddProduct/AddProduct";
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
        loader: async () => {
          try {
            const response = await fetch(
              "http://localhost:5000/api/v1/product/all"
            );
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
          }
        },
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
