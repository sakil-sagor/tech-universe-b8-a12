import { Link, useRouteError } from "react-router-dom";
import errorpic from "../../../assets/404.png";

const ErroPage = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>
        <img src={errorpic} alt="" />
      </div>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <br />
      <Link
        className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
        to="/"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErroPage;
