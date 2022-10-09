import React, {  useState } from 'react';
/* import { Context } from 'react'; */
import { Link } from 'react-router-dom';
import logo from '../assets/icon-left-font-monochrome-black.png';
import '../styles/CSS/main.css';


export default function Login() {
  /* const { store, actions } = useContext(Context); */
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  
  const handleClick = () => {

    const opts = {
      method: 'POST',
      Headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email, 
        password: password
      })
    }

    fetch('http://localhost:3001/api/auth/login', opts)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        alert("There has been some error")
      }
    })
    .then(data => {
      console.log("this come from the backend", data);
     
      localStorage.getItem("token", data.token);
    })
    .catch(error => {
      console.error("There was an error!!", error);
    })

  }

  return (
    <html className="html--formualire">
      <body className="body--formualire">
        <img src={logo} alt="logo" />
        <div className="form-structor">
          <div className="signup">
            <h2 className="form-title" id="signup">Connectez-vous</h2>
            <div className="form-holder">
              <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="submit-btn" onClick={handleClick}>Connectez-vous</button>
          </div>
          <div className="login slide-up">
            <div className="center">
              <Link to="/Signup" className="link"><h2 className="form-title" id="login"><span>ou</span>Inscrivez-vous</h2></Link> 
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
  
