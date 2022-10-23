import React from 'react'

import DropdownMenu from '../Drop/DropdownMenu';
import ModuleHeaderCart from '../../modules/Cart/ModuleHeaderCart';
import ModuleLike from '../../modules/Cart/ModuleLike';
import ModulePublication from '../../modules/Cart/ModulePublication'
import Navbar from '../../modules/Nav/Navbar';
import NavItem from '../../modules/Nav/NavItem';


const PostItem = (props) => {

  const {post} = props;

  return (
    <>
        <arcticle className="vitrine__bloc">
            <div className="vitrine__bloc__cart">
                <div className="vitrine__bloc__cart__post">
                    <div className="vitrine__bloc__cart__post__logo">
                        <ModuleHeaderCart post={post}/>
                        <Navbar>
                            <NavItem>
                                <DropdownMenu 
                                    post={post} 
                                />
                            </NavItem>
                        </Navbar>
                    </div>
                    <ModulePublication post={post}/>
                </div>               
                <div className="vitrine__bloc__cart__img"><img className="isereImage" src={post.imageUrl} alt="" /></div>
                <ModuleLike post={post}/>
            </div>
        </arcticle>
    </>
  );
}

export default PostItem