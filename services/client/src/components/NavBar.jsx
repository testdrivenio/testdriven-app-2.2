import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = (props) => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <span>{props.title}</span>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/">
          <NavItem eventKey={1}>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/about">
          <NavItem eventKey={2}>About</NavItem>
        </LinkContainer>
        {props.isAuthenticated &&
          <LinkContainer to="/status">
            <NavItem eventKey={3}>User Status</NavItem>
          </LinkContainer>
        }
      </Nav>
      <Nav pullRight>
        {!props.isAuthenticated &&
          <LinkContainer to="/register">
            <NavItem eventKey={1}>Register</NavItem>
          </LinkContainer>
        }
        {!props.isAuthenticated &&
          <LinkContainer to="/login">
            <NavItem eventKey={2}>Log In</NavItem>
          </LinkContainer>
        }
        {props.isAuthenticated &&
          <LinkContainer to="/logout">
            <NavItem eventKey={3}>Log Out</NavItem>
          </LinkContainer>
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar;
