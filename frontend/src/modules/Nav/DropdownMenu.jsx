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

    async function handleSubmitPutRequest() {

    // TODO if local state variable `file` is not null use formData like in the example below
    // TODO do not forget to use multipart/form-data in the fetch request
    // TODO body is not supposed to be stringified => body: formData
    // const formData = new FormData();
    // formData.append("publication", publication);
    // // HTML file input, chosen by user
    // formData.append("image", file);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    // console.warn(publication, file);
    // let item = {publication, file};
    let item = {publication};
    const id = post._id
    await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'PUT',
        headers:{
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });
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
      <div className='dropdown' style={{ height: menuHeight }} ref={ dropdownRef }>

        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className='menu'>
            <DropdownItem leftIcon={<Supprimer />}>Supprimer</DropdownItem>
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
              <input type="text" className='input-post' placeholder='Modifier votre publication.' style={{height: 120}} value={publication} onChange={(e) => setPublication(e.target.value)}></input>
              <div className='input-file' style={{height: 30}}>
                <input type="file" accept="image/*" className='file' onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}></input>
              </div>
              <div className='bloc-button-modifier' style={{height: 60}}>
                <button className='modifier-post' onClick={handleSubmitPutRequest}>Modifier la publication</button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
}

export default DropdownMenu;