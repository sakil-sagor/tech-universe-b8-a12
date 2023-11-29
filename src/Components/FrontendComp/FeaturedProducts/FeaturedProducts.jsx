import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import Loading from "../../SharedComp/Loading/Loading";
import SingleProduct from "../SingleProduct/SingleProduct";

const FeaturedProducts = () => {
  const { user } = useContext(AuthContext);
  const [allProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateAll, setUpdateAll] = useState(0);

  useEffect(() => {
    let url = `http://localhost:5000/api/v1/product/featuredProducts`;
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
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
      setPreviousLocation(window.location.pathname);
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
    try {
      const response = await axiosSecure.put(
        `http://localhost:5000/api/v1/product/upvote`,
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
    <div>
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
      <ToastContainer position="top-center" autoClose={1000} theme="colored" />
    </div>
  );
};

export default FeaturedProducts;
