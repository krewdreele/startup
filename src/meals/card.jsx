import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {Info} from './info';

export function MealCard({item, handleDelete}) {
    const [showInfo, setShowInfo] = React.useState(false);

    const handleClose = () => {
        setShowInfo(false);
    }
  return (
    <Card style={{ width: '18rem' }}>
        <Info show={showInfo} handleClose={handleClose} item={item} handleDelete={handleDelete}></Info>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <Button variant="info" onClick={() => {setShowInfo(true);}}>Info</Button>
      </Card.Body>
    </Card>
  );
}