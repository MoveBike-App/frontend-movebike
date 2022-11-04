import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="container-fluid footer">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center col-md-4">
            <Image
              className="text-center mx-auto mx-md-0"
              src={"/assets/logos/logo-movebike-black.webp"}
              alt={"Logo footer"}
              layout={"fill"}
              width={210}
              height={57}
            />
            <p className="text-center footer__subtitle text-md-start">
              Una lista de los 75 mejores lugares <br className="d-md-none" /> turísticos del mundo
              para unas <br className="d-md-none" />
              vacaciones o un viaje perfecto
            </p>
            <div className="footer__social mx-auto mx-md-0">
              <Image
                src={"/assets/icons/icon-facebook-movebike.webp"}
                alt={"Facebook Movebike"}
                layout={"fill"}
                width={32}
                height={32}
                className="footer__social--facebook"
              />
              <Image
                src={"/assets/icons/icon-instagram-movebike.webp"}
                alt={"Instagram Movebike"}
                layout={"fill"}
                width={32}
                height={32}
                className="footer__social--instagram"
              />
              <Image
                src={"/assets/icons/icon-whatsapp-movebike.webp"}
                alt={"Whatsapp Movebike"}
                layout={"fill"}
                width={32}
                height={32}
                className="footer__social--whatsapp"
              />
            </div>
          </div>
          <div className="col-12 col-md-4 footer__navigation ">
            <p className="text-center footer__navigation--title">Navegación</p>
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>
                  Beneficios
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>
                  Rutas
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 footer__legals">
            <p className="text-center footer__legals--title">Legales</p>
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>
                  Políticas de privacidad
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>
                  Políticas de cancelación
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>
                  FAQ’s
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
