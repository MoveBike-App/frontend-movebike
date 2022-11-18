import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as dotenv from 'dotenv'
import AuthContext from '../context/AuthContext'

/* Hooks */
import { useAuthUser } from '../hooks/auth-user'

import LoginModal from './Utilities/LoginModal'
import VerifyModal from './Utilities/VerifyModal'

import { userContext } from '../pages'
const axios = require('axios')

dotenv.config()

export default function Nav () {
  const { user, isLogged, setIsLogged } = useContext(AuthContext)
  //const { user, isLoggedd, setIsLoggedd } = useAuthUser()

  const [isToggle, setIsToggle] = useState(false)
  const router = useRouter()
  //const [isLogged, setIsLogged] = useState(false)
  const [login, setLogin] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const [verify, setVerify] = useState(false)
  const [role, setRole] = useState('')
  const [username, setUsername] = useState('')
  const handleClose = () => setLogin(false)
  const handleCloseRegister = () => setRegisterModal(false)
  const handleClickRegister = () => setRegisterModal(true)
  const handleCloseVerify = () => setVerify(false)

  const API_URL = 'https://api.movebike.mx/'

  useEffect(() => {
    setUsername(user?.username)
    setRole(user?.role)
  }, [user])

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const userCurrent = localStorage.getItem('userCurrent')
  //     if (userCurrent) {
  //       const { role, username } = JSON.parse(userCurrent)
  //       setIsLogged(true)
  //       setRole(role)
  //       serUsername(username)
  //     }
  //   }
  // })

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onLogin = ({ email, password }) => {
    axios.post(`${API_URL}auth/login`, {
      email,
      password
    })
      .then((response) => {
        const token = response.data.token
        const { id, name, role } = response.data.userCurrent
        const userCurrent = { id, username: name, role }
        localStorage.setItem('token', token)
        localStorage.setItem('userCurrent', JSON.stringify(userCurrent))
        setLogin(false) 
        setIsLogged(true)
      })
      .catch((error) => {
      //
      })
  }


  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userCurrent')
    localStorage.clear();
    setIsLogged(false)
  }

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
                  alt="Movebike"
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
                  <Link href={router.pathname !== "/" ? "/#steps" : "#steps"}>
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
                      <Link className="dropdown-item" target={"_blank"} href={"/"}>
                        Crear cuenta
                      </Link>
                    </li>
                  </ul>
                </li> */}
                <li className="option">
                  <Link href={router.pathname !== "/" ? "/#places" : "#places"}>
                    Rutas
                  </Link>
                </li>
                {isLogged ? (
                  <li className='nav-link'>
                    <div className="dropdown dropup">
                      <button
                        type="button"
                        className="btn btn-sm wrapper-avatar c-btn dropdown-toggle d-flex align-items-center justify-content-between dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="btn-avatar d-flex align-items-center justify-content-center">
                          JA
                        </div>
                      </button>
                      <ul className="dropdown-menu mm-2">
                        <li>
                          <a className="dropdown-item" href="#">
                            <p className="mb-0 fw-bold">{username}</p>
                            <span className='text-capitalize'>{role}</span>
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link className="dropdown-item" href="/dashboard">
                            Mis reservas
                          </Link>
                        </li>
                        {/* <li>
                          <a className="dropdown-item" href="#">
                            Create Post
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Reading List
                          </a>
                        </li> */}
                        <li>
                          <Link className="dropdown-item" href="/settings">
                            Settings
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="btn w-100 text-start"
                            onClick={signOut}
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <>
                    <li className="option">
                      <button
                        className="btn btn-movebike link"
                        onClick={() => setLogin(true)}
                      >
                        Iniciar sesión
                      </button>
                    </li>
                    <li className="option">
                      <button
                        onClick={() => setRegisterModal(true)}
                        className="btn btn-movebike contained"
                      >
                        Crear cuenta
                      </button>
                    </li>
                  </>
                )}
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
                <ul className="options d-flex">
                  <li className="option">
                    <Link href="/">Inicio</Link>
                  </li>
                  <li className="option">
                    <Link href={router.pathname !== "/" ? "/#steps" : "#steps"}>
                      Beneficios
                    </Link>
                  </li>
                  <li className="option">
                    <Link
                      href={router.pathname !== "/" ? "/#places" : "#places"}
                    >
                      Rutas
                    </Link>
                  </li>
                  {!isLogged && (
                    <>
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
                          onClick={() => setRegisterModal(true)}
                        >
                          Crear cuenta
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </section>

            <section className="navbar-internationalization">
              <div className="dropdown">
                <div
                  className="btn dropdown-options"
                  onClick={() => setIsToggle(!isToggle)}
                >
                  <span className="text-uppercase">
                    {router.locale === "en" ? "en" : "es"}{" "}
                  </span>
                  <img className='ms-1 me-1' src="/assets/icons/icon_web.svg" alt="icon web" />

                  <img
                    className="arrow"
                    src="/assets/icons/icon_arrow_down.svg"
                    alt="arrow"
                  />
                </div>
                <ul
                  className={
                    isToggle ? "dropdown-menu active" : "dropdown-menu"
                  }
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li className="dropdown-item mb-1">
                    <Link className="text-capitalize text-white" href="/">
                      ES
                      <img
                        className="flag"
                        src="/assets/icons/icon_flag_es-MX.svg"
                        alt="Icono bandera MX"
                      />
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="text-capitalize text-white" href="/">
                      EN
                      <img
                        className="flag"
                        src="/assets/icons/icon_flag_en.svg"
                        alt="Icono bandera MX"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
            {isLogged && (
              <section className='d-none d-lg-block'>
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-sm wrapper-avatar c-btn dropdown-toggle d-flex align-items-center justify-content-between"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="btn-avatar d-flex align-items-center justify-content-center">
                      JA
                    </div>
                  </button>
                  <ul className="dropdown-menu translate-middle-x">
                    <li>
                      <a className="dropdown-item" href="#">
                        <p className="mb-0 fw-bold">{username}</p>
                        <span className='text-capitalize'>{role}</span>
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/dashboard">
                        Mis reservas
                      </Link>
                    </li>
                    {/* <li>
                      <a className="dropdown-item" href="#">
                        Create Post
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Reading List
                      </a>
                    </li> */}
                    <li>
                      <Link className="dropdown-item" href="/settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="btn w-100 text-start"
                        onClick={signOut}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </section>
            )}
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
            <form onSubmit={handleSubmit(onLogin)} className="row g-3">
              <div className="col-12">
                <label
                  htmlFor="validationServer01"
                  className="form-label login__label"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="form-control login__input"
                  placeholder="Ingresa tu email"
                  {...register("email", {
                    required: "El email es obligatorio",
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-danger" role="alert">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label
                  htmlFor="validationServer02"
                  className="form-label login__label"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control login__input"
                  id="validationServer02"
                  placeholder="Ingresa tu contraseña"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="text-danger" role="alert">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className="col-12 d-flex justify-content-between login__remember">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck3"
                    aria-describedby="invalidCheck3Feedback"
                  />
                  <label className="form-check-label" htmlFor="invalidCheck3">
                    Recuérdame
                  </label>
                </div>
                <div>
                  <Link className="login__forgot text-black-800" href="/">
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
        show={registerModal}
        dialogClassName="modal-90w"
        onHide={() => setRegisterModal(false)}
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
                  htmlFor="formFileMultiple"
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
                  onClick={() => {
                    setRegisterModal(false);
                    setVerify(true);
                  }}
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
        title="¡Verifica tu cuenta!"
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
