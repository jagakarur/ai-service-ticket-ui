import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to="/" activestyle>
            Home
          </NavLink>
          <NavLink to="/Transactional" activestyle>
          Transformer
          </NavLink>
          <NavLink to="/about" activestyle>
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