import React, { useEffect } from 'react'
import Layouts from 'components/Layouts'
import { useRouter } from 'next/router'
import { getById } from 'services/bikes/motos'
import { useState } from 'react'

export default function Bike() {
  const router = useRouter()
  const [moto, setMoto] = useState({})
  const { id } = router.query

    const getMoto = async () => {
      try {
        const axiosResponse = await getById(id)
        setMoto(axiosResponse.data.data.moto)
      } catch (error) {
        
      }
      
    }

    useEffect(() => {
      getMoto()
    }, [id])
    
    
  return (
    <Layouts>
        <main>
            <section className='container-fluid'>
              <div className='container'>
                <div className='row'>
                  <div className='col-12'>
                    <h1>{moto.name}</h1>
                  </div>
                </div>
              </div>
            </section>
        </main>
    </Layouts>
  )
}

// export async function getStaticPaths() {
//     // Return a list of possible value for id
// }

// export async function getStaticProps({ params }) {
// // Fetch necessary data for the blog post using params.id
// }

// export async function getServerSideProps(context) {
  
//   return {
//     props: {
//       name: 'moto'
//     }
//    }
// }