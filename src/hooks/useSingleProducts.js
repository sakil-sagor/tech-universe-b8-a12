import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useSingleProduct = (id) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get(
          `http://localhost:5000/api/v1/product/${id}`,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return product;
};
export default useSingleProduct;
