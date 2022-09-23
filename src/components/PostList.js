import { useEffect, useState} from "react";

function PostList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setposts] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("http://localhost:3000/api/posts")
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
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul className="blocCart">
          {posts.map(post => (
            <li className="blocCart__cart" key={post.id}>
              <div>{post.imageUrl}</div>
              <div>
                <div className="blocCart__cart__post">
                    <p></p>
                    <p>{post.publication}</p>
                    <div class="blocCart__cart__post__like">
                        <i class="far fa-heart base-icon"></i>
                        <i class="fas fa-heart color-icon"></i>
                        <p>{post.like}</p>
                    </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  }

  export default PostList;