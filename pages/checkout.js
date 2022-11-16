import Image from 'next/image'
import React from 'react'
import Layout from '../components/Layouts'

export default function Checkout () {
  return (
    <Layout>
      <main className='container-fluid checkout'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='text-gray-600 mb-4'>Finaliza tu reserva</h1>
            </div>
            <div className='col-lg-7 mt-3'>
              <section className='checkout__card'>
                <article className='checkout__card--article d-flex flex-column flex-md-row justify-content-center align-items-center'>
                  <Image
                    src='/assets/home/flotebikers/vitalia-125.webp'
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
                    src='/assets/home/flotebikers/vitalia-150.webp'
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
            <div className='col-lg-5 mt-3'>
              <section className='checkout__card'>
                <p className='checkout__card--delivery text-center'>Entrega</p>
                <div className='checkout__card--options d-flex justify-content-between'>
                  <div className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='exampleRadios'
                      id='exampleRadios1'
                      value='option1'
                      checked
                    />
                    <label className='form-check-label option' for='exampleRadios1'>
                      Mi hotel
                    </label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='exampleRadios'
                      id='exampleRadios2'
                      value='option2'
                    />
                    <label className='form-check-label option' for='exampleRadios2'>
                      En sucursal
                    </label>
                  </div>
                </div>
                <input type='text' className='form-control login__input mt-2' placeholder='Ingresa nombre de hotel' />

                <div className='d-flex mt-4 align-items-center'>
                  <label className='mb-0 w-50 option'>Hora de entrega</label>
                  <input type='time' className='form-control login__input w-50' />
                </div>

              </section>

              <section className='checkout__card mt-3'>
                <h2>Aquí va ir Stripe</h2>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
