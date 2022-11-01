import React from 'react'

export const CardExperience = ({img, title, description}) => {
    return(
        <>
            <div className='col-12 col-md-4'>
                <img src={img} alt="Experience image" />
                <h3 className='landing__subtitle'>{title}</h3>
                <p className='landing__text'>{description}</p>
            </div>

        </>
    )
}


export default function CardsExperience() {
  return (
    <>
    <article className='container-fluid expCard'>
    <section className='container'>
    <div className='row text-center'>
    <h2 className='mt-5 mb-5'>¡Una gran aventura en solo 3 pasos!</h2>
    <CardExperience 
    img= './assets/Home/calendar.png'
    title= 'Elige las fechas'
    description = '¿Cuántos días deseas vivir la experiencia?'
    />
    <CardExperience 
    img= './assets/Home/moto.png'
    title= 'Reserva tu moto'
    description = 'Realiza tu pago y espera la llegada de tu vehículo!'
    />
    <CardExperience 
    img= './assets/Home/umbrella.png'
    title= 'Vive la experiencia!'
    description = 'Escoge y visita los sitios turísticos que te ofrecemos'
    />
    
    </div>
    </section>
    </article>
    </>
  )
}
