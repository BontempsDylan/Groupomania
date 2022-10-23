import React from 'react'

import DropdownAddPostItem from './DropdownAddPostItem';


function DropdownMenuAddPost(props) {

    const { handleClose } = props
    
    return (
        <div className='dropdownAddPost'>
            <DropdownAddPostItem handleClose={handleClose}/>
        </div>
    )   
}
export default DropdownMenuAddPost;