import React, { useCallback, useEffect, useState } from "react";
import Layout from "components/Layouts.js";
import { getAllRoutes } from "services/routes";
import { getAllReactions } from "../../services/routes";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'

const myLoader = ({ src }) => {
  return `${src}`;
};

export default function Rutas() {
  const router = useRouter()
  const [routes, setRoutes] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [showMore, setShowMore] = useState(false)
  const { id } = router.query

  const fetchRoutes = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("userCurrent"));
    const response = await getAllRoutes();
    const dataJson = await response.json();
    let routesList  = dataJson.data.routes
    routesList.map(route=>{
      route.hasOwnReaction = route.reactions.find(reaction => (reaction.author!=null && reaction.author._id == user.id))!=null 
      console.log(route);
      return route
    });
    setRoutes(dataJson.data.routes);
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);


  return (
    <Layout title={"Que hacer en Cancún"}>
      <header className="bg-header d-flex justify-content-center align-items-center">
      <h2 className="mv-h2 text-white text-center mt-5">
          Bienvenido a<br /> <h1 className="cancun-text mt-1">Cancún</h1>
        </h2>
      </header>
      <main className="container-fluid routes">
        <section className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="mv-h2 mt-5 text-center text-gray-600">
                ¡La aventura comienza ahora!
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
                      <div className="d-flex justify-content-between">
                      <h4>{route.title}</h4>
                      <div className="d-flex align-items-center">
                      <button className={route.hasOwnReaction?'btn-im btn':'icon-heart'}>
                        <Image
                          className={route.hasOwnReaction?'icon-heart__active':''}
                          src='/assets/icons/icon-heart.webp'
                          alt='Icon heart'
                          width={26}
                          height={26}
                        />
                      </button>
                      <p>{route.reactions.length}</p>
                      </div>

                      </div>
                      <p className={`routes__text`}>{showMore ? route.description : `${(route.description).substring(0, 118)}...`}</p>
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
