import React from 'react'

import DropdownMenuItem from './DropdownMenuItem';

const DropdownMenu = (props) => {

  const {post} = props;
  const userId = JSON.parse(localStorage.getItem("userId"))
  const admin = JSON.parse(localStorage.getItem("admin"))
  
  if (userId === post.userId || admin === "true") {
    return (
      <div className='dropdown' >
        <DropdownMenuItem post={post} />
      </div>
    )
  }
}

export default DropdownMenu;