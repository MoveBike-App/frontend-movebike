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
        <meta name='robots' content='follow' />
        <meta name='googlebot' content='index' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
      </Head>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
