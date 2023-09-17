import React from "react";
import { Container, Media, Row, Col } from "reactstrap";
import Binoculars from '../Assets/binoculars.png'
import target from '../Assets/target.png'
import goal from '../Assets/goal.png'

const About = (props) => {
  return (
    <div>

      <Container fluid>
        <h1 className="display-5">About Us</h1>
      </Container>
      <hr width="250px" className="header-line" />

      <div className="row row-content text-center col-md-10">
        <p
          style={{
            fontFamily: "Times New Roman",
            fontSize: "20px"
          }}
        >
          Have you at any time witnessed a relative of yours or a close friend searching frantically for a blood donor when blood banks say out of stock, the donors in mind are out of reach, and the time keeps ticking? Have you witnessed the loss of life for the only reason that a donor was not available at the most needed hour? Is it something that we as a society can do nothing to prevent? This thought laid our foundation. <br />
          Through this website, we seek donors who are willing to donate blood, as well as provide the timeliest support to those in frantic need of it.
        </p>
      </div>

      <Row style={{ backgroundColor: "#ccccb3" }}>
        <Col md={4} className="text-center">
          <Media left middle>
            <Media object src={Binoculars} alt="Our Vision" />
          </Media>
        </Col>
        <Col md={8} className="text-center">
          <h1>Our Vision</h1>
          <p className="about-text">
            Bringing Dignity to Life of people by making Quality blood and blood products available when needed.
          </p>
          <p className="about-text">
            Provide a global platform to celebrate and thank individuals who donate blood voluntarily, for altruistic reasons and without any monetary reward.
          </p>
        </Col>
      </Row>

      <hr className="about-line" />

      <Row style={{ backgroundColor: "#ccccb3" }}>
        <Col md={8} className="text-center">
          <h1>Our Goal</h1>
          <p className="about-text">
            This website aims at maintaining all the information pertaining to blood donors, different blood groups and help receivers manage in a better way.
          </p>
          <p className="about-text">
            To provide transparency in this field, make the process of obtaining blood which is hassle-free and corruption-free and make the system of blood donating and receiving effective.
          </p>
        </Col>
        <Col md={4} className="text-center">
          <Media right middle>
            <Media object src={goal} alt="Our Goal" />
          </Media>
        </Col>
      </Row>

      <hr className="about-line" />

      <Row style={{ backgroundColor: "#ccccb3" }}>
        <Col md={4} className="text-center">
          <Media left middle>
            <Media object src={target} alt="Our Mission" />
          </Media>
        </Col>
        <Col md={8} className="text-center">
          <h1>Our Mission</h1>
          <p className="about-text">
            To make blood donation 100% voluntary without any replacement donor by building individual or institutional alliances.
          </p>
          <p className="about-text">
            Provide a global platform to celebrate and thank individuals who donate blood voluntarily, for altruistic reasons and without any monetary reward.
          </p>
        </Col>
      </Row>

      <br />
    </div>
  );
};

export default About;
