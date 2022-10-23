import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from '../Interceptors/axios'
import logo from '../assets/icon-left-font-monochrome-white.png';
import '../styles/CSS/main.css';

export default function Signup() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail]  = useState("");
  const [password, setPassword]  = useState("");
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/Post")
    }
  })
  
  async function handleClick() {
      await axios.post('/auth/Signup', {
        nom, prenom, email, password
      }).then((response) => {
        console.log(response);
        if (response === undefined) {
          alert("L'un des champs et mal remplis. Le mot de passe doit contenir de 5 à 20 caractères, au moins un symbole parmi !@#%^&*_+\-:?~ et au moins 2 chiffres ");
        } 
        const result = response.data;
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/Post"); 
      }).catch((error) => {
        console.log(error);
      })
    }

    return (
      <div className='page--formualaire'>
        <div className='bandeauLogo'>
          <img src={logo} alt="logo" />
        </div>
        <div className="form-structor">
            <div className="signup">
            <h2 className="form-title" id="signup">Inscrivez-vous</h2>
            <div className="form-holder">
                <input type="text" className="input nom" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
                <input type="text" className="input prenom" placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
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
      </div>
    );
  }