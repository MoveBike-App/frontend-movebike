import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layouts";
import { useEffect } from "react";

export default function Thanks() {
  const router = useRouter();
  const [isPaid, setIsPaid] = useState(false);
  const [link, setLink] = useState("");
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState("");
  const [isLogged, setIsLogged] = useState(false)
  const retrieveCharge = router.query["payment_intent"];

  const getPaymentIntent = async () => {
    const token = localStorage.getItem('token')
    if(token){
      setIsLogged(true)
    }
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_intent_id: retrieveCharge }),
      };
      const chargeData = await fetch("/api/retrieve-charge-reserve", options);
      const dataJson = await chargeData.json();
      let monto = dataJson.charge_data[0].amount / 100
      let formatMonto = new Intl.NumberFormat('en-In', {style: 'currency', currency: 'MXN', minimumFractionDigits: 2}).format(monto)
      setAmount(formatMonto);
      setLink(dataJson.charge_data[0].receipt_url);
      setDescription(dataJson.charge_data[0].description);
      setIsPaid(dataJson.charge_data[0].paid);
    } catch (error) {}
  };

  useEffect(() => {
    getPaymentIntent();
  }, [retrieveCharge]);

  return (
    <>
      {(isPaid && isLogged) ? (
        <Layout title={"Gracias por tu pago - MoveBike"}>
          <main className="cotainer-fluid thanks">
            <div className="container">
              <div className="row">
                <div className="col-md-9 mx-auto">
                  <article className="thanks__card text-center ps-1 ps-lg-5 pe-1 pe-lg-5">
                    <Image
                      src="/assets/icons/icon-check-thanks.webp"
                      alt="Icon check thanks"
                      width={56}
                      height={56}
                    />
                    <h1 className="thanks__card-title">
                      ¡Hemos recibido tu reserva!
                    </h1>
                    <div className="row">
                      <div className="table-responsive">
                        <table className="table table-striped align-middle">
                          <thead>
                            <tr>
                              <th scope="col">Concepto</th>
                              <th scope="col">Monto</th>
                              <th scope="col">Recibo</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>{description}</th>
                              <th>{amount}</th>
                              <th>
                                <a
                                  className="btn btn-movebike link"
                                  href={`${link}`}
                                  target={"_blank"}
                                  rel="noreferrer"
                                >
                                  Ver recibo
                                </a>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <strong className="thanks__card-subtitle">
                      Tu reserva se ha realizado con éxito
                    </strong>
                    <p className="thanks__card-subtitle mt-2 mb-0">
                      En breve recibirás un correo con la información <br /> del
                      contacto encargado de entregar tu reserva
                    </p>
                    <a
                      className="btn btn-movebike contained me-bookings"
                      href={'/dashboard'}
                    >
                      Ver reserva
                    </a>

                    <div className="thanks__card-tracking steps mx-auto d-flex flex-column flex-md-row justify-content-between align-items-center">
                      <div className="round-step round-step--fill d-flex justify-content-center align-items-center">
                        <span className="position-absolute msg-status">
                          Reservada
                        </span>
                        <Image
                          src="/assets/icons/icon-check-step.webp"
                          alt="Icon check step"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="conector" />
                      <div className="round-step round-step--border d-flex justify-content-center align-items-center" />
                      <div className="conector conector--disabled" />
                      <div className="round-step round-step--disabled d-flex justify-content-center align-items-center" />
                      <div className="conector conector--disabled" />
                      <div className="round-step round-step--disabled d-flex justify-content-center align-items-center" />
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </main>
        </Layout>
      ) : null}
    </>
  );
}
