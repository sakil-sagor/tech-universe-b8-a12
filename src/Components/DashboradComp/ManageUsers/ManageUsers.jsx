import { useContext, useEffect, useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxios";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateAll, setUpdateAll] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    let url = `https://tech-server-12.vercel.app/api/v1/user?page=${
      page + 1
    }&limit=${limit}`;
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get(url);
        setAllUsers(response?.data?.data?.result);
        setCount(response?.data?.data?.pageCount);
        setTotal(response?.data?.data?.totalResult);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, updateAll]);

  const handelMakeAction = async (userId, role) => {
    const details = {
      userId: userId,
      role: role,
    };
    try {
      const response = await axiosSecure.patch(
        `https://tech-server-12.vercel.app/api/v1/user/updateRole`,
        details
      );
      const data = response.data;
      if (data.status === "success") {
        toast.success("Successfully Activated");
        setUpdateAll(updateAll + 1);
      }
    } catch (error) {
      console.error("Error while removing booking:", error);
    }
  };

  return (
    <div className="min-h-[80vh] bg-blue-50 ">
      <div className="container mx-auto px-2">
        <div className="py-2 m-4">
          <h2 className="text-green-600 font-semibold text-2xl ">
            <AiFillDatabase className="inline mb-1"></AiFillDatabase>
            Products list for Review
          </h2>
          <div className="flex items-center justify-between mt-4 px-2">
            <p>Total Result: {allUsers.length}</p>
          </div>
        </div>
        <div>
          <table className="w-full table-auto overflow-x-auto sm:px-1 md:p-8">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <>
              {allUsers.map((product, index) => (
                <tbody key={product._id} index={index} product={product}>
                  <tr
                    key={product._id}
                    className={index % 2 === 0 ? "bg-[#ffffff]" : ""}
                  >
                    <td className="px-4 py-2">{product?.name}</td>
                    <td className="px-4 py-2 text-sky-700 font-semibold">
                      {product?.email}
                    </td>
                    <td className="px-4 py-2 text-sky-700">{product?.role}</td>
                    <td className="px-4 py-2  text-white">
                      <div className="">
                        {product?.role !== "moderator" && (
                          <button
                            className="border m-2 text-white  bg-sky-900 border-sky-900 hover:bg-white hover:text-sky-900  py-1 px-2 rounded duration-300"
                            onClick={() =>
                              handelMakeAction(product?._id, "moderator")
                            }
                          >
                            Make Moderator
                          </button>
                        )}
                        {product?.role !== "admin" && (
                          <button
                            className="border m-2 text-white  bg-green-700 border-green-700 hover:bg-white hover:text-green-700  py-1 px-2 rounded duration-300"
                            onClick={() =>
                              handelMakeAction(product?._id, "admin")
                            }
                          >
                            Make admin
                          </button>
                        )}
                        {product?.role !== "user" && (
                          <button
                            className="border m-2 text-white  bg-blue-700 border-blue-700 hover:bg-white hover:text-blue-700  py-1 px-2 rounded duration-300"
                            onClick={() =>
                              handelMakeAction(product?._id, "user")
                            }
                          >
                            Make User
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          </table>
        </div>
        <div className=" ">
          {total ? (
            <>
              <hr className="border-2 border-t-white mt-16" />
              <div className=" mb-16  flex items-center mt-8">
                <p className="text-sky-800 font-semibold mr-3">Total Page :</p>
                <div>
                  {[...Array(count).keys()].map((number) => (
                    <button
                      className={`${
                        page === number ? "bg-sky-700 " : " bg-gray-500"
                      } text-white rounded  mr-4 py-1 px-4`}
                      key={number}
                      onClick={() => setPage(number)}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          theme="colored"
        />
      </div>
    </div>
  );
};

export default ManageUsers;
