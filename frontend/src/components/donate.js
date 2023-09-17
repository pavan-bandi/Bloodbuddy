import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import './DonatePage.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
const toastStyle = {
  fontSize: '16px', // Adjust the font size as needed
  width: '400px',   // Adjust the width as needed
};
const DonatePage = () => {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      // Send the donation details to the server
      const response = await axios.post('http://localhost:8080/donor/donate', {
        name,
        bloodGroup,
        contactNumber,
        city,
        message,
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setCity("")
      setBloodGroup('');
      setContactNumber('');
      setMessage('');
      toast.success('Thank you for your donation! Your message has been sent to the hospital admin.');
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(true);
    }
  };

  return (
    <div className="container">
      
      <h1 className="text-center mt-4">Donate Blood</h1>
      <h1 className="text-center ">Donate Blood</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-6 col-md-8">
          <Card className="custom-card ">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="bloodGroup">
                  <Form.Label>Blood Group:</Form.Label>
                  <Form.Control
                    type="text"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="contactNumber">
                  <Form.Label>Contact Number:</Form.Label>
                  <Form.Control
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Label>City:</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="message">
                  <Form.Label>Message:</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Enter Your address along with your age and other medical history"
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-3">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
                {submitSuccess && <p className="mt-3 text-success">Thank you for your donation! Your message has been sent to the hospital admin.</p>}
                {submitError && <p className="mt-3 text-danger">Sorry, there was an error submitting your donation. Please try again later.</p>}
              </Form>
            </Card.Body>
          </Card>
        </div>
        <ToastContainer
        toastStyle={toastStyle}
        autoClose={5000} // Adjust the duration as needed
        position="top-right"
      />
      </div>
    </div>
  );
};

export default DonatePage;
