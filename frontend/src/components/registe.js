import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { BsEnvelope, BsLock, BsPerson, BsPhone } from 'react-icons/bs';
import axios from 'axios';
import Logo from '../Assets/bgm.png';
import Navv from './navvv';
const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('user');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

const city="hyderabad"
const pincode='515865'



  const formData={
    
      name,
      name,
      email,
   
      mobile,
      city,
      pincode

    
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    
   
 

  
    try {
      // Make a POST request using Axios
      const response = await axios.post('http://localhost:8080/user/signup', formData);
      console.log(formData)
   
  
      // Handle the response
      console.log(response.data); // Assuming the server returns some data
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  
  return (
    <div>
    <Navv />
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: '400px', marginTop: '150px' }}>
        <Form className="p-4 border rounded shadow bg-light" onSubmit={handleSubmit}  style={{ background: 'linear-gradient(180deg, rgba(169,198,217,1) 15%, rgba(242,167,75,1) 90%)', boxShadow: '0.2px 12px 18px rgba(131,153,167,0.6)' }}>
          <h2 className="text-center mb-4">Create an Account</h2>
          <Form.Group controlId="formName" className="mb-4">
          
            <div className="input-group">
              <span className="input-group-text me-2"><BsPerson /></span>
              <Form.Control type="text" placeholder="Enter your name" className="rounded-pill" value={name} onChange={handleNameChange} />
            </div>
            
          </Form.Group>

        

          <Form.Group controlId="formEmail" className="mb-4">
            <div className="input-group">
              <span className="input-group-text me-2"><BsEnvelope /></span>
              <Form.Control type="email" placeholder="Enter your email" className="rounded-pill" value={email} onChange={handleEmailChange} />
            </div>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <div className="input-group">
              <span className="input-group-text me-2"><BsLock /></span>
              <Form.Control type="password" placeholder="Enter your password" className="rounded-pill" value={password} onChange={handlePasswordChange} />
            </div>
          </Form.Group>

          <Form.Group controlId="formMobile" className="mb-4">
            <div className="input-group">
              <span className="input-group-text me-2"><BsPhone /></span>
              <Form.Control type="tel" placeholder="Enter your mobile number" className="rounded-pill" value={mobile} onChange={handleMobileChange} />
            </div>
          </Form.Group>

          <Form.Group controlId="formRole" className="mb-4">
            <div className="input-group">
              <span className="input-group-text me-2"><BsPerson /></span>
              <Form.Select className="rounded-pill" value={role} onChange={handleRoleChange}>
                <option value="user">User</option>
                <option value="hospital">Hospital</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Button variant="blood" type="submit" className="w-100 mt-4 rounded-pill btn-hover">Register</Button>
        </Form> 
      </div>
    </Container>
    </div>
  );
};

export default RegistrationForm;
