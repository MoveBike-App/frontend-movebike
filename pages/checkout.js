import Image from "next/image";
import React, { useEffect } from "react";
import CheckoutCard from "components/CheckoutCard";
import Layout from "components/Layouts";
import { useState } from "react";
import { useRouter } from "next/router";
import { createReserve } from "services/reserves/reserve";
import Link from "next/link";

export default function Checkout() {
  const router = useRouter();
  const [priceCart, setPriceCart] = useState();
  const [motoCart, setMotoCart] = useState("");
  const [idMoto, setIdMoto] = useState("");
  const [fechaInicial, setFechaInicial] = useState()
  const [fechaFinal, setFechaFinal] = useState()
  const [checkout, setCheckout] = useState({});

  const getCart = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cartCurrent"));
    if (cartStorage) {
      setCheckout(cartStorage);
      const { vehicle, priceReserve, nameMoto, fechaFinal, fechaInical } = cartStorage;
      setPriceCart(Number(priceReserve));
      setMotoCart(nameMoto);
      setIdMoto(vehicle);
      setFechaInicial(fechaInical)
      setFechaFinal(fechaFinal)
    } else {
      //router.push("/");
    }
  };

  const handleReserve = async() => {
    const token = localStorage.getItem("token");
    console.log(token);
    let isPaid = true
    const { fechaInical, fechaFinal } = JSON.parse(localStorage.getItem('cartCurrent'))
    try {
      const respReserve = await createReserve(idMoto, priceCart, isPaid, fechaInical, fechaFinal, token);
      console.log(respReserve.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <Layout>
      <main className="container-fluid checkout">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-gray-600 mb-4">Finaliza tu reserva</h1>
              <button className="btn" onClick={handleReserve}>Reservar</button>
            </div>
            <div className="col-lg-7 mt-3">
              <section className="checkout__card">
                <article className="checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center">
                  {(motoCart && (
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
                          {checkout.nameMoto}
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Fecha Inicio:
                          </strong>{" "}
                          {checkout.fechaInical}
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Fecha Fin:
                          </strong>{" "}
                          {checkout.fechaFinal}
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Día (s):
                          </strong>{" "}
                          {checkout.dias}
                        </p>
                        <p className="mb-0 text-gray-400">
                          <strong className="checkout__card--bold">
                            Dónde:
                          </strong>{" "}
                          Cancún, Quintana Roo, Mex.
                        </p>
                      </div>
                      <strong className="checkout__card-price text-orange-900 ms-md-auto">
                        ${checkout.priceReserve}
                      </strong>
                    </>
                  )) || (
                    <div className="d-flex flex-column">
                    <h3>Carrito vacío</h3>
                    <Link href={'/motos'} className="btn btn-movebike contained mt-3">Ver motos</Link>
                    </div>
                  )}
                </article>
              </section>
            </div>
            {(motoCart && (
              <div className="col-lg-5 mt-3">
                <section className="checkout__card mt-3">
                  <CheckoutCard
                    price={priceCart}
                    description={motoCart}
                    vehicle={idMoto}
                    initialDate={fechaInicial}
                    finalDate={fechaFinal}
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
