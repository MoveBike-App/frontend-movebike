import Head from 'next/head'
import React, { useEffect } from 'react'
import Footer from './Footer'
import Nav from './Nav'

export default function Layouts ({ children, title, description }) {
  useEffect(() => {
    typeof document !== undefined
      ? require('bootstrap/dist/js/bootstrap')
      : null
  }, [])

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>{`${title} - MoveBike`}</title>
        {/* <!-- Primary Meta Tags --> */}
        <meta name='title' content={`${title} | MoveBike`} />
        <meta name='description' content={description} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://movebike.mx' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content='/assets/landing/movebike.jpg' />

        {/* <!-- Twitter --> */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://movebike.mx' />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content='/assets//landing/movebike.jpg' />
        <meta name='robots' content='follow' />
        <meta name='googlebot' content='index' />

        <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />

      </Head>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
