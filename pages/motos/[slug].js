import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { format, differenceInDays } from 'date-fns'
import dynamic from 'next/dynamic'

import Layouts from 'components/Layouts'
import { useRouter } from 'next/router'
import { getById } from 'services/bikes/motos'
import Image from 'next/image'
import Head from 'next/head'
import AuthContext from 'context/AuthContext'
import Features from 'components/Utilities/Features'
import moment from 'moment'
import 'moment/locale/es'
import { FormLabel, Toast, ToastContainer } from 'react-bootstrap'

import LoginModal from '../../components/Utilities/LoginModal'
import Link from 'next/link'

const FormReserve = dynamic(() => import('components/Utilities/FormReserve'), {
  ssr: false
})

const locales = ['en', 'ru', 'ar-sa']

export default function Bike () {
  const router = useRouter()
  const [moto, setMoto] = useState({})
  const [features, setFeatures] = useState([])
  const { slug } = router.query
  const [idMoto, setIdMoto] = useState('')

  useEffect(() => {
    async function getMoto () {
      try {
        const response = await getById(slug)
        const {
          data: { moto }
        } = await response.json()

        setMoto(moto)
        setFeatures(moto.features)
        setIdMoto(moto._id)
      } catch (error) {
        // router.push("/404");
      }
    }
    getMoto()
  }, [slug])

  const handleStock = (e) => {
    setCounter(e.target.value)
  }

  return (
    <>
      {(moto && (
        <Layouts title={`${moto.name ? moto.name : 'Moto'} - MoveBike`}>
          <Head>
            <meta name='description' content='' />
            <link href='https://api.mapbox.com/mapbox-assembly/v1.3.0/assembly.min.css' rel='stylesheet' />
          </Head>

          <main>
            <section className='container-fluid mt-4'>
              <div className='container'>

                <FormReserve image={moto?.image} keyImage={moto?.keyImage} nameMoto={moto?.name} price={moto.price} idMoto={moto._id} />

                <div className='row mb-5'>
                  <h3>Características</h3>
                  {features.map((feature) => (
                    <Features
                      key={feature._id}
                      icon={feature.keyIcon}
                      feature={feature.name}
                    />
                  ))}
                </div>
              </div>
            </section>
          </main>

        </Layouts>
      )) ||
        router.push('/404')}
    </>
  )
}
