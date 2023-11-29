import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { axiosSecure } from "./useAxios";

const userRole = () => {
  const { user } = useContext(AuthContext);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [userDetils, setUserDetials] = useState({});

  useEffect(() => {
    setIsAdminLoading(true);

    axiosSecure.get(`/user/${user?.email}`).then((res) => {
      // console.log(res.data.data);
      setUserDetials(res?.data?.data);
      setIsAdminLoading(false);
    });
  }, [user?.email]);

  // console.log(userDetils);
  return { userDetils, isAdminLoading };
};

export default userRole;
