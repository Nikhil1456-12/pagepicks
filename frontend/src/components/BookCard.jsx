import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import BookReader from './BookReader';
import { booksAPI } from '../services/api';

const BookCard = ({ book, onAddToLibrary }) => {
  const { user } = useAuth();
  const [showReader, setShowReader] = useState(false);

  const handleRead = () => {
    if (user) {
      setShowReader(true);
    } else {
      alert('Please log in to read books.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await booksAPI.get(`/${book._id}/download`, {
        responseType: 'blob' // Important for file downloads
      });

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Set filename
      const fileName = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      link.setAttribute('download', fileName);

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download book. Please try again.');
    }
  };

  return (
    <>
      <Card className="book-card shadow-sm h-100">
        <Card.Img
          variant="top"
          src={book.coverImage}
          alt={book.title}
          style={{ height: '250px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="h6" style={{ minHeight: '48px' }}>{book.title}</Card.Title>
          <Card.Text className="text-muted small mb-2">
            {book.author || 'Unknown Author'}
          </Card.Text>
          <Card.Text className="small text-secondary flex-grow-1">
            {book.description ?
              (book.description.length > 100
                ? `${book.description.substring(0, 100)}...`
                : book.description)
              : 'No description available.'}
          </Card.Text>
          <div className="mt-auto d-flex gap-2 flex-wrap">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleDownload}
              className="flex-fill"
            >
              Download
            </Button>
            {user && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleRead}
                className="flex-fill"
              >
                Read
              </Button>
            )}
            {onAddToLibrary && (
              <Button
                variant="success"
                size="sm"
                onClick={() => onAddToLibrary(book)}
                className="flex-fill"
              >
                Add to Library
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <BookReader
        book={book}
        show={showReader}
        onHide={() => setShowReader(false)}
      />
    </>
  );
};

export default BookCard;