import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import { default as userRole } from "../../hooks/userRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { userDetails, isAdminLoading } = userRole();
  console.log(user, userDetails);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && userDetails) {
    return children;
  }
  return (
    <Navigate to="/registration" state={{ form: location }} replace></Navigate>
  );
};

export default AdminRoute;
