import React from 'react'

const Navbar = (props) => {
  return (
    <nav className="navbar">
        <ul className="navbar_nav">{props.children}</ul>
    </nav>
  )
};

export default Navbar;