import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Layouts from "components/Layouts";
import { useRouter } from "next/router";
import { getById } from "services/bikes/motos";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Features from "../../components/Utilities/Features";

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`;
};

export default function Bike() {
  const router = useRouter();
  const [moto, setMoto] = useState({});
  const [features, setFeatures] = useState([]);
  const { id } = router.query;
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [dateNow, setDateNow] = useState("");
  useEffect(() => {
    const date = Date.now();
    setDateNow(date);
  }, []);

  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

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

  return (
    <>
      {(moto && (
        <Layouts title={`${moto?.name} - MoveBike`}>
          <Head>
            <meta name="description" content="" />
          </Head>
          <main>
            <section className="container-fluid mt-4">
              <div className="container">
                <form className="row">
                  <div className="col-lg-7 border-1">
                    <Image
                      loader={myLoader}
                      src={moto.keyImage}
                      alt={moto.keyImage}
                      width={320}
                      height={300}
                    />
                  </div>
                  <div className="col-lg-5 pb-4">
                    <div className="card p-3 shadow border-0">
                    <h1 className="text-black-800 mv-h1">{moto.name}</h1>
                    <h4 className="text-gray-400 mt-1">${moto.price} MXN por día</h4>
                    <FormControl fullWidth className="mt-3">
                      <InputLabel id="demo-simple-select-label">
                        Ubicación
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        className="datepicker"
                        label="Ubicación"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Cancún, Quintana, Roo.</MenuItem>
                        <MenuItem value={20}>Tulúm, Quintana, Roo.</MenuItem>
                      </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Check In"
                          className="datepicker mt-3"
                          value={checkIn}
                          minDate={dayjs(dateNow)}
                          onChange={(newValue) => {
                            setCheckIn(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                        />
                      </FormControl>
                      <div className="separator d-none d-md-flex" />
                      <FormControl fullWidth>
                        <DatePicker
                          label="Check Out"
                          className="datepicker mt-3"
                          value={checkOut}
                          minDate={dayjs(dateNow)}
                          onChange={(newValue) => {
                            setCheckOut(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </FormControl>
                    </LocalizationProvider>
                    <button className="btn btn-movebike contained mt-4 w-100">Reservar ahora</button>
                    </div>
                  </div>
                </form>
                <div className="row mb-5">
                  <h3>Caracteristicas</h3>
                    {
                      features.map((feature) => <Features key={feature._id} icon={feature.icon} feature={feature.name} />)
                    }
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
