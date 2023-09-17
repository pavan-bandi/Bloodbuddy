
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Video from '../Assets/homevideo2.mp4'

import ProfileCard from './profile';
import Navv from './navvv';
import HomeData from './Homedata';


const HomePage = ({isLoggedIn,setIsLoggedIn}) => {
  console.log(isLoggedIn)
  return (
    <div>

    <Container fluid className="vh-100">
     
  
      <Row className="h-100">
       
        <Col className="d-flex align-items-center justify-content-center">
          <video
            src={Video}
            autoPlay
            muted
            loop
            className="w-100 h-100"
          />
         
        </Col>
      </Row>
    </Container>
    <HomeData/>
    </div>
  );
};

export default HomePage;
