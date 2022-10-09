import { Link } from 'react-router-dom';
import logo from '../assets/icon-left-font-monochrome-black.png';
import '../styles/CSS/main.css';

export default function signup() {

    return (
      <html className="html--formualire">
        <body className="body--formualire">
            <img src={logo} alt="logo" />
            <div className="form-structor">
                <div className="signup">
                <h2 className="form-title" id="signup">Inscrivez-vous</h2>
                <div className="form-holder">
                    <input type="email" className="input" placeholder="Email" />
                    <input type="password" className="input" placeholder="Password"/>
                </div>
                <button className="submit-btn">Inscrivez-vous</button>
                </div>
                <div className="login slide-up">
                <div className="center">
                    <Link to="/login" className="form-title"><span>ou</span>Connectez-vous</Link>
                </div>
                </div>
            </div>
        </body>
      </html>
    );
  }