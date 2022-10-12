import { useEffect, useState } from "react";
import background from '../assets/73-1024x512_texte3.jpg';
import logoPost from '../assets/logo-post.png'

function PostList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setposts] = useState([]);
    const [users, setusers] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      fetch("http://localhost:3001/api/posts", {
        method: 'GET',
        headers: {
          // TODO use a dynamic token from local storage
          "Authorization": "Bearer" + " " + token,
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setposts(result);
          setusers(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )      
    }, []);

    console.log(users);
     
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="blocPostList">
          <div className="bloc_image"><img src={background} className="background-image" alt="Tasse de café sur une table en bois."/><div className="ombre"></div></div>
          <div className="ombre"></div>
          <div className="blocExprime">
            <div className="blocExprime__2">
              <div className="blocExprime__2__bloc">
                <div className="blocExprime__2__bloc__center">
                  <div className="blocExprime__2__bloc__center__form">
                    <span className="blocExprime__2__bloc__center__form__texte">Exprimez-vous.</span>
                  </div>
                </div>
              </div>
              <div className="blocExprime__2__placement">
                <div className="blocExprime__2__placement__2">
                  <div role="button" className="blocExprime__2__placement__2__btn">
                    <div className="blocExprime__2__placement__2__btn__bloc">
                      <span className="blocExprime__2__placement__2__btn__bloc__icone"><i className="fas fa-images"></i></span>
                      <span className="blocExprime__2__placement__2__btn__bloc__2">
                        <span className="blocExprime__2__placement__2__btn__bloc__2__texte">Photo</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="vitrine">
            {posts.map(post => (
              <ul className="vitrine__bloc">
                <li className="vitrine__bloc__cart" key={post._id}>
                  <div className="vitrine__bloc__cart__post">
                    <div className="vitrine__bloc__cart__post__logo">
                      <div className="placement">
                        <img src={logoPost} alt=""/>
                      </div>
                      {users.map(user => (
                        <div>
                          <div>{user.name}</div>
                        </div>
                      ))}
                    </div>
                    <div className="vitrine__bloc__cart__post__bloc">
                      <div className="vitrine__bloc__cart__post__bloc__text">
                        <p>{post.publication}</p>
                      </div>
                    </div>
                  </div>               
                  <div className="vitrine__bloc__cart__img"><img className="isereImage" src={post.imageUrl} alt=""/></div>
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
                </li>
              </ul>
            ))}
          </div>
        </div>
      );
    }
  }

  export default PostList;