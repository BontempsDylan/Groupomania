import { useEffect, useState} from "react";
import background from '../assets/73-1024x512.jpg';

function PostList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setposts] = useState([]);
  
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
     
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="blocPostList">
          <div className="background-image" style={{ backgroundImage: `url(${background})`}}></div>
          <div className="blocExprime">
            <div className="blocExprime__2">
              <div className="blocExprime__2__bloc">
                <div className="blocExprime__2__bloc__2">
                  <span className="blocExprime__2__bloc__2__texte">Exprimez-vous.</span>
                </div>
              </div>
              <div className="blocExprime__2__placement">
                <div className="blocExprime__2__placement__2">
                  <div role="button" className="blocExprime__2__placement__2__btn">
                    <div className="blocExprime__2__placement__2__btn__bloc">
                      <span className="blocExprime__2__placement__2__btn__bloc__icone"><i></i></span>
                      <span className="blocExprime__2__placement__2__btn__bloc__2">
                        <span className="blocExprime__2__placement__2__btn__bloc__2__texte">Photo</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="blocCart">
            {posts.map(post => (
              <li className="blocCart__cart" key={post._id}>
                <img src={post.imageUrl} alt="" className="blocCart__cart__img"/>
                <div className="blocCart__cart">
                  <div className="blocCart__cart__post">
                      <p></p>
                      <p>{post.publication}</p>
                      <div className="blocCart__cart__post__like">
                          <i className="far fa-heart base-icon"></i>
                          <i className="fas fa-heart color-icon"></i>
                          <p>{post.likes}</p>
                      </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  export default PostList;