import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Context/AuthProvider";
import blue from "../../../assets/blue.gif";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    productImage: "",
    ownerInfo: {},
    tags: [],
    externalLink: "",
  });
  ///////////////////////////////////
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ownerInfo = {
      ownerName: user?.displayName,
      ownerImage: user?.photoURL,
      ownerEmail: user?.email,
    };
    // Other registration form submission logic
    const imageUrl = await uploadImageToImgBB(imageFile);
    const productData = {
      ...formData,
      productImage: imageUrl,
      ownerInfo: ownerInfo,
      tags: tags,
    };

    fetch("https://tech-server-12.vercel.app/api/v1/product/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("success");
          setFormData({
            productName: "",
            description: "",
            productImage: "",
            ownerInfo: {},
            setTags: "",
            externalLink: "",
          });
          setLoading(false);
          setTimeout(() => {
            navigate("/dashboard/myproduct");
          }, 1500);
        }

        if (data.error) {
          toast.error(" failed");
          setLoading(false);
        }
      });
  };
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className=" pt-4  pb-24 ">
        <div className="w-full md:3/4 lg:w-2/4 m-auto pt-12">
          <div className="bg-sky-50 ">
            <div className=" ">
              <div className=" border shadow-md shadow-blue-300 px-2 py-6 md:p-8 text-center rounded-md">
                <h2 className="text-2xl font-bold text-blue-700">
                  Add Product Detials
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
                        <span>Add Product</span>
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
  );
};

export default AddProduct;
