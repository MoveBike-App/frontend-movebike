import Image from "next/image";
import React from "react";

export default function CardsExperience() {
  return (
    <>
        <section className="container">
          <div className="row text-center">
            <h2 className="mt-5 mb-5">¡Una gran aventura en solo 3 pasos!</h2>
            <div className="col-12 col-md-4">
              <Image
                src={"/assets/home/calendar.png"}
                alt="Experience image"
                layout={"fill"}
                width={122}
                height={122}
              />
              <h3 className="landing__subtitle">Elige las fechas</h3>
              <p className="landing__text">
                ¿Cuántos días deseas vivir la <br className="" /> experiencia?
              </p>
            </div>
            <div className="col-12 col-md-4">
              <Image
                src={"/assets/home/moto.png"}
                alt={"Experience image"}
                layout={"fill"}
                width={122}
                height={122}
              />
              <h3 className="landing__subtitle">Reserva tu moto</h3>
              <p className="landing__text">
                Realiza tu pago y espera la <br /> llegada de tu vehículo!
              </p>
            </div>
            <div className="col-12 col-md-4">
              <Image
                src={"/assets/home/umbrella.png"}
                alt={"Experience image"}
                layout={"fill"}
                width={122}
                height={122}
              />
              <h3 className="landing__subtitle">¡Vive la experiencia!</h3>
              <p className="landing__text">
                Escoge y visita los sitios <br /> turísticos que te ofrecemos
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
