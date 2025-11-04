import React, { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar, Container, Row, Col } from 'react-bootstrap';

const BookReader = ({ book, show, onHide }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  // Sort lessons by order
  const sortedLessons = book.lessons ? book.lessons.sort((a, b) => a.order - b.order) : [];

  useEffect(() => {
    if (sortedLessons.length > 0) {
      setReadingProgress(((currentLessonIndex + 1) / sortedLessons.length) * 100);
    }
  }, [currentLessonIndex, sortedLessons.length]);

  const nextLesson = () => {
    if (currentLessonIndex < sortedLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const goToLesson = (index) => {
    setCurrentLessonIndex(index);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  if (!book || sortedLessons.length === 0) {
    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{book?.title || 'Book Reader'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This book doesn't have any lessons available yet.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const currentLesson = sortedLessons[currentLessonIndex];

  return (
    <Modal show={show} onHide={onHide} size="xl" className="book-reader-modal">
      <Modal.Header closeButton className="book-reader-header">
        <Modal.Title className="d-flex justify-content-between align-items-center w-100">
          <span>{book.title}</span>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={decreaseFontSize}>
              A-
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={increaseFontSize}>
              A+
            </Button>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="book-reader-body p-0">
        {/* Lesson Navigation - Moved to Top */}
        <div className="lesson-navigation px-4 py-3 bg-light border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="lesson-buttons">
              <Button
                variant="outline-primary"
                onClick={prevLesson}
                disabled={currentLessonIndex === 0}
                className="me-2"
              >
                ← Previous Lesson
              </Button>
              <Button
                variant="outline-primary"
                onClick={nextLesson}
                disabled={currentLessonIndex === sortedLessons.length - 1}
              >
                Next Lesson →
              </Button>
            </div>

            <div className="lesson-selector">
              <select
                className="form-select form-select-sm"
                value={currentLessonIndex}
                onChange={(e) => goToLesson(parseInt(e.target.value))}
                style={{ width: 'auto' }}
              >
                {sortedLessons.map((lesson, index) => (
                  <option key={index} value={index}>
                    Lesson {index + 1}: {lesson.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2 bg-light border-bottom">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              Lesson {currentLessonIndex + 1} of {sortedLessons.length}
            </small>
            <small className="text-muted">
              {Math.round(readingProgress)}% Complete
            </small>
          </div>
          <ProgressBar now={readingProgress} className="mb-2" />
        </div>

        {/* Book Content */}
        <div className="book-content p-4">
          <Container fluid>
            <Row>
              <Col lg={10} className="mx-auto">
                {/* Lesson Title */}
                <div className="lesson-title text-center mb-4">
                  <h3 className="text-primary mb-2">{currentLesson.title}</h3>
                  <div className="book-divider"></div>
                </div>

                {/* Lesson Content */}
                <div
                  className="lesson-content"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: '1.8',
                    textAlign: 'justify'
                  }}
                >
                  {currentLesson.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>

                {/* Book-like page styling */}
                <div className="book-page-styling">
                  <div className="page-number text-muted text-center mt-4">
                    Page {currentLessonIndex + 1}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal.Body>

      <Modal.Footer className="book-reader-footer">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="text-muted">
            <strong>{book.author}</strong>
          </div>
          <Button variant="secondary" onClick={onHide}>
            Close Book
          </Button>
        </div>
      </Modal.Footer>

      <style jsx>{`
        .book-reader-modal .modal-dialog {
          max-width: 900px;
        }

        .book-reader-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .book-reader-body {
          background: #f8f9fa;
          min-height: 600px;
        }

        .book-content {
          background: white;
          min-height: 500px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          position: relative;
        }

        .lesson-title h3 {
          font-family: 'Georgia', serif;
          font-weight: bold;
        }

        .book-divider {
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          margin: 0 auto;
        }

        .lesson-content {
          font-family: 'Georgia', serif;
          color: #333;
          text-indent: 2em;
        }

        .lesson-content p:first-child {
          text-indent: 0;
        }

        .book-page-styling {
          position: relative;
        }

        .page-number {
          font-family: 'Times New Roman', serif;
          font-style: italic;
        }

        .lesson-navigation {
          background: #e9ecef;
        }

        .book-reader-footer {
          background: #495057;
          color: white;
        }
      `}</style>
    </Modal>
  );
};

export default BookReader;