import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/SharedComp/Loading/Loading";
import { AuthContext } from "../Context/AuthProvider";
import userRole from "../hooks/userRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userDetails, isAdminLoading] = userRole();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && userDetails) {
    return children;
  }
  return (
    <Navigate
      to="/registration"
      state={{ form: location, replace: true }}
    ></Navigate>
  );
};

export default AdminRoute;
