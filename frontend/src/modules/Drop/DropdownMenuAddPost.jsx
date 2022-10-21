import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as Retour } from '../../assets/retour.svg';

function DropdownMenuAddPost(props) {
    const [ activeMenu, setActiveMenu ] = useState('main');
    const [ publication, setPublication ]  = useState("");
    const [ user, setUser ] = useState([]);
    const [ file, setFile ]  = useState(null);
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const id = userLocalStorage.userId
    const token = userLocalStorage.token
    const combined = {
      publication: publication,
      userId: userLocalStorage.userId,
      userName:  user.nom+" "+ user.prenom
    }
    const dataPost = JSON.stringify(combined)

    useEffect(() => {
        fetch(`http://localhost:3001/api/auth/users/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                setUser(result);
                },
            )
    },[])

    

    async function handleSubmitPosttRequest() {

        const formData = new FormData();
        formData.append("post", dataPost);
        formData.append("image", file);
        
        await fetch(`http://localhost:3001/api/posts`, {
          method: 'POST',
          headers: {
            "Authorization": "Bearer " + token,
          },
          body: formData
        })
        .then(response => response.json()) 
        .catch(error => console.error({ message: 'erreur' } )) 
        .then(data => console.log(data))
        window.location.reload()  
        
    }

    function DropdownItemAddPost(props) {
        return (
        <button className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
        </button>
        )
    }
    
    return (
        <div className='dropdownAddPost'>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary-addPost"
                unmountOnExit
                /* onEnter={calcHeight} */>
                <div className='menuAddPost'>
                    <DropdownItemAddPost leftIcon={<Retour />}>
                        <h2 onClick={props.handleClose} >Retour</h2>
                    </DropdownItemAddPost>
                    <div className='bloc-input'>
                        <textarea type="text" className='input-post' placeholder="Exprimez-vous..." style={{height: 120}} value={publication} onChange={(e) => setPublication(e.target.value)}></textarea>
                        <div className='conteneur-input'>
                            <label for="input-file"><i className="fas fa-images" /></label>
                            <input type="file" accept="image/*" className='input-file' id='input-file' onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setFile(e.target.files[0]);
                            }
                            }}></input>
                            <div className='display-image' placeholder=''>{/* {fileName} */}</div>
                        </div>
                        <div className='bloc-button-addPost'>
                            <button className='publier' onClick={handleSubmitPosttRequest}>Publier</button>
                        </div>
                    </div>
                </div> 
            </CSSTransition>
        </div>
    )   
}
export default DropdownMenuAddPost;