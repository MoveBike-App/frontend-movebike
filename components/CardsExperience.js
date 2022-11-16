import Image from 'next/image'
import React from 'react'

export default function CardsExperience () {
  return (
    <>
      <section className='container'>
        <div className='row text-center'>
          <h2 className='mv-h2'>¡Una gran aventura en solo 3 pasos!</h2>
          <div className='col-12 col-md-4 position-relative'>
            <Image
              src='/assets/home/calendar.png'
              alt='Experience image'
              layout='fill'
              width={122}
              height={122}
            />
            <h3 className='landing__subtitle'>Elige las fechas</h3>
            <p className='landing__text mb-0'>
              ¿Cuántos días deseas vivir la <br className='' /> experiencia?
            </p>
            <div className='position-absolute arrow-orange d-md-none d-lg-flex'>
              <Image src='/assets/home/cards/arrow-orang.webp' alt='Arrow left experience' layout='fill' width={80} height={80} />
            </div>

          </div>
          <div className='col-12 col-md-4 position-relative'>
            <Image
              src='/assets/home/moto.png'
              alt='Experience image'
              layout='fill'
              width={122}
              height={122}
            />
            <h3 className='landing__subtitle'>Reserva tu moto</h3>
            <p className='landing__text mb-0'>
              Realiza tu pago y espera la <br /> llegada de tu vehículo!
            </p>
            <div className='position-absolute arrow-left d-md-none d-lg-flex'>
              <Image src='/assets/home/cards/arrow-left-cardexpe.webp' alt='Arrow left experience' layout='fill' width={80} height={80} />
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <Image
              src='/assets/home/umbrella.png'
              alt='Experience image'
              layout='fill'
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
