import Image from "next/image";
import React, { useEffect } from "react";
import CheckoutCard from "components/CheckoutCard";
import Layout from "components/Layouts";
import { useState } from "react";
import { useRouter } from "next/router";
import { createReserve } from "services/reserves/reserve";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Checkout() {
  const router = useRouter();
  const [priceCart, setPriceCart] = useState();
  const [motoCart, setMotoCart] = useState("");
  const [idMoto, setIdMoto] = useState("");
  const [fechaInicial, setFechaInicial] = useState();
  const [fechaFinal, setFechaFinal] = useState();
  const [checkout, setCheckout] = useState(false);
  const [days, setDays] = useState()

  const getCart = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cartCurrent"));
    if (cartStorage) {
      setCheckout(true);
      const { vehicle, priceReserve, nameMoto, fechaFinal, fechaInical, dias } =
        cartStorage;
      setPriceCart(Number(priceReserve));
      setMotoCart(nameMoto);
      setIdMoto(vehicle);
      setFechaInicial(fechaInical);
      setFechaFinal(fechaFinal);
      setDays(dias)
    } else {
      //router.push("/")
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <Layout title={'Completa tu reserva'}>
      <main className="container-fluid checkout">
        <div className="container vh-100">
          <div className={`row ${ motoCart ? '': 'h-100 d-flex justify-content-center'}`}>
            <div className="col-12">
              {
                motoCart && (
                  <h1 className="text-gray-600">Finaliza tu reserva</h1>
                ) || null
              }
              {/* <button className="btn" onClick={handleReserve}>Reservar</button> */}
            </div>
            {(motoCart && (
              <div className="col-lg-7 mt-3">
                <section className="checkout__card">
                  <article className="checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center">
                    <>
                      <Image
                        src="/assets/landing/flotebikers/vitalia-125.webp"
                        alt="Scooter Vitalia 125"
                        width={130}
                        height={95}
                      />
                      <div className="checkout__card-details text-justify">
                        <span className="text-gray-400">Reservado x 1</span>
                        <p className="mb-0 text-gray-400">
                          {motoCart}
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Fecha Inicio:
                          </strong>{" "}
                          {
                            fechaInicial
                            ? format(new Date(fechaInicial), "dd/MM/yyyy H:mm b", {
                              locales: es,
                            })
                            : 'N/A'
                          }
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Fecha Fin:
                          </strong>{" "}
                          {
                            fechaFinal
                            ? format(new Date(fechaFinal), "dd/MM/yyyy H:mm b", {
                              locales: es,
                            })
                            : 'N/A'
                          }
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Día (s):
                          </strong>{" "}
                          {days}
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Dónde:
                          </strong>{" "}
                          Cancún, Quintana Roo, Mex.
                        </p>
                      </div>
                      <strong className="checkout__card-price text-orange-900 ms-md-auto">
                        ${priceCart}
                      </strong>
                    </>
                  </article>
                </section>
              </div>
            )) || (
              <div className="col-lg-6 text-center">
                <section className="checkout__card">
                  <div className="d-flex flex-column">
                    <h3>Carrito vacío</h3>
                    <Link
                      href={"/motos"}
                      className="btn btn-movebike contained mt-3 w-200 mx-auto"
                    >
                      Ver motos
                    </Link>
                  </div>
                </section>
              </div>
            )}
            {(motoCart && (
              <div className="col-lg-5 mt-3">
                <section >
                  <CheckoutCard
                    className="bg-white"
                    price={priceCart * 100}
                    description={motoCart}
                    vehicle={idMoto}
                    initialDate={fechaInicial}
                    finalDate={fechaFinal}
                    totalDays={days}
                  />
                </section>
              </div>
            )) ||
              null}
          </div>
        </div>
      </main>
    </Layout>
  );
}
