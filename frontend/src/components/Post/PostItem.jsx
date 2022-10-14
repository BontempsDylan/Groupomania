import React from 'react'

import logoPost from '../../assets/logo-post.png';
import Navbar from '../../modules/Nav/Navbar';
import NavItem from '../../modules/Nav/NavItem';
import DropdownMenu from '../../modules/Nav/DropdownMenu';

// ! TODO simplify this and split it into multiple components/modules
// TODO DropdownMenu should be dumb


const PostItem = (props) => {

  const {post} = props;

//   const myFunc = () => {
//     console.log("I am called from the parent");
//   };

  return (
    <>
        <arcticle className="vitrine__bloc">
            <div className="vitrine__bloc__cart">
                <div className="vitrine__bloc__cart__post">
                    <div className="vitrine__bloc__cart__post__logo">
                    <div className="placement">
                        <img src={logoPost} alt="Logo de groupomania(planete fait de trait blanc)"/>
                    </div>
                    <Navbar>
                        <NavItem>
                            <DropdownMenu 
                                post={post} 
                                // myFunc={myFunc}
                            />
                        </NavItem>
                    </Navbar>
                    </div>
                    <div className="vitrine__bloc__cart__post__bloc">
                    <div className="vitrine__bloc__cart__post__bloc__text">
                        <p>{post.publication}</p>
                    </div>
                    </div>
                </div>               
                <div className="vitrine__bloc__cart__img"><img className="isereImage" src={post.imageUrl} alt="" /></div>
                <div className="vitrine__bloc__cart__like">
                    <div className="vitrine__bloc__cart__like__center">
                    <div className="wrapper">
                        <i className="far fa-heart base-icon"></i>
                        <i className="fas fa-heart color-icon"></i>
                    </div>
                    <p>{post.likes}</p>
                    </div>
                    <div></div>
                </div>
            </div>
        </arcticle>
    </>
  );
}

export default PostItem