import { useContext, useEffect, useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxios";
import Loading from "../../SharedComp/Loading/Loading";

const ReportedContents = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateAll, setUpdateAll] = useState(0);

  useEffect(() => {
    let url = `https://tech-server-12.vercel.app/api/v1/product/reportedcontent`;
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get(url);
        console.log(response);
        setProducts(response?.data?.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [updateAll]);

  const handelDeletProduct = async (productId) => {
    try {
      const response = await axiosSecure.delete(
        `https://tech-server-12.vercel.app/api/v1/product/update?productId=${productId}`
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
    <div>
      <div className="min-h-[80vh] bg-blue-50 ">
        <div className="container mx-auto px-2">
          <br />

          <div className="w-full max-w-screen-lg mx-auto bg-white  mt-8">
            <div className="overflow-x-auto sm:px-1 md:p-8">
              <div className="py-6">
                <h2 className="text-green-600 font-semibold text-2xl ">
                  <AiFillDatabase className="inline mb-1"></AiFillDatabase>
                  Products list for Review
                </h2>
                <div className="flex items-center justify-between mt-4 px-2">
                  <p>Total Result: {products?.length}</p>
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
                      <th className="px-4 py-2">Details</th>
                      <th className="px-4 py-2">View Profile</th>
                    </tr>
                  </thead>

                  <>
                    {products?.map((product, index) => (
                      <tbody key={product?._id} index={index} product={product}>
                        <tr
                          key={product._id}
                          className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}
                        >
                          <td className="px-4 py-2">{product?.productId}</td>
                          <td className="px-4 py-2 text-sky-700 font-semibold">
                            {product?.productName}
                          </td>
                          <td className="px-4 py-2 text-sky-700">
                            <Link
                              className="bg-sky-700 text-white rounded px-3 py-1 hover:bg-sky-900"
                              to={`/product/${product?._id}`}
                            >
                              Details
                            </Link>
                          </td>

                          <td className="px-4 py-2  text-white">
                            <div className="flex gap-1">
                              <button
                                onClick={() => handelDeletProduct(product?._id)}
                                className="border border-red-700 text-red-700 hover:text-white  hover:bg-red-700 py-1 px-2 rounded duration-300"
                              >
                                Delete
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
        <ToastContainer
          position="top-center"
          autoClose={1000}
          theme="colored"
        />
      </div>
    </div>
  );
};

export default ReportedContents;
