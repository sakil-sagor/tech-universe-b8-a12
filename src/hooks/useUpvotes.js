import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useUpvotes = () => {
  const { user } = useContext(AuthContext);
  const [allStudent, setAllStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpVote = async (product) => {
    if (!user?.email) {
      setPreviousLocation(window.location.pathname);
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
        `http://localhost:5000/api/v1/product/upvote`,
        upVoteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

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

  return handleUpVote;
};
export default useUpvotes;
