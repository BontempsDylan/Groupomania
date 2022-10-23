import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

import axios from '../Interceptors/axios'
import logo from '../assets/icon-left-font-monochrome-white.png';
import '../styles/CSS/main.css';


export default function Login() {
  const  [email, setEmail]  = useState("");
  const  [password, setPassword]  = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("error")) {
      localStorage.clear()
    } else if (localStorage.getItem("user")) {
      navigate("/Post")
    }
  })
  
  async function handleClick() {
    console.warn(email, password);
   /*  let item = {email, password}; */
    let APICall = await axios.post('/auth/login', {
      email, password
    });
    if (APICall.status === 200) {
      const result = await APICall.data;
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/Post");
    } else {
      alert("Adresse email ou mot de passe incorect");
    }
  }

  return (
    <div className='page--formualaire'>
      <div className='bandeauLogo'>
        <img src={logo} alt="logo" />
      </div>
      <div className="form-structor">
        <div className="signup">
          <h2 className="form-title" id="signup">Connectez-vous</h2>
          <div className="form-holder">
            <input type="email" className="input email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" className="input password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className="submit-btn" onClick={handleClick}>Connectez-vous</button>
        </div>
        <div className="login slide-up">
          <div className="center">
            <Link to="/Signup" className="link"><h2 className="form-title" id="login"><span>ou</span>Inscrivez-vous</h2></Link> 
          </div>
        </div>
      </div>
    </div>
  );

}
  
