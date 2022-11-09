import Link from "next/link";
import React from "react";
import Modal from "react-bootstrap/Modal";

export default function LoginModal({
  title,
  body,
  show,
  setShow,
  handleClose,
  handleShow,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="login">
        <h4 className="login__title">{title}</h4>
        {body}
      </Modal.Body>
    </Modal>
  );
}
