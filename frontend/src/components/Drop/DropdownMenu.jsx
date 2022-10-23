import React from 'react'
import DropdownMenuItem from './DropdownMenuItem';

function DropdownMenu(props) {

  const {post} = props;
  const userId = JSON.parse(localStorage.getItem("userId"))
  
  if (userId === post.userId) {
    return (
      <div className='dropdown' >
        <DropdownMenuItem post={post} />
      </div>
    )
  }
}

export default DropdownMenu;