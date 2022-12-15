import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const myLoader = ({ src }) => {
  return `${src}`
}

export default function CardMoto ({ image, model, name, price, slug, type, keyImage }) {
  return (
    <article className='flotebikes__card'>
      <header className='flotebikes__card--image-bike d-flex justify-content-center'>
        <Image
          loader={myLoader}
          src={`${image}`}
          alt={`${keyImage}`}
          width={160}
          height={140}
        />
      </header>
      <main className='flotebikes__card-body'>
        <section>
          <p className='flotebikes__card-body__model mb-0'>Modelo {model}</p>
          <h3 className='flotebikes__card-body__name'>{name}</h3>
        </section>
        <section className='flotebikes__card-body--features'>
          <ul className='navbar-nav'>
            <li className='d-flex nav-item mb-2'>
              <Image
                src='/assets/icons/icon_web.svg'
                alt='Icon max confort'
                width={20}
                height={20}
              />
              <span className='feature'>Máximo confort para tu movilidad</span>
            </li>
            <li className='d-flex nav-item mb-2'>
              <Image
                src='/assets/icons/icon_web.svg'
                alt='Icon max confort'
                width={20}
                height={20}
              />
              <span className='feature'>Incluye una cadena de seguridad</span>
            </li>
            <li className='d-flex nav-item mb-2'>
              <Image
                src='/assets/icons/icon_web.svg'
                alt='Icon max confort'
                width={20}
                height={20}
              />
              <span className='feature'>Incluye 2 cascos por cada moto</span>
            </li>
            <li className='d-flex nav-item mb-2'>
              <Image
                src='/assets/icons/icon_web.svg'
                alt='Icon max confort'
                width={20}
                height={20}
              />
              <span className='feature'>Soporte 24/7</span>
            </li>
          </ul>
        </section>
        <section className='flotebikes__card-body-info'>
          <strong className='flotebikes__card-body-info--rentFrom'>
            Renta desde:{' '}
          </strong>
          <h4 className='flotebikes__card-body-info--price'>${price}/día</h4>
        </section>
      </main>
      <footer className='flotebikes__card-footer text-center '>
        <Link
          href={`/motos/${slug}`}
          className='btn btn-movebike outlined shadow btn-booking'
        >
          Reservar ahora
        </Link>
      </footer>
    </article>
  )
}
