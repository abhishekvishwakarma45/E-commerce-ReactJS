import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import { Fragment } from "react";

export default function Brands() {
  return (
    <Fragment>
      <div className="brand-container">
        <div>
          <h1 className="brand-section-headline">Discover Leading Brands</h1>
          <h3>
            Explore a curated selection of leading brands, where innovation
            meets quality
          </h3>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          pagination={{ clickable: false }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className="brand-items">
              <img
                src="https://inkbotdesign.com/wp-content/uploads/2012/09/Samsung-Famous-Logos.png.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-items">
              <img
                src="https://inkbotdesign.com/wp-content/uploads/2012/09/Dell-Logo-Design.png.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-items">
              <img
                src="https://inkbotdesign.com/wp-content/uploads/2012/09/Rolex-Logo-Design.png.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-items">
              <img
                src="https://inkbotdesign.com/wp-content/uploads/2012/09/LG-Logo-Design.png.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-items">
              <img
                src="https://inkbotdesign.com/wp-content/uploads/2022/03/hp-logo-transparent-free-png.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-items">
              <img
                src="https://inkbotdesign.com/wp-content/uploads/2022/03/Lenovo-Logo-1.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="brand-items">
              <img
                src="https://pnggrid.com/wp-content/uploads/2024/11/IPhone-1024x350.png"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Fragment>
  );
}
