import React, { useEffect, useState } from 'react'
import Layout from 'components/Layouts'
import { useForm, Controller } from 'react-hook-form'
import { getAllMotos } from 'services/bikes/motos'
import SlideMotos from 'components/home/SlideMotos'

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  KeyboardDatePicker,
  MenuItem,
  MuiPickersUtilsProvider,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material'
import { FormLabel, Toast, ToastContainer } from 'react-bootstrap'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { useRouter } from 'next/router'
import { getBikesAvailable } from '../../services/bikes/motos'

export default function Motos () {
  const router = useRouter()
  const { location, initialDate, finalDate } = router.query
  const [motos, setMotos] = useState([])
  const [value, setValue] = useState('')
  const getMotos = async () => {
    try {
      const response = await getAllMotos()
      const dataJson = await response.json()
      setMotos(dataJson.data.motos)
      setValue(initialDate)
    } catch (error) {}
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm()

  useEffect(() => {
    if (initialDate) {
      getMotosAvailables()
    } else {
      getMotos()
    }
  }, [])
  return (
    <Layout title='¡Encuentra tu moto favorita!'>
      <main>
        <section className='container-fluid'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h4 className='mv-h1 text-gray-600 text-center mt-3 mb-3'>
                  ¡Encuentra tu moto favorita!
                </h4>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-lg-3'>
                <div className='color-bg-gray p-3'>
                  <div className='d-md-flex d-lg-block'>
                    <FormControl className=' w-100'>
                      <InputLabel id='demo-simple-select-label'>
                        Ubicación
                      </InputLabel>
                      <Controller
                        name='location'
                        control={control}
                        valueName='selected'
                        defaultValue={location}
                        render={({
                          field: { onChange, onBlur, value, ref, rest }
                        }) => {
                          return (
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              className='datepicker mb-lg-2 mb-lg-0 '
                              label='Ubicación'
                              onChange={onChange}
                              onBlur={onBlur}
                              value={location}
                              {...rest}
                            >
                              <MenuItem value='cancun'>
                                Cancún, Quintana, Roo.
                              </MenuItem>
                              <MenuItem value='tulum'>
                                Tulúm, Quintana, Roo.
                              </MenuItem>
                            </Select>
                          )
                        }}
                        rules={{ required: 'This is required' }}
                      />
                    </FormControl>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                    >
                      <Controller
                        name='dateTimeCheckIn'
                        control={control}
                        valueName='selected'
                        defaultValue={initialDate}
                        rules={{ required: 'This is required' }}
                        render={({
                          field: { onChange, onBlur, value, ref, ...rest }
                        }) => {
                          return (
                            <DatePicker
                              label='Fecha entrega'
                              className='ms-md-3 me-md-3 ms-lg-0 me-lg-0 mt-4 mt-md-0 mt-lg-2 w-100'
                              onChange={onChange}
                              onBlur={onBlur}
                              value={initialDate}
                              minDate={initialDate}
                              renderInput={(params) => <TextField {...params} />}
                              {...rest}
                            />
                          )
                        }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                    >
                      <Controller
                        name='dateTimeCheckOut'
                        control={control}
                        valueName='selected'
                        defaultValue={finalDate}
                        rules={{ required: 'This is required' }}
                        render={({
                          field: { onChange, onBlur, value, ref, ...rest }
                        }) => {
                          return (
                            <DatePicker
                              label='Fecha entrega'
                              className='mt-4 mt-md-0 mt-lg-3 w-100'
                              onChange={onChange}
                              onBlur={onBlur}
                              value={finalDate}
                              minDate={finalDate}
                              renderInput={(params) => <TextField {...params} />}
                              {...rest}
                            />
                          )
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <button className='btn btn-movebike contained mt-3 w-100'>Aplicar filtro</button>
                </div>
              </div>
              <div className='col-lg-9 mt-3 mt-lg-0 d-flex flex-wrap'>
                {motos.map((moto) => (
                  <SlideMotos
                    key={moto._id}
                    model={moto.model}
                    name={moto.name}
                    price={moto.price}
                    img={moto.keyImage}
                    idMoto={moto.slug}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
