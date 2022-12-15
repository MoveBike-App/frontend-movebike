import React, { useCallback, useEffect, useState } from 'react'
import Layout from 'components/Layouts.js'
import { getAllRoutes } from 'services/routes'
import Link from 'next/link'

export default function Rutas () {
  const [routes, setRoutes] = useState([])
  const [showMore, setShowMore] = useState(false)

  const fetchRoutes = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('userCurrent'))
    const response = await getAllRoutes()
    const dataJson = await response.json()
    if (user) {
      const routesList =
      dataJson.data.routes.filter(route =>
        route.reactions.find(reaction =>
          (reaction.author != null && reaction.author._id == user.id)
        ) != null
      )
      setRoutes(routesList)
    }
  }, [])

  useEffect(() => {
    fetchRoutes()
  }, [routes])

  return (
    <Layout title='¿Qué hacer en Cancún?'>
      <header className='bg-header d-flex justify-content-center align-items-center'>
        <h1 className='mv-h2 text-white text-center mt-5'>
          Mis lugares<br /> <div className='d-flex'><strong className='cancun-text mt-1'>Favoritos</strong><i class='fa fa-heart white-heart ms-2' /> </div>
        </h1>
      </header>
      <main className='container-fluid routes'>
        <section className='container'>
          <div className='row'>
            <div className='col-12' />
          </div>
          {routes.length > 0
            ? <div className='row mb-5 mt-5'>
              {routes.map((route) => (
                <>
                  <div key={route._id} className='col-md-6 col-lg-4'>
                    <article className='card pb-4 mb-4'>
                      <header className=''>
                        <img
                          className=''
                          src={route.image}
                          alt='Image route'
                          width='100%'
                          height={276}
                        />
                      </header>
                      <main className='card-body'>
                        <div className='d-flex justify-content-between'>
                          <h4>{route.title}</h4>
                          <div className='d-flex align-items-center' />

                        </div>
                        <p className='routes__text'>{showMore ? route.description : `${(route.description).substring(0, 118)}...`}</p>
                        <button className='btn' onClick={() => setShowMore(!showMore)}>
                          {showMore ? 'Ver menos...' : 'Ver más...'}
                        </button>
                      </main>
                      <div className='ps-3 pe-3'>
                        <Link
                          href={`/rutas/${route.slug}`}
                          className='btn btn-movebike contained w-100'
                        >
                          Visitar ruta
                        </Link>
                      </div>
                    </article>
                  </div>
                </>
              ))}
              </div>
            : <div className='text-center mt-5 mb-5'>
              <p>Para guardar tus sitios favoritos <br /> visita la sección de<Link className='dropdown-item' href='/rutas'>
                <button className='btn btn-movebike contained m-2'>Rutas</button>
                                                                              </Link>
              </p>
            </div>}
        </section>
      </main>
    </Layout>
  )
}
