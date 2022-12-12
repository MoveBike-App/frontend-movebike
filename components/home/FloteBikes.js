import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// import required modules
// import { Navigation, Pagination, Virtual } from "swiper";

import { getAllMotos } from "services/bikes/motos";
const CardMoto = dynamic(() => import("../Utilities/CardMoto"), {
  ssr: false,
});


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
}


export default function FloteBikes() {
  const router = useRouter();
  const [motos, setMotos] = useState([]);

  const getMotos = async () => {
    try {
      const response = await getAllMotos();
      const {
        data: { motos },
      } = await response.json();
      const resultMoto = motos.filter(moto => moto.vehicleType === 'moto')
      const resultScooter = motos.filter(moto => moto.vehicleType === 'scooter')
      console.log(resultMoto);
      setMotos(resultMoto);
    } catch (error) {}
  };

  useEffect(() => {
    getMotos();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="container">
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

        <div className="row">
          <Slider {...settings}>
            {motos?.map((moto, index) => (
              <div key={index}>
                <CardMoto
                  keyImage={moto.keyImage}
                  model={moto.model}
                  name={moto.name}
                  price={moto.price}
                  slug={moto.slug}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
