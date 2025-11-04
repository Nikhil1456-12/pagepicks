import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StartWriting = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="text-center text-white"
        style={{
          background: 'linear-gradient(135deg, #11998e, #38ef7d)',
          padding: '80px 20px',
          borderRadius: '0 0 30px 30px',
          marginBottom: '50px',
          marginTop: '76px'
        }}
      >
        <h1>✍️ Start Writing Your Story</h1>
        <p>Express yourself and share your imagination with the world!</p>
      </section>

      {/* Writing Options */}
      <section className="container py-5">
        <Row className="g-4 justify-content-center">
          <Col md={6}>
            <Card className="write-card shadow-sm text-center p-4">
              <Card.Body>
                <h5 className="fw-bold">Create Your First Chapter</h5>
                <p>Start a new story and let your creativity shine.</p>
                <Button as={Link} to="/writenow" variant="success">
                  Write Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="write-card shadow-sm text-center p-4">
              <Card.Body>
                <h5 className="fw-bold">Continue Your Draft</h5>
                <p>Pick up where you left off and keep writing!</p>
                <Button variant="success" disabled>
                  Continue Writing
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default StartWriting;