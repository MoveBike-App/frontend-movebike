import Image from 'next/image'
import React from 'react'
import Layouts from '../components/Layouts'

export default function bookings () {
  return (
    <Layouts>
      <main className='container-fluid reserve'>
        <section className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='d-flex align-items-center  mb-4'> <h4 className='me-3'>No. reserva</h4> <span className='reserve__number text-black-600'><i className='fa fa-bookmark text-orange-900' aria-hidden='true' /> #59896646555555555556</span> </div>
            </div>
            <div className='col-lg-7 mt-3'>
              <section className='checkout__card'>
                <article className='checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center'>
                  <Image
                    src='/assets/landing/flotebikers/vitalia-125.webp'
                    alt='Scooter Vitalia 125'
                    layout='fill'
                    width={130}
                    height={95}
                  />
                  <div className='checkout__card-details text-justify'>
                    <span className='text-gray-400'>Reservado x 1</span>
                    <p className='mb-0 text-gray-400'>Scooter WS Sport 150</p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>
                        Fecha Inicio:
                      </strong>{' '}
                      17-10-2022
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>
                        Fecha Fin:
                      </strong>{' '}
                      25-10-2022
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>Día (s):</strong>{' '}
                      5
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>Dónde:</strong>{' '}
                      Cancún, Quintana Roo, Mex.
                    </p>
                  </div>
                  <strong className='checkout__card-price text-orange-900 ms-md-auto'>
                    $2,700.00
                  </strong>
                </article>
                <article className='checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center'>
                  <Image
                    src='/assets/landing/flotebikers/vitalia-150.webp'
                    alt='Scooter Vitalia 125'
                    layout='fill'
                    width={130}
                    height={95}
                  />
                  <div className='checkout__card-details text-justify'>
                    <span className='text-gray-400'>Reservado x 1</span>
                    <p className='mb-0 text-gray-400'>Scooter WS Sport 150</p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>
                        Fecha Inicio:
                      </strong>{' '}
                      17-10-2022
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>
                        Fecha Fin:
                      </strong>{' '}
                      25-10-2022
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>Día (s):</strong>{' '}
                      5
                    </p>
                    <p className='mb-0 text-gray-400'>
                      <strong className='checkout__card--bold'>Dónde:</strong>{' '}
                      Cancún, Quintana Roo, Mex.
                    </p>
                  </div>
                  <strong className='checkout__card-price text-orange-900 ms-md-auto'>
                    $2,700.00
                  </strong>
                </article>
              </section>
            </div>
            <div className='col-lg-5 mt-5 mt-lg-2'>
              <section className=''>
                <p className='text-center text-gray-600 h5 mb-lg-5'>Sigue de cerca el estado de tu reserva</p>
                <div className='reserve__tracking steps mx-auto d-flex flex-column flex-md-row justify-content-between align-items-center'>
                  <div className='round-step round-step--fill d-flex justify-content-center align-items-center'>
                    <span className='position-absolute msg-status'>
                      Reservada
                    </span>
                    <Image
                      src='/assets/icons/icon-check-step.webp'
                      alt='Icon check step'
                      layout='fill'
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className='conector' />
                  <div className='round-step round-step--border d-flex justify-content-center align-items-center' />
                  <div className='conector conector--disabled' />
                  <div className='round-step round-step--disabled d-flex justify-content-center align-items-center' />
                  <div className='conector conector--disabled' />
                  <div className='round-step round-step--disabled d-flex justify-content-center align-items-center' />
                </div>
              </section>

              <section className=' text-center mt-5 mb-4'>
                <p>
                  O ponte en contacto con nuestro <br /> soporte para
                  aclaraciones y <br /> cancelaciones
                </p>
                <strong className='text-black-800'>Movebike México</strong>
                <p>Av. xxxxxx, Cancún Quintana Roo, México</p>
                <p>
                  Teléfonos 998 xxx 56 75, 998 467 xx xx <br />
                  info@movebike.mx
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
    </Layouts>
  )
}
