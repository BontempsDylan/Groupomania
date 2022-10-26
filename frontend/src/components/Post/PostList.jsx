import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../Interceptors/axios';
import background from '../../assets/73-1024x512_texte3.jpg';
import AddPost from './AddPost';
import PostItem from './PostItem';

function PostList() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  
  const userId = JSON.parse(localStorage.getItem("userId"))
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const dataStorageAccessToken = localStorageData ? localStorageData.accessToken : false;
  const dataStorageRefreshToken = localStorageData.refreshToken ? localStorageData.refreshToken : false;
  const accessToken = localStorageData ? dataStorageAccessToken.token : false;
  const refreshToken = localStorageData.refreshToken ? dataStorageRefreshToken.token : false;
  
  const navigate = useNavigate();

  /*
   * Objectif => on envoi une request pour récupérer la valeur de admin.
  */

  useEffect(() => {
    axios.get(`/auth/users/${userId}`)
        .then(
            (result) => {
              localStorage.setItem("admin", JSON.stringify(result.data.admin));
            },
        )   
  },[])

  /*
   * Objectif => on envoi une request pour récupérer les données Post de la BDD.
  */

  useEffect(() => {
    // si il n'a pas accessToken on supprime la clé user du localStorage
    if(!accessToken) {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      axios.get("/posts", 
        axios.defaults.headers.common['Authorization'] = `bearer ${accessToken}`,
        )
      .then(
        (result) => {
          setIsLoaded(true);
          const resultPost = result.data
          const sorted = resultPost.map(post => {
            post.date = new Date(post.date);
            return post;
          }).sort((post1, post2) => post2.date - post1.date);
          setPosts(sorted);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          return error
        }
      ); 
    }
    axios.interceptors.response.use((response) => {
      return response;
    }, async (error) => {
      const originalRequest = error.config;
      if (error.config.url != '/auth/refreshToken' && error.response.status === 401 && originalRequest._retry !== true) {
        originalRequest._retry = true;
        if (refreshToken && refreshToken !== '') {
          axios.defaults.headers.common['Authorization'] = `bearer ${refreshToken}`
          console.log('refresh token');
          await axios.post("/auth/refreshToken").then((response) => {
            const accessTokenRefreshed = response.data
            localStorage.setItem("user", JSON.stringify(accessTokenRefreshed));
            window.location.reload()
          }).catch((error) => {
            console.log(error.response.status);
          });
        }
      }
    });
  }, []);
    
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="blocPostList">
        <div className="bloc_image" >
          <div className='positionOmbre'>
            <img src={background} className="background-image" alt="Tasse de café sur une table en bois."/>
            <div className="ombre"></div>
            <div className="ombre-top"></div>
            <div className="ombre-right"></div>
            <div className="ombre-left"></div>
          </div>
        </div>
        <AddPost />
        <div className="vitrine">
          {posts.map(post => <PostItem key={post._id} post={post}/>)}
        </div>
      </div>
    );
  }

}

export default PostList;