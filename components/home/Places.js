import React, { useCallback, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
// import required modules
import { Mousewheel, Navigation, Pagination, Autoplay } from 'swiper'
import { getAllRoutes } from '../../services/routes'

const myLoader = ({ src }) => {
  return `${src}`
}

export default function Places () {
  const router = useRouter()
  const [routes, setRoutes] = useState([])

  const fetchRoutes = useCallback(async () => {
    const response = await getAllRoutes()
    const dataJson = await response.json()

    setRoutes(dataJson.data.routes)
  }, [])

  useEffect(() => {
    fetchRoutes()
  }, [fetchRoutes])

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-lg-4 d-flex flex-column justify-content-center'>
          <div>
            <h2 className='text-center text-lg-start places-section__title'>
              ¡Encuentra tu sitio ideal!
            </h2>
            <p className='text-center footer__subtitle text-lg-start'>
              Una lista de los lugares <strong>más visitados</strong>  <br className='d-md-none' /> en Cancún <br className='d-none d-lg-flex' />
              para un <br className='d-md-none' />
              viaje inolvidable.
            </p>
            <strong className='text-center footer__subtitle text-lg-start'>
              Vive la experiencia ahora
            </strong>
            <Link
              href='/rutas'
              className='btn btn-movebike contained d-none d-lg-flex justify-content-lg-center text-center btn-place-book'
            >
              Explorar lugares
            </Link>
          </div>
        </div>
        <div className='col-12 col-lg-8'>
          <Slider {...settings}>
            {routes.map((route, index) => (
              <div key={index}>
                <div className='col-12'>
                  <article className='places-section__card d-flex flex-column justify-content-between'>
                    <img className='img-fluid bg-route' src={`${route.image}`} alt='bg-routes' />
                    <header className='d-flex header-heart justify-content-end' />
                    <section>
                      <div className='places-section__card-overlay d-flex align-items-center'>
                        <div className='waves d-flex align-items-center justify-content-around'>
                          <Image
                            src='/assets/icons/icon-start.webp'
                            alt='Icon start'
                            width={12}
                            height={12}
                          />
                          <span>4.8</span>
                        </div>
                      </div>
                      <div className='places-section__card-footer d-flex align-items-center bg-white'>
                        <div>
                          <h4 className='places-section__card-footer--title'>
                            {route?.title}
                          </h4>
                          <p className='places-section__card-footer--subtitle'>
                            Zona Hotelera, 7.5 KM
                          </p>
                        </div>
                        <Link
                          href={`/rutas/${route.slug}`}
                          className='btn btn-movebike contained btn-visit'
                        >
                          Visitar
                        </Link>
                      </div>
                    </section>
                  </article>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className='col-12'>
          <Link href='/rutas' className='btn btn-movebike contained mt-5 mx-auto d-lg-none btn-place'>
            Explorar lugares
          </Link>
        </div>
      </div>
    </div>
  )
}
