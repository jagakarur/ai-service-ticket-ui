import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/Transactional" activeStyle>
           Transactional
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          {/* <NavLink to="/clock" activeStyle>
            clock
          </NavLink> */}
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;