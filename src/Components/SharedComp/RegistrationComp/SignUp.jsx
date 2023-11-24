import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";

const SignUp = ({ loginArea }) => {
  const { createUser, updateProfileName, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    if (password.length < 6) {
      toast.error("Password length is less then 6 charecter");
      return;
    }
    if (!capitalLetterRegex.test(password)) {
      toast.error("Password must contain at least one capital letter.");
      return;
    }

    if (!specialCharacterRegex.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }

    // create user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        const user = result.user;
        setUser(user);
        updateProfileName();
        // saveUser(disName, user.email, 'POST')

        toast.success("User Register successfully ");
        setTimeout(function () {
          navigate(location?.state ? location.state : "/");
        }, 500);
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(error.message);
      });
  };
  return (
    <div className=" bg-sky-50">
      <div className="">
        <form className="md:flex justify-center" onSubmit={handleSubmit}>
          <div className="md:w-96 px-4  py-8 border-2 rounded-md bg-white shadow-2xl shadow-blue-300">
            <div className="mb-2 ">
              <span className=" text-gray-600 font-semibold block mb-2 ">
                {" "}
                Name
              </span>
              <input
                placeholder=" Name"
                required
                className="p-2 w-full  bg-white border border-gray-400 rounded-md"
                type="text"
                name="name"
              />
            </div>
            <div className="mb-2 ">
              <span className=" text-gray-600 font-semibold block mb-2 ">
                {" "}
                Email{" "}
              </span>
              <input
                name="email"
                placeholder=" Email"
                type="email"
                required
                className="p-2 w-full  bg-white border border-gray-400 rounded-md"
              />
            </div>

            <div className="mb-2 ">
              <span className=" text-gray-600 font-semibold block mb-2 ">
                {" "}
                Password{" "}
              </span>
              <input
                name="password"
                placeholder="Password"
                type="password"
                required
                className="p-2 w-full  bg-white border border-gray-400 rounded-md"
              />
            </div>
            <br />
            <div className="block m-auto  text-center">
              <button
                className="p-2 w-full  bg-sky-700 text-white uppercase text-sm rounded-md hover:bg-sky-800"
                type="submit"
              >
                Submit{" "}
              </button>
            </div>
            <div>
              <p className=" py-2 mt-2">
                Alreday have an account, Please{" "}
                <button
                  onClick={loginArea}
                  className="text-blue-900 py-2 text-lg font-bold"
                  to="/login"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={1000} theme="colored" />
    </div>
  );
};

export default SignUp;
