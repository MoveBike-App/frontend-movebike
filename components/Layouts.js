import Head from "next/head";
import React, { useEffect } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layouts({ children, title, description }) {
  useEffect(() => {
    typeof document != undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="robots" content="follow" />
        <meta name="googlebot" content="index" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      </Head>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
