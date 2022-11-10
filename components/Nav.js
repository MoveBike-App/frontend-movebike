import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";
import LoginModal from "./Utilities/LoginModal";
import VerifyModal from "./Utilities/VerifyModal";

export default function Nav() {
  const [isToggle, setIsToggle] = useState(false);
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [verify, setVerify] = useState(false);
  const handleClose = () => setLogin(false);
  const handleCloseRegister = () => setRegister(false);
  const handleCloseVerify = () => setVerify(false);

  const [navBackground, setNavBackground] = useState(false);

  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    if (router.pathname !== "/") {
      return
    }

    const handleScroll = () => {
      const show = window.scrollY > 625;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav className="navbar mb-navbar fixed-top bg-white" id="nav-movebike">
        <section
          role="navigation "
          className="offcanvas offcanvas-start "
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-body">
            <div className="offcanvas-brand d-flex">
              <Image
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions"
                className="d-lg-none menu icon-burger"
                src="/assets/icons/icon-burger-orange.webp"
                alt="menú"
                layout="fill"
                width={24}
                height={24}
              />

              <a href="#">
                <Image
                  className="img-fluid logo-canvas"
                  src="/assets/logos/logo-movebike-orange.webp"
                  alt="Landrada"
                  layout="fill"
                  width={128}
                  height={28}
                />
              </a>
            </div>
            <nav>
              <ul className="options">
                <li className="option">
                  <Link href="/">Inicio</Link>
                </li>
                <li className="option">
                  <Link
                    href={
                      router.pathname !== "/"
                        ? "/#our-develpments"
                        : "#our-develpments"
                    }
                  >
                    Beneficios
                  </Link>
                </li>
                {/* <li className="option dropdown">
                  <a
                    className="nav-link dropdown-toggle p-0"
                    href="#"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Rutas
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" href="/pagos">
                          Iniciar sesión
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" target={"_blank"} href={"https://cotizador.landrada.mx/"}>
                        Crear cuenta
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li className="option">
                  <Link href={router.pathname !== "/" ? "/#joinus" : "#joinus"}>
                    Rutas
                  </Link>
                </li>
                <li className="option">
                  <Link href="/familia-landrada">Iniciar sesión</Link>
                </li>
                <li className="option">
                  <Link href="">Crear cuenta</Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        <div className="nav-desktop container">
          <section className="navbar-logo d-flex align-items-center">
            <Image
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              className="d-lg-none menu icon-burger"
              src="/assets/icons/icon-burger-orange.webp"
              alt="menú"
              layout="fill"
              width={24}
              height={24}
            />

            <Link className="ms-3" href="/">
              <Image
                className="logo"
                src="/assets/logos/logo-movebike-orange.webp"
                alt="MoveBike App"
                layout="fill"
                width={130}
                height={30}
              />
            </Link>
          </section>

          <div className="nav-lista d-flex justify-content-center">
            <section className="navbar-options d-none d-lg-flex align-items-center">
              <nav className="wrapper">
                <ul className={`options d-flex`}>
                  <li className="option">
                    <Link href="/">Inicio</Link>
                  </li>
                  <li className="option">
                    <Link
                      href={
                        router.pathname !== "/"
                          ? "/#our-develpments"
                          : "#our-develpments"
                      }
                    >
                      Beneficios
                    </Link>
                  </li>
                  <li className="option">
                    <Link
                      href={router.pathname !== "/" ? "/#joinus" : "#joinus"}
                    >
                      Rutas
                    </Link>
                  </li>
                  <li className="option">
                    <button
                      className="btn btn-movebike link"
                      onClick={() => setLogin(true)}
                    >
                      Iniciar sesión
                    </button>
                  </li>
                  <li className="option text-center">
                    <button
                      className="btn btn-movebike contained"
                      onClick={() => setRegister(true)}
                    >
                      Crear cuenta
                    </button>
                  </li>
                </ul>
              </nav>
            </section>

            <section className={`navbar-internationalization`}>
              <dl className="dropdown">
                <dt
                  className="btn dropdown-options"
                  onClick={() => setIsToggle(!isToggle)}
                >
                  <span className="text-uppercase">
                    {router.locale === "en" ? "en" : "es"}{" "}
                  </span>
                  <img src="/assets/icons/icon_web.svg" alt="icon web" />

                  <img
                    className="arrow"
                    src="/assets/icons/icon_arrow_down.svg"
                    alt="arrow"
                  />
                </dt>
                <ul
                  className={
                    isToggle ? "dropdown-menu active" : "dropdown-menu"
                  }
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li className="dropdown-item mb-1">
                    <Link className="text-capitalize text-white" href={"/"}>
                      ES
                      <img
                        className="flag"
                        src={`/assets/icons/icon_flag_es-MX.svg`}
                        alt="Icono bandera MX"
                      />
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="text-capitalize text-white" href={"/"}>
                      EN
                      <img
                        className="flag"
                        src={`/assets/icons/icon_flag_en.svg`}
                        alt="Icono bandera MX"
                      />
                    </Link>
                  </li>
                </ul>
              </dl>
            </section>
          </div>
        </div>
      </nav>

      <LoginModal
        show={login}
        dialogClassName="modal-90w"
        onHide={() => setLogin(false)}
        title="Login"
        body={
          <>
            <form className="row g-3">
              <div className="col-12">
                <label
                  for="validationServer01"
                  className="form-label login__label"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control login__input"
                  id="validationServer01"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
              <div className="col-12">
                <label
                  for="validationServer02"
                  className="form-label login__label"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control login__input"
                  id="validationServer02"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <div className="col-12 d-flex justify-content-between login__remember">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck3"
                    aria-describedby="invalidCheck3Feedback"
                    required
                  />
                  <label className="form-check-label" for="invalidCheck3">
                    Recuérdame
                  </label>
                </div>
                <div>
                  <Link className="login__forgot text-black-800" href={"/"}>
                    Olvide mi contraseña
                  </Link>
                </div>
              </div>
              <div className="col-12 text-center">
                <button
                  className="btn btn-movebike contained w-50 mx-auto"
                  type="submit"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </>
        }
        handleClick={handleClose}
        handleClose={handleClose}
      />

      <LoginModal
        show={register}
        dialogClassName="modal-90w"
        onHide={() => setRegister(false)}
        title="Crear cuenta"
        body={
          <>
            <form className="row g-3">
              {/* <div className="col-12">
                <label
                  className="form-label login__label"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control login__input"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div> */}
              <div className="col-12">
                <label className="form-label login__label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control login__input"
                  placeholder="Ingresa tu correo"
                />
              </div>
              <div className="col-12">
                <label className="form-label login__label">Contraseña</label>
                <input
                  type="password"
                  className="form-control login__input"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label login__label">
                  Confirma tu contraseña
                </label>
                <input
                  type="password"
                  className="form-control login__input"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <div className="col-12">
                <label
                  htmlFsor="formFileMultiple"
                  className="form-label login__label"
                >
                  Pasaporte/INE
                </label>
                <input
                  className="form-control login__input"
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
              </div>
              <div className="col-12 mb-2">
                <label className="form-label login__label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control login__input"
                  placeholder="Ingresa tu teléfono"
                />
              </div>

              <div className="col-12 text-center">
                <button
                  className="btn btn-movebike contained w-50 mx-auto"
                  type="submit"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </>
        }
        handleClick={handleCloseRegister}
        handleClose={handleCloseRegister}
      />

      <VerifyModal
        show={verify}
        onHide={() => setVerify(false)}
        title={"¡Verifica tu cuenta!"}
        body={
          <>
            <div className="col-12">
              <p className="mb-0 login__paragraph">
                Revisa tu correo y realiza la validación de tu cuenta, para
                poder seguir con tu reserva
              </p>
            </div>
          </>
        }
        handleClick={handleCloseVerify}
        handleClose={handleCloseVerify}
      />
    </>
  );
}
