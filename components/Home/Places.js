import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// import required modules
import { Mousewheel, Navigation, Pagination, Autoplay } from "swiper";

export default function Places() {
  return (
    <div className="container">
      <dic className="row">
        <div className="col-12 col-lg-4 d-flex flex-column justify-content-center">
          <div>
            <h2 className="places-section__title">
              ¡Encuentra tu sitio ideal!
            </h2>
            <p className="places-section__subtitle">
              Una lista de los 75 mejores lugares turísticos del mundo para una
              experiencia única
            </p>
            <button className="btn btn-movebike contained d-none d-lg-flex justify-content-lg-center text-center btn-place-book">
              Reservar ahora
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <Swiper
            slidesPerView={"auto"}
            centeredSlides={true}
            mousewheel={true}
            //navigation={true}
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
                slidesPerView: 3,
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
                <article className="places-section__card playa-marlin d-flex flex-column justify-content-between">
                  <header className="d-flex justify-content-end">
                    <button className="icon-heart">
                      <Image
                        className=""
                        src={"/assets/icons/icon-heart.webp"}
                        alt={"Icon heart"}
                        layout={"fill"}
                        width={26}
                        height={26}
                      />
                    </button>
                  </header>
                  <section>
                    <div className="places-section__card-overlay d-flex align-items-center">
                      <div className="waves d-flex align-items-center justify-content-around">
                        <Image
                          src={"/assets/icons/icon-start.webp"}
                          alt={"Icon start"}
                          layout={"fill"}
                          width={12}
                          height={12}
                        />
                        <span>4.8</span>
                      </div>
                    </div>
                    <div className="places-section__card-footer d-flex align-items-center bg-white">
                      <div>
                        <h4 className="places-section__card-footer--title">
                          Playa Forum
                        </h4>
                        <p className="places-section__card-footer--subtitle">
                          Zona Hotelera, 7.5 KM
                        </p>
                      </div>
                      <button className="btn btn-movebike contained btn-visit">
                        Visitar
                      </button>
                    </div>
                  </section>
                </article>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="col-12">
                <article className="places-section__card playa-forum d-flex flex-column justify-content-between">
                  <header className="d-flex justify-content-end">
                    <button className="icon-heart">
                      <Image
                        className=""
                        src={"/assets/icons/icon-heart.webp"}
                        alt={"Icon heart"}
                        layout={"fill"}
                        width={26}
                        height={26}
                      />
                    </button>
                  </header>
                  <section>
                    <div className="places-section__card-overlay d-flex align-items-center">
                      <div className="waves d-flex align-items-center justify-content-around">
                        <Image
                          src={"/assets/icons/icon-start.webp"}
                          alt={"Icon start"}
                          layout={"fill"}
                          width={12}
                          height={12}
                        />
                        <span>4.8</span>
                      </div>
                    </div>
                    <div className="places-section__card-footer d-flex align-items-center bg-white">
                      <div>
                        <h4 className="places-section__card-footer--title">
                          Playa Forum
                        </h4>
                        <p className="places-section__card-footer--subtitle">
                          Zona Hotelera, 7.5 KM
                        </p>
                      </div>
                      <button className="btn btn-movebike contained btn-visit">
                        Visitar
                      </button>
                    </div>
                  </section>
                </article>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="col-12">
                <article className="places-section__card playa-delfines d-flex flex-column justify-content-between">
                  <header className="d-flex justify-content-end">
                    <button className="icon-heart">
                      <Image
                        className=""
                        src={"/assets/icons/icon-heart.webp"}
                        alt={"Icon heart"}
                        layout={"fill"}
                        width={26}
                        height={26}
                      />
                    </button>
                  </header>
                  <section>
                    <div className="places-section__card-overlay d-flex align-items-center">
                      <div className="waves d-flex align-items-center justify-content-around">
                        <Image
                          src={"/assets/icons/icon-start.webp"}
                          alt={"Icon start"}
                          layout={"fill"}
                          width={12}
                          height={12}
                        />
                        <span>4.8</span>
                      </div>
                    </div>
                    <div className="places-section__card-footer d-flex align-items-center bg-white">
                      <div>
                        <h4 className="places-section__card-footer--title">
                          Playa Forum
                        </h4>
                        <p className="places-section__card-footer--subtitle">
                          Zona Hotelera, 7.5 KM
                        </p>
                      </div>
                      <button className="btn btn-movebike contained btn-visit">
                        Visitar
                      </button>
                    </div>
                  </section>
                </article>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-12">
          <button className="btn btn-movebike contained mx-auto d-lg-none btn-place">
            Reservar ahora
          </button>
        </div>
      </dic>
    </div>
  );
}
