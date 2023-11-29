import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import pro1 from "../../../assets/pro1.png";

const ViewProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="py-24">
      <div className="container full-width-all mx-auto px-2">
        <div>
          <h1 className="text-indigo-900 font-semibold text-4xl mb-6 ml-4">
            Admin Profile
          </h1>
        </div>
        <hr />
        <div className="md:flex py-8 md:pl-8">
          <div className="mr-3 md:mr-8">
            <div>
              <img
                className="w-36 rounded-full block mx-auto"
                src={user?.photoURL || pro1}
                alt=""
              />
              <button className="py-2 px-6 mt-6 bg-indigo-900 text-white rounded-full block mx-auto my-4 hover:bg-indigo-800">
                Edit Profile
              </button>
            </div>
          </div>
          <div>
            <div className="my-6">
              <p className="text-gray-600 ">Full Name</p>
              <h1 className="text-indigo-900 font-semibold text-2xl">
                {user?.displayName || user?.email?.split("@")[0]}
              </h1>
            </div>
            <div>
              <p className="text-gray-600 ">Email</p>
              <h1 className="text-indigo-900 font-semibold text-2xl">
                {user?.email}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
