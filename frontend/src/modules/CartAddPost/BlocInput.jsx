import React, { useEffect, useState } from 'react'

import axios from '../../Interceptors/axios';

const BlocInput = () => {
    const [ publication, setPublication ]  = useState("");
    const [ user, setUser ] = useState([]);
    const [ file, setFile ]  = useState(null);
    const userId = JSON.parse(localStorage.getItem("userId"))
    const dataStorageUser = JSON.parse(localStorage.getItem("user"));
    const dataStorageAccessToken = dataStorageUser.accessToken
    const token = dataStorageAccessToken.token

    useEffect(() => {
        axios.get(`/auth/users/${userId}`)
            .then(
                (result) => {
                setUser(result);
                },
            )
    },[])

    async function handleSubmitPosttRequest() {
        const combined = {
            publication: publication,
            userId: userId,
            nom: user.data.nom,
            prenom: user.data.prenom 
        }

        const dataPost = JSON.stringify(combined)

        const formData = await new FormData();
        await formData.append("post", dataPost);
        await formData.append("image", file);
        
        await axios.post(`/posts`, formData, {
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
        <textarea type="text" className='input-post' placeholder="Exprimez-vous..." style={{height: 120}} value={publication} onChange={(e) => setPublication(e.target.value)}></textarea>
        <div className='conteneur-input'>
            <label for="input-file"><i className="fas fa-images" /></label>
            <input type="file" accept="image/*" className='input-file' id='input-file' onChange={(e) => {
            if (e.target.files.length > 0) {
                setFile(e.target.files[0]);
            }
            }}></input>
            <div className='display-image' placeholder=''>{fileName()}</div>
        </div>
        <div className='bloc-button-addPost'>
            <button className='publier' onClick={handleSubmitPosttRequest}>Publier</button>
        </div>
    </div>
  )
}

export default BlocInput