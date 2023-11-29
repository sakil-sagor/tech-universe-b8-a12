import Rating from "react-rating";
import pro1 from "../../../assets/pro1.png";
const AllReviews = ({ product }) => {
  const formatCreatedAt = (newdate) => {
    const date = new Date(newdate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // 'long' for the full month name
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="shadow-2xl p-4 bg-sky-200 rounded-lg">
      {!product?.review?.length ? (
        <div>
          <h2 className="text-center text-lg font-semibold">
            User didn`t make any review yet!
          </h2>
        </div>
      ) : (
        <div>
          {product?.review?.map((room, ind) => (
            <div key={ind} className="mb-6">
              <div className="">
                <div className="flex items-center">
                  <img
                    style={{ cursor: "pointer" }}
                    className="w-12 rounded-full"
                    src={room?.userImage || pro1}
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold">
                      {room?.userName || room?.email}
                    </p>
                    <p className="text-sm text-yellow-500">
                      <Rating
                        className="text-sm text-yellow-600 mb-2"
                        initialRating={room?.rating}
                        readonly
                        emptySymbol="far fa-star star-icon"
                        fullSymbol="fas fa-star star-icon"
                      ></Rating>
                      <span className="text-sky-800 font-semibold">
                        ( {room?.rating} )
                      </span>
                    </p>
                  </div>
                  <div></div>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg ">
                  <div className="flex justify-between">
                    <p>
                      <i className="fas fa-quote-left text-2xl"></i>
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatCreatedAt(room?.date)}
                    </p>
                  </div>
                  <p className="text-gray-500">{room?.feadback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
