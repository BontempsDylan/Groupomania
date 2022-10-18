import React, {useState, useRef, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as Supprimer } from '../../assets/supprimer.svg';
import { ReactComponent as Modifier } from '../../assets/modifier.svg';
import { ReactComponent as Retour } from '../../assets/retour.svg';

function DropdownMenu(props) {

    const {post} = props;

    const [ activeMenu, setActiveMenu ] = useState('main');
    const [ menuHeight, setMenuHeight ] = useState(null);
    const [ publication, setPublication ]  = useState("");
    const [ file, setFile ]  = useState(null);
    const dropdownRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token
    const id = post._id
    const combined = {
      publication: publication,
      userId: user.userId
    }
    const dataPost = JSON.stringify(combined)
    

    async function handleSubmitPutRequest() {

      const formData = new FormData();
      formData.append("post", dataPost);
      formData.append("image", file);
      
      
      
      await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'PUT',
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
    
    async function handleSubmitDelRequest() {
      await fetch(`http://localhost:3001/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type":"application/json",
            "Accept":'application/json'
          },
        })
        .then(response => response.json()) 
        .catch(error => console.error({ message: 'erreur' } )) 
        .then(data => console.log(data))
        window.location.reload()
    }

    


    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }

    function DropdownItem(props) {
      return (
        <button className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </button>
      )
    }

    return (
      <div className='dropdown' ref={ dropdownRef }>
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className='menu'>
            <DropdownItem leftIcon={<Supprimer />}><button className='delete-post' onClick={handleSubmitDelRequest}>Supprimer</button></DropdownItem>
            <DropdownItem 
              leftIcon={<Modifier />}
              rightIcon={<Modifier />}
              goToMenu="modifier">
              Modifier
            </DropdownItem>

          </div> 
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "modifier"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className='menu-modifier'>
            <DropdownItem goToMenu="main" leftIcon={<Retour />}>
              <h2>Retour</h2>
            </DropdownItem>
            <div className='bloc-input'>
              <textarea type="text" className='input-post' placeholder={post.publication}  value={publication} onChange={(e) => setPublication(e.target.value)}></textarea>
              <div className='conteneur-input'>
                <label for="input-file"><i className="fas fa-images" /></label>
                <input type="file" accept="image/*" className='input-file' onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}></input>
                <div className='display-image' placeholder=''>{/* {fileName} */}</div>
              </div>
              <div className='bloc-button-modifier'>
                <button className='modifier-post' onClick={handleSubmitPutRequest}>Modifier la publication</button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
}

export default DropdownMenu;