import Link from "next/link";
import React from "react";
import Modal from "react-bootstrap/Modal";

export default function LoginModal({ show, setShow, handleClose, handleShow }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      
      <Modal.Body className="login">
        <div>
          <h4 className="login__title">Login</h4>
        </div>
        <form className="row g-3">
          <div className="col-12">
            <label for="validationServer01" className="form-label login__label">
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
            <label for="validationServer02" className="form-label login__label">
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
              <Link className="login__forgot text-black-800" href={'/'}>Olvide mi contraseña</Link>
            </div>
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-movebike contained w-50 mx-auto" type="submit">
              Ingresar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
