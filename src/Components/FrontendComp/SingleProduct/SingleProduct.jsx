import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const SingleProduct = ({ product, handleUpVote, user }) => {
  const {
    _id,

    productName,
    productImage,
    brandName,
    upvotes,
    category,
    tags,
    originName,
  } = product;

  return (
    <div>
      <div className="relative text-white">
        <div className="">
          <img className="rounded-md" src={productImage} alt="" />
        </div>
        <div className=" bg-sky-800 py-2 px-2 absolute bottom-0 w-full opacity-90  ">
          <div className="flex justify-between">
            <div>
              <Link to={`/product/${_id}`}>
                <h2 className="text-white">{productName}</h2>
              </Link>
            </div>
            <div className="flex gap-x-2 text-white">
              <div className="flex items-center">
                {product.ownerInfo?.ownerEmail === user?.email ? (
                  <button>
                    <AiFillLike className="text-2xl" />
                  </button>
                ) : (
                  <button
                    className={`text-xl ${
                      upvotes?.includes(user?.email) && " text-orange-700"
                    }`}
                    onClick={() => handleUpVote(product)}
                  >
                    <AiFillLike />
                  </button>
                )}

                <p className="ml-2"> {upvotes?.length}</p>
              </div>
              {/* <div className="flex items-center">
                <AiFillDislike />
                <p>{downVotes?.length}</p>
              </div> */}
            </div>
          </div>

          <div className="my-2">
            <div className="flex justify-between items-center text-gray-200 text-sm">
              <p>Brand: {brandName}</p>

              <p>Origin: {originName}</p>
            </div>
          </div>

          <div className="flex justify-between">
            {tags?.map((tag, ind) => (
              <div
                key={ind}
                className="bg-gray-100 text-gray-600 border rounded border-black px-1"
              >
                <p> {tag?.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
