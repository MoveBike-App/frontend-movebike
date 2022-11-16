import React, { useEffect, useRef } from 'react'
import { Grid } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'

import Layouts from '../components/Layouts'
import Image from 'next/image'

export default function Dashboard () {
  const tableRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const grid = new Grid({
      sort: true,
      pagination: true,
      fixedHeader: true,
      style: {
        table: {
          'white-space': 'nowrap'
        }
      },
      search: {
        selector: (cell, rowIndex, cellIndex) => cellIndex === 0 ? cell.Moto : cell
      },
      from: tableRef.current
    }).render(wrapperRef.current)
  })

  return (
    <Layouts>
      <main className='container-fluid bookings'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='bookings__title'>Mis reservas</h1>
            </div>
            <div className='col-md-12 mx-auto'>
              <table ref={tableRef}>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Moto</th>
                    <th>Status</th>
                    <th>Fechas</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Image
                        src='/assets/landing/flotebikers/vitalia-150.webp'
                        alt='Vitalia 150'
                        layout='fill'
                        width={100}
                        height={75}
                      />
                    </td>
                    <td>Vitalia 125</td>
                    <td>Reservada</td>
                    <td>27-10-2022 | 30-10-2022</td>
                    <td>
                      <button className='btn btn-movebike contained'>
                        Ver reserva
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Image
                        src='/assets/landing/flotebikers/vitalia-125.webp'
                        alt='Vitalia 150'
                        layout='fill'
                        width={100}
                        height={75}
                      />
                    </td>
                    <td>Scooter WS Sport 150</td>
                    <td>Reservada</td>
                    <td>27-10-2022 | 30-10-2022</td>
                    <td>
                      <button className='btn btn-movebike contained'>
                        Ver reserva
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Image
                        src='/assets/landing/flotebikers/ws-sport-150.webp'
                        alt='Vitalia 150'
                        layout='fill'
                        width={100}
                        height={75}
                      />
                    </td>
                    <td>Vitalia 150</td>
                    <td>Reservada</td>
                    <td>27-10-2022 | 30-10-2022</td>
                    <td>
                      <button className='btn btn-movebike contained'>
                        Ver reserva
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div ref={wrapperRef} />
            </div>
          </div>
        </div>
      </main>
    </Layouts>
  )
}
