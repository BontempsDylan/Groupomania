import { CSSTransition } from 'react-transition-group';
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Supprimer } from '../assets/supprimer.svg';
import { ReactComponent as Modifier } from '../assets/modifier.svg';
import { ReactComponent as Retour } from '../assets/retour.svg';
import { ReactComponent as Menu } from '../assets/menu.svg';
import '../styles/CSS/main.css';

const DropdownNavbar = () => {
    <Navbar>
        <NavItem icon={<Menu />}>
        <DropdownMenu></DropdownMenu>
        </NavItem>
    </Navbar>
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
    const dropdownRef = useRef(null);
  
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
              <input type="text" className='input-post' placeholder='Modifier votre publication.' style={{height: 120}}></input>
              <div className='input-file' style={{height: 30}}>
                <input type="file" accept="image/*" className='file'></input>
              </div>
              <div className='bloc-button-modifier' style={{height: 60}}>
                <button className='modifier-post'>Modifier la publication</button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
}

export default DropdownNavbar