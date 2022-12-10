import React, { useEffect, useState } from "react";
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper";
import { getAllMotos } from "services/bikes/motos";
const CardMoto = dynamic(() => import("../Utilities/CardMoto"), {
  ssr: false,
});

export default function FloteBikes() {
  const router = useRouter();
  const [motos, setMotos] = useState([]);

  const getMotos = async () => {
    try {
      const response = await getAllMotos();
      const {
        data: { motos },
      } = await response.json();
      setMotos(motos);
    } catch (error) {}
  };

  useEffect(() => {
    getMotos();
  }, []);

  const offerSliderBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    580: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center flotebikes__title">
            Motocicletas <br className="d-lg-none" /> disponibles
          </h2>
        </div>
        <div className="flotebikes__switch mx-auto">
          <button className="btn btn-movebike link">Scooters</button>
          <div className="separator" />
          <button className="btn btn-movebike link text-black">Motos</button>
        </div>
      </div>
      <div className="row flotebikes__swiper-bikes">
        {motos ? (
          <Swiper
            slidesPerView="auto"
            navigation={true}
            loop
            pagination={{
              clickable: true,
            }}
            breakpoints={
              {
                576: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1400: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }
            }
            modules={[Pagination, Navigation, Virtual]}
            className="mySwiper"
          >
            {motos?.map((moto, index) => (
              <SwiperSlide key={moto._id} virtualIndex={index}>
                <CardMoto
                  keyImage={moto?.keyImage}
                  model={moto?.model}
                  name={moto?.name}
                  price={moto?.price}
                  slug={moto?.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}
