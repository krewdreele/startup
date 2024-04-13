import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Edit({...props}){
    const [bio, setBio] = useState(props?.bio ?? "none");

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Biography:</p>
                <textarea type="text" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-secondary'
                        onClick={() => props.handleClose()}
                >
                Cancel
                </Button>
                <Button
                    onClick={async () => {
                        props.handleClose();
                        props.setBio(bio);
                        
                        let body = {
                            profile: { biography: bio},
                        };

                        let user = localStorage.getItem("this-user");
                        const response = await fetch(`api/profile?user=${user}`, {
                            method: "PUT",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(body),
                        });
                    }}
                >
                Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}