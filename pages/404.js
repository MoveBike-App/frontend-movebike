import React from 'react'
import Layout from 'components/Layouts'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
  return (
    <Layout>
        <main className='container-fluid'>
            <section className='container'>
                <div className="row">
                    <div className="col-12 d-flex flex-column text-center">
                        <img className='img-fluid img-not-found' src={'/assets/landing/not-found.webp'} alt={'Not found page'}  />
                        <Link href={'/'} className='btn btn-movebike contained w-50 mx-auto'>Regresar</Link>
                    </div>
                </div>

            </section>
        </main>
    </Layout>
  )
}
