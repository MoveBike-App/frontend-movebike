import Layouts from '../components/Layouts'
import CardsExperience from '../components/CardsExperience'

export default function Home() {
  return (
    <>
    <Layouts title={'MoveBike | Scooter & Bikes rental service'}>
      <section className='text-center mt-5 mb-5'>
      <h1>Explora Cancún con MoveBike</h1>
      <p>Donde la belleza y la cultura se encuentran</p>
      <button className='btn btn-movebike contained '>
        ¡Reserva Ahora!
      </button>
      </section>
      <CardsExperience />
    </Layouts>
    </>
  )
}
