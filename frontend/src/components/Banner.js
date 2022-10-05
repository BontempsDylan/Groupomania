import { Link } from 'react-router-dom';
import logo from '../assets/icon-left-font.png';
import '../styles/CSS/main.css';

// const isLoggedIn = true;

function Banner() {

  return (
      <header className="header">
        <div className='header__logo'><img src={logo} alt="logo" /></div> 
        <ul className='header__bloc'>
          <li className="header__bloc__connection">
            <Link to="/Formulaire" className="link">Connection</Link> 
          </li>
          <li className="header__bloc__inscription">
            <Link to="/Formulaire" className="link">Inscrivez-vous</Link>
          </li>
        </ul>
      </header>
  );
}

export default Banner;