import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { axiosSecure } from "./useAxios";

const userRole = () => {
  const { user } = useContext(AuthContext);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [userDetails, setUserDetials] = useState({});

  useEffect(() => {
    setIsAdminLoading(true);
    axiosSecure.get(`/user/${user?.email}`).then((res) => {
      setUserDetials(res?.data?.data);
      setIsAdminLoading(false);
    });
  }, [user?.email]);

  return [userDetails, isAdminLoading];
};

export default userRole;
