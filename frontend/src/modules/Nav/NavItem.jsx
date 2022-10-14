import React, {useState} from 'react';
import { ReactComponent as Menu } from '../../assets/menu.svg';

const NavItem = (props) => {
    const [ open, setOpen ] = useState(false);
    // eslint-disable-next-line
    return (
      <li className='nav-item'>
        <button className='icon-button' onClick={() => setOpen(!open)}> 
          <Menu/>
        </button>
        {open && props.children}
      </li>
    );
};

export default NavItem;