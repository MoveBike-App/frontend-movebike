import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap'
          rel='stylesheet'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://use.fontawesome.com/releases/v5.8.1/css/all.css'
          integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf'
          crossOrigin='anonymous'
        />
        {/* <link href="https://api.mapbox.com/mapbox-assembly/v1.3.0/assembly.min.css" rel="stylesheet"></link> */}

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
