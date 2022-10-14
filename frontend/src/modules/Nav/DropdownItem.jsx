import React, { useState } from 'react'

function DropdownItem(props) {
    const { activeMenu } = props
    const [ setActiveMenu ] = useState('main');
    return (
        <button className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </button>
    )
    
}

export default DropdownItem