import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layouts'
import { validEmail } from '../services/users/auth'

export default function ConfirmEmail () {
  const router = useRouter()
  const {token} = router.query
  const verifyAccount = async () => {
    const response = await validEmail(token)
    const dataJson = await response.json()
    console.log(dataJson);
  }

  useEffect(() => {
    verifyAccount()
  }, [token])
  return (
    <>
      <Layout>
        <main className='container-fluid'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-center pt-5 pb-5'>
                <h2 className='mv-h1 text-black-800'>¡Valida tu <span className='text-orange-900'>email</span>!</h2>
                <p className='mb-0 mt-2 fw-bold'>¡Verifica tu cuenta para completar tu reserva!</p>
                <button className='btn btn-movebike contained mt-4'>Verificar cuenta</button>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
