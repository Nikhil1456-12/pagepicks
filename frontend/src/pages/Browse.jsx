import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GenreCard from '../components/GenreCard';

const Browse = () => {
  const genres = [
    { genre: 'fantasy', image: 'https://i.pinimg.com/1200x/b3/0f/b3/b30fb38ed1b71cc2feb2da6699c6770a.jpg', title: 'Fantasy' },
    { genre: 'sci-fi', image: 'https://i.pinimg.com/736x/53/d1/a5/53d1a5c4d0b705c714e0cec6ebe582e3.jpg', title: 'Sci-Fi' },
    { genre: 'mystery', image: 'https://i.pinimg.com/736x/14/c8/97/14c897924d355958a269debc88b711d9.jpg', title: 'Mystery' },
    { genre: 'romance', image: 'https://i.pinimg.com/736x/1d/4c/93/1d4c93d761649778856cf9df30cd1833.jpg', title: 'Romance' },
    { genre: 'non-fiction', image: 'https://i.pinimg.com/736x/8d/42/2e/8d422e76bf7a6f106ce67c30f99bcf44.jpg', title: 'Non-Fiction' },
    { genre: 'drama', image: 'https://i.pinimg.com/1200x/b1/3c/3d/b13c3d8c3f4e78fcb6c5f81a1b52b029.jpg', title: 'Drama' },
    { genre: 'adventure', image: 'https://i.pinimg.com/736x/4f/9c/cd/4f9ccd9990570f659deb81a4435dfe60.jpg', title: 'Adventure' },
    { genre: 'horror', image: 'https://i.pinimg.com/736x/f8/5b/7e/f85b7e81801b1a3e0a60ecf8e4de21c6.jpg', title: 'Horror' },
    { genre: 'biography', image: 'https://i.pinimg.com/1200x/e1/31/e6/e131e672b2eaf83cb121b9a3c3769d73.jpg', title: 'Biography' },
    { genre: 'self-motivation', image: 'https://i.pinimg.com/736x/ff/20/25/ff20256cf7d1929453e04ad4711a49cd.jpg', title: 'Self Motivation' },
    { genre: 'poetry', image: 'https://i.pinimg.com/1200x/b1/25/ef/b125ef4ca2993f29b56ecac567ce451d.jpg', title: 'Poetry' },
    { genre: 'historical', image: 'https://i.pinimg.com/1200x/b3/57/24/b357249fe14adb04353dcc7a6719dbca.jpg', title: 'Historical' },
    { genre: 'cooking', image: 'https://i.pinimg.com/1200x/c8/fd/b7/c8fdb718286dfab585b1ea44dd4b46a8.jpg', title: 'Cooking' },
    { genre: 'travel', image: 'https://i.pinimg.com/1200x/8d/e0/9f/8de09fdf3ff6b9d24a4a0113af41d524.jpg', title: 'Travel' },
    { genre: 'art', image: 'https://i.pinimg.com/1200x/4a/a8/9f/4aa89f925443ffcc59607ac00bbcf34c.jpg', title: 'Art' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="py-5 text-center text-white"
        style={{
          background: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794') center/cover no-repeat",
          marginTop: '76px'
        }}
      >
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '60px' }}>
          <h1 className="fw-bold">Browse Books by Genre</h1>
          <p>Explore books with exciting genres</p>
        </div>
      </section>

      {/* Genres Section */}
      <section className="container py-5">
        <h2 className="section-title">Genres</h2>
        <Row className="g-4">
          {genres.map((genre, index) => (
            <Col key={index} md={4} sm={6}>
              <GenreCard {...genre} />
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default Browse;