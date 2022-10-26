import React from 'react'

import axios from '../../Interceptors/axios'

const ModuleLike = (props) => {

    const {post} = props;

    /*
     * Objectif => au click récupération les données du body pour les envoyers au back pour like ou unlike.
    */

    async function handleClickSubmitLike() {
        
        const dataStorage = JSON.parse(localStorage.getItem("user"));
        const dataStorageAccessToken = dataStorage.accessToken
        // on récupére le userId et token
        const userId = dataStorageAccessToken.userId
        const token = dataStorageAccessToken.token
        // on récupére l'id du post
        const id = post._id

        // on vérifie si le userId a déja like, si c'est le cas on unlike
        if (post.usersLiked.find(user => user == userId)) {
            await axios.post(`/posts/${id}/like`, {
                like: 0, userId
            })
            .then((response) => {
                console.log(response)})
            .catch(error => console.error({ message: 'erreur' } ))
            axios.defaults.headers.common['Authorization'] = `bearer ${token}` 
            window.location.reload()  
        // si le userId n'a pas like on like   
        } else {
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