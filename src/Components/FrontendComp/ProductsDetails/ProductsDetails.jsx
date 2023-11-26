import { useParams } from "react-router-dom";
import useSingleProduct from "../../../hooks/useSingleProducts";

const ProductsDetails = () => {
  const { _id } = useParams();
  console.log(_id);
  const { product } = useSingleProduct(_id);
  console.log(product);
  return <div>product details</div>;
};

export default ProductsDetails;
