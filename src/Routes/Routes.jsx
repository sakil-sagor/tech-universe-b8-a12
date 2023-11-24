import { createBrowserRouter } from "react-router-dom";
import ErroPage from "../Components/SharedComp/ErrorPage/ErroPage";
import Main from "../Layout/Main";
import Home from "../Pages/FrontendPages/Home/Home";
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
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
]);

export default router;
