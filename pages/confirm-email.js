import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layouts'
import { validEmail } from '../services/users/auth'
import Link from 'next/link'

export default function ConfirmEmail () {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState()
  const {token} = router.query
  const verifyAccount = async () => {
    const logeado = localStorage.getItem('token')
    setIsLogged(logeado)
    const response = await validEmail(token)
    const dataJson = await response.json()
  }

  useEffect(() => {
    verifyAccount()
  }, [token])
  return (
    <>
      <Layout>
        <main className='container-fluid vh-100'>
          <div className='container'>
            <div className='row d-flex align-items-center'>
              {
                isLogged
                ? (
                  <div className='col-12  text-center mt-5 pt-5 pb-5'>
                    <h2 className='mv-h1 text-black-800'>¡Tú cuenta ya está <span className='text-orange-900'>validada</span>!</h2>
                    <Link href='/motos' className='btn btn-movebike contained mt-3 w-200'>Ver motos</Link>
                  </div>
                )
                :
                token
                ? (
                  <div className='col-12  text-center mt-5 pt-5 pb-5'>
                    <h2 className='mv-h1 text-black-800'>¡Valida tu <span className='text-orange-900'>email</span>!</h2>
                    <p className='mb-0 mt-2 fw-bold'>¡Verifica tu cuenta para completar tu reserva!</p>
                    <button className='btn btn-movebike contained mt-4'>Verificar cuenta</button>
                  </div>
                )
                : (
                  <div className='col-12  text-center mt-5 pt-5 pb-5'>
                    <h2 className='mv-h1 text-black-800'>¡No existe <span className='text-orange-900'>email</span> para validar!</h2>
                    <p className='mb-0 mt-2 fw-bold'>Por favor verifica tu correo</p>
                  </div>
                )
              }
              
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
