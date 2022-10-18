import React, { useState } from 'react'

import DropdownMenuAddPost from '../../modules/Nav/DropdownMenuAddPost';
import NavBarAddPost from '../../modules/Nav/NavBarAddPost';
import NavItemTextAddPost from '../../modules/Nav/NavItemTextAddPost copy';
import NavItemPhotoAddPost from '../../modules/Nav/NavItemPhotoAddPost'

const AddPost = () => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePoppup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
        <NavBarAddPost>
            <NavItemTextAddPost handleOpen={togglePoppup}>
              {isOpen && <DropdownMenuAddPost handleClose={togglePoppup}/>}
            </NavItemTextAddPost>
            <NavItemPhotoAddPost handleOpen={togglePoppup} />
        </NavBarAddPost>
    </>
  );
};

export default AddPost;