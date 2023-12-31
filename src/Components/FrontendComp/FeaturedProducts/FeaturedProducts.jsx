import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxios";
import Loading from "../../SharedComp/Loading/Loading";
import SingleProduct from "../SingleProduct/SingleProduct";

const FeaturedProducts = () => {
  const { user } = useContext(AuthContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateAll, setUpdateAll] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let url = `https://tech-server-12.vercel.app/api/v1/product/featuredProducts`;
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        setFeaturedProducts(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [updateAll]);
  useEffect(() => {
    let url = `https://tech-server-12.vercel.app/api/v1/product/treading`;
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [updateAll]);

  const handleUpVote = async (product) => {
    if (!user?.email) {
      //   setPreviousLocation(window.location.pathname);
      return navigate("/registration");
    }
    if (product?.ownerInfo?.ownerEmail === user?.email) {
      return toast.error("You can not vote your own product");
    }
    if (product?.upvotes.includes(user?.email)) {
      return toast.warning("You already make a vote");
    }
    const upVoteData = {
      productId: product?.productId,
      userEmail: user?.email,
    };
    console.log(upVoteData);
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
    <div className="my-12">
      <div>
        <div>
          <h2 className="text-3xl text-sky-800 font-semibold  text-center">
            Featured Products
          </h2>
          <hr className="w-1/3  mx-auto py-4 mt-4" />
        </div>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="mt-4">
            {featuredProducts?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {featuredProducts?.map((product) => (
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
      <hr className=" my-12 " />
      <div>
        <div>
          <h2 className="text-3xl text-sky-800 font-semibold  text-center">
            Trending Products
          </h2>
          <hr className="w-1/3  mx-auto py-4 mt-4" />
        </div>
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
        <div className="text-center">
          <button className="bg-sky-900 border border-sky-900 px-2 py-1 rounded mt-8 text-white hover:bg-white hover:text-sky-900 duration-300">
            <Link to="/products"> All Products</Link>
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={1000} theme="colored" />
    </div>
  );
};

export default FeaturedProducts;
