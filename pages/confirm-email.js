import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layouts'
import { validEmail } from '../services/users/auth'
import Link from 'next/link'

export default function ConfirmEmail () {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState()
  const [loading, setLoading] = useState(false)
  const [messageError, setMessageError] = useState('')
  const { token } = router.query
  const isVerify = () => {
    const logeado = localStorage.getItem('token')
    setIsLogged(logeado)
  }
  const verifyAccount = async () => {
    setLoading(true)
    try {
      const response = await validEmail(token)
      const dataJson = await response.json()

      if (response.status === 200) {
        setMessageError(dataJson.message)
        router.push('/motos')
      }

      if (response.status >= 400 || response.status <= 599) {
        setMessageError(dataJson.message)
      }
    } catch (error) {}
  }

  useEffect(() => {
    isVerify()
  }, [token])

  return (
    <>
      <Layout>
        <main className='container-fluid vh-100'>
          <div className='container h-100'>
            <div className='row d-flex align-items-center'>
              {isLogged
                ? (
                  <div className='col-12  text-center mt-5 pt-5 pb-5'>
                    <h2 className='mv-h1 text-black-800'>
                      ¡Tú cuenta ya está{' '}
                      <span className='text-orange-900'>validada</span>!
                    </h2>
                    <Link
                      href='/motos'
                      className='btn btn-movebike contained mt-3 w-200'
                    >
                      Ver motos
                    </Link>
                  </div>
                  )
                : token
                  ? (
                    <>
                      {messageError || ''}
                      <div className='col-12  text-center mt-5 pt-5 pb-5'>
                        <h2 className='mv-h1 text-black-800'>
                          ¡Valida tu <span className='text-orange-900'>email</span>!
                        </h2>
                        <p className='mb-0 mt-2 fw-bold'>
                          ¡Verifica tu cuenta para completar tu reserva!
                        </p>

                        <button
                          className='btn btn-movebike contained mt-4'
                          onClick={verifyAccount}
                        >
                          {loading
                            ? (
                              <>
                                <div class='spinner-border text-warning text-center' role='status'>
                                  <span class='visually-hidden'>Loading...</span>
                                </div>
                              </>
                              )
                            : ' Verificar cuenta'}

                        </button>
                      </div>
                    </>
                    )
                  : (
                    <div className='col-12  text-center mt-5 pt-5 pb-5'>
                      <h2 className='mv-h1 text-black-800'>
                        ¡No existe <span className='text-orange-900'>email</span>{' '}
                        para validar!
                      </h2>
                      <p className='mb-0 mt-2 fw-bold'>
                        Por favor verifica tu correo
                      </p>
                    </div>
                    )}
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
