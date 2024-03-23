import { useContext } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../../Context/AuthProvider";
import useAxios from "../../../hooks/useAxios";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const result = await signIn(email, password);

      await axiosSecure.post(
        "https://tech-server-12.vercel.app/api/v1/accesstoken/generatetoken",
        { email: result?.user?.email }
      );

      toast.success("User login successfully");

      setTimeout(function () {
        navigate(location?.state ? location.state?.form?.pathname : "/");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleLogin();
      if (result?.user?.email) {
        console.log(result);
        await axiosSecure.post(
          "https://tech-server-12.vercel.app/api/v1/accesstoken/generatetoken",
          { email: result?.user?.email }
        );
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          role: "user",
        };
        axiosSecure.post("/user", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            toast.success("User login successfully");
            setTimeout(function () {
              navigate(location?.state ? location.state?.form?.pathname : "/");
            }, 500);
          }
        });

        // setTimeout(function () {
        //   navigate(location?.state ? location.state : "/");
        // }, 500);
      } else {
        // Handle registration failure here
        console.error("User registration failed");
        toast.error("User registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className=" bg-sky-50">
      <div className="md:flex justify-center md:m-0">
        <div className="md:w-96 px-4 py-8  bg-white rounded-md shadow-2xl shadow-blue-300">
          <form className="" onSubmit={handleLogin}>
            <div className="">
              <div className="mb-3 ">
                <span className=" text-gray-600 font-semibold block mb-2 ">
                  Email
                </span>
                <input
                  placeholder=" Your Email "
                  required
                  className="p-2 w-full  bg-white border border-gray-400 rounded-md "
                  type="email"
                  name="email"
                />
              </div>

              <div className="mb-6 ">
                <span className=" text-gray-600 font-semibold block mb-2">
                  Password
                </span>
                <input
                  placeholder="Password"
                  type="password"
                  required
                  className="p-2 w-full   bg-white border border-gray-400 rounded-md "
                  name="password"
                />
              </div>

              <div className="mb-6">
                <button
                  className=" py-2 text-sm w-full text-white cursor-pointer rounded bg-sky-800 uppercase hover:bg-sky-900"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-between text-sm w-full">
            <p>
              <button
                onClick={handleGoogleSignIn}
                className="border px-2 py-1 rounded bg-sky-200 hover:bg-sky-300 duration-200"
              >
                <AiFillGoogleCircle className="inline-block text-3xl text-gray-600 "></AiFillGoogleCircle>
                Google
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} theme="colored" />
    </div>
  );
};

export default Login;
