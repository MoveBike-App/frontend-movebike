import Layouts from '../components/Layouts'
import CardsExperience from '../components/CardsExperience'
import Hero from '../components/Home/Hero'

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
    </Layouts>
    </>
  )
}
