import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';

const WriteNow = () => {
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverImage: ''
  });
  const [showEditor, setShowEditor] = useState(false);
  const [chapters, setChapters] = useState({});
  const [currentChapter, setCurrentChapter] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [publishSuccess, setPublishSuccess] = useState('');

  const handleBookDetailsChange = (e) => {
    setBookDetails({
      ...bookDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    setShowEditor(true);
  };

  const addChapter = () => {
    const chapterCount = Object.keys(chapters).length + 1;
    const chapterName = `Chapter ${chapterCount}`;
    const newChapters = { ...chapters, [chapterName]: '' };
    setChapters(newChapters);
    loadChapter(chapterName);
  };

  const loadChapter = (chapterName) => {
    // Save current chapter content
    if (currentChapter) {
      setChapters(prev => ({
        ...prev,
        [currentChapter]: chapterContent
      }));
    }
    
    setCurrentChapter(chapterName);
    setChapterContent(chapters[chapterName] || '');
  };

  const saveDraft = () => {
    const updatedChapters = {
      ...chapters,
      [currentChapter]: chapterContent
    };
    setChapters(updatedChapters);
    alert(`Draft saved for ${currentChapter}!`);
  };

  const saveAndPost = async () => {
    try {
      setIsPublishing(true);
      setPublishError('');
      setPublishSuccess('');

      // Save current chapter content
      const updatedChapters = {
        ...chapters,
        [currentChapter]: chapterContent
      };
      setChapters(updatedChapters);

      // Convert chapters to lessons format for the API
      const lessons = Object.entries(updatedChapters).map(([title, content], index) => ({
        title,
        content,
        order: index + 1
      }));

      // Prepare book data for API
      const bookData = {
        title: bookDetails.title,
        author: bookDetails.author,
        genre: bookDetails.genre,
        description: bookDetails.description,
        coverImage: bookDetails.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover',
        story: `A book by ${bookDetails.author}`,
        lessons
      };

      // Save book to database
      const response = await bookService.createBook(bookData);

      setPublishSuccess(`Book "${bookDetails.title}" has been published successfully!`);

      // Redirect to browse page after 2 seconds
      setTimeout(() => {
        navigate('/browse');
      }, 2000);

    } catch (error) {
      console.error('Error publishing book:', error);
      setPublishError(error.response?.data?.message || 'Failed to publish book. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      {/* Navbar Spacer */}
      <div style={{ height: '76px' }}></div>

      {/* Hero Section */}
      <section 
        className="text-center text-white"
        style={{
          background: 'linear-gradient(135deg, #11998e, #38ef7d)',
          padding: '50px 20px',
          borderRadius: '0 0 20px 20px',
          marginBottom: '30px'
        }}
      >
        <h1>✍️ Create Your Book</h1>
        <p>Fill the details and start writing your chapters!</p>
      </section>

      {/* Book Details Form */}
      {!showEditor && (
        <Container>
          <Card className="p-4 shadow-sm mb-4">
            <h4 className="fw-bold mb-3">Enter Book Details</h4>
            <Form onSubmit={handleBookSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={bookDetails.title}
                  onChange={handleBookDetailsChange}
                  placeholder="Enter your book title"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author Name</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={bookDetails.author}
                  onChange={handleBookDetailsChange}
                  placeholder="Enter author name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={bookDetails.genre}
                  onChange={handleBookDetailsChange}
                  placeholder="Enter genre"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={bookDetails.description}
                  onChange={handleBookDetailsChange}
                  placeholder="Enter a brief description"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cover Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="cover"
                  value={bookDetails.cover}
                  onChange={handleBookDetailsChange}
                  placeholder="Paste cover image URL"
                />
              </Form.Group>
              <Button type="submit" variant="success">
                Start Writing
              </Button>
            </Form>
          </Card>
        </Container>
      )}

      {/* Chapter Editor Section */}
      {showEditor && (
        <Container>
          <Card className="p-4 shadow-sm mb-4">
            <h4 className="fw-bold">{bookDetails.title}</h4>
            <p><strong>Author:</strong> {bookDetails.author}</p>
            <p><strong>Genre:</strong> {bookDetails.genre}</p>

            <Row className="gap-4">
              {/* Chapter List */}
              <Col lg={3}>
                <Card className="p-3">
                  <h5 className="fw-bold">Chapters</h5>
                  {Object.keys(chapters).map((chapter, index) => (
                    <div 
                      key={index}
                      className={`p-2 mb-2 rounded ${currentChapter === chapter ? 'bg-success text-white' : 'bg-light'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => loadChapter(chapter)}
                    >
                      {chapter}
                    </div>
                  ))}
                  <Button variant="outline-dark" className="mt-3" onClick={addChapter}>
                    + Add New Chapter
                  </Button>
                </Card>
              </Col>

              {/* Editor */}
              <Col lg={8}>
                <Card className="p-3">
                  <h5>{currentChapter || 'Select a chapter'}</h5>
                  <Form.Control
                    as="textarea"
                    rows={15}
                    value={chapterContent}
                    onChange={(e) => setChapterContent(e.target.value)}
                    placeholder="Start writing your chapter here..."
                    disabled={!currentChapter}
                  />
                  {/* Success/Error Messages */}
                  {publishSuccess && (
                    <Alert variant="success" className="mt-3">
                      {publishSuccess}
                    </Alert>
                  )}
                  {publishError && (
                    <Alert variant="danger" className="mt-3">
                      {publishError}
                    </Alert>
                  )}

                  <div className="mt-3 d-flex gap-2">
                    <Button variant="warning" onClick={saveDraft} disabled={!currentChapter}>
                      Save Draft
                    </Button>
                    <Button
                      variant="success"
                      onClick={saveAndPost}
                      disabled={!currentChapter || isPublishing}
                    >
                      {isPublishing ? 'Publishing...' : 'Save & Post'}
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </>
  );
};

export default WriteNow;