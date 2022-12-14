import React, { useCallback, useEffect, useState } from 'react'
import Layout from 'components/Layouts.js'
import { getAllRoutes } from 'services/routes'
import Link from 'next/link'

const myLoader = ({ src }) => {
  return `${src}`
}

import Image from 'next/image'
import { addAReaction, deleteAReaction } from '../../services/routes'
import VerifyModal from '../../components/Utilities/VerifyModal'

export default function Rutas () {
  const [routes, setRoutes] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [verify, setVerify] = useState(false)
  const handleCloseVerify = () => setVerify(false)

  const fetchRoutes = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('userCurrent'))
    const response = await getAllRoutes()
    const dataJson = await response.json()
    if (user) {
      const routesList = dataJson.data.routes
      routesList.map(route => {
        route.currentReaction =
          route.reactions.find(reaction =>
            (reaction.author != null && reaction.author._id == user.id)
          )
        route.hasOwnReaction = route.currentReaction != null
        return route
      })
    }
    setRoutes(dataJson.data.routes)
  }, [])

  function handleClick (hasOwnReaction, currentRoute) {
    if (!localStorage.getItem('token')) {
      setVerify(true)
      return
    }
    if (hasOwnReaction) {
      deleteAFavorite(currentRoute)
    } else {
      addAFavorite(currentRoute._id)
    }
  }
  useEffect(() => {
    fetchRoutes()
  }, [routes])

  const deleteAFavorite = async (route) => {
    const token = localStorage.getItem('token')
    try {
      const response = await deleteAReaction(route.currentReaction._id, token)
      const dataJson = await response.json()
      if (dataJson.success) {
        const reactions = routes.find(r => r._id === route._id).reactions
        routes.find(r => r._id === route._id).reactions = reactions.filter(r => r._id !== route.currentReaction._id)
        routes.find(r => r._id === route._id).hasOwnReaction = false
        routes.find(r => r._id === route._id).currentReaction = null
        setRoutes(routes)
      }
    } catch (error) {}
  }
  const addAFavorite = async (idRoute) => {
    const token = localStorage.getItem('token')
    try {
      const response = await addAReaction(idRoute, token)
      const dataJson = await response.json()
      if (dataJson.success) {
        routes.find(r => r._id === idRoute).reactions.push(dataJson.data.reaction)
        routes.find(r => r._id === idRoute).hasOwnReaction = true
        routes.find(r => r._id === idRoute).currentReaction = dataJson.data.reaction
        setRoutes(routes)
      }
    } catch (error) {}
  }

  return (
    <Layout title='??Qu?? hacer en Canc??n?'>
      <header className='bg-header d-flex justify-content-center align-items-center'>
        <h1 className='mv-h2 text-white text-center mt-5'>
          Bienvenido a<br /> <strong className='cancun-text mt-1'>Canc??n</strong>
        </h1>
      </header>
      <main className='container-fluid routes'>
        <section className='container'>
          <div className='row'>
            <div className='col-12'>
              <h2 className='mv-h2 mt-5 text-center text-gray-600'>
                ??La aventura comienza ahora!
              </h2>
              <div className='line' />
              <p className='mt-4 text-center routes__subtitle'>
                Canc??n es m??s que un destino de fiesta con hoteles de lujo
                (aunque uno bueno). Es la puerta de entrada de la pen??nsula de
                Yucat??n a un mundo de pir??mides mayas cubiertas de jungla, las
                cuevas de cristal de R??o Secreto y un para??so de buceo frente a
                Isla Mujeres...
              </p>
            </div>
          </div>
          <div className='row mb-5'>
            <div className='col-12'>
              <h3 className='mv-h2 text-center routes__headding text-gray-600 mt-5 mb-4'>
                Las mejores atracciones en Canc??n
              </h3>
            </div>

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
                        <div className='d-flex align-items-center'>
                          <button
                            onClick={() => {
                              return handleClick(route.hasOwnReaction, route)
                            }} className={route.hasOwnReaction ? 'btn-im' : 'icon-heart'}
                          >
                            <Image
                              className={route.hasOwnReaction ? 'icon-heart__active' : ''}
                              src='/assets/icons/icon-heart.webp'
                              alt='Icon heart'
                              width={26}
                              height={26}
                            />
                          </button>
                        </div>

                      </div>
                      <p className='routes__text'>{showMore ? route.description : `${(route.description).substring(0, 118)}...`}</p>
                      <button className='btn' onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Ver menos...' : 'Ver m??s...'}
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
        </section>
        <VerifyModal
          show={verify}
          onHide={() => setVerify(false)}
          title='??Inicia Sesi??n!'
          body={
            <>
              <div className='col-12'>
                <p className='mb-0 login__paragraph'>
                  Inicia sesi??n o crea una cuenta para poder guardar tus lugares favoritos.
                </p>
              </div>
            </>
        }
          handleClick={handleCloseVerify}
          handleClose={handleCloseVerify}
        />
      </main>

    </Layout>
  )
}
