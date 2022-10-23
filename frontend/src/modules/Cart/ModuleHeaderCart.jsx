import React from 'react'

import logoPost from '../../assets/logo-post.png';

const ModuleHeaderCart = (props) => {

    const {post} = props;

  return (
    <div className="placement">
        <img src={logoPost} alt="Logo de groupomania(planete fait de trait blanc)"/>
        <div className='bloc-date-username'>
            <div className='username'>{post.nom} {post.prenom}</div>
            <div className='date'>{post.date.toLocaleString('fr-FR')}</div>
        </div>
    </div>
  )
}

export default ModuleHeaderCart