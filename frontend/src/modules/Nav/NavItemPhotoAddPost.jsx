import React from 'react';

const NavItemPhotoAddPost = (props) => {
    // eslint-disable-next-line
    return (
      <>
        <li className='navItem-addPost'>
          <div className="navItem-addPost__placement">
              <div role="button" className="navItem-addPost-btn" onClick={props.handleOpen}>
                <div className="navItem-addPost-btn__bloc">
                  <span className="navItem-addPost-btn__bloc__icone"><i className="fas fa-images"></i></span>
                  <span className="navItem-addPost-texte">
                      <span className="navItem-addPost-texte__photo">Photo</span>
                  </span>
                </div>
              </div>
          </div>
          {props.handleOpen && props.children}
        </li>
      </>
    );
};

export default NavItemPhotoAddPost;