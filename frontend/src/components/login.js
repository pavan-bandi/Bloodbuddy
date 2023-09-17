import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { BsEnvelope, BsLock } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';



import axios from 'axios';

const LoginForm = ({ isLoggedIn, setisLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const Navigate= useNavigate();
  const location = useLocation();
var from;

 if (location.state){
   from = location.state.from}

  const redirect = from?from:'/'
  console.log(redirect)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    
      const response=await axios.post("http://localhost:8080/login",{email,password,userType});
      const  token  = response.data.accessToken;
     
      
      localStorage.setItem('token', token);
      localStorage.setItem("expiresIn",Date.now()+60*60*10**3)
 
      
      setisLoggedIn(true)

 
      Navigate(redirect, { j: { isLoggedIn:isLoggedIn, setisLoggedIn:setisLoggedIn } });

;
    }
    catch(error){
      console.error(error);
    }

    };

  return (
    <div>
     
    
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: '400px', marginTop: '150px' }}>
        <Form
          className="p-4 border rounded shadow bg-light"
          onSubmit={handleSubmit}
          style={{
            background:
              'linear-gradient(180deg, rgba(169, 198, 217, 1) 15%, rgba(242, 167, 75, 1) 90%)',
            boxShadow: '0.2px 12px 18px rgba(131, 153, 167, 0.6)',
          }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <Form.Group controlId="formEmail" className="mb-4">
            <div className="input-group">
              <span className="input-group-text me-2">
                <BsEnvelope />
              </span>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="rounded-pill"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <div className="input-group">
              <span className="input-group-text me-2">
                <BsLock />
              </span>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="rounded-pill"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formUserType" className="mb-4">
            <div className="input-group">
              <span className="input-group-text me-2">
                User Type
              </span>
              <Form.Select
                className="rounded-pill"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="user">User</option>
                <option value="hospital">Hospital</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Button
            variant="blood"
            type="submit"
            className="w-100 mt-4 rounded-pill btn-hover"
          >
            Login
          </Button>
        </Form>
      </div>
    </Container>
    </div>
  );
};

export default LoginForm;
