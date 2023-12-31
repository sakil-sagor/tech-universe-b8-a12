import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import profileImage from "../../../assets/pro1.png";
import userRole from "../../../hooks/userRole";

const SideNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userDetails, isAdminLoading] = userRole();
  const navigate = useNavigate();
  // log out button
  const handleLogOut = () => {
    logOut();
    navigate("/registration", { replace: true });
    // setLoading(false)
  };

  return (
    <div className="">
      <div div className=" px-2  mx-auto md:min-h-screen">
        <div className="rawer-content menu text-black font-semibold">
          {user?.email && (
            <>
              <div className="mb-6">
                <img
                  className="w-20 rounded-full block mx-auto"
                  src={profileImage}
                  alt=""
                />
                {/* <p className="text-2xl mt-4">{teacher?.teacherName}</p> */}
              </div>
              <hr className="mb-6" />
              <div>
                <Link
                  className=" block py-1 border mb-3 hover:bg-blue-900 hover:text-white rounded-lg"
                  to="/dashboard"
                >
                  View Profile
                </Link>
              </div>
              <div>
                <Link
                  className=" block py-1 border mb-3 hover:bg-blue-900 hover:text-white rounded-lg"
                  to="/dashboard/addproduct"
                >
                  Add Product
                </Link>
              </div>

              <div>
                <Link
                  className=" block py-1 border mb-3 hover:bg-blue-900 hover:text-white rounded-lg"
                  to="/dashboard/myproduct"
                >
                  My Products
                </Link>
              </div>
            </>
          )}

          <div>
            {(userDetails?.role === "moderator" ||
              userDetails?.role === "admin") && (
              <>
                <div>
                  <Link
                    className=" block py-1 border mb-3 hover:bg-blue-900 hover:text-white rounded-lg"
                    to="/dashboard/reviewproduct"
                  >
                    Product Review
                  </Link>
                </div>

                <div>
                  <Link
                    className=" block py-1 border mb-3 hover:bg-blue-900 hover:text-white rounded-lg"
                    to="/dashboard/reportedcontent"
                  >
                    Reported Content
                  </Link>
                </div>
              </>
            )}
          </div>

          {userDetails?.role === "admin" && (
            <>
              <div>
                <Link
                  className=" block py-1 border mb-3 hover:bg-blue-900 hover:text-white rounded-lg"
                  to="/dashboard/manageusers"
                >
                  Manage Users
                </Link>
              </div>
            </>
          )}
          {
            <div className="mt-24">
              <button
                className=" px-6 py-1 text-white bg-pink-800 hover:bg-pink-700 rounded"
                onClick={handleLogOut}
              >
                Log Out{" "}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
