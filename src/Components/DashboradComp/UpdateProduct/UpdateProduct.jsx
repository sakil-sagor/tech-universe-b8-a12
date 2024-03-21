import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import blue from "../../../assets/blue.gif";
import { axiosSecure } from "../../../hooks/useAxios";
const UpdateProduct = () => {
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUr, setImageUr] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    tags: [],
    externalLink: "",
    productImage: "",
    costingPrice: "",
    offerRate: "",
    regularPrice: "",
    originName: "",
    brandName: "",
    category: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://tech-server-12.vercel.app/api/v1/product/${_id}`;
        const response = await axiosSecure.get(url);

        setFormData(response?.data?.data);
        setImageUr(response?.data?.data?.productImage);
        setTags(response?.data?.data?.tags);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [_id]);

  // update product here .
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const uploadImageToImgBB = async (imageFile) => {
    const apiKey = "82ec2763f04d19d197f1451e6935abfe";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      console.log(formData);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + apiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        const imageUrl = data.data.url;
        setImageUrl(imageUrl);
        return imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };
  ///////////////////////////////////
  const handleDelete = (i) => {
    setTags(tags?.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  /////////////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const imageUrl = await uploadImageToImgBB(imageFile);
    if (!imageUrl) {
      formData.tags = tags;
      formData.productImage = imageUr;
    } else {
      formData.tags = tags;
      formData.productImage = imageUrl;
    }

    console.log(formData);
    // Replace this with your API endpoint to update the product data
    fetch(
      `https://tech-server-12.vercel.app/api/v1/product/updateProdut/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Successfully updated the product");
          setLoading(false);
          setTimeout(() => {
            navigate("/dashboard/myproduct");
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="bg-sky-50 min-h-screen">
        <div className=" pt-4  pb-24 ">
          <div className="w-full md:3/4 lg:w-2/4 m-auto pt-12">
            <div className="bg-sky-50 ">
              <div className=" ">
                <div className=" border shadow-md shadow-blue-300 px-2 py-6 md:p-8 text-center rounded-md">
                  <h2 className="text-2xl font-bold text-blue-700">
                    Update Product Detials
                  </h2>
                </div>
                <div className=" mt-4 ">
                  <form
                    className=" border shadow-xl shadow-blue-300 px-2 py-6 md:p-8 rounded-md"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex items-end justify-between">
                      <div className=" mt-2">
                        <label className=" text-gray-600 font-semibold  ">
                          User Name
                        </label>
                        <input
                          className="py-1 w-full  px-2 rounded-md border border-gray-300"
                          type="text"
                          value={user?.displayName || user?.email.split("@")[0]}
                        />
                      </div>
                      <div>
                        <img
                          className="rounded-full w-12"
                          src={user?.photoURL}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className=" mt-2">
                      <label className=" text-gray-600 font-semibold  ">
                        User email
                      </label>
                      <input
                        className="py-1 w-full  px-2 rounded-md border border-gray-300"
                        type="text"
                        value={user?.email}
                      />
                    </div>

                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="productName"
                      >
                        Product Name
                      </label>
                      <input
                        className="py-1 w-full  px-2 rounded-md border border-gray-300"
                        type="text"
                        name="productName"
                        placeholder="Procuts name"
                        value={formData.productName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold block  "
                        htmlFor="image"
                      >
                        Image
                      </label>
                      <input
                        id="image"
                        className="py-1 px-2 rounded-md"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {/* Tags input field */}
                    <div>
                      <label className=" text-gray-600 font-semibold block ">
                        Tags:
                      </label>
                      <ReactTags
                        className="py-1 w-full  px-2 rounded-md border border-gray-300"
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        inputFieldPosition="bottom"
                        autocomplete
                      />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
                      <div className=" mt-2">
                        <label
                          className=" text-gray-600 font-semibold  "
                          htmlFor="costingPrice"
                        >
                          Costing Price
                        </label>
                        <input
                          className="py-1 block  px-2 rounded-md border border-gray-300"
                          type="number"
                          min="0"
                          name="costingPrice"
                          placeholder="Costing Price"
                          value={formData.costingPrice}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className=" mt-2">
                        <label
                          className=" text-gray-600 font-semibold  "
                          htmlFor="regularPrice"
                        >
                          Regular Price
                        </label>
                        <input
                          className="py-1 block  px-2 rounded-md border border-gray-300"
                          type="number"
                          min="0"
                          name="regularPrice"
                          placeholder="  Regular Price"
                          value={formData.regularPrice}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className=" mt-2">
                        <label
                          className=" text-gray-600 font-semibold  "
                          htmlFor="offerRate"
                        >
                          Discount / Offer Rate
                        </label>
                        <input
                          className="py-1 block w-full px-2 rounded-md border border-gray-300"
                          type="number"
                          min="0"
                          max="100"
                          name="offerRate"
                          placeholder="0-100 % discount"
                          value={formData.offerRate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className=" mt-2">
                        <label
                          className=" text-gray-600 font-semibold  "
                          htmlFor="originName"
                        >
                          Origin
                        </label>
                        <input
                          className="py-1 block  px-2 rounded-md border border-gray-300"
                          type="text"
                          name="originName"
                          placeholder="Origin"
                          value={formData.originName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className=" mt-2">
                        <label
                          className=" text-gray-600 font-semibold  "
                          htmlFor="brandName"
                        >
                          Brand Name
                        </label>
                        <input
                          className="py-1 block  px-2 rounded-md border border-gray-300"
                          type="text"
                          name="brandName"
                          placeholder="Brand Name"
                          value={formData.brandName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className=" mt-2">
                        <label
                          className=" text-gray-600 font-semibold  "
                          htmlFor="category"
                        >
                          Category
                        </label>
                        <input
                          className="py-1 block  px-2 rounded-md border border-gray-300"
                          type="text"
                          name="category"
                          placeholder="Category"
                          value={formData.category}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className=" mt-2">
                      <label
                        className=" text-gray-600 font-semibold  "
                        htmlFor="procutsName"
                      >
                        External Link
                      </label>
                      <input
                        className="py-1 w-full  px-2 rounded-md border border-gray-300"
                        type="text"
                        name="externalLink"
                        placeholder="User name"
                        value={formData.externalLink}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col w-full mt-2">
                      <label
                        className=" text-gray-600 font-semibold block "
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        required
                        className="py-1 rounded-md  px-2  border border-gray-300"
                        name="description"
                        id="description"
                        placeholder="Description..."
                        cols="30"
                        rows="2"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className=" mt-4 ">
                      <div className="flex items-center justify-center h-10  bg-sky-800 rounded">
                        <button className=" ">
                          <img
                            className={`w-8 text-center  mx-auto ${
                              !loading && "hidden"
                            }`}
                            src={blue}
                            alt=""
                          />
                        </button>
                        <button
                          className={`w-full h-full  text-white py-18 ${
                            loading && "hidden"
                          }`}
                        >
                          <span>update Product</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <ToastContainer
                position="top-center"
                autoClose={1000}
                theme="colored"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
