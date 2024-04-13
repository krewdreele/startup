import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export function Settings({...props}){
    const navigate = useNavigate();
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                 <div>
                    <p>Display mode</p>
                    <Button type="button" variant='light'>Light</Button>
                    <Button type="button" variant='dark'>Dark</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                variant='outline-secondary'
                onClick={() => props.handleClose()}
                >
                Cancel
                </Button>
                <Button
                    
                >
                Save
                </Button>

                <Button 
                variant='danger'
                onClick={async () => {
                    const response = await fetch("api/auth", {
                    method: "DELETE",
                    });

                    if (response.ok) {
                        navigate("/");
                    }
                    }
                }
                >
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}