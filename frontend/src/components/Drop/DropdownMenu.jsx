import React from 'react'
import DropdownMenuItem from './DropdownMenuItem';

function DropdownMenu(props) {

  const {post} = props;
  const dataStorage = JSON.parse(localStorage.getItem("user"));
  const dataStorageAccessToken = dataStorage.accessToken
  const userId = dataStorageAccessToken.userId
  
  if (userId === post.userId) {
    return (
      <div className='dropdown' >
        <DropdownMenuItem post={post} />
      </div>
    )
  }
}

export default DropdownMenu;