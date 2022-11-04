import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";

export default function Nav() {
  const [isToggle, setIsToggle] = useState(false);
  const [idiom, setIdiom] = useState("es");
  const router = useRouter();
  const { locale: activeLocale } = router;

  const [navBackground, setNavBackground] = useState(false);
  const [familyLandrada, setFamilyLandrada] = useState(false);

  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    if (router.pathname !== "/") {
      setFamilyLandrada(true);
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
      <nav className="navbar mb-navbar fixed-top bg-white shadow">
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
                    <Link href="/familia-landrada">Iniciar sesión</Link>
                  </li>
                  <li className="option text-center">
                    <Link className="btn btn-movebike contained" href="">Crear cuenta</Link>
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
                    <Link className="text-capitalize text-white" href={'/'}>
                      ES
                      <img
                        className="flag"
                        src={`/assets/icons/icon_flag_es-MX.svg`}
                        alt="Icono bandera MX"
                      />
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="text-capitalize text-white" href={'/'}>
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
    </>
  );
}
