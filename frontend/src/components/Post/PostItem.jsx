import React from 'react'

import logoPost from '../../assets/logo-post.png';
import Navbar from '../../modules/Nav/Navbar';
import NavItem from '../../modules/Nav/NavItem';
import DropdownMenu from '../../modules/Drop/DropdownMenu';

// ! TODO simplify this and split it into multiple components/modules
// TODO DropdownMenu should be dumb
const user = JSON.parse(localStorage.getItem("user"));

const PostItem = (props) => {

  const {post} = props;

  async function handleClickSubmitLike() {
    const dataStorage = JSON.parse(localStorage.getItem("user"));
    const token = dataStorage.token
    const userId = dataStorage.userId
    const id = post._id
    const like = {
        like: 1,
        userId: userId
    }
    const unlike = {
        like: 0,
        userId: userId
    }
    const likeStringify = JSON.stringify(like)
    const unlikeStringify = JSON.stringify(unlike)
    if (post.usersLiked.find(user => user === userId)) {
        await fetch(`http://localhost:3001/api/posts/${id}/like`, {
          method: 'post',
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type":"application/json",
            "Accept":'application/json'
          },
          body: unlikeStringify
        })
        .then(response => response.json()) 
        .catch(error => console.error({ message: 'erreur' } )) 
        .then(data => console.log(data))
        window.location.reload() 
    } else {
        await fetch(`http://localhost:3001/api/posts/${id}/like`, {
          method: 'post',
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type":"application/json",
            "Accept":'application/json'
          },
          body: likeStringify
        })
        .then(response => response.json()) 
        .catch(error => console.error({ message: 'erreur' } )) 
        .then(data => console.log(data))
        window.location.reload() 
    }   
  }

  return (
    <>
        <arcticle className="vitrine__bloc">
            <div className="vitrine__bloc__cart">
                <div className="vitrine__bloc__cart__post">
                    <div className="vitrine__bloc__cart__post__logo">
                    <div className="placement">
                        <img src={logoPost} alt="Logo de groupomania(planete fait de trait blanc)"/>
                        <div className='bloc-date-username'>
                            <div className='username'>{user.userName}</div>
                            <div className='date'>{post.date}</div>
                        </div>
                    </div>
                    <Navbar>
                        <NavItem>
                            <DropdownMenu 
                                post={post} 
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
                    <div className="wrapper" onClick={handleClickSubmitLike}>
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