import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import { bookService, libraryService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedGenre]);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getAllBooks();
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter(book =>
        book.genre && book.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    setFilteredBooks(filtered);
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
    'fantasy', 'sci-fi', 'mystery', 'romance', 'non-fiction',
    'drama', 'adventure', 'horror', 'biography', 'self-motivation',
    'poetry', 'historical', 'cooking', 'travel', 'art'
  ];

  if (loading) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '76px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5 text-center text-white"
        style={{
          background: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d') center/cover no-repeat",
          marginTop: '76px'
        }}
      >
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '60px' }}>
          <h1 className="fw-bold">All Books</h1>
          <p>Discover all published books in our collection</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container py-4">
        <Row className="mb-4">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Results Info */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">
            Showing {filteredBooks.length} of {books.length} books
          </p>
          {(searchTerm || selectedGenre) && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </section>

      {/* Books Section */}
      <section className="container pb-5">
        {filteredBooks.length > 0 ? (
          <Row className="g-4">
            {filteredBooks.map((book, index) => (
              <Col key={book._id || index} md={3} sm={6}>
                <BookCard book={book} onAddToLibrary={handleAddToLibrary} />
              </Col>
            ))}
          </Row>
        ) : (
          <Alert variant="info" className="text-center">
            {books.length === 0
              ? 'No books available yet. Be the first to publish a book!'
              : 'No books match your search criteria.'
            }
          </Alert>
        )}
      </section>
    </>
  );
};

export default AllBooks;