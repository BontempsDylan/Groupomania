import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/icon-left-font-monochrome-white.png';
import '../styles/CSS/main.css';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail]  = useState("");
  const [password, setPassword]  = useState("");
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/Post")
    }
  })
  
  async function handleClick() {
      console.warn(name, email, password);
      let item = {name, email, password};
      let result = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers:{
          "Content-Type":"application/json",
          "Accept":'application/json'
        },
        body: JSON.stringify(item)
      });
      result = await result.json();
      localStorage.setItem("user", JSON.stringify(result))
      navigate("/Post")
    }

    return (
      <html className="html--formualire">
        <body className="body--formualire">
          <div className='bandeauLogo'>
            <img src={logo} alt="logo" />
          </div>
          <div className="form-structor">
              <div className="signup">
              <h2 className="form-title" id="signup">Inscrivez-vous</h2>
              <div className="form-holder">
                  <input type="text" className="input name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                  <input type="text" className="input email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <input type="password" className="input password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button className="submit-btn" onClick={handleClick}>Connectez-vous</button>
              </div>
              <div className="login slide-up">
              <div className="center">
                  <Link to="/" className="form-title"><span>ou</span>Connectez-vous</Link>
              </div>
              </div>
          </div>
        </body>
      </html>
    );
  }