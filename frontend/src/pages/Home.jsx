import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GenreCard from '../components/GenreCard';
import BookCard from '../components/BookCard';
import { bookService, libraryService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await bookService.getPopularBooks();
      setPopularBooks(response.data);
    } catch (err) {
      setError('Failed to load popular books');
      console.error('Error fetching popular books:', err);
      // Fallback to empty array if API fails
      setPopularBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = async (book) => {
    try {
      await libraryService.addToLibrary(book._id);
      alert('Book added to your library successfully!');
    } catch (error) {
      console.error('Error adding book to library:', error);
      if (error.response?.status === 409) {
        alert('Book is already in your library!');
      } else {
        alert('Failed to add book to library. Please try again.');
      }
    }
  };

  const genres = [
    { genre: 'fantasy', image: 'https://i.pinimg.com/1200x/b3/0f/b3/b30fb38ed1b71cc2feb2da6699c6770a.jpg', title: 'Fantasy' },
    { genre: 'sci-fi', image: 'https://i.pinimg.com/736x/53/d1/a5/53d1a5c4d0b705c714e0cec6ebe582e3.jpg', title: 'Sci-Fi' },
    { genre: 'mystery', image: 'https://i.pinimg.com/736x/14/c8/97/14c897924d355958a269debc88b711d9.jpg', title: 'Mystery' },
    { genre: 'cooking', image: 'https://i.pinimg.com/1200x/c8/fd/b7/c8fdb718286dfab585b1ea44dd4b46a8.jpg', title: 'Cooking' },
    { genre: 'self-motivation', image: 'https://i.pinimg.com/736x/ff/20/25/ff20256cf7d1929453e04ad4711a49cd.jpg', title: 'Self Motivation' },
    { genre: 'non-fiction', image: 'https://i.pinimg.com/736x/8d/42/2e/8d422e76bf7a6f106ce67c30f99bcf44.jpg', title: 'Non-Fiction' },
    { genre: 'drama', image: 'https://i.pinimg.com/1200x/b1/3c/3d/b13c3d8c3f4e78fcb6c5f81a1b52b029.jpg', title: 'Drama' },
    { genre: 'adventure', image: 'https://i.pinimg.com/736x/4f/9c/cd/4f9ccd9990570f659deb81a4435dfe60.jpg', title: 'Adventure' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="fw-bold display-4">Discover. Read. Write. Share.</h1>
          <p className="mt-3 fs-5">Your world of books and imagination awaits</p>
          <div className="mt-4">
            <Button as={Link} to="/browse" variant="primary" size="lg" className="me-3">
              Start Reading
            </Button>
            <Button as={Link} to="/startwriting" variant="outline-primary" size="lg">
              Start Writing
            </Button>
          </div>
        </div>
      </section>

      {/* Genres Section */}
      <section className="container py-5" id="genres">
        <h2 className="text-center fw-bold mb-4">Explore Genres</h2>
        <Row className="g-4">
          {genres.map((genre, index) => (
            <Col key={index} md={3} sm={6}>
              <GenreCard {...genre} />
            </Col>
          ))}
        </Row>
      </section>

      {/* Popular Books Section */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Popular Books</h2>
        {error && <Alert variant="warning">{error}</Alert>}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Row className="g-4">
            {popularBooks.map((book, index) => (
              <Col key={index} md={3} sm={6}>
                <BookCard book={book} onAddToLibrary={handleAddToLibrary} />
              </Col>
            ))}
          </Row>
        )}
      </section>
    </>
  );
};

export default Home;