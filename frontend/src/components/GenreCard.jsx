import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GenreCard = ({ genre, image, title }) => {
  return (
    <Link to={`/genre/${genre}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="genre-card shadow-sm h-100">
        <Card.Img 
          variant="top" 
          src={image} 
          alt={title}
          style={{ height: '180px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <Card.Body className="text-center">
          <Card.Title as="h6" className="mb-0">{title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default GenreCard;