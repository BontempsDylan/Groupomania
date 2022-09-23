import logo from '../assets/icon-left-font-removebg-preview.png';
import '../styles/CSS/main.css';

function App() {
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

export default App;
