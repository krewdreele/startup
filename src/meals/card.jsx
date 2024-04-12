import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
 
export function MealCard({name, description, item}) {
  return (
    <Card key={item} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="info">Edit</Button>
      </Card.Body>
    </Card>
  );
}