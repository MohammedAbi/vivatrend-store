import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

import Img1 from "../../assets/images/background.jpg";
import Img2 from "../../assets/images/background2.jpg";
import Img3 from "../../assets/images/background3.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Trendy Fashion",
    bg: Img1,
    btnText: "Shop Now",
  },
  {
    title: "Exclusive Deals",
    bg: Img2,
    btnText: "Shop Now",
  },
  {
    title: "Latest Styles",
    bg: Img3,
    btnText: "Shop Now",
  },
];

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Slider */}
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="heroSlider h-[480px] sm:h-[580px] md:h-[700px] lg:h-[860px]"
      >
        {slides.map((slide, index) => {
          const { title, bg, btnText } = slide;
          return (
            <SwiperSlide
              key={index}
              className="h-full relative flex justify-center items-center"
            >
              {/* Text Content */}
              <div className="absolute top-1/2 md:top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-white text-center px-4 flex flex-col justify-center items-center">
                <div className="uppercase font-tertiary tracking-[3px] sm:tracking-[5px] mb-2 sm:mb-4 text-xs sm:text-sm md:text-base drop-shadow-md mt-[180px]">
                  Discover the Best Trends
                </div>
                <h1 className="text-white text-[22px] sm:text-[30px] md:text-[42px] lg:text-[64px] font-primary uppercase tracking-wide max-w-[90%] sm:max-w-[600px] md:max-w-[920px] leading-tight mb-4 md:mb-8 drop-shadow-lg">
                  {title}
                </h1>
                <Link to="/products">
                  <button className="btn btn-lg btn-primary py-3 px-6 text-sm sm:text-base">
                    {btnText}
                  </button>
                </Link>
              </div>
              {/* Background Image */}
              <div className="absolute top-0 bottom-0 w-full h-full">
                <img
                  src={bg}
                  alt={title}
                  className="object-cover h-full w-full"
                />
              </div>
              {/* Overlay */}
              <div className="absolute w-full h-full bg-black/70 z-10 pointer-events-none"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Hero;
