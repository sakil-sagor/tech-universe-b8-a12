import { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxios";
import AllReviews from "./AllReviews";
import ReviewAdd from "./ReviewAdd";

const ProductsDetails = () => {
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [reportText, setReportText] = useState("");
  const [reportField, setReportField] = useState(false);
  const [fetchData, setFetchData] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://tech-server-12.vercel.app/api/v1/product/${_id}`;
        const response = await axiosSecure.get(url);
        setProduct(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [_id, fetchData]);

  // upvotes create
  const handleUpVote = async (product) => {
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

      if (data.status === "success") {
        setFetchData(fetchData + 1);
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

  // create report
  const handleReport = async (e) => {
    e.preventDefault();
    const reportData = {
      email: user?.email,
      reportText: reportText,
    };

    if (reportText) {
      try {
        const response = await axiosSecure.put(
          `https://tech-server-12.vercel.app/api/v1/product/${_id}/report`,
          reportData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data.status === "success") {
          toast.success("Successfully send to admin");
          setReportField(false);
        } else if (data.error) {
          toast.error("failed");
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    } else {
      toast.error("An error occurred");
    }
  };
  return (
    <div>
      <div className="container mx-auto p-8">
        {/* Product Details Section */}
        <div className="mb-8">
          <div className="grid grid-cols-2 mb-8 gap-x-8">
            <div className="w-full ">
              <img
                src={product?.productImage}
                alt={product?.productName}
                className="w-full rounded-md"
              />
            </div>
            <div className="flex flex-col ">
              <h1 className="text-3xl font-semibold mb-2">
                {product?.productName}
              </h1>

              <div className="mb-4 flex-grow">
                <strong>Tags:</strong>
                {product?.tags?.map((tag) => (
                  <span className="mx-1 px-2 py-1 bg-gray-200 rounded-md">
                    {tag?.text}
                  </span>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <button
                    className={`text-xl ${
                      product?.upvotes?.includes(user?.email) &&
                      " text-orange-700"
                    }`}
                    onClick={() => handleUpVote(product)}
                  >
                    <AiFillLike />
                  </button>

                  <p className="ml-2"> {product?.upvotes?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mb-4">{product?.description}</p>

          <div className="mb-4">
            <strong>External Links:</strong>
            <a
              href={product?.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 px-2 py-1 bg-blue-500 text-white rounded-md"
            >
              {product?.externalLink}
            </a>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex">
          <p className="text-lg font-semibold">
            Do you have any objection. Write a report here ...
          </p>
          {!reportField && (
            <button
              onClick={(e) => setReportField(!reportField)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md"
            >
              Click here...
            </button>
          )}
          {reportField && (
            <form onSubmit={handleReport}>
              <input
                className="border border-black rounded p-1  ml-2"
                type="text"
                required
                onChange={(e) => setReportText(e.target.value)}
              />
              <button
                className="ml-4 px-3 py-1 bg-green-500 text-white rounded-md"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
          {reportField && (
            <button
              onClick={(e) => setReportField(!reportField)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
        {/* Reviews Section */}
        <hr className="my-6" />
        <div className="mb-8">
          <ReviewAdd
            _id={_id}
            fetchData={fetchData}
            setFetchData={setFetchData}
          ></ReviewAdd>
          <hr className="my-4" />
          <AllReviews product={product}></AllReviews>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Post a Review</h2>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={1000} theme="colored" />
    </div>
  );
};

export default ProductsDetails;
