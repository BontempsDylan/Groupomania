import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as Supprimer } from '../assets/supprimer.svg';
import { ReactComponent as Modifier } from '../assets/modifier.svg';
import { ReactComponent as Menu } from '../assets/menu.svg';
import { ReactComponent as Retour } from '../assets/retour.svg';
/* import { Navbar, NavItem, DropdownMenu } from './DropDownPost' */
/* import { useNavigate } from 'react-router-dom' */
import background from '../assets/73-1024x512_texte3.jpg';
import logoPost from '../assets/logo-post.png'

function PostList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setposts] = useState([]);

  /* const navigate = useNavigate(); */

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    fetch("http://localhost:3001/api/posts", {
    method: 'GET',
    headers: {
      // TODO use a dynamic token from local storage
      "Authorization": "Bearer " + token,
    }
    })
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
  }, []);
    
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="blocPostList">
        <div className="bloc_image" ><img src={background} className="background-image" alt="Tasse de café sur une table en bois."/><div className="ombre"></div></div>
        <div className="ombre"></div>
        <div className="blocExprime">
          <div className="blocExprime__2">
            <div className="blocExprime__2__bloc">
              <div className="blocExprime__2__bloc__center">
                <div className="blocExprime__2__bloc__center__form">
                  <span className="blocExprime__2__bloc__center__form__texte">Exprimez-vous.</span>
                </div>
              </div>
            </div>
            <div className="blocExprime__2__placement">
              <div className="blocExprime__2__placement__2">
                <div role="button" className="blocExprime__2__placement__2__btn">
                  <div className="blocExprime__2__placement__2__btn__bloc">
                    <span className="blocExprime__2__placement__2__btn__bloc__icone"><i className="fas fa-images"></i></span>
                    <span className="blocExprime__2__placement__2__btn__bloc__2">
                      <span className="blocExprime__2__placement__2__btn__bloc__2__texte">Photo</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vitrine">
          {posts.map(post => (
            <arcticle className="vitrine__bloc">
              <div className="vitrine__bloc__cart" key={post._id}>
                <div className="vitrine__bloc__cart__post">
                  <div className="vitrine__bloc__cart__post__logo">
                    <div className="placement">
                      <img src={logoPost} alt="Logo de groupomania(planete fait de trait blanc)"/>
                    </div>
                    <Navbar>
                      <NavItem icon={<Menu />}>
                        <DropdownMenu></DropdownMenu>
                      </NavItem>
                    </Navbar>
                  </div>
                  <div className="vitrine__bloc__cart__post__bloc">
                    <div className="vitrine__bloc__cart__post__bloc__text">
                      <p>{post.publication}</p>
                    </div>
                  </div>
                </div>               
                <div className="vitrine__bloc__cart__img"><img className="isereImage" src={post.imageUrl} alt="" /></div>
                <div className="vitrine__bloc__cart__like">
                  <div className="vitrine__bloc__cart__like__center">
                    <div className="wrapper">
                      <i className="far fa-heart base-icon"></i>
                      <i className="fas fa-heart color-icon"></i>
                    </div>
                    <p>{post.likes}</p>
                  </div>
                  <div></div>
                </div>
              </div>
            </arcticle>
          ))}
        </div>
      </div>
    );
  }


  function Navbar(props) {
    return (
      <nav className="navbar">
        <ul className="navbar_nav">{props.children}</ul>
      </nav>
    );
  }

  function NavItem(props) {
    const [ open, setOpen ] = useState(false);
  // eslint-disable-next-line
    return (
      <li className='nav-item'>
        <button className='icon-button' onClick={() => setOpen(!open)}> 
          {props.icon}
        </button>

        {open && props.children}
      </li>
    );
  }

  function DropdownMenu() {
    const [ activeMenu, setActiveMenu ] = useState('main');
    const [ menuHeight, setMenuHeight ] = useState(null);
    const [ publication, setPublication ]  = useState("");
    const [ file, setFile ]  = useState("");
    const dropdownRef = useRef(null);

    async function handleClick() {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      console.warn(publication, file);
      let item = {publication, file};
      const id = posts._id
        await fetch(`http://localhost:3001/api/posts/${id}`, {
          method: 'PUT',
          headers:{
            "Authorization": "Bearer " + token,
            "Content-Type":"application/json",
            "Accept":'application/json'
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
                <input type="file" accept="image/*" className='file' value={file} onChange={(e) => setFile(e.target.value)}></input>
              </div>
              <div className='bloc-button-modifier' style={{height: 60}}>
                <button className='modifier-post' onClick={handleClick}>Modifier la publication</button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

export default PostList;