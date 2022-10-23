
import { useNavigate } from 'react-router-dom'
import logo from '../assets/icon-left-font-monochrome-white.png';
import '../styles/CSS/main.css';

// const isLoggedIn = true;

function Banner() {
  const navigate = useNavigate();

  async function handleClick() {
    localStorage.clear()
    navigate("/")
  }

  return (
      <header className="header">
        <div className='header__logo'><img src={logo} alt="logo" /></div>
        <i className="fas fa-sign-out-alt" onClick={handleClick}></i> 
      </header>
  );
}

export default Banner;