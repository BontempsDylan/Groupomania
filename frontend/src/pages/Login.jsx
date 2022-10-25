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
    await axios.post('/auth/login', {
      email, password
    }).then((response) => {
      if (response === undefined) {
        alert("Mot de passe incorect");
        localStorage.clear()
        return
      } else if (response !== undefined){
        const result = response.data;
        const dataAccessToken = result.accessToken
        const dataUserId = dataAccessToken.userId
        localStorage.setItem("userId", JSON.stringify(dataUserId))
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/Post"); 
      }
    }).catch((error) => {
      console.log(error);
      alert("Adresse email incorect");
    })
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
  
