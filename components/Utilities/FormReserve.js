import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import {
  AddressAutofill,
  AddressMinimap,
  useConfirmAddress,
  config,
} from "@mapbox/search-js-react";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { FormLabel, Toast, ToastContainer } from "react-bootstrap";

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
import { format, differenceInDays } from "date-fns";
import { useRouter } from "next/router";

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`;
};

const options = {
  language: "es",
  country: "MX",
};

export default function FormReserve({
  image,
  keyImage,
  nameMoto,
  price,
  submitData,
  idMoto,
}) {
  const router = useRouter();
  const [radio, setRadio] = useState("");
  const [value, setValue] = useState(new Date());
  const [minTime, setMinTime] = useState(dayjs(new Date()));
  const [login, setLogin] = useState(false);

  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [feature, setFeature] = useState();
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken =
      "pk.eyJ1Ijoiam9uYXRlbG85NiIsImEiOiJjbGI5cXZiem8wMTZwM29wa3oxMHEyd2IyIn0.LXx56psAFqaWKNqMKYdaPg";
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const { formRef, showConfirm } = useConfirmAddress({
    minimap: true,
    skipConfirmModal: (feature) => {
      ["exact", "high"].includes(feature.properties.match_code.confidence);
    },
  });

  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setFeature(feature);
      setShowMinimap(true);
      setShowFormExpanded(true);
    },
    [setFeature, setShowMinimap]
  );

  function handleSaveMarkerLocation(coordinate) {
    const coor = JSON.stringify(coordinate);
    console.log(`Marker moved to ${JSON.stringify(coordinate)}.`);
    return coor;
  }

  function submitForm() {
    setShowValidationText(true);
    setTimeout(() => {
      resetForm();
    }, 2500);
  }

  function resetForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    setShowFormExpanded(false);
    setShowValidationText(false);
    setFeature(null);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(handleSaveMarkerLocation());
    try {
      const result = await showConfirm();
      console.log(result);
      console.log(data);
      const fullAddress = `${data.address_line1}, ${data?.address_line2}, ${data.zip} ${data.city}, ${data.state}`;
      const coordinatesAddress = `${handleSaveMarkerLocation()}`;
      const token = localStorage.getItem("token");
      if (token) {
        const initialDate = format(data.dateTimeCheckIn.$d, "MM/dd/yyyy H:mm");
        const finalDate = format(data.dateTimeCheckOut.$d, "MM/dd/yyyy H:mm");

        const totalDays = differenceInDays(
          new Date(finalDate),
          new Date(initialDate)
        );
        let totalPrice = Number(data.price) * Number(totalDays);

        const cart = {
          vehicle: idMoto,
          image: image,
          nameMoto: data.nameMoto,
          address: fullAddress,
          coordinates: coordinatesAddress,
          pickup: data.pickup,
          priceReserve: totalPrice,
          fechaInical: initialDate,
          fechaFinal: finalDate,
          dias: totalDays,
        };
        localStorage.setItem("cartCurrent", JSON.stringify(cart));
        router.push("/checkout");
      } else {
        setLogin(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="col-lg-6 border-1 position-relative">
          {image ? (
            <>
              <Image
                className="d-block d-md-none mx-md-auto"
                loader={myLoader}
                src={keyImage}
                alt={`Scooter ${keyImage}`}
                width={250}
                height={250}
              />
              <Image
                className="d-none d-md-block mx-auto mx-lg-0"
                loader={myLoader}
                src={keyImage}
                alt={`Scooter ${keyImage}`}
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
            {nameMoto ? (
              <>
                <h1 className="text-black-700 mv-h1">{nameMoto}</h1>
                <input
                  type="hidden"
                  value={nameMoto}
                  {...register("nameMoto")}
                />
              </>
            ) : (
              <p className="placeholder-glow">
                <span className="placeholder col-12"></span>
              </p>
            )}

            {price ? (
              <>
                <h5 className="text-gray-400 mt-1">${price} MXN por día</h5>
                <input type="hidden" value={price} {...register("price")} />
              </>
            ) : (
              <p className="placeholder-glow">
                <span className="placeholder col-12"></span>
              </p>
            )}
            {price ? (
              <FormControl fullWidth className="mt-4">
                <InputLabel id="demo-simple-select-label">Ubicación</InputLabel>
                <Controller
                  name="location"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => {
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
                {price ? (
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
                            renderInput={(params) => <TextField {...params} />}
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
                {price ? (
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
                            renderInput={(params) => <TextField {...params} />}
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
            {price ? (
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
              <>
                {/* <div className="mb-2">
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
              </div> */}
                <div className="flex flex--column">
                  <div>
                    <div className="col col--auto-mm w-full">
                      {/* Input form */}
                      <label className="txt-s txt-bold color-gray mb3">
                        Address
                      </label>
                      <AddressAutofill
                        options={options}
                        accessToken={token}
                        onRetrieve={handleRetrieve}
                      >
                        <input
                          className="input mb12"
                          placeholder="Empieza a escribir tu dirección, p. ej. 123 Main..."
                          autoComplete="address-line1"
                          id="mapbox-autofill"
                          {...register("address_line1")}
                        />
                      </AddressAutofill>
                      {!showFormExpanded && (
                        <button
                          id="manual-entry"
                          className="w180 mt6 link txt-ms border-b color-gray color-black-on-hover"
                          onClick={() => setShowFormExpanded(true)}
                        >
                          Enter an address manually
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid--gut24 mb60">
                    <div className="col col--auto-mm w-full">
                      <div
                        className="secondary-inputs"
                        style={{
                          display: showFormExpanded ? "block" : "none",
                        }}
                      >
                        <label className="txt-s txt-bold color-gray mb3">
                          Address Line 2
                        </label>
                        <input
                          className="input mb12"
                          placeholder="Apartment, suite, unit, building, floor, etc."
                          autoComplete="address-line2"
                          {...register("address_line2")}
                        />
                        <label className="txt-s txt-bold color-gray mb3">
                          City
                        </label>
                        <input
                          className="input mb12"
                          placeholder="City"
                          autoComplete="address-level2"
                          {...register("city")}
                        />
                        <label className="txt-s txt-bold color-gray mb3">
                          State / Region
                        </label>
                        <input
                          className="input mb12"
                          placeholder="State / Region"
                          autoComplete="address-level1"
                          {...register("state")}
                        />
                        <label className="txt-s txt-bold color-gray mb3">
                          ZIP / Postcode
                        </label>
                        <input
                          className="input"
                          placeholder="ZIP / Postcode"
                          autoComplete="postal-code"
                          {...register("zip")}
                        />
                      </div>
                    </div>
                    <div className="col col--auto-mm">
                      {/* Visual confirmation map */}
                      <div
                        id="minimap-container"
                        className="h240 w360 relative mt18"
                      >
                        <AddressMinimap
                          canAdjustMarker={true}
                          satelliteToggle={true}
                          feature={feature}
                          show={showMinimap}
                          onSaveMarkerLocation={handleSaveMarkerLocation}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {radio === "sucursal" && <p>MOVEBIKE APP</p>}

            <button
              type="submit"
              className="btn btn-movebike contained mt-4 w-100"
              id="btn-confirm"
            >
              Reservar ahora
            </button>

            {/* Form buttons */}
            {showFormExpanded && (
              <div className="mb30 submit-btns">
                <button
                  type="button"
                  className="btn round btn--gray-light ml3"
                  id="btn-reset"
                  onClick={resetForm}
                >
                  Reset
                </button>
              </div>
            )}
            {/* Validation text */}
            {showValidationText && (
              <div id="validation-msg" className="mt24 txt-m txt-bold">
                Order successfully submitted.
              </div>
            )}
          </div>
        </div>
      </form>

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
    </>
  );
}
