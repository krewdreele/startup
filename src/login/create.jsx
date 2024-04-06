import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Create({show, handleClose}) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
                First name:
                <input type="text" placeholder="first name" id="fn" />
              </div>
              <div>
                Last name:
                <input type="text" placeholder="last name" id="ln" />
              </div>

              <div>
                Username:
                <input type="text" placeholder="username" id="un" />
              </div>

              <div>
                Password:
                <input type="password" placeholder="password" id="pw" />
              </div>
              <div>
                Confirm:
                <input
                  type="password"
                  placeholder="confirm password"
                  id="confirm"
                />
              </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
  );
}