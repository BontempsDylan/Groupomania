import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react'

import { ReactComponent as Supprimer } from '../../assets/supprimer.svg';
import { ReactComponent as Modifier } from '../../assets/modifier.svg';
import { ReactComponent as Retour } from '../../assets/retour.svg';
import ButtonDelete from '../../modules/MenuDeleteModify/ButtonDelete';
import MenuModify from '../../modules/MenuDeleteModify/MenuModify';

function DropdownMenuItem(props) {
  const { post } = props
  const [ activeMenu, setActiveMenu ] = useState('main');

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
    <>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit>
        <div className='menu'>
          <DropdownItem leftIcon={<Supprimer />}><ButtonDelete post={post} /></DropdownItem>
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
        unmountOnExit>
        <div className='menu-modifier'>
          <DropdownItem goToMenu="main" leftIcon={<Retour />}>
            <h2 className='retour'>Retour</h2>
          </DropdownItem>
          <MenuModify post={post} />
        </div>
      </CSSTransition>
    </>
  )  
}

export default DropdownMenuItem