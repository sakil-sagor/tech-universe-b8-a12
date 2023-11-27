import { useContext, useEffect, useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxios";
import Loading from "../../SharedComp/Loading/Loading";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateAll, setUpdateAll] = useState(0);

  useEffect(() => {
    let url = `http://localhost:5000/api/v1/product/all/${user?.email}`;
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get(url);
        setProducts(response?.data?.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [updateAll, user?.email]);

  // delete product
  const handelDeletProduct = async (productId) => {
    try {
      const response = await axiosSecure.delete(
        `http://localhost:5000/api/v1/product/update?productId=${productId}`
      );

      const data = response.data;
      console.log(data);

      if (data.status === "success") {
        toast.success("Successfully Removed");
        const remainingData = products.filter(
          (product) => product?._id !== productId
        );
        setProducts(remainingData);
      }
    } catch (error) {
      console.error("Error while removing booking:", error);
    }
  };

  return (
    <div className="min-h-[80vh] bg-blue-50 ">
      <div className="container mx-auto px-2">
        <br />

        <div className="w-full max-w-screen-lg mx-auto bg-white  mt-8">
          <div className="overflow-x-auto sm:px-1 md:p-8">
            <div className="py-6">
              <h2 className="text-green-600 font-semibold text-2xl ">
                <AiFillDatabase className="inline mb-1"></AiFillDatabase> My
                Products list
              </h2>
              <div className="flex items-center justify-between mt-4 px-2">
                <p>Total Result: {products.length}</p>
              </div>
            </div>
            <hr />
            {loading ? (
              <div className="block ">
                <Loading></Loading>
              </div>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Up Vote</th>
                    <th className="px-4 py-2">status</th>
                    <th className="px-4 py-2">View Profile</th>
                  </tr>
                </thead>

                <>
                  {products.map((teacher, index) => (
                    <tbody key={teacher._id} index={index} teacher={teacher}>
                      <tr
                        key={teacher._id}
                        className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}
                      >
                        <td className="px-4 py-2">{teacher?.productId}</td>
                        <td className="px-4 py-2 text-sky-700 font-semibold">
                          {teacher?.productName}
                        </td>
                        <td className="px-4 py-2 text-sky-700">
                          {teacher?.upvotes?.length}
                        </td>
                        <td className="md:px-4 py-2 text-white">
                          {teacher?.status ? (
                            <span className="bg-green-700 py-1 px-4 rounded">
                              Visible
                            </span>
                          ) : (
                            <span className="bg-red-700 py-1 px-2 rounded">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2  text-white">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handelDeletProduct(teacher?._id)}
                              className="border border-red-700 text-red-700 hover:text-white  hover:bg-red-700 py-1 px-2 rounded duration-300"
                            >
                              Delete
                            </button>
                            <button className="border text-white  bg-blue-700 border-blue-700 hover:bg-white hover:text-blue-700  py-1 px-2 rounded duration-300">
                              Update
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </>
              </table>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} theme="colored" />
    </div>
  );
};

export default MyProducts;
