import React from 'react'
import "../../styles/navBar.css"
export default function NavBar() {
  return (
    <header className='nav-header'>
        <nav className="nav-bar">
            <div className="logo-box">
                <img src="/code.png" alt="" />
                <p>Filipe Pereira</p>
            </div>
            <ul className='nav-links'>
                <li><a href="">Início</a></li>
                <li><a href="">Sobre</a></li>
                <li><a href="">Tecnologias</a></li>
                <li><a href="">Formações</a></li>
                <li><a href="">Certificados</a></li>
                <li><a href="">Projetos</a></li>
                <li><a href="">Contatos</a></li>
                <div className='curriculo-box'>
                    <img src="/downloads.png" alt="" className="cv-icon" />
                    <p>Download CV</p>
                </div>
                
            </ul>
            
        </nav>
    </header>
  )
}
