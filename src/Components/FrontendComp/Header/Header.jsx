import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";
// all banner images

// import Swiper core and required modules

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import HeaderSingle from "./HeaderSingle";

// install Swiper modules
// SwiperCore.use([Autoplay, Pagination, Navigation]);

const banners = [
  {
    _id: 1,
    img: "https://i.ibb.co/sW0n5Xv/mobile1.jpg",
    titleOne: "Luxary Views",
    titleTwo: "Rendering the meaning - of time",
    description: "",
  },
  {
    _id: 2,
    img: "https://i.ibb.co/hZtP8g6/leptop1.jpg",
    titleOne: "Modern -Life.",
    titleTwo: "Enojoy your life with - more power",
    description: "",
  },
  {
    _id: 3,
    img: "https://i.ibb.co/hH8mwxy/watch1.jpg",
    titleOne: "Get -Smart.",
    titleTwo: "Make you path with Exclusive one",
    description: "",
  },
];

const Header = () => {
  return (
    <div>
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          effect="fade"
          className="mySwiper"
        >
          <div>
            {banners.map((banner) => (
              <SwiperSlide>
                <HeaderSingle key={banner._id} banner={banner}></HeaderSingle>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Header;
