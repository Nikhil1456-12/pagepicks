import React, { useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    phoneNumber: ''
  });
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value
    });
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotPasswordError('');
    setForgotPasswordSuccess('');
    setForgotPasswordLoading(true);

    if (!forgotPasswordData.email && !forgotPasswordData.phoneNumber) {
      setForgotPasswordError('Please provide an email address or phone number');
      setForgotPasswordLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forgotPasswordData),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotPasswordSuccess('If an account with that email or phone number exists, password reset instructions have been sent');
        setForgotPasswordData({ email: '', phoneNumber: '' });
      } else {
        setForgotPasswordError(data.message || 'Failed to send reset instructions');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setForgotPasswordError('Network error. Please check your connection and try again.');
    }

    setForgotPasswordLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email!');
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div 
      style={{
        background: "url('https://i.pinimg.com/736x/27/79/67/2779677eb6b676fcb7e52521e9503c1f.jpg') no-repeat center center/cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container style={{ maxWidth: '400px' }}>
        <div 
          className="p-4 rounded"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
          }}
        >
          <h3 className="text-center fw-bold mb-3">Login to PagePicks</h3>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          <p className="text-center mt-3">
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </Button>
          </p>

          <p className="text-center mt-2">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </Container>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotPasswordError && <Alert variant="danger">{forgotPasswordError}</Alert>}
          {forgotPasswordSuccess && <Alert variant="success">{forgotPasswordSuccess}</Alert>}

          <Form onSubmit={handleForgotPasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={forgotPasswordData.email}
                onChange={handleForgotPasswordChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <div className="text-center mb-3">
              <span className="text-muted">OR</span>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={forgotPasswordData.phoneNumber}
                onChange={handleForgotPasswordChange}
                placeholder="Enter your phone number"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={forgotPasswordLoading}
            >
              {forgotPasswordLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;