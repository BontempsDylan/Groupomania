import React from 'react'

const NavBarAddPost = (props) => {
  return (
    <nav className="navBar-addPost">
        <ul className="navBar-nav-addPost">{props.children}</ul>
    </nav>
  )
};

export default NavBarAddPost;