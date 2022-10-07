import { Link } from 'react-router-dom';
import logo from '../assets/icon-left-font.png';
import '../styles/CSS/main.css';

// const isLoggedIn = true;

function Banner() {

  return (
      <header className="header">
        <div className='header__logo'><img src={logo} alt="logo" /></div> 
        <div className='header__bloc'>
          <div className="header__bloc__connection">
            <Link to="/Formulaire" className="link">Connection</Link> 
          </div>
          <div className="header__bloc__connection">
            <Link to="/Formulaire" className="link">Inscrivez-vous</Link>
          </div>
        </div>
      </header>
  );
}

export default Banner;