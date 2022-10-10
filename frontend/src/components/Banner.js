
import logo from '../assets/icon-left-font-monochrome-white.png';
import '../styles/CSS/main.css';

// const isLoggedIn = true;

function Banner() {

  return (
      <header className="header">
        <div className='header__logo'><img src={logo} alt="logo" /></div> 
      </header>
  );
}

export default Banner;