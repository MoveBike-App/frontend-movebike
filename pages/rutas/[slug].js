import React, { useState, useEffect } from 'react'
import Layout from 'components/Layouts.js'
import { useRouter } from 'next/router'
import { getBySlug } from '../../services/routes'

export default function Ruta () {
  const router = useRouter()
  const [routeData, setRouteData] = useState({})
  const { slug } = router.query

  const getOneRoute = async() => {
    try {
      const response = await getBySlug(slug)
      const dataJson = await response.json()
      const { data: route } = dataJson

    setRouteData(route.route)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(!slug){
      router.push('/rutas')
    } else {
      getOneRoute()
    }
  }, [slug])

  return (
    <Layout title={`${routeData.title ? routeData?.title : 'Moto'} - MoveBike`}>
      <header className='single-route'>
        <img className='single-route__bg-image' src={`${routeData?.image}`} alt={`${routeData?.keyImage}`} />
        <div className='single-route__title text-center'>
          <h1 className=''>{routeData?.title}</h1>
          <p className='text-white'>{routeData?.preview}</p>
        </div>
        
      </header>
      <main className='container-fluid'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
            <h1 className='single-route__subheading text-black-700'>¡Comienza tu aventura!</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6'>
              <iframe src={`${routeData?.googleMapsLink}`} width='100%' height='100%' allowFullScreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade' />
            </div>
            <div className='col-lg-6'>
              <p className='single-route__description'>{routeData?.description}</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
