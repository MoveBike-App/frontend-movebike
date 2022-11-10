import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layouts'

export default function Thanks() {
  return (
    <Layout>
        <main class="cotainer-fluid thanks">
            <div class="container">
                <div class="row">
                    <div class="col-md-9 mx-auto">
                        <article className='thanks__card text-center'>
                            <Image src={'/assets/icons/icon-check-thanks.webp'} alt='Icon check thanks' layout={'fill'} width={56} height={56} />
                            <h1 className='thanks__card-title'>¡Gracias por preferirnos!</h1>
                            <strong className='thanks__card-subtitle'>Tu reserva se ha realizado con éxito</strong>
                            <p className='thanks__card-subtitle mt-2 mb-0'>En breve recibirás un correo con la información <br /> del contacto encargado de entregar tu reserva</p>
                            <Link className='btn btn-movebike contained me-bookings' href={'/checkout'}>Mis Reservas</Link>

                            <div className='thanks__card-tracking steps mx-auto d-flex flex-column flex-md-row justify-content-between align-items-center'>
                                <div className='round-step round-step--fill d-flex justify-content-center align-items-center'>
                                    <span className='position-absolute msg-status'>Reservada</span>
                                    <Image src={'/assets/icons/icon-check-step.webp'} alt={'Icon check step'} layout={'fill'} width={32} height={32} />
                                </div>
                                <div className='conector'></div>
                                <div className='round-step round-step--border d-flex justify-content-center align-items-center'>

                                </div>
                                <div className='conector conector--disabled'></div>
                                <div className='round-step round-step--disabled d-flex justify-content-center align-items-center'>

                                </div>
                                <div className='conector conector--disabled'></div>
                                <div className='round-step round-step--disabled d-flex justify-content-center align-items-center'>

                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    </Layout>
  )
}
