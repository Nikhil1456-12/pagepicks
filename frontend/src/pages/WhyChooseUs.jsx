import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const WhyChooseUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center text-white py-5" style={{ marginTop: '76px' }}>
        <Container>
          <h1 className="fw-bold mb-4">Why Choose PagePicks?</h1>
          <Row className="g-4">
            <Col md={4}>
              <Card className="p-4 h-100 border-top border-danger border-4">
                <Card.Body className="text-center">
                  <div className="fs-1 text-danger mb-3">📚</div>
                  <h5 className="fw-bold">Vast Collection</h5>
                  <p>Explore thousands of books across 18+ genres curated for every reader.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 h-100 border-top border-danger border-4">
                <Card.Body className="text-center">
                  <div className="fs-1 text-danger mb-3">✍️</div>
                  <h5 className="fw-bold">Write & Publish</h5>
                  <p>Share your stories with a community of passionate readers & writers.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 h-100 border-top border-danger border-4">
                <Card.Body className="text-center">
                  <div className="fs-1 text-danger mb-3">👥</div>
                  <h5 className="fw-bold">Community</h5>
                  <p>Engage with readers worldwide, follow authors, and join discussions.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default WhyChooseUs;