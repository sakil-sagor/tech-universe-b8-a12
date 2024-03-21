import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleProduct from "../../../Components/FrontendComp/SingleProduct/SingleProduct";
import Loading from "../../../Components/SharedComp/Loading/Loading";
import { AuthContext } from "../../../Context/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxios";
const Products = () => {
  const { user } = useContext(AuthContext);
  const [allProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByPrice, setSortByPrice] = useState("");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [updateAll, setUpdateAll] = useState(0);
  const [searchText, setSearchText] = useState("");

  const limit = 20;
  const navigate = useNavigate();
  console.log(searchText);
  useEffect(() => {
    let url;

    if (searchText) {
      url = `https://tech-server-12.vercel.app/api/v1/product/all?search=${searchText}&page=${
        page + 1
      }&limit=${limit}`;
    } else {
      url = `https://tech-server-12.vercel.app/api/v1/product/all?page=${
        page + 1
      }`;
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setProducts(response?.data?.data?.result);
        setCount(response?.data?.data?.pageCount);
        setTotal(response?.data?.data?.totalRoom);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, total, sortByPrice, updateAll, searchText]);

  const handleUpVote = async (product) => {
    if (!user?.email) {
      // setPreviousLocation(window.location.pathname);
      return navigate("/registration");
    }
    if (product.ownerInfo?.ownerEmail === user?.email) {
      return toast.error("You can not vote your own product");
    }
    if (product?.upvotes.includes(user?.email)) {
      return toast.warning("You already make a vote");
    }
    const upVoteData = {
      productId: product?.productId,
      userEmail: user?.email,
    };
    try {
      const response = await axiosSecure.put(
        `https://tech-server-12.vercel.app/api/v1/product/upvote`,
        upVoteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        setUpdateAll(updateAll + 1);
        toast.success("success");
        setLoading(false);
      } else if (data.error) {
        toast.error("failed");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-2">
      <div>
        <div className="py-4 ">
          <h2 className="text-sky-800 font-semibold text-2xl ">
            <AiFillDatabase className="inline mb-1"></AiFillDatabase> All
            Products:
          </h2>
          <div className="grid grid-cols-2 w-full items-center justify-between mt-4 px-2 ">
            <p></p>
            <div>
              <input
                type="text"
                className="border py-2  px-4 rounded-md "
                placeholder="search  here..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div></div>
          </div>
        </div>
        <hr />
        <div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="mt-4">
              {allProducts?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                  {allProducts?.map((product) => (
                    <SingleProduct
                      key={product?._id}
                      product={product}
                      handleUpVote={handleUpVote}
                      user={user}
                    ></SingleProduct>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl font-semibold mt-12 text-red-700">
                    No products found...!
                  </p>
                </div>
              )}
            </div>
          )}
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
      </div>
      <ToastContainer position="top-center" autoClose={1000} theme="colored" />
    </div>
  );
};

export default Products;
