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
  
  /*
   * Objectif => Si le local storage contient déjà la clé user on navige directement vers 
   * - la page post sinon on clear le localStorage.
   */

  useEffect(() => {
    if (localStorage.getItem("error")) {
      localStorage.clear()
    } else if (localStorage.getItem("user")) {
      navigate("/Post")
    }
  })
  
  /*
   * Objectif => au click récupération des données du body pour les envoyers au back pour vérifier s'il existe dans la BDD.
   * Si les données existes => on récupe la réponse contenant le token et userId envoyé par le back.
   * Si les données n'existes pas => la réponse et soit undefined pour une erreur de mot de passe soit une erreur pour l'email
   * - on envoi une alerte a l'utilisateur pour l'alerter de l'erreur.
   */

  async function handleClick() {
    // on envoi les données de l'email et password
    await axios.post('/auth/login', {
      email, password
    }).then((response) => {
      // on vérifie si la réponse et undefined
      if (response === undefined) {
        // on alert si c'est le cas
        alert("Mot de passe incorect");
        localStorage.clear()
        return
      } else {
        const result = response.data;
        const dataAccessToken = result.accessToken
        const dataUserId = dataAccessToken.userId
        // envoi dans le local storage les données de la réponse
        localStorage.setItem("userId", JSON.stringify(dataUserId))
        localStorage.setItem("user", JSON.stringify(result));
        // navigation vers la page /Post
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
  
