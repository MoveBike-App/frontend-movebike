import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
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
  TextField,
} from "@mui/material";

import Layouts from "components/Layouts";
import { useRouter } from "next/router";
import { getById } from "services/bikes/motos";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Features from "components/Utilities/Features";
import moment from "moment";
import { FormLabel } from "react-bootstrap";

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`;
};

export default function Bike() {
  const router = useRouter();
  const [moto, setMoto] = useState({});
  const [features, setFeatures] = useState([]);
  const { id } = router.query;
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [dateNow, setDateNow] = useState("");
  const [selectedDate, setselectedDate] = useState(null);
  const [value, setValue] = useState(dayjs(new Date()));
  const [minTime, setMinTime] = useState(dayjs(new Date()));
  const [location, setLocation] = useState();
  const [counter, setCounter] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const date = Date.now();
    setDateNow(date);
  }, []);

  const getMoto = async () => {
    try {
      const response = await getById(id);
      if (!response) {
        router.push("/404");
      }
      setMoto(response.data.data.moto);
      setFeatures(response.data.data.moto.features);
    } catch (error) {
      //router.push("/404");
    }
  };

  useEffect(() => {
    getMoto();
  }, [id]);

  const handleStock = (e) => {
    setCounter(e.target.value);
  };

  return (
    <>
      {(moto && (
        <Layouts title={`${moto.name ? moto.name : "Moto"} - MoveBike`}>
          <Head>
            <meta name="description" content="" />
          </Head>
          <main>
            <section className="container-fluid mt-4">
              <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="row">
                  <div className="col-lg-6 border-1 position-relative">
                    {moto.image ? (
                      <>
                        <Image
                          className="d-block d-md-none mx-md-auto"
                          loader={myLoader}
                          src={moto?.keyImage}
                          alt={`Scooter ${moto.keyImage}`}
                          width={250}
                          height={250}
                        />
                        <Image
                          className="d-none d-md-block mx-auto mx-lg-0"
                          loader={myLoader}
                          src={moto?.keyImage}
                          alt={`Scooter ${moto.keyImage}`}
                          width={400}
                          height={400}
                        />
                      </>
                    ) : (
                      <div className="d-flex h-100 align-items-center justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 pb-4">
                    <div className="card p-3 shadow border-0">
                      {moto.name ? (
                        <>
                          <h1 className="text-black-700 mv-h1">{moto.name}</h1>
                          <input
                            type="hidden"
                            value={moto.name}
                            {...register("nameMoto")}
                          />
                        </>
                      ) : (
                        <p className="placeholder-glow">
                          <span className="placeholder col-12"></span>
                        </p>
                      )}

                      {moto.price ? (
                        <>
                          <h5 className="text-gray-400 mt-1">
                            ${moto.price} MXN por día
                          </h5>
                          <input
                            type="hidden"
                            value={moto.price}
                            {...register("price")}
                          />
                        </>
                      ) : (
                        <p className="placeholder-glow">
                          <span className="placeholder col-12"></span>
                        </p>
                      )}
                      <FormControl fullWidth className="mt-4">
                        <InputLabel id="demo-simple-select-label">
                          Ubicación
                        </InputLabel>
                        <Controller
                          name="location"
                          control={control}
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => {
                            return (
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="datepicker mb-2 mb-lg-0"
                                label="Ubicación"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                              >
                                <MenuItem value={"Cancún, Quintana, Roo"}>
                                  Cancún, Quintana, Roo.
                                </MenuItem>
                                <MenuItem value={"Tulúm, Quintana, Roo"}>
                                  Tulúm, Quintana, Roo.
                                </MenuItem>
                              </Select>
                            );
                          }}
                          rules={{ required: true }}
                        />
                      </FormControl>

                      <div className="row">
                        <div className="col-md-6">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                              name="dateTimeCheckIn"
                              control={control}
                              valueName="selected"
                              render={({ field: { ref, ...rest } }) => {
                                return (
                                  <DateTimePicker
                                    label="Fecha y hora de entrega"
                                    className="mt-4 w-100"
                                    minDate={value}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                    {...rest}
                                  />
                                );
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                        <div className="col-md-6">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                              name="dateTimeCheckOut"
                              control={control}
                              valueName="selected"
                              render={({ field: { ref, ...rest } }) => {
                                return (
                                  <DateTimePicker
                                    label="Fecha y hora de devolución"
                                    className="mt-4 w-100"
                                    minDate={value}
                                    minTime={minTime}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                    {...rest}
                                  />
                                );
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <FormControl className="mt-4 text-center">
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Dónde recoges?</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          className="d-flex justify-content-evenly"
                        >
                          <FormControlLabel
                            value="hotel"
                            control={<Radio />}
                            label="Mi hotel"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Sucursal"
                          />
                        </RadioGroup>
                      </FormControl>
                      <button
                        type="submit"
                        className="btn btn-movebike contained mt-4 w-100"
                      >
                        Reservar ahora
                      </button>
                    </div>
                  </div>
                </form>
                <div className="row mb-5">
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
        router.push("/404")}
    </>
  );
}
