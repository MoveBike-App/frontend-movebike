import Link from 'next/link'
import React from 'react'
import Modal from 'react-bootstrap/Modal'

export default function LoginModal ({
  title,
  body,
  show,
  setShow,
  handleClose,
  handleShow
}) {
  return (
    <Modal show={show} onHide={handleClose} centered className='login'>
      <Modal.Header className='login__header '> <h4 className='login__title'>{title}</h4></Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
    </Modal>
  )
}
