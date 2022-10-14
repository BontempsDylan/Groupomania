import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import background from '../../assets/73-1024x512_texte3.jpg';
import AddPost from './AddPost';
import PostItem from './PostItem';

function PostList() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setposts] = useState([]);

  const navigate = useNavigate();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : false;
    if (!token) {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      fetch("http://localhost:3001/api/posts", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setposts(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      ); 
    }
  }, []);
    
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="blocPostList">
        <div className="bloc_image" ><img src={background} className="background-image" alt="Tasse de café sur une table en bois."/><div className="ombre"></div></div>
        <div className="ombre"></div>
        <AddPost/>
        <div className="vitrine">
          {posts.map(post => <PostItem key={post._id} post={post}/>)}
        </div>
      </div>
    );
  }

}

export default PostList;