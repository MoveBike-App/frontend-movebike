import Layouts from 'components/Layouts'
import CardsExperience from 'components/CardsExperience'
import Hero from 'components/home/Hero'
import dynamic from 'next/dynamic'
const FloteBikes = dynamic(() => import('components/home/FloteBikes'), {
  ssr: false
})

const Places = dynamic(() => import('components/home/Places'), {
  ssr: false
})

export default function Home () {
  return (
    <>
      <Layouts title='MoveBike | Scooter & Bikes rental service' >
        {/** Hero */}
        <section className='container-fluid hero-section' id='hero'>
          <Hero />
        </section>
        <section className='container-fluid expCard' id='steps'>
          <CardsExperience />
        </section>
        <section className='container-fluid flotebikes' id='flotebikes'>
          <FloteBikes />
        </section>
        <section className='container-fluid places-section' id='places'>
          <Places />
        </section>
      </Layouts>
    </>
  )
}
