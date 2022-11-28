import React from "react";
import Image from "next/image";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import Link from "next/link";

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`;
};

export default function SlideMotos({
  name,
  model,
  price,
  img,
  idMoto,
  isClickBook = false,
}) {
  return (
    <>
      <div className="col-md-6 col-lg-4 mb-5">
        <article
          className={`flotebikes__card mt-3 ${(isClickBook = false
            ? "d-none"
            : "d-block")}`}
        >
          <header className="flotebikes__card--image-bike text-center">
            <Image
              loader={myLoader}
              src={img}
              alt={img}
              width={160}
              height={140}
            />
          </header>
          <main className="flotebikes__card-body">
            <section>
              <p className="flotebikes__card-body__model mb-0">
                Modelo {model}
              </p>
              <h3 className="flotebikes__card-body__name">{name}</h3>
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
                ${price}/día
              </h4>
            </section>
          </main>
          <footer className="flotebikes__card-footer text-center ">
            <Link
              href={`/motos/${idMoto}`}
              className="btn btn-movebike outlined shadow btn-booking"
            >
              Reservar ahora
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}
