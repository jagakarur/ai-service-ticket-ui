import React from "react";
import logo from './cgi-logo.png';
import {Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

const NavbarClass = (props) => {
 // const { location } = props;  //add this
  return (
    <>
      <Container fluid="md m-2">
        <Row>
          <Col>      
            {/* <Figure>
  <Figure.Image
    width={125}
    height={130}
    alt="CGI"
    src={logo}
  /> */}
            {/* <Figure.Caption>
    Nulla vitae elit libero, a pharetra augue mollis interdum.
  </Figure.Caption> */}
            {/* </Figure> */}
            <Navbar collapseOnSelect bg="light" expand="lg">
              <Container>
                <Navbar.Brand>
                  <img
                    alt=""
                    src={logo}
                    width="60"
                    height="30"
                    className="d-inline-block align-left"
                  />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav activeKey={props.pathname} variant="pills">
                    <Nav.Item>
                      <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/about">About</Nav.Link>
                    </Nav.Item>
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
                  </Nav>
                  {/* <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav> */}
                </Navbar.Collapse>
              </Container>
            </Navbar>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavbarClass;