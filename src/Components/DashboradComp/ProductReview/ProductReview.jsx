import { useContext, useEffect, useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxios";
import Loading from "../../SharedComp/Loading/Loading";
const ProductReview = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateAll, setUpdateAll] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    let url = `https://tech-server-12.vercel.app/api/v1/product/allreviewproduct?sort=-status&page=${
      page + 1
    }&limit=${limit}`;

    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get(url);

        setProducts(response?.data?.data?.result);
        setCount(response?.data?.data?.pageCount);

        setTotal(response?.data?.data?.totalResult);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [total, page, updateAll, user?.email]);

  const handelMakeFeatured = async (productId) => {
    try {
      const response = await axiosSecure.patch(
        `https://tech-server-12.vercel.app/api/v1/product/update?productId=${productId}`
      );

      const data = response.data;
      if (data.status === "success") {
        toast.success("Successfully Removed");
        setUpdateAll(updateAll + 1);
      }
    } catch (error) {
      console.error("Error while removing booking:", error);
    }
  };

  const handelStatusActive = async (productId) => {
    try {
      const response = await axiosSecure.patch(
        `https://tech-server-12.vercel.app/api/v1/product/statusActive?productId=${productId}`
      );

      const data = response.data;
      console.log(data);

      if (data.status === "success") {
        toast.success("Successfully Activated");

        setUpdateAll(updateAll + 1);
      }
    } catch (error) {
      console.error("Error while removing booking:", error);
    }
  };
  const handelStatusReject = async (productId) => {
    try {
      const response = await axiosSecure.patch(
        `https://tech-server-12.vercel.app/api/v1/product/statusReject?productId=${productId}`
      );

      const data = response.data;
      console.log(data);

      if (data.status === "success") {
        toast.success("Successfully Rejected");

        setUpdateAll(updateAll + 1);
      }
    } catch (error) {
      console.error("Error while removing booking:", error);
    }
  };
  return (
    <div>
      <div className="min-h-[80vh] bg-blue-50 my-2 ">
        <div className="container mx-auto px-2">
          <div className="w-full max-w-screen-lg mx-auto bg-white  rounded-md">
            <div className="overflow-x-auto sm:px-1 md:p-8">
              <div className="py-">
                <h2 className="text-green-600 font-semibold text-2xl ">
                  <AiFillDatabase className="inline mb-1"></AiFillDatabase>
                  Products list for Review
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
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Details</th>
                      <th className="px-4 py-2">Featured status</th>
                      <th className="px-4 py-2">View Profile</th>
                    </tr>
                  </thead>

                  <>
                    {products.map((product, index) => (
                      <tbody key={product._id} index={index} product={product}>
                        <tr
                          key={product._id}
                          className={index % 2 === 0 ? "bg-[#f2f2f2]" : ""}
                        >
                          <td className="px-4 py-2 text-sky-700 font-semibold">
                            {product?.productName}
                          </td>
                          <td className="px-4 py-2 text-sky-700">
                            <Link
                              className="bg-sky-700 text-white rounded px-1 hover:bg-sky-900"
                              to={`/product/${product?._id}`}
                            >
                              Details
                            </Link>
                          </td>
                          <td className="md:px-4 py-2 text-white ">
                            {product?.featured ? (
                              <span className="bg-green-700 py-1 px-2 rounded">
                                Featured
                              </span>
                            ) : (
                              <span className="bg-red-700 py-1 px-2 rounded">
                                <button
                                  onClick={() =>
                                    handelMakeFeatured(product?._id)
                                  }
                                >
                                  Make Featured
                                </button>
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2  text-white">
                            <div className="flex gap-1">
                              {product?.status === "bactive" ? (
                                <button className="border text-gray-700  bg-gray-300 border-gray-300  py-1 px-2 rounded duration-300">
                                  Accept
                                </button>
                              ) : (
                                <button
                                  className="border text-white  bg-blue-700 border-blue-700 hover:bg-white hover:text-blue-700  py-1 px-2 rounded duration-300"
                                  onClick={() =>
                                    handelStatusActive(product?._id)
                                  }
                                >
                                  Accept
                                </button>
                              )}

                              {product?.status === "creject" ? (
                                <button className="border text-gray-700  bg-gray-300 border-gray-300  py-1 px-2 rounded duration-300">
                                  Reject
                                </button>
                              ) : (
                                <button
                                  className="border border-red-700 text-red-700 hover:text-white  hover:bg-red-700 py-1 px-2 rounded duration-300"
                                  onClick={() =>
                                    handelStatusReject(product?._id)
                                  }
                                >
                                  Reject
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </>
                </table>
              )}
              <div className=" ">
                {total ? (
                  <>
                    <hr className="border-2 border-t-white mt-16" />
                    <div className=" mb-16  flex items-center mt-8">
                      <p className="text-sky-800 font-semibold mr-3">
                        Total Page :
                      </p>
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

export default ProductReview;
