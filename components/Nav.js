import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "context/AuthContext";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { authLogin, authLogins } from "services/users/auth";

/* Hooks */
import { useAuthUser } from "../hooks/auth-user";

import LoginModal from "./Utilities/LoginModal";
import VerifyModal from "./Utilities/VerifyModal";
import { createAccount } from "../services/users/auth";

const schemaValidations = yup
  .object({
    email: yup
      .string()
      .required("El correo electrónico es obligatorio")
      .email("Email inválido"),
    password: yup
      .string()
      .required("La contraseña es requerido")
      .min(8, "La longitud de la contraseña debe ser de al menos 8 caracteres"),
    cpassword: yup
      .string()
      .required("Es necesario confirmar la contraseña")
      .min(8, "La longitud de la contraseña debe ser de al menos 8 caracteres")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
    phone: yup.string().required("El Teléfono es requerido"),
    identify: yup.mixed().required("Es necesario subir una identificación"),

    // .test('fileSize', 'El archivo es muy grande', (value) => {
    //   return value && value[0].size <= 122880
    // })
    // .test('isEmpty', 'Es necesario subir una identificación', (value) => {
    //   if(value.length <= 0){
    //     return false
    //   }

    // })
  })
  .required();

const schemaLogin = yup
  .object({
    emailL: yup
      .string()
      .required("El correo electrónico es obligatorio")
      .email("Email inválido"),
    passwordL: yup.string().required("La contraseña es requerida"),
  })
  .required();

export default function Nav() {
  const { user, isLogged, setIsLogged } = useContext(AuthContext);

  const [isToggle, setIsToggle] = useState(false);
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [verify, setVerify] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [validEmail, setValidEmail] = useState('')
  const handleClose = () => setLogin(false);
  const handleCloseRegister = () => setRegisterModal(false);
  const handleClickRegister = () => setRegisterModal(true);
  const handleCloseVerify = () => setVerify(false);

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    setUsername(user?.username);
    setRole(user?.role);
  }, [user]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(
      login ? schemaLogin : registerModal ? schemaValidations : null
    ),
  });

  const onLogin = async (data) => {
    try {
      const response = await authLogin({
        ...data,
        email: data.emailL,
        password: data.passwordL,
      });
      const dataJson = await response.json();

      setValidEmail(dataJson.userCurrent.validEmail)

      if(validEmail === 'false' || '') {
        setLogin(false)
        reset({emailL: '', passwordL: ''})
        setVerify(true)
        return;
      } else {
        if (response.status === 200) {
          const { token } = dataJson;
          const { id, name, role, slug } = dataJson.userCurrent;
          const userCurrent = { id, username: name, role, slug };
          localStorage.setItem("token", token);
          localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
          setLogin(false);
          setIsLogged(true);
  
          setShowA(dataJson.success);
          setIsError(dataJson.success);
          setMessageError(dataJson.message);
          toggleShowA();
          resetField("email");
          resetField("password");
        }
        
  
        if (response.status >= 400 || response.status <= 599) {
          setShowA(dataJson.success);
          setIsError(dataJson.success);
          setMessageError(dataJson.message);
          toggleShowA();
        }
      }

      
    } catch (error) {
    }
  };

  const onCreateAccount = async ({ identify, email, password, phone }) => {
    const formData = new FormData();
    formData.append("identify", identify["0"]);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);

    try {
      const response = await createAccount(formData);

      const dataJson = await response.json();
      if (response.status === 200) {
        setRegisterModal(false);
        setVerify(true);
      }

      if (response.status >= 400 || response.status <= 599) {
        setShowA(dataJson.success);
        setIsError(dataJson.success);
        setMessageError(dataJson.message);
        toggleShowA();
      }
    } catch (error) {
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userCurrent");
    localStorage.clear();
    setIsLogged(false);
  };

  return (
    <>
      <ToastContainer position="top-end" className="mt-2 me-2">
        <Toast
          onClose={() => setShowA(false)}
          show={showA}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong
              className={`me-auto ${isError ? "text-success" : "text-danger"}`}
            >
              {isError ? "Succesull!" : "Error!"}{" "}
            </strong>
          </Toast.Header>
          <Toast.Body>{messageError}</Toast.Body>
        </Toast>
      </ToastContainer>

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
                width={24}
                height={24}
              />

              <a href="#">
                <Image
                  className="img-fluid logo-canvas"
                  src="/assets/logos/logo-movebike-orange.webp"
                  alt="Movebike"
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
                <li className="option">
                  <Link href="/motos">Motos</Link>
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
                  <li className="nav-link">
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
                            <span className="text-capitalize">{role}</span>
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
              width={24}
              height={24}
            />

            <Link className="ms-3" href="/">
              <Image
                className="logo"
                src="/assets/logos/logo-movebike-orange.webp"
                alt="MoveBike App"
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
                    <Link href="/motos">Motos</Link>
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
                  <img
                    className="ms-1 me-1"
                    src="/assets/icons/icon_web.svg"
                    alt="icon web"
                  />

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
              <section className="d-none d-lg-block">
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
                        <span className="text-capitalize">{role}</span>
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
                  {...register("emailL")}
                />
                {errors.emailL && (
                  <p className="text-danger" role="alert">
                    {errors.emailL?.message}
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
                  {...register("passwordL")}
                />
                {errors.passwordL && (
                  <p className="text-danger" role="alert">
                    {errors.passwordL?.message}
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
                    ¿No tienes cuenta?
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
            <form onSubmit={handleSubmit(onCreateAccount)} className="row g-3">
              {messageError ? (
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>{messageError}</strong>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              ) : null}
              <div className="col-12">
                <label className="form-label login__label">
                  Correo electrónico
                </label>
                <input
                  className="form-control login__input"
                  placeholder="Ingresa tu correo"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-danger mb-0" role="alert">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label className="form-label login__label">Contraseña</label>
                <input
                  type="password"
                  className="form-control login__input"
                  placeholder="Ingresa tu contraseña"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-danger mb-0" role="alert">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label className="form-label login__label">
                  Confirma tu contraseña
                </label>
                <input
                  type="password"
                  className="form-control login__input"
                  placeholder="Ingresa tu contraseña"
                  {...register("cpassword")}
                />
                {errors.cpassword && (
                  <p className="text-danger mb-0" role="alert">
                    {errors.cpassword?.message}
                  </p>
                )}
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
                  {...register("identify")}
                />
                {errors.identify && (
                  <p className="text-danger mb-0" role="alert">
                    {errors.identify?.message}
                  </p>
                )}
              </div>
              <div className="col-12 mb-2">
                <label className="form-label login__label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control login__input"
                  placeholder="Ingresa tu teléfono"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-danger mb-0" role="alert">
                    {errors.phone?.message}
                  </p>
                )}
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
