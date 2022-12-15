import Image from 'next/image'
import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function VerifyModal ({ title, body, show, handleClick, setShow, handleClose, handleShow }) {
  return (
    <Modal show={show} onHide={handleClose} centered className='login'>
      <Modal.Header className='login__header login__header--bottom' closeButton>
        <Image src='/assets/icons/icon-check.webp' alt='Icon check' width={32} height={32} />
        <h4 className='login__title'>{title}</h4>
      </Modal.Header>
      <Modal.Body className='login__body'>
        {body}
      </Modal.Body>
      <Modal.Footer className='login__footer'>
        <Button className='btn btn-movebike contained' onClick={handleClick}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}
