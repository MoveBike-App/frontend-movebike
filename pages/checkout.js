import Image from "next/image";
import React, { useEffect } from "react";
import CheckoutCard from "components/CheckoutCard";
import Layout from "components/Layouts";
import { useState } from "react";
import { useRouter } from "next/router";
import { createReserve } from "services/reserves/reserve";

export default function Checkout() {
  const router = useRouter();
  const [priceCart, setPriceCart] = useState();
  const [motoCart, setMotoCart] = useState("");
  const [idMoto, setIdMoto] = useState('')
  const getCart = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cartCurrent"));
    if (cartStorage) {
      const { vehicle, priceReserve, nameMoto } = cartStorage;
      setPriceCart(Number(priceReserve));
      setMotoCart(nameMoto);
      setIdMoto(vehicle)
    } else {
      router.push("/");
    }
  };

  const handleReserve = () => {
    const token = localStorage.getItem("token");
    try {
      const respReserve = createReserve(idMoto, priceCart, token);
      console.log(respReserve);
    } catch (error) {}
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
              <button onClick={handleReserve}>Reservar</button>
            </div>
            <div className="col-lg-7 mt-3">
              <section className="checkout__card">
                <article className="checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center">
                  <Image
                    src="/assets/landing/flotebikers/vitalia-125.webp"
                    alt="Scooter Vitalia 125"
                    width={130}
                    height={95}
                  />
                  <div className="checkout__card-details text-justify">
                    <span className="text-gray-400">Reservado x 1</span>
                    <p className="mb-0 text-gray-400">Scooter WS Sport 150</p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">
                        Fecha Inicio:
                      </strong>{" "}
                      17-10-2022
                    </p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">
                        Fecha Fin:
                      </strong>{" "}
                      25-10-2022
                    </p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">Día (s):</strong>{" "}
                      5
                    </p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">Dónde:</strong>{" "}
                      Cancún, Quintana Roo, Mex.
                    </p>
                  </div>
                  <strong className="checkout__card-price text-orange-900 ms-md-auto">
                    $2,700.00
                  </strong>
                </article>
                <article className="checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center">
                  <Image
                    src="/assets/landing/flotebikers/vitalia-150.webp"
                    alt="Scooter Vitalia 125"
                    width={130}
                    height={95}
                  />
                  <div className="checkout__card-details text-justify">
                    <span className="text-gray-400">Reservado x 1</span>
                    <p className="mb-0 text-gray-400">Scooter WS Sport 150</p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">
                        Fecha Inicio:
                      </strong>{" "}
                      17-10-2022
                    </p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">
                        Fecha Fin:
                      </strong>{" "}
                      25-10-2022
                    </p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">Día (s):</strong>{" "}
                      5
                    </p>
                    <p className="mb-0 text-gray-400">
                      <strong className="checkout__card--bold">Dónde:</strong>{" "}
                      Cancún, Quintana Roo, Mex.
                    </p>
                  </div>
                  <strong className="checkout__card-price text-orange-900 ms-md-auto">
                    $2,700.00
                  </strong>
                </article>
              </section>
            </div>
            <div className="col-lg-5 mt-3">
              <section className="checkout__card mt-3">
                <CheckoutCard
                  price={Number(priceCart)}
                  description={motoCart}
                  vehicle={idMoto}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
