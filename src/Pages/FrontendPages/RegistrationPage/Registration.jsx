import { useState } from "react";
import Login from "../../../Components/SharedComp/RegistrationComp/Login";
import SignUp from "../../../Components/SharedComp/RegistrationComp/SignUp";

const Registration = () => {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  const loginArea = () => {
    setLogin(true);
    setSignup(false);
  };
  const signupArea = () => {
    setSignup(true);
    setLogin(false);
  };
  return (
    <div className=" bg-sky-50 min-h-screen">
      <div className="full-width-all pb-16">
        <div className=" mb-4 m-auto pt-16 md:w-96">
          <div className="px-4 w-full py-6 bg-white flex justify-between  shadow-2xl shadow-blue-300 rounded ">
            <button
              className={`bg-sky-200 px-8 py-2 rounded-full ${
                login && "bg-sky-700 text-white"
              }`}
              onClick={loginArea}
            >
              Login
            </button>

            <button
              className={`bg-sky-200 px-8 py-2 rounded-full ${
                signup && "bg-sky-700 text-white"
              }`}
              onClick={signupArea}
            >
              Registration
            </button>
          </div>
        </div>

        <div>
          {login && (
            <div className="">
              <Login></Login>
            </div>
          )}
          {signup && (
            <div className="">
              <SignUp loginArea={loginArea}></SignUp>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
