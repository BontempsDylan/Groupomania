import logo from '../assets/icon-left-font.png';
import '../styles/CSS/main.css';

// const isLoggedIn = true;

function Banner() {

  return (
      <header className="header">
        <div className='header__logo'><img src={logo} alt="logo" /></div> 
        <div className='header__bloc'>
          <div className="header__bloc__connection"><p>connection</p></div>
          <div className="header__bloc__inscription"><p>inscrivez-vous</p></div>
        </div>
      </header>
  );
}

export default Banner;