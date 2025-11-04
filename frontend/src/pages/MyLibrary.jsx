import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import { libraryService } from '../services/api';

const MyLibrary = () => {
  const { user } = useAuth();
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserLibrary();
    }
  }, [user]);

  const fetchUserLibrary = async () => {
    try {
      setLoading(true);
      const response = await libraryService.getUserLibrary();
      setLibraryBooks(response.data);
    } catch (error) {
      console.error('Error fetching library:', error);
      setLibraryBooks([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center" style={{ marginTop: '76px' }}>
        <Alert variant="warning">
          <h4>Please log in to view your library</h4>
          <Button as={Link} to="/login" variant="primary" className="mt-3">
            Login
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 text-center text-white"
        style={{
          background: '#2980b9',
          marginTop: '76px',
          borderRadius: '0 0 20px 20px'
        }}
      >
        <div style={{ padding: '60px' }}>
          <h1 className="fw-bold">My Library</h1>
          <p>All your downloaded books at one place</p>
        </div>
      </section>

      {/* Library Section */}
      <section className="container py-5">
        <h2 className="section-title">Your Books</h2>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : libraryBooks.length > 0 ? (
          <Row className="g-4">
            {libraryBooks.map((libraryItem, index) => (
              <Col key={index} md={3} sm={6}>
                <BookCard book={libraryItem.book} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <div className="empty-state p-5 bg-light rounded">
              <h5>Your Library is Empty 😔</h5>
              <p>Browse books and add them to your library to see them here.</p>
              <Button as={Link} to="/browse" variant="primary">
                Browse Books
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MyLibrary;