import React, { useCallback, useEffect, useState } from "react";
import Layout from "components/Layouts.js";
import { getAllRoutes } from "services/routes";
import Link from "next/link";
import Image from "next/image";

const myLoader = ({ src }) => {
  return `${src}`;
};

export default function Rutas() {
  const [routes, setRoutes] = useState([]);
  const [showMore, setShowMore] = useState(false)

  const fetchRoutes = useCallback(async () => {
    const response = await getAllRoutes();
    const dataJson = await response.json();

    setRoutes(dataJson.data.routes);
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);
  return (
    <Layout title={"Que hacer en Cancún"}>
      <header className="bg-header d-flex justify-content-center align-items-center">
        <h1 className="mv-h2 text-white text-center">
          Cosas que hacer en <br /> Cancún
        </h1>
      </header>
      <main className="container-fluid routes">
        <section className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="mv-h2 mt-5 text-center text-gray-600">
                Le damos la bienvenida a Cancún
              </h2>
              <div className="line"></div>
              <p className="mt-4 text-center routes__subtitle">
                Cancún es más que un destino de fiesta con hoteles de lujo
                (aunque uno bueno). Es la puerta de entrada de la península de
                Yucatán a un mundo de pirámides mayas cubiertas de jungla, las
                cuevas de cristal de Río Secreto y un paraíso de buceo frente a
                Isla Mujeres...
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="mv-h2 text-center text-gray-600 mt-5 mb-4">
                Las mejores atracciones en Cancún
              </h3>
            </div>
            {routes.map((route) => (
              <>
                <div key={route._id} className="col-md-6 col-lg-4">
                  <article className="card pb-4 mb-4">
                    <header className="">
                      <img
                        className=""
                        src={route.image}
                        alt="Image route"
                        width={'100%'}
                        height={276}
                      />
                    </header>
                    <main className="card-body">
                      <h4>{route.title}</h4>
                      <p>{showMore ? route.description : `${(route.description).substring(0, 118)}...`}</p>
                      <button className="btn" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Ver menos...' : 'Ver más...'}
                      </button>
                    </main>
                    <div className="ps-3 pe-3">
                      <Link
                        href={`/rutas/${route.slug}`}
                        className="btn btn-movebike contained w-100"
                      >
                        Visitar ruta
                      </Link>
                    </div>
                  </article>
                </div>
              </>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}