import React, { Fragment, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Hero() {
  const dateIniciatal = new Date();
  const year = dateIniciatal.getFullYear();
  const mes = dateIniciatal.getMonth() + 1;
  const day = dateIniciatal.getDate();
  const [checkIn, setCheckIn] = useState(dayjs(`${mes}-${day}-${year}`));
  const [checkOut, setCheckOut] = useState(dayjs("2022-11-04"));
  const [dateNow, setDateNow] = useState("");
  useEffect(() => {
    const date = Date.now();
    setDateNow(date);
  }, [dateNow]);

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 ">
          <div className="hero-section__content text-center">
            <h1 className="mv-h1">Explora Cancún</h1>
            <p className="hero-section__content--subtitle">
              Donde la belleza y la cultura se encuentran
            </p>
            <button className="btn btn-movebike contained">
              ¡Reserva Ahora!
            </button>
          </div>
          <div className="wrapper-booking">
            <form
              className="row g-3 wrapper-booking__card p-2 text-center"
              action=""
            >
              <div className="col-12">
                <div>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Ubicación</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      className="datepicker mb-2"
                      label="Ubicación"
                      onChange={handleChange}
                      
                    >
                      <MenuItem value={10}>Cancún, Quintana, Roo.</MenuItem>
                      <MenuItem value={20}>Tulúm, Quintana, Roo.</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="datepicker w-100"
                    value={checkIn}
                    minDate={dayjs(dateNow)}
                    onChange={(newValue) => {
                      setCheckIn(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
                  <DatePicker
                    className="datepicker w-100 mt-2"
                    value={checkOut}
                    minDate={dayjs(dateNow)}
                    onChange={(newValue) => {
                      setCheckOut(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <button className="btn btn-movebike contained w-50 mt-3">
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
