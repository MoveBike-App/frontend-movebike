import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// import required modules
import { Mousewheel, Navigation, Pagination, Autoplay } from "swiper";

export default function FloteBikes() {
  const router = useRouter();

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
          <div className="separator"></div>
          <button className="btn btn-movebike link text-black">Motos</button>
        </div>
      </div>
      <div className="row flotebikes__swiper-bikes">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          mousewheel={true}
          navigation={true}
          loop={true}
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
          modules={[Autoplay, Mousewheel, Pagination]}
          //className="mySwiper"
        >
          <SwiperSlide>
            <div className="col-12">
              <article className="flotebikes__card">
                <header className="flotebikes__card--image-bike text-center">
                  <Image
                    src={"/assets/home/flotebikers/vitalia-150.webp"}
                    alt={"Scooter Vitalia 150"}
                    layout={"filla"}
                    width={160}
                    height={140}
                  />
                </header>
                <main className="flotebikes__card-body">
                  <section>
                    <p className="flotebikes__card-body__model mb-0">
                      Modelo 2022
                    </p>
                    <h3 className="flotebikes__card-body__name">
                      Scooter Vitalia 150
                    </h3>
                  </section>
                  <section className="flotebikes__card-body--features">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className="flotebikes__card-body-info">
                    <strong className="flotebikes__card-body-info--rentFrom">Renta desde: </strong>
                    <h4 className="flotebikes__card-body-info--price">$450/día</h4>
                  </section>
                </main>
                <footer className="flotebikes__card-footer text-center ">
                  <button className="btn btn-movebike outlined shadow btn-booking">
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col-12">
              <article className="flotebikes__card">
                <header className="flotebikes__card--image-bike text-center">
                  <Image
                    src={"/assets/home/flotebikers/vitalia-125.webp"}
                    alt={"Scooter Vitalia 150"}
                    layout={"filla"}
                    width={160}
                    height={140}
                  />
                </header>
                <main className="flotebikes__card-body">
                  <section>
                    <p className="flotebikes__card-body__model mb-0">
                      Modelo 2022
                    </p>
                    <h3 className="flotebikes__card-body__name">
                      Scooter Vitalia 125
                    </h3>
                  </section>
                  <section className="flotebikes__card-body--features">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className="flotebikes__card-body-info">
                    <strong className="flotebikes__card-body-info--rentFrom">Renta desde: </strong>
                    <h4 className="flotebikes__card-body-info--price">$450/día</h4>
                  </section>
                </main>
                <footer className="flotebikes__card-footer text-center">
                  <button className="btn btn-movebike outlined shadow btn-booking">
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col-12">
              <article className="flotebikes__card">
                <header className="flotebikes__card--image-bike text-center">
                  <Image
                    src={"/assets/home/flotebikers/ws-sport-150.webp"}
                    alt={"Scooter Ws Sport 150"}
                    layout={"filla"}
                    width={160}
                    height={140}
                  />
                </header>
                <main className="flotebikes__card-body">
                  <section>
                    <p className="flotebikes__card-body__model mb-0">
                      Modelo 2022
                    </p>
                    <h3 className="flotebikes__card-body__name">
                      Scooter Ws Sport 150
                    </h3>
                  </section>
                  <section className="flotebikes__card-body--features">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className="flotebikes__card-body-info">
                    <strong className="flotebikes__card-body-info--rentFrom">Renta desde: </strong>
                    <h4 className="flotebikes__card-body-info--price">$450/día</h4>
                  </section>
                </main>
                <footer className="flotebikes__card-footer text-center">
                  <button className="btn btn-movebike outlined shadow btn-booking">
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col-12">
              <article className="flotebikes__card">
                <header className="flotebikes__card--image-bike text-center">
                  <Image
                    src={"/assets/home/flotebikers/vitalia-150.webp"}
                    alt={"Scooter Vitalia 150"}
                    layout={"filla"}
                    width={160}
                    height={140}
                  />
                </header>
                <main className="flotebikes__card-body">
                  <section>
                    <p className="flotebikes__card-body__model mb-0">
                      Modelo 2022
                    </p>
                    <h3 className="flotebikes__card-body__name">
                      Scooter Vitalia 150
                    </h3>
                  </section>
                  <section className="flotebikes__card-body--features">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className="flotebikes__card-body-info">
                    <strong className="flotebikes__card-body-info--rentFrom">Renta desde: </strong>
                    <h4 className="flotebikes__card-body-info--price">$450/día</h4>
                  </section>
                </main>
                <footer className="flotebikes__card-footer text-center">
                  <button className="btn btn-movebike outlined shadow btn-booking">
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col-12">
              <article className="flotebikes__card">
                <header className="flotebikes__card--image-bike text-center">
                  <Image
                    src={"/assets/home/flotebikers/vitalia-125.webp"}
                    alt={"Scooter Vitalia 125"}
                    layout={"filla"}
                    width={160}
                    height={140}
                  />
                </header>
                <main className="flotebikes__card-body">
                  <section>
                    <p className="flotebikes__card-body__model mb-0">
                      Modelo 2022
                    </p>
                    <h3 className="flotebikes__card-body__name">
                      Scooter Vitalia 125
                    </h3>
                  </section>
                  <section className="flotebikes__card-body--features">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className="flotebikes__card-body-info">
                    <strong className="flotebikes__card-body-info--rentFrom">Renta desde: </strong>
                    <h4 className="flotebikes__card-body-info--price">$450/día</h4>
                  </section>
                </main>
                <footer className="flotebikes__card-footer text-center">
                  <button className="btn btn-movebike outlined shadow btn-booking">
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="col-12">
              <article className="flotebikes__card">
                <header className="flotebikes__card--image-bike text-center">
                  <Image
                    src={"/assets/home/flotebikers/ws-sport-150.webp"}
                    alt={"Scooter Ws Sport 150"}
                    layout={"filla"}
                    width={160}
                    height={140}
                  />
                </header>
                <main className="flotebikes__card-body">
                  <section>
                    <p className="flotebikes__card-body__model mb-0">
                      Modelo 2022
                    </p>
                    <h3 className="flotebikes__card-body__name">
                      Scooter Ws Sport 150
                    </h3>
                  </section>
                  <section className="flotebikes__card-body--features">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className="nav-item">
                        <Image
                          src={"/assets/icons/icon_web.svg"}
                          alt={"Icon max confort"}
                          layout={"filla"}
                          width={20}
                          height={20}
                        />
                        <span className="feature">Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className="flotebikes__card-body-info">
                    <strong className="flotebikes__card-body-info--rentFrom">Renta desde: </strong>
                    <h4 className="flotebikes__card-body-info--price">$450/día</h4>
                  </section>
                </main>
                <footer className="flotebikes__card-footer text-center">
                  <button className="btn btn-movebike outlined shadow btn-booking">
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </>
  );
}