import React, { useState } from 'react'

import axios from '../../Interceptors/axios'

const MenuModify = (props) => {
    const {post} = props
    const [ publication, setPublication ]  = useState(`${post.publication}`);
    const [ file, setFile ]  = useState(null);
    const dataStorage = JSON.parse(localStorage.getItem("user"));
    const dataStorageAccessToken = dataStorage.accessToken
    const token = dataStorageAccessToken.token
    const userId = dataStorageAccessToken.userId
    const id = post._id

    async function handleSubmitPutRequest() {

        const combined = {
            publication: publication,
            userId: userId
          }
        const dataPost = JSON.stringify(combined)

        const formData = new FormData();
        formData.append("post", dataPost);
        formData.append("image", file);

        await axios.put(`/posts/${id}`, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            },
        })
        .then(data => console.log(data))
        .catch(error => console.error({ message: 'erreur' } )) 
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`
        window.location.reload()   
    }

    function fileName() {
        if (file !== null) {
            return (
                file.name
            )
        }
    }

    return (
        <div className='bloc-input'>
            <textarea type="text" className='input-post' value={publication.value} onChange={(e) => setPublication(e.target.value)}>{post.publication}</textarea>
            <div className='conteneur-input'>
                <label for="file"><i className="fas fa-images" /></label>
                <input type="file" accept="image/*" className='input-file' id='file' onChange={(e) => {
                    if (e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                    }
                }}></input>
                <div className='display-image' placeholder=''>{fileName()}</div>
            </div>
            <div className='bloc-button-modifier'>
                <button className='modifier-post' onClick={handleSubmitPutRequest}>Modifier la publication</button>
            </div>
        </div>
    )
}

export default MenuModify