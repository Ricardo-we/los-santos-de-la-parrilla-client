import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./css/Slider.css";

// import required modules
import { Pagination, Autoplay } from "swiper";

export default function Slider({ slides=[<p>Hello world</p>] }) {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false, 
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
          {slides.map((slide, index) => <SwiperSlide key={index}>
              {slide}
          </SwiperSlide>    
          )}
      </Swiper>
    </>
  );
}
