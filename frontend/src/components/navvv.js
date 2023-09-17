import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { FaBlog} from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";
import ProfileCard from "./profile";
import { useLocation } from "react-router-dom";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";

function Navv({ isLoggedIn, setisLoggedIn,userType,setUserType }) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showCard, setShowCard] = useState(false);



  
const wrapperRef = useRef(null);

useEffect(() => {
 
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowCard(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);


  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



  const location=useLocation()
 
  const handleCardToggle = () => {
    setShowCard(!showCard);
    updateExpanded(false);
  };


  return (
    <div ref={wrapperRef}>
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={FaBlog} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
         
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/availability"
                isLoggedIn
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> Availability
              </Nav.Link>
            </Nav.Item>

            {userType !== "hospital" && (
  <Nav.Item>
    <Nav.Link
      as={Link}
      to="/donate"
      onClick={() => updateExpanded(false)}
    >
      <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> Donate
    </Nav.Link>
  </Nav.Item>
)}


            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Get Help
              </Nav.Link>
            </Nav.Item>

            {/* <Nav.Item>
              <Nav.Link
                href="https://soumyajitblogs.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <ImBlog style={{ marginBottom: "2px" }} /> 
              </Nav.Link>
            </Nav.Item> */}

<Nav.Item className="fork-btn profile">
              <Button
                onClick={handleCardToggle} // Toggle the card visibility
                className="fork-btn-inner"
              >
                <AiOutlineUser style={{ fontSize: "1.2em" }} /> 
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showCard && <ProfileCard isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn}  />}
    </Navbar>
    </div>
  );
}

export default Navv;

