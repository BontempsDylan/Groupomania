import { CSSTransition } from 'react-transition-group';
import React, { useState } from 'react'

import BlocInput from '../../modules/CartAddPost/BlocInput';
import { ReactComponent as Retour } from '../../assets/retour.svg';

const DropdownAddPostItem = (props) => {
    const [ activeMenu, setActiveMenu ] = useState('main');
    const { handleClose } = props

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
        <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary-addPost"
            unmountOnExit>
            <div className='menuAddPost'>
                <DropdownItemAddPost leftIcon={<Retour />}>
                    <h2 onClick={handleClose} >Retour</h2>
                </DropdownItemAddPost>
                <BlocInput />
            </div> 
        </CSSTransition>
    )
}

export default DropdownAddPostItem