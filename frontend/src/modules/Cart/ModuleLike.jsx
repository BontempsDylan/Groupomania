import React from 'react'

import axios from '../../Interceptors/axios'



const ModuleLike = (props) => {

    const {post} = props;

    

    async function handleClickSubmitLike() {
        
        const dataStorage = JSON.parse(localStorage.getItem("user"));
        const dataStorageAccessToken = dataStorage.accessToken
        const userId = dataStorageAccessToken.userId
        const token = dataStorageAccessToken.token
        const id = post._id

        if (post.usersLiked.find(user => user == userId)) {
            console.log('je suis la');
            await axios.post(`/posts/${id}/like`, {
                like: 0, userId
            })
            .then((response) => {
                console.log(response)})
            .catch(error => console.error({ message: 'erreur' } ))
            axios.defaults.headers.common['Authorization'] = `bearer ${token}` 
            window.location.reload()     
        } else {
            console.log('ou bien la');
            await axios.post(`/posts/${id}/like`, {
                like: 1, userId: userId
            })
            .then(data => console.log(data))
            .catch(error => console.error({ message: 'erreur' } ))
            axios.defaults.headers.common['Authorization'] = `bearer ${token}` 
            window.location.reload()     
        }   
    }

  return (
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
  )
}

export default ModuleLike