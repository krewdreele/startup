import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Info({show, handleClose, item}) {
    const [edit, setEdit] = React.useState(false);
    const [cancel, setCancel] = React.useState(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="info">
                    <p>Calories: {item.calories}</p>
                    <p>Protein: {item.protein}</p>
                    <p>Fat: {item.fat}</p>
                    <p>Carbs: {item.carbs}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {edit && <Button 
                onClick={() => deleteMeal()}
                variant='danger'
                >
                    Delete
                </Button>}

                {!edit && <Button 
                onClick={() => setEdit(true)}
                variant='info'
                >
                    Edit
                </Button>}

                {edit && <Button 
                onClick={() => 
                {setEdit(false); setCancel(!cancel)}}
                variant='outline-secondary'
                >
                    Cancel
                </Button>}

                {edit && <Button onClick={() => setEdit(false)}>
                    Save Changes
                </Button>}
            </Modal.Footer>
        </Modal>
    )
}