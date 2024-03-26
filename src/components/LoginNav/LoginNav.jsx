import React, { useState } from 'react';
import './LoginNav.css';
import AddExpenseModal from '../AddExpenseModal/AddExpenseModal';
import AddIncomeModal from '../AddIncomeModal/AddIncomeModal';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import AddExpenseOCR from '../AddExpenseOCR/AddExpenseOCR';

const LoginNav = (props) => {
  const nav=useNavigate();

  const reload = () => {
    props.dashReload();
  }

  const handleLogout = () =>{
    sessionStorage.clear();
    nav("/login");
  }

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
            <Nav.Link as={NavLink} activeClassName="active" to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} activeClassName="active" to="/insights">Insights</Nav.Link>
            <AddExpenseOCR />
            <AddExpenseModal reload={reload} />
            <AddIncomeModal reload={reload} />
            <NavDropdown title={sessionStorage.getItem("name")} id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile & Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#profile">
              <img
                src="profileimage.svg"
                width="30"
                height="30"
                className="d-inline-block align-top rounded-circle"
                alt="Profile"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LoginNav;