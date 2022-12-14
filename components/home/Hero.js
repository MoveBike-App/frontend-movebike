import React, { Fragment, useEffect, useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { format, addDays, parseISO } from "date-fns";
import dayjs from "dayjs";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Hero() {
  const router = useRouter();
  const dateIniciatal = new Date();
  const year = dateIniciatal.getFullYear();
  const mes = dateIniciatal.getMonth() + 1;
  const day = dateIniciatal.getDate();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [dateNow, setDateNow] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    const fechaInicial = format(data.dateTimeCheckIn, "MM-dd-yyyy");
    const fechaFinal = format(data.dateTimeCheckOut, "MM-dd-yyyy");
    router.push(`/motos?location=${data.location}&initialDate=${fechaInicial}&finalDate=${fechaFinal}`);
  };

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getDatenow = () => {
    const date = Date.now();
    setDateNow(date);
  };

  useEffect(() => {
    getDatenow();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 ">
          <div className="hero-section__content text-center text-lg-start">
            <h1 className="mv-h1 hero-section__content--title">
              Explora Cancún
            </h1>
            <p className="hero-section__content--subtitle mt-1 mb-0">
              Donde la belleza y la cultura se encuentran. Tu próxima aventura{" "}
              <br className="d-none d-lg-block" /> comienza con Movebike ¿Te
              apuntas a la máxima velocidad?{" "}
              <br className="d-none d-lg-block" /> ¡Reserva sin límites!
            </p>
            <Link
              href={"/motos"}
              className="btn btn-movebike contained btn-cta"
            >
              ¡Reserva Ahora!
            </Link>
          </div>
          <div className="wrapper-booking">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="row g-3  p-2 text-center"
            >
              <div className="col-12 wrapper-booking__card ">
                <div className="wrapper-booking__card--search-inputs">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Ubicación
                    </InputLabel>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="datepicker position-relative mb-2 mb-lg-0"
                            label="Ubicación"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          >
                            <MenuItem defaultChecked value={"cancun"}>
                              Cancún, Quintana, Roo.
                            </MenuItem>
                            <MenuItem value={"tulum"}>
                              Tulúm, Quintana, Roo.
                            </MenuItem>
                          </Select>
                        );
                      }}
                      rules={{ required: "This is required" }}
                    />
                    {errors.location?.type === "required" && (
                      <p
                        className="text-start text-danger badge position-absolute top-100"
                        role="alert"
                      >
                        {errors.location?.message}
                      </p>
                    )}
                  </FormControl>
                  <div className="separator d-none d-md-flex" />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <FormControl fullWidth>
                      <Controller
                        name="dateTimeCheckIn"
                        control={control}
                        valueName="selected"
                        rules={{ required: "This is required" }}
                        render={({ field: { ref, ...rest } }) => {
                          return (
                            <DateTimePicker
                              label="Check In"
                              className="datepicker mt-3 mt-md-0 position-relative"
                              value={checkIn}
                              minDate={dateNow}
                              minTime={"9:00"}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              {...rest}
                            />
                          );
                        }}
                      />
                      {errors.dateTimeCheckOut?.type === "required" && (
                        <p
                          className="text-danger badge position-absolute top-100"
                          role="alert"
                        >
                          {errors.dateTimeCheckOut?.message}
                        </p>
                      )}
                    </FormControl>
                    <div className="separator d-none d-md-flex" />
                    <FormControl fullWidth>
                      <Controller
                        name="dateTimeCheckOut"
                        control={control}
                        valueName="selected"
                        rules={{ required: "This is required" }}
                        render={({ field: { ref, ...rest } }) => {
                          return (
                            <DateTimePicker
                              label="Check Out"
                              className="datepicker mt-4 mt-lg-0 position-relative"
                              //value={addDays(parseISO(checkIn), 2)}
                              minDate={dateNow}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              {...rest}
                            />
                          );
                        }}
                        
                      />
                      {errors.dateTimeCheckOut?.type === "required" && (
                  <p className="text-danger badge position-absolute top-100" role="alert">
                    {errors.dateTimeCheckOut?.message}
                  </p>
                )}
                    </FormControl>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="col-12 mt-lg-5">
                <button className="btn btn-movebike contained btn-datapicker w-50 mt-3 mt-lg-0">
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
