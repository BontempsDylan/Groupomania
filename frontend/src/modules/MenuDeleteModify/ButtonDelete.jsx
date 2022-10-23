import React from 'react'

import axios from '../../Interceptors/axios';

const ButtonDelete = (props) => {
    const {post} = props
    const dataStorage = JSON.parse(localStorage.getItem("user"));
    const dataStorageAccessToken = dataStorage.accessToken
    const token = dataStorageAccessToken.token
    const postId = post._id

    async function handleSubmitDelRequest() {
        await axios.delete(`/posts/${postId}`)
          .then(data => console.log(data))
            .catch(error => console.error({ message: 'erreur' } )) 
            axios.defaults.headers.common['Authorization'] = `bearer ${token}`
            window.location.reload() 
    }

    return (
        <button 
            className='delete-post' 
            onClick={handleSubmitDelRequest}>
            Supprimer
        </button>
    )
}

export default ButtonDelete