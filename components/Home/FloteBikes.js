import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
// import required modules
import { Navigation, Pagination } from 'swiper'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function FloteBikes () {
  const router = useRouter()
  const [isClickBook, setIsClickBook] = useState(false)

  const dateIniciatal = new Date()
  const year = dateIniciatal.getFullYear()
  const mes = dateIniciatal.getMonth() + 1
  const day = dateIniciatal.getDate()
  const [checkIn, setCheckIn] = useState(dayjs(`${mes}-${day}-${year}`))
  const [checkOut, setCheckOut] = useState()
  const [dateNow, setDateNow] = useState('')
  useEffect(() => {
    const date = Date.now()
    setDateNow(date)
  }, [dateNow])

  const [location, setAge] = useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center flotebikes__title'>
            Motocicletas <br className='d-lg-none' /> disponibles
          </h2>
        </div>
        <div className='flotebikes__switch mx-auto'>
          <button className='btn btn-movebike link'>Scooters</button>
          <div className='separator' />
          <button className='btn btn-movebike link text-black'>Motos</button>
        </div>
      </div>
      <div className='row flotebikes__swiper-bikes'>
        <Swiper
          slidesPerView='auto'
          centeredSlides
          navigation={true}
          loop
          pagination={{
            clickable: true
          }}
          breakpoints={{
            576: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 15
            }
          }}
          modules={[Pagination, Navigation]}
          // className="mySwiper"
        >
          <SwiperSlide>
            <div className='col-12'>
                <article className={`flotebikes__card ${isClickBook ? 'd-none': 'd-block'}`}>
                  <header className='flotebikes__card--image-bike text-center'>
                    <Image
                      src='/assets/landing/flotebikers/vitalia-150.webp'
                      alt='Scooter Vitalia 150'
                      layout='filla'
                      width={160}
                      height={140}
                    />
                  </header>
                  <main className='flotebikes__card-body'>
                    <section>
                      <p className='flotebikes__card-body__model mb-0'>
                        Modelo 2022
                      </p>
                      <h3 className='flotebikes__card-body__name'>
                        Scooter Vitalia 150
                      </h3>
                    </section>
                    <section className='flotebikes__card-body--features'>
                      <ul className='navbar-nav'>
                        <li className='nav-item'>
                          <Image
                            src='/assets/icons/icon_web.svg'
                            alt='Icon max confort'
                            layout='filla'
                            width={20}
                            height={20}
                          />
                          <span className='feature'>
                            Máximo confort para tu movilidad
                          </span>
                        </li>
                        <li className='nav-item'>
                          <Image
                            src='/assets/icons/icon_web.svg'
                            alt='Icon max confort'
                            layout='filla'
                            width={20}
                            height={20}
                          />
                          <span className='feature'>
                            Incluye una cadena de seguridad
                          </span>
                        </li>
                        <li className='nav-item'>
                          <Image
                            src='/assets/icons/icon_web.svg'
                            alt='Icon max confort'
                            layout='filla'
                            width={20}
                            height={20}
                          />
                          <span className='feature'>
                            Incluye 2 cascos por cada moto
                          </span>
                        </li>
                        <li className='nav-item'>
                          <Image
                            src='/assets/icons/icon_web.svg'
                            alt='Icon max confort'
                            layout='filla'
                            width={20}
                            height={20}
                          />
                          <span className='feature'>Soporte 24/7</span>
                        </li>
                      </ul>
                    </section>
                    <section className='flotebikes__card-body-info'>
                      <strong className='flotebikes__card-body-info--rentFrom'>Renta desde: </strong>
                      <h4 className='flotebikes__card-body-info--price'>$450/día</h4>
                    </section>
                  </main>
                  <footer className='flotebikes__card-footer text-center '>
                    <button onClick={() => setIsClickBook(true)} className='btn btn-movebike outlined shadow btn-booking'>
                      Reservar ahora
                    </button>
                  </footer>
                </article>
                <article className={`flotebikes__card flotebikes__card--book ${isClickBook ? 'd-block': 'd-none'}`}>
                  <button className='btn close-book' onClick={() => setIsClickBook(false)}><Image src={'/assets/icons/icon-close.webp'} alt={'Icon close'} layout={'fill'} width={32} height={32} /> </button>

                  <main className='flotebikes__card-body mt-5'>
                    <select className="form-select flotebikes__card-body--location" aria-label="Default select example">
                      <option disabled defaultValue>Ubicación</option>
                      <option value="Cancún, Quintana Roo.">Cancún, Quintana Roo.</option>
                      <option value="Tulúm, Quintana Roo.">Tulúm, Quintana Roo.</option>
                    </select>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FormControl fullWidth className='mt-3'>
                        <DatePicker
                          label="Check In"
                          className="datepicker mt-lg-none"
                          value={checkIn}
                          minDate={dayjs(dateNow)}
                          onChange={(newValue) => {
                            setCheckIn(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                        />
                      </FormControl>
                      <div className="separator d-none d-md-flex" />
                      <FormControl fullWidth className='mt-3'>
                        <DatePicker
                          label="Check Out"
                          className="datepicker mt-2 mt-lg-0"
                          value={checkOut}
                          minDate={dayjs(dateNow)}
                          onChange={(newValue) => {
                            setCheckOut(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </FormControl>
                    </LocalizationProvider>
                  </main>
                </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='col-12'>
              <article className='flotebikes__card'>
                <header className='flotebikes__card--image-bike text-center'>
                  <Image
                    src='/assets/landing/flotebikers/vitalia-125.webp'
                    alt='Scooter Vitalia 150'
                    layout='filla'
                    width={160}
                    height={140}
                  />
                </header>
                <main className='flotebikes__card-body'>
                  <section>
                    <p className='flotebikes__card-body__model mb-0'>
                      Modelo 2022
                    </p>
                    <h3 className='flotebikes__card-body__name'>
                      Scooter Vitalia 125
                    </h3>
                  </section>
                  <section className='flotebikes__card-body--features'>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className='flotebikes__card-body-info'>
                    <strong className='flotebikes__card-body-info--rentFrom'>Renta desde: </strong>
                    <h4 className='flotebikes__card-body-info--price'>$450/día</h4>
                  </section>
                </main>
                <footer className='flotebikes__card-footer text-center'>
                  <button className='btn btn-movebike outlined shadow btn-booking'>
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='col-12'>
              <article className='flotebikes__card'>
                <header className='flotebikes__card--image-bike text-center'>
                  <Image
                    src='/assets/landing/flotebikers/ws-sport-150.webp'
                    alt='Scooter Ws Sport 150'
                    layout='filla'
                    width={160}
                    height={140}
                  />
                </header>
                <main className='flotebikes__card-body'>
                  <section>
                    <p className='flotebikes__card-body__model mb-0'>
                      Modelo 2022
                    </p>
                    <h3 className='flotebikes__card-body__name'>
                      Scooter Ws Sport 150
                    </h3>
                  </section>
                  <section className='flotebikes__card-body--features'>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className='flotebikes__card-body-info'>
                    <strong className='flotebikes__card-body-info--rentFrom'>Renta desde: </strong>
                    <h4 className='flotebikes__card-body-info--price'>$450/día</h4>
                  </section>
                </main>
                <footer className='flotebikes__card-footer text-center'>
                  <button className='btn btn-movebike outlined shadow btn-booking'>
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='col-12'>
              <article className='flotebikes__card'>
                <header className='flotebikes__card--image-bike text-center'>
                  <Image
                    src='/assets/landing/flotebikers/vitalia-150.webp'
                    alt='Scooter Vitalia 150'
                    layout='filla'
                    width={160}
                    height={140}
                  />
                </header>
                <main className='flotebikes__card-body'>
                  <section>
                    <p className='flotebikes__card-body__model mb-0'>
                      Modelo 2022
                    </p>
                    <h3 className='flotebikes__card-body__name'>
                      Scooter Vitalia 150
                    </h3>
                  </section>
                  <section className='flotebikes__card-body--features'>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className='flotebikes__card-body-info'>
                    <strong className='flotebikes__card-body-info--rentFrom'>Renta desde: </strong>
                    <h4 className='flotebikes__card-body-info--price'>$450/día</h4>
                  </section>
                </main>
                <footer className='flotebikes__card-footer text-center'>
                  <button className='btn btn-movebike outlined shadow btn-booking'>
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='col-12'>
              <article className='flotebikes__card'>
                <header className='flotebikes__card--image-bike text-center'>
                  <Image
                    src='/assets/landing/flotebikers/vitalia-125.webp'
                    alt='Scooter Vitalia 125'
                    layout='filla'
                    width={160}
                    height={140}
                  />
                </header>
                <main className='flotebikes__card-body'>
                  <section>
                    <p className='flotebikes__card-body__model mb-0'>
                      Modelo 2022
                    </p>
                    <h3 className='flotebikes__card-body__name'>
                      Scooter Vitalia 125
                    </h3>
                  </section>
                  <section className='flotebikes__card-body--features'>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className='flotebikes__card-body-info'>
                    <strong className='flotebikes__card-body-info--rentFrom'>Renta desde: </strong>
                    <h4 className='flotebikes__card-body-info--price'>$450/día</h4>
                  </section>
                </main>
                <footer className='flotebikes__card-footer text-center'>
                  <button className='btn btn-movebike outlined shadow btn-booking'>
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='col-12'>
              <article className='flotebikes__card'>
                <header className='flotebikes__card--image-bike text-center'>
                  <Image
                    src='/assets/landing/flotebikers/ws-sport-150.webp'
                    alt='Scooter Ws Sport 150'
                    layout='filla'
                    width={160}
                    height={140}
                  />
                </header>
                <main className='flotebikes__card-body'>
                  <section>
                    <p className='flotebikes__card-body__model mb-0'>
                      Modelo 2022
                    </p>
                    <h3 className='flotebikes__card-body__name'>
                      Scooter Ws Sport 150
                    </h3>
                  </section>
                  <section className='flotebikes__card-body--features'>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Máximo confort para tu movilidad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye una cadena de seguridad
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>
                          Incluye 2 cascos por cada moto
                        </span>
                      </li>
                      <li className='nav-item'>
                        <Image
                          src='/assets/icons/icon_web.svg'
                          alt='Icon max confort'
                          layout='filla'
                          width={20}
                          height={20}
                        />
                        <span className='feature'>Soporte 24/7</span>
                      </li>
                    </ul>
                  </section>
                  <section className='flotebikes__card-body-info'>
                    <strong className='flotebikes__card-body-info--rentFrom'>Renta desde: </strong>
                    <h4 className='flotebikes__card-body-info--price'>$450/día</h4>
                  </section>
                </main>
                <footer className='flotebikes__card-footer text-center'>
                  <button className='btn btn-movebike outlined shadow btn-booking'>
                    Reservar ahora
                  </button>
                </footer>
              </article>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </>
  )
}
