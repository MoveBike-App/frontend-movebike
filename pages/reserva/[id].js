import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layouts from 'components/Layouts'
import { getReserveById } from '../../services/reserves/reserve'

import { format } from 'date-fns'
import es from 'date-fns/locale/es'

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`
}
// ['processing', 'reserved', 'onWay', 'delivered', 'canceled']
export default function Detail () {
  const router = useRouter()
  const [data, setData] = useState([])
  const [fechaI, setFechaI] = useState()
  const [status, setStatus] = useState()
  const { id } = router.query

  const getReserve = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await getReserveById(id, token)
      const dataJson = await response.json()
      setData(dataJson.data.reserves)
      setFechaI(dataJson.data.reserves.initialDate)
      setStatus(dataJson.data.reserves.status)
    } catch (error) {}
  }
  useEffect(() => {
    getReserve()
  }, [id])
  return (
    <Layouts title={`Reserva ${data.slug}`}>
      <main className='container-fluid reserve'>
        <section className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='d-flex align-items-center  mb-4'>
                {' '}
                <h4 className='me-3'>No. reserva</h4>{' '}
                <span className='reserve__number d-flex align-items-center text-black-600'>
                  <i
                    className='fa fa-bookmark text-orange-900'
                    aria-hidden='true'
                  />
                  <div className='ms-2 text-uppercase'>{data?.slug}</div>
                </span>{' '}
              </div>
            </div>
            <div className='col-lg-7 mt-3'>
              <section className='checkout__card'>
                <article className='checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center'>
                  <img
                    // loader={myLoader}
                    src={`${data?.vehicle?.image}`}
                    alt={`Reserva ${data?.slug}`}
                    width={130}
                    height={95}
                  />
                  <div className='checkout__card-details text-justify'>
                    <span className='text-gray-400'>Reservado x 1</span>
                    <p className='mb-0 text-gray-400'>{data.vehicle?.name}</p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>
                        Fecha Inicio:
                      </strong>{' '}
                      {data.initialDate
                        ? format(
                          new Date(data?.initialDate),
                          'dd/MM/yyyy H:mm b',
                          { locales: es }
                        )
                        : ''}
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>
                        Fecha Fin:
                      </strong>{' '}
                      {data.finalDate
                        ? format(
                          new Date(data?.finalDate),
                          'dd/MM/yyyy H:mm b',
                          { locales: es }
                        )
                        : ''}
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>Día (s):</strong>{' '}
                      {data?.totalDays}
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>Dónde:</strong>{' '}
                      Cancún, Quintana Roo, Mex.
                    </p>
                  </div>
                  <strong className='checkout__card-price text-orange-900 ms-md-auto'>
                    {new Intl.NumberFormat('en-In', {
                      style: 'currency',
                      currency: 'MXN',
                      minimumFractionDigits: 2
                    }).format(data?.totalPrice)}
                  </strong>
                </article>
              </section>
            </div>
            <div className='col-lg-5 mt-5 mt-lg-2'>
              <section className=''>
                <p className='text-center text-gray-600 h5 mb-lg-3'>
                  Sigue de cerca el estado de tu reserva
                </p>
                {status != 'canceled' && status != 'backInStock'
                  ? (
                    <>
                      <div className='d-flex wrapper-status justify-content-between'>
                        <div className='msg-status'>Procesando</div>
                        <div className='msg-status'>Reservada</div>
                        <div className='msg-status'>En ruta</div>
                        <div className='msg-status'>Entregada</div>
                      </div>
                      <div className='reserve__tracking steps mx-auto d-flex flex-column flex-md-row justify-content-between align-items-center'>
                        <div className='round-step round-step--fill d-flex justify-content-center align-items-center'>
                          <Image
                            src='/assets/icons/icon-check-step.webp'
                            alt='Icon check step'
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className='conector' />
                        <div
                          className={`round-step ${
                          status === 'reserved' ||
                          status === 'onWay' ||
                          status === 'delivered'
                            ? 'round-step--fill'
                            : 'round-step--border'
                        }  d-flex justify-content-center align-items-center`}
                        >
                          {status === 'reserved' ||
                        status === 'onWay' ||
                        status === 'delivered'
                            ? (
                              <Image
                                src='/assets/icons/icon-check-step.webp'
                                alt='Icon check step'
                                width={32}
                                height={32}
                              />
                              )
                            : (
                                ''
                              )}
                        </div>
                        <div
                          className={`conector ${
                          status === 'reserved' ||
                          status === 'onWay' ||
                          status === 'delivered'
                            ? ''
                            : 'conector--disabled'
                        }`}
                        />
                        <div
                          className={`round-step ${
                          status === 'reserved'
                            ? 'round-step--border'
                            : status === 'onWay' || status === 'delivered'
                            ? 'round-step--fill'
                            : 'round-step--disabled'
                        } d-flex justify-content-center align-items-center`}
                        >
                          {status === 'onWay' || status === 'delivered'
                            ? (
                              <Image
                                src='/assets/icons/icon-check-step.webp'
                                alt='Icon check step'
                                width={32}
                                height={32}
                              />
                              )
                            : (
                                ''
                              )}
                        </div>
                        <div
                          className={`conector ${
                          status === 'onWay' || status === 'delivered'
                            ? ''
                            : 'conector--disabled'
                        }`}
                        />
                        <div
                          className={`round-step ${
                          status === 'delivered'
                            ? 'round-step--fill'
                            : status === 'onWay'
                            ? 'round-step--border'
                            : 'round-step--disabled'
                        } d-flex justify-content-center align-items-center`}
                        >
                          {status === 'delivered' && (
                            <Image
                              src='/assets/icons/icon-check-step.webp'
                              alt='Icon check step'
                              width={32}
                              height={32}
                            />
                          )}
                        </div>
                      </div>
                    </>
                    )
                  : status === 'backInStock'
                    ? (
                      <div className='text-center fw-bold alert alert-success' role='alert'>
                        Motocicleta entregada
                      </div>
                      )
                    : (
                      <div className='alert alert-danger' role='alert'>
                        ¡Lo sentimos, tu reserva ha sido cancelada!
                      </div>
                      )}
              </section>

              <section className=' text-center mt-5 mb-4'>
                <p>
                  O ponte en contacto con nuestro <br /> soporte para
                  aclaraciones y <br /> cancelaciones
                </p>
                <strong className='text-black-800'>Movebike México</strong>
                <p>
                  Av. Bonampak, SM 23, Mz 45, Lt 89, CP 77560, Cancún Quintana
                  Roo, México
                </p>
                <p>
                  Teléfonos 998 598 56 75, 998 467 89 45 <br />
                  movebikeapp@gmail.com
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </Layouts>
  )
}
