import React, { useState, useCallback, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { format, differenceInDays } from "date-fns";
import dynamic from 'next/dynamic'

const FormReserve = dynamic(() => import('components/Utilities/FormReserve'), {
  ssr: false
})

import Layouts from "components/Layouts";
import { useRouter } from "next/router";
import { getById } from "services/bikes/motos";
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



export default function Bike() {
  // const [locale, setLocale] = useState("es");
  // const [ampm, setAmpm] = useState(undefined);
  // const [ampmOption, setAmpmOption] = useState("undefined");
  // const { user, isLogged, setIsLogged } = useContext(AuthContext);
  const router = useRouter();
  const [moto, setMoto] = useState({});
  const [features, setFeatures] = useState([]);
  const { slug } = router.query;
  // const [checkIn, setCheckIn] = useState(null);
  // const [checkOut, setCheckOut] = useState(null);
  // const [dateNow, setDateNow] = useState("");
  // const [selectedDate, setselectedDate] = useState(null);
  // const [value, setValue] = useState(dayjs(new Date()));
  // const [minTime, setMinTime] = useState(dayjs(new Date()));
  // const [location, setLocation] = useState();
  // const [counter, setCounter] = useState(null);
  // const [login, setLogin] = useState(false);
  
  // const handleClose = () => setLogin(false);
  const [idMoto, setIdMoto] = useState("");




  // const getMoto = async () => {
  //   try {
  //     const response = await getById(slug);
  //     if (response.status === 200) {
  //       const {
  //         data: { moto },
  //       } = await response.json();

  //       setMoto(moto);
  //       setFeatures(moto.features);
  //       setIdMoto(moto._id);
  //     }

  //     // if (response.status >= 400 || response.status <= 599) {
  //     //   router.push("/404");
  //     // }
  //   } catch (error) {}
  // };

  useEffect(() => {
    async function getMoto() {
      try {
        const response = await getById(slug);
        const {
          data: { moto },
        } = await response.json();

        setMoto(moto);
        setFeatures(moto.features);
        setIdMoto(moto._id);
      } catch (error) {
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

                <FormReserve image={moto?.image} keyImage={moto?.keyImage} nameMoto={moto?.name} price={moto.price} idMoto={moto._id} />

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
