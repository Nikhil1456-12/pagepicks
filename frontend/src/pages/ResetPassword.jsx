import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null); // null = checking, true = valid, false = invalid

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Validate token on component mount
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      // For now, we'll just check if token exists
      // In a real app, you might want to validate it with the backend
      if (token && token.length > 10) {
        setTokenValid(true);
      } else {
        setTokenValid(false);
        setError('Invalid or expired reset token');
      }
    } catch (error) {
      setTokenValid(false);
      setError('Invalid or expired reset token');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/users/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully! You can now log in with your new password.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  if (tokenValid === null) {
    return (
      <Container style={{ maxWidth: '400px', marginTop: '100px' }}>
        <Card>
          <Card.Body className="text-center">
            <div>Validating reset token...</div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (tokenValid === false) {
    return (
      <Container style={{ maxWidth: '400px', marginTop: '100px' }}>
        <Card>
          <Card.Body className="text-center">
            <h4>Invalid Reset Link</h4>
            <p>The password reset link is invalid or has expired.</p>
            <Button variant="primary" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

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
      <Container style={{ maxWidth: '450px' }}>
        <div
          className="p-4 rounded"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)"
          }}
        >
          <h3 className="text-center fw-bold mb-3">Reset Your Password</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;