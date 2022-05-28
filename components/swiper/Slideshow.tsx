import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

import Image from "next/image";

const Slideshow = () => {
  return (
    <Swiper
      spaceBetween={30}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      className="md:w-2/3 w-full h-full md:h-full bg-green shadow-shadow_nav"
    >
      {new Array(0, 1, 2, 3).map((i: number) => (
        <>
          <SwiperSlide className="mt-5" key={i}>
            <Image
              priority={true}
              src={"/Boy_" + i.toString() + ".svg"}
              layout="fill"
            />
          </SwiperSlide>
          <SwiperSlide className="mt-5" key={i + 4}>
            <Image
              priority={true}
              src={"/Girl_" + i.toString() + ".svg"}
              layout="fill"
            />
          </SwiperSlide>
        </>
      ))}
    </Swiper>
  );
};

export default Slideshow;
