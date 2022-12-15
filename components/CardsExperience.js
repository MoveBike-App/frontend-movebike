import Image from 'next/image'
import React from 'react'
const card1 = '/assets/icons/calendar.png'

export default function CardsExperience () {
  return (
    <>
      <section className='container'>
        <div className='row text-center'>
          <h2 className='mv-h2'>¡Una gran aventura en solo 3 pasos!</h2>
          <div className='col-12 col-md-4 position-relative'>
            <Image
              src={card1}
              alt='Experience image'
              width={122}
              height={122}
            />
            <h3 className='landing__subtitle'>Elige las fechas</h3>
            <p className='landing__text mb-0'>
              ¿Cuántos días deseas vivir la <br className='' /> experiencia?
            </p>
            <div className='position-absolute arrow-orange d-md-none d-lg-flex'>
              <Image src='/assets/landing/cards/arrow-orang.webp' alt='Arrow left experience' width={80} height={80} />
            </div>

          </div>
          <div className='col-12 col-md-4 position-relative'>
            <Image
              src='/assets/landing/moto.png'
              alt='Experience image'

              width={122}
              height={122}
            />
            <h3 className='landing__subtitle'>Reserva tu moto</h3>
            <p className='landing__text mb-0'>
              Realiza tu pago y espera la <br /> llegada de tu vehículo!
            </p>
            <div className='position-absolute arrow-left d-md-none d-lg-flex'>
              <Image src='/assets/landing/cards/arrow-left-cardexpe.webp' alt='Arrow left experience' width={80} height={80} />
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <Image
              src='/assets/landing/umbrella.png'
              alt='Experience image'

              width={122}
              height={122}
            />
            <h3 className='landing__subtitle'>¡Vive la experiencia!</h3>
            <p className='landing__text mb-0'>
              Escoge y visita los sitios <br /> turísticos que te ofrecemos
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
