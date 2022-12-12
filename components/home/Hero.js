import React, { Fragment, useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Link from 'next/link'

export default function Hero () {
  const dateIniciatal = new Date()
  const year = dateIniciatal.getFullYear()
  const mes = dateIniciatal.getMonth() + 1
  const day = dateIniciatal.getDate()
  const [checkIn, setCheckIn] = useState()
  const [checkOut, setCheckOut] = useState()
  const [dateNow, setDateNow] = useState('')
  useEffect(() => {
    const date = Date.now()
    setDateNow(date)
  }, [])

  const [age, setAge] = useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 '>
          <div className='hero-section__content text-center text-lg-start'>
            <h1 className='mv-h1 hero-section__content--title'>
              Explora Cancún
            </h1>
            <p className='hero-section__content--subtitle mt-1 mb-0'>
            Donde la belleza y la cultura se encuentran.
            Tu próxima aventura <br className='d-none d-lg-block' /> comienza con Movebike ¿Te apuntas a la máxima velocidad? <br className='d-none d-lg-block' /> ¡Reserva sin límites!
            </p>
            <button className='btn btn-movebike contained btn-cta'>
              ¡Reserva Ahora!
            </button>
          </div>
          <div className='wrapper-booking'>
            <form className='row g-3  p-2 text-center'>
              <div className='col-12 wrapper-booking__card '>
                <div className='wrapper-booking__card--search-inputs'>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Ubicación
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={age}
                      className='datepicker mb-2 mb-lg-0'
                      label='Ubicación'
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Cancún, Quintana, Roo.</MenuItem>
                      <MenuItem value={20}>Tulúm, Quintana, Roo.</MenuItem>
                    </Select>
                  </FormControl>
                  <div className='separator d-none d-md-flex' />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormControl fullWidth>
                      <DatePicker

                        label='Check In'
                        className='datepicker mt-3 mt-lg-none'
                        value={checkIn}
                        minDate={dayjs(dateNow)}
                        onChange={(newValue) => {
                          setCheckIn(newValue)
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </FormControl>
                    <div className='separator d-none d-md-flex' />
                    <FormControl fullWidth>
                      <DatePicker
                        label='Check Out'
                        className='datepicker mt-4 mt-lg-0'
                        value={checkOut}
                        minDate={dayjs(dateNow)}
                        onChange={(newValue) => {
                          setCheckOut(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </LocalizationProvider>
                </div>
              </div>
              <div className='col-12 mt-lg-5'>
                <Link href={'/motos'} className='btn btn-movebike contained btn-datapicker w-50 mt-3 mt-lg-0'>
                  Buscar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
