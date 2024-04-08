import React from 'react';
import './LandingNav.css';
import {Container, Nav, NavLink, Navbar } from 'react-bootstrap';

const LandingNav = () => {
  return (
    <Navbar className='login-navbar' collapseOnSelect expand="lg" bg="light" variant="light" sticky='top'>
        <Container>
            <Navbar.Brand href="#home">
                <img src="ayoola_blue.png" alt="Ayoola Logo" style={{height: 45}}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav className='nav-links ml-auto'>
                    <Nav.Link as={NavLink} activeClassName="active" href="#about-us">About Us</Nav.Link>
                    <Nav.Link as={NavLink} activeClassName="active" href="#services">Services</Nav.Link>
                    <Nav.Link as={NavLink} activeClassName="active" href="#customer-care">Customer Care</Nav.Link>
                    <a className="nav-link" href="/login">
                        <button className='btn btn-primary exp-btn-primary'>Sign In</button>
                    </a>
                    <a className="nav-link" href="/signup">
                        <button className='btn btn-primary exp-btn-primary'>Sign Up</button>
                    </a>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default LandingNav
