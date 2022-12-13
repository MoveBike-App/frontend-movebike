import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer () {
  return (
    <div className='container-fluid footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 d-flex flex-column justify-content-center col-lg-4'>
            <Image
              className='text-center mx-auto mx-lg-0'
              src='/assets/logos/logo-movebike-black.webp'
              alt='Logo footer'
              
              width={210}
              height={57}
            />
            <p className='text-center footer__subtitle text-lg-start'>
              Una lista de los 75 mejores lugares <br className='d-md-none' /> turísticos <br className='d-none d-lg-flex' /> del mundo
              para unas <br className='d-md-none' />
              vacaciones o un viaje perfecto
            </p>
            <div className='footer__social mx-auto mx-lg-0'>
              <a href="https://www.facebook.com/movebikemx/" target={'_blank'} rel="noreferrer">
                <Image
                  src='/assets/icons/icon-facebook-movebike.webp'
                  alt='Facebook Movebike'
                  width={32}
                  height={32}
                  className='footer__social--facebook'
                />
              </a>
              <a href="https://www.instagram.com/movebikemx/" target={'_blank'} rel="noreferrer">
              <Image
                src='/assets/icons/icon-instagram-movebike.webp'
                alt='Instagram Movebike'
                
                width={32}
                height={32}
                className='footer__social--instagram'
              />
              </a>
              
              <a href="https://wa.me/message/Y2CMRDDXMFB4G1" target={'_blank'} rel={'noreferrer '}>
              <Image
                src='/assets/icons/icon-whatsapp-movebike.webp'
                alt='Whatsapp Movebike'
                
                width={32}
                height={32}
                className='footer__social--whatsapp'
              />
              </a>
            </div>
          </div>
          <div className='col-12 col-lg-4 footer__navigation '>
            <p className='text-center footer__navigation--title text-lg-start'>Navegación</p>
            <ul className='navbar-nav text-center text-lg-start'>
              <li className='nav-item'>
                <Link className='nav-link' href='/'>
                  Inicio
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' href='/'>
                  Beneficios
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' href='/'>
                  Rutas
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-12 col-lg-4 footer__legals'>
            <p className='text-center footer__legals--title text-lg-start'>Legales</p>
            <ul className='navbar-nav text-center text-lg-start'>
              <li className='nav-item'>
                <Link className='nav-link' href='/'>
                  Políticas de privacidad
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' href='/'>
                  Políticas de cancelación
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' href='/'>
                  FAQ’s
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
