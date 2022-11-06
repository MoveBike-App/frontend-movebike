import Layouts from '../components/Layouts'
import CardsExperience from '../components/CardsExperience'
import Hero from '../components/Home/Hero'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Places from '../components/Home/Places'
const FloteBikes = dynamic(() => import('../components/Home/FloteBikes'), {
  ssr: true,
})

export default function Home() {
  return (
    <>
    <Layouts title={'MoveBike | Scooter & Bikes rental service'}>
      {/** Hero */}
      <section className='container-fluid hero-section' id='hero'>
        <Hero />
      </section>
      <section className='container-fluid expCard'>
        <CardsExperience />
      </section>
      <section className='container-fluid flotebikes'>
        <FloteBikes />
      </section>
      <section className='container-fluid places-section'>
        <Places />
      </section>
    </Layouts>
    </>
  )
}