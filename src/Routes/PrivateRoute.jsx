import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/SharedComp/Loading/Loading";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  // return <Navigate to="/registration" state={{ form: location, replace: true }} ></Navigate>
  // return <Navigate state={location.pathname} to="/registration"></Navigate>;
  return (
    <Navigate
      to="/registration"
      state={{ form: location, replace: true }}
    ></Navigate>
  );
};

export default PrivateRoute;
