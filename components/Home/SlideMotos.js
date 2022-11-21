import React from "react";
import Image from "next/image";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

export default function SlideMotos({name, model, price, setIsClickBook, isClickBook = false}) {
  return (
    <>
      
        <article
          className={`flotebikes__card ${isClickBook = false ? "d-none" : "d-block"}`}
        >
          <header className="flotebikes__card--image-bike text-center">
            <Image
              src="/assets/landing/flotebikers/vitalia-150.webp"
              alt="Scooter Vitalia 150"
              layout="filla"
              width={160}
              height={140}
            />
          </header>
          <main className="flotebikes__card-body">
            <section>
              <p className="flotebikes__card-body__model mb-0">Modelo {model}</p>
              <h3 className="flotebikes__card-body__name">
                {name}
              </h3>
            </section>
            <section className="flotebikes__card-body--features">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Image
                    src="/assets/icons/icon_web.svg"
                    alt="Icon max confort"
                    layout="filla"
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
                    layout="filla"
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
                    layout="filla"
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
                    layout="filla"
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
              <h4 className="flotebikes__card-body-info--price">${price}/día</h4>
            </section>
          </main>
          <footer className="flotebikes__card-footer text-center ">
            <button
              onClick={setIsClickBook}
              className="btn btn-movebike outlined shadow btn-booking"
            >
              Reservar ahora
            </button>
          </footer>
        </article>
        {/* <article
          className={`flotebikes__card flotebikes__card--book ${
            isClickBook ? "d-block" : "d-none"
          }`}
        >
          <button
            className="btn close-book"
            onClick={() => setIsClickBook(false)}
          >
            <Image
              src={"/assets/icons/icon-close.webp"}
              alt={"Icon close"}
              layout={"fill"}
              width={32}
              height={32}
            />{" "}
          </button>

          <main className="flotebikes__card-body mt-5">
            <select
              className="form-select flotebikes__card-body--location"
              aria-label="Default select example"
            >
              <option disabled defaultValue>
                Ubicación
              </option>
              <option value="Cancún, Quintana Roo.">
                Cancún, Quintana Roo.
              </option>
              <option value="Tulúm, Quintana Roo.">Tulúm, Quintana Roo.</option>
            </select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl fullWidth className="mt-3">
                <DatePicker
                  label="Check In"
                  className="datepicker mt-lg-none"
                  value={checkIn}
                  minDate={dayjs(dateNow)}
                  onChange={(newValue) => {
                    setCheckIn(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </FormControl>
              <div className="separator d-none d-md-flex" />
              <FormControl fullWidth className="mt-3">
                <DatePicker
                  label="Check Out"
                  className="datepicker mt-2 mt-lg-0"
                  value={checkOut}
                  minDate={dayjs(dateNow)}
                  onChange={(newValue) => {
                    setCheckOut(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </LocalizationProvider>
          </main>
        </article> */}
    </>
  );
}
