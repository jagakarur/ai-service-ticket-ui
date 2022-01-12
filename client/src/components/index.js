import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
import logo from './cgi-logo.png';
import {Figure, Container, Row, Col} from 'react-bootstrap';
  
const Navbar = () => {


  // const imageSize = {
  //   width: '20px',
  //   height: '20px'
  //   //backgroundImage: 'url(' + imgUrl + ')',
  // };

  return (
    <>
     <Container fluid="md m-2">
                    <Row>
                        <Col>
    {/* <img src={logo} alt="Logo" style="width:500px;height:600px;"/>; */}
    <Figure>
  <Figure.Image
    width={125}
    height={130}
    alt="CGI"
    src={logo}
  />
  {/* <Figure.Caption>
    Nulla vitae elit libero, a pharetra augue mollis interdum.
  </Figure.Caption> */}
</Figure>
      <Nav>
  
     
        <NavMenu>
          
        {/* <NavLink to="/" activestyle>
            Home
          </NavLink> */}
          <NavLink to="/" activestyle>
          BERT Text Classify
          </NavLink>
          <NavLink to="/about" activestyle>
            About
          </NavLink>
          {/* <NavLink to="/clock" activeStyle>
            clock
          </NavLink> */}
        </NavMenu>
      </Nav>
      </Col>
      </Row>
      </Container>
    </>
  );
};
  
export default Navbar;