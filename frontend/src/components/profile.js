import React from 'react';
import { Card, Button, ListGroup, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ isLoggedIn, setisLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setisLoggedIn(false);
  };

  const navigate = useNavigate();
  const handleRegister = (event) => {
    event.stopPropagation(); // Prevent event propagation
    navigate('/register');
  };
  
  const handleLogin = (event) => {
    event.stopPropagation(); // Prevent event propagation
    navigate('/login');
  };

  return (
    <Card style={{ width: '100%', maxWidth: '300px', position: 'absolute', top: '68px', right: '15px', zIndex: '100', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      {isLoggedIn ? (
        <>
         <Card.Body>
            <Card.Title>John Doe</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Software Engineer</Card.Subtitle>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Image src="https://via.placeholder.com/30" roundedCircle className="mr-2" />
              Skill 1
            </ListGroup.Item>
            <ListGroup.Item>
              <Image src="https://via.placeholder.com/30" roundedCircle className="mr-2" />
              Skill 2
            </ListGroup.Item>
            <ListGroup.Item>
              <Image src="https://via.placeholder.com/30" roundedCircle className="mr-2" />
              Skill 3
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Button variant="primary" className="mb-2">Edit Profile</Button>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
          </Card.Body>
        </>
      ) : (
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="success" className="me-2" onClick={handleRegister}>Sign Up</Button>
            <Button variant="outline-primary" onClick={handleLogin}>Login</Button>
          </div>
        </Card.Body>
      )}
    </Card>
  );
};

export default ProfileCard;
