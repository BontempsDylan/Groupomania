import logo from '../assets/icon-left-font.svg';
import '../styles/App.css';

function App() {
  return (
    
      <header className="header">
        <div className='header__logo'><img src={logo} className="header__logo__img" alt="logo" /></div> 
        <div className='header__'>
          <div className="header__connection"><p>connection</p></div>
          <div className="header__inscription"><p>inscrivez-vous</p></div>
        </div>
      </header>
    
  );
}

export default App;
