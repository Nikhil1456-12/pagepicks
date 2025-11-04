import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ background: '#222', color: '#ccc', padding: '20px', marginTop: '50px' }}>
      <Container>
        <p className="text-center mb-2">© 2025 PagePicks | Read • Write • Share</p>
        <div className="text-center">
          <a href="#" style={{ color: '#ccc', textDecoration: 'none', margin: '0 10px' }}>Facebook</a> | 
          <a href="#" style={{ color: '#ccc', textDecoration: 'none', margin: '0 10px' }}>Instagram</a> | 
          <a href="#" style={{ color: '#ccc', textDecoration: 'none', margin: '0 10px' }}>Whatsapp</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;