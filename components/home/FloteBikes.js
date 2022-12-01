import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from "next/image";
// import required modules
import { Navigation, Pagination } from "swiper";
import dayjs from "dayjs";
import { getAllMotos } from "services/bikes/motos";

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`;
};

export default function FloteBikes() {
  const router = useRouter();
  const [isClickBook, setIsClickBook] = useState('');

  const dateIniciatal = new Date();
  const year = dateIniciatal.getFullYear();
  const mes = dateIniciatal.getMonth() + 1;
  const day = dateIniciatal.getDate();
  const [checkIn, setCheckIn] = useState(dayjs(`${mes}-${day}-${year}`));
  const [checkOut, setCheckOut] = useState();
  const [dateNow, setDateNow] = useState("");
  const [motos, setMotos] = useState([]);
  useEffect(() => {
    const date = Date.now();
    setDateNow(date);
  }, []);

  const getMotos = async () => {
    try {
      const response = await getAllMotos();
      const { data: { motos }} = await response.json()
      setMotos(motos);
    } catch (error) {}
  };

  useEffect(() => {
    getMotos();
  }, []);

  const [location, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
        <Swiper
          slidesPerView="auto"
          centeredSlides
          navigation={true}
          loop
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            576: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          modules={[Pagination, Navigation]}
          // className="mySwiper"
        >
          {motos.map((moto, index) => (
            <SwiperSlide key={index}>
              <article className={`flotebikes__card`}>
                <header className="flotebikes__card--image-bike text-center">
                  <Image
                    loader={myLoader}
                    src={`${moto?.keyImage}`}
                    alt="Scooter Vitalia 150"
                    
                    width={160}
                    height={140}
                  />
                </header>
                <main className="flotebikes__card-body">
                  <section>
                    <p className="flotebikes__card-body__model mb-0">
                      Modelo {moto.model}
                    </p>
                    <h3 className="flotebikes__card-body__name">{moto.name}</h3>
                  </section>
                  <section className="flotebikes__card-body--features">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Image
                          src="/assets/icons/icon_web.svg"
                          alt="Icon max confort"
                          
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src="/assets/icons/icon_web.svg"
                          alt="Icon max confort"
                          
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src="/assets/icons/icon_web.svg"
                          alt="Icon max confort"
                          
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src="/assets/icons/icon_web.svg"
                          alt="Icon max confort"
                          
                          width={20}
                          height={20}
                        />
                        <span className="feature">Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className="flotebikes__card-body-info">
                    <strong className="flotebikes__card-body-info--rentFrom">
                      Renta desde:{" "}
                    </strong>
                    <h4 className="flotebikes__card-body-info--price">
                      ${moto.price}/día
                    </h4>
                  </section>
                </main>
                <footer className="flotebikes__card-footer text-center ">
                  <Link
                    href={`/motos/${moto.slug}`}
                    className="btn btn-movebike outlined shadow btn-booking"
                  >
                    Reservar ahora
                  </Link>
                </footer>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
