import React from 'react';

const NavItemTextAddPost = (props) => {
    
    // eslint-disable-next-line
    return (
      <>
        <li className='navItem-addPost'>
          <div className="navItem-addPost__center" onClick={props.handleOpen}>
            <div className='navItem-addPost__center__liner'>
              <div className="navItem-addPost__center__liner__form">
                  <span className="navItem-addPost__center__liner__form__texte">Exprimez-vous.</span>
              </div>
            </div>
          </div>
          {props.handleOpen && props.children}
        </li>
      </>
    );
};

export default NavItemTextAddPost;