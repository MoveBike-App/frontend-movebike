import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { format, differenceInDays } from "date-fns";
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
import AuthContext from "context/AuthContext";
import Features from "components/Utilities/Features";
import moment from "moment";
import "moment/locale/es";
import { FormLabel, Toast, ToastContainer } from "react-bootstrap";
import { useContext } from "react";
import LoginModal from "../../components/Utilities/LoginModal";
import Link from "next/link";

const locales = ["en", "ru", "ar-sa"];

// prettier-ignore
const ampmOptions = {
  'undefined': undefined,
  true: true,
  false: false };

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`;
};

export default function Bike() {
  const [locale, setLocale] = useState("es");
  const [ampm, setAmpm] = useState(undefined);
  const [ampmOption, setAmpmOption] = useState("undefined");
  const { user, isLogged, setIsLogged } = useContext(AuthContext);
  const router = useRouter();
  const [moto, setMoto] = useState({});
  const [features, setFeatures] = useState([]);
  const { slug } = router.query;
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [dateNow, setDateNow] = useState("");
  const [selectedDate, setselectedDate] = useState(null);
  const [value, setValue] = useState(dayjs(new Date()));
  const [minTime, setMinTime] = useState(dayjs(new Date()));
  const [location, setLocation] = useState();
  const [counter, setCounter] = useState(null);
  const [login, setLogin] = useState(false);
  const [radio, setRadio] = useState("");
  const handleClose = () => setLogin(false);
  const [idMoto, setIdMoto] = useState("");

  const selectAmpm = (event) => {
    setAmpm(ampmOptions[event.target.value]);
    setAmpmOption(event.target.value);
  };

  const selectLocale = (newLocale) => {
    setLocale(newLocale);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(data);

      const initialDate2 = format(data.dateTimeCheckIn.$d, "MM/dd/yyyy");
      const initialDate = format(data.dateTimeCheckIn.$d, "MM/dd/yyyy H:mm");
      const finalDate = format(data.dateTimeCheckOut.$d, "MM/dd/yyyy H:mm");

      const totalDays = differenceInDays(
        new Date(finalDate),
        new Date(initialDate)
      );
      console.log("TOTAL DIAS", totalDays);
      let totalPrice = Number(data.price) * Number(totalDays);
      console.log(totalPrice);

      const cart = {
        vehicle: idMoto,
        nameMoto: data.nameMoto,
        location: data.location,
        pickup: data.pickup,
        priceReserve: totalPrice,
        fechaInical: initialDate,
        fechaFinal: finalDate,
        dias: totalDays,
      };

      localStorage.setItem("cartCurrent", JSON.stringify(cart));

      console.log(initialDate2);
      console.log(initialDate);
      console.log(finalDate);

      router.push("/checkout");
    } else {
      setLogin(true);
      console.log("Inicia sesión para continuar");
    }
  };

  useEffect(() => {
    const date = Date.now();
    setDateNow(date);
  }, []);

  const getMoto = async () => {
    try {
      console.log(slug);
      const response = await getById(slug);
      if (response.status === 200) {
        const {
          data: { moto },
        } = await response.json();

        setMoto(moto);
        setFeatures(moto.features);
        setIdMoto(moto._id);
      }

      // if (response.status >= 400 || response.status <= 599) {
      //   router.push("/404");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getMoto() {
      try {
        const response = await getById(slug);
        const {
          data: { moto },
        } = await response.json();
        console.log(moto);

        setMoto(moto);
        setFeatures(moto.features);
        setIdMoto(moto._id);
      } catch (error) {
        console.log(error);
        // router.push("/404");
      }
    }
    getMoto();
  }, [slug]);

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
                      {moto.price ? (
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
                            rules={{ required: "This is required" }}
                          />
                        </FormControl>
                      ) : (
                        <p className="placeholder-glow">
                          <span className="placeholder col-12"></span>
                        </p>
                      )}

                      {errors.location?.type === "required" && (
                        <p className="text-danger" role="alert">
                          {errors.location?.message}
                        </p>
                      )}

                      <div className="row">
                        <div className="col-md-6">
                          {moto.price ? (
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              //adapterLocale={locale}
                            >
                              <Controller
                                name="dateTimeCheckIn"
                                control={control}
                                valueName="selected"
                                rules={{ required: "This is required" }}
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
                          ) : (
                            <p className="placeholder-glow">
                              <span className="placeholder col-12"></span>
                            </p>
                          )}

                          {errors.dateTimeCheckIn?.type === "required" && (
                            <p className="text-danger" role="alert">
                              {errors.dateTimeCheckIn?.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6">
                          {moto.price ? (
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              //adapterLocale={locale}
                            >
                              <Controller
                                name="dateTimeCheckOut"
                                control={control}
                                valueName="selected"
                                rules={{ required: "This is required" }}
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
                          ) : (
                            <p className="placeholder-glow">
                              <span className="placeholder col-12"></span>
                            </p>
                          )}

                          {errors.dateTimeCheckOut?.type === "required" && (
                            <p className="text-danger" role="alert">
                              {errors.dateTimeCheckOut?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {moto.price ? (
                        <FormControl className="mt-4 text-center">
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            ¿Dónde recoges?
                          </FormLabel>
                          <Controller
                            control={control}
                            name="pickup"
                            rules={{ required: "This is required" }}
                            render={({ field }) => (
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                className="d-flex justify-content-evenly"
                                onChange={setRadio(field.value)}
                                {...field}
                              >
                                <FormControlLabel
                                  value="hotel"
                                  control={<Radio />}
                                  label="Mi hotel"
                                />
                                <FormControlLabel
                                  value="sucursal"
                                  control={<Radio />}
                                  label="Sucursal"
                                />
                              </RadioGroup>
                            )}
                          />
                        </FormControl>
                      ) : (
                        <p className="placeholder-glow">
                          <span className="placeholder col-12"></span>
                        </p>
                      )}

                      {errors.pickup?.type === "required" && (
                        <p className="text-danger text-center " role="alert">
                          {errors.pickup?.message}
                        </p>
                      )}

                      {radio === "hotel" && (
                        <div className="mb-2">
                          <label className="form-label">
                            Ingresa Ubicación del Hotel
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...register("locationGmaps", {
                              required: "This is required",
                            })}
                          />
                          {errors.locationGmaps?.type === "required" && (
                            <p className="text-danger" role="alert">
                              {errors.locationGmaps?.message}
                            </p>
                          )}
                        </div>
                      )}
                      {radio === "sucursal" && <p>MOVEBIKE APP</p>}

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

          <ToastContainer position="top-end" className="mt-2 me-2">
            <Toast
              onClose={() => setLogin(false)}
              show={login}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className={`me-auto text-warning`}>Notificación</strong>
              </Toast.Header>
              <Toast.Body>Debes iniciar sesión</Toast.Body>
            </Toast>
          </ToastContainer>
        </Layouts>
      )) ||
        router.push("/404")}
    </>
  );
}
