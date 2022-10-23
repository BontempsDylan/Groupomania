import React from 'react'

const ModulePublication = (props) => {

    const {post} = props;

  return (
    <div className="vitrine__bloc__cart__post__bloc">
        <div className="vitrine__bloc__cart__post__bloc__text">
            <p>{post.publication}</p>
        </div>
    </div>
  )
}

export default ModulePublication