import React from 'react'
import "../styles/proj.css";
import { FaGithub, FaLink } from "react-icons/fa";
export default function CardProj({
    projeto, onClick
}) {
    return (
        <div className="card">
            <div className="card-img-box">
                <img
                    src={projeto.imagem}
                    alt={projeto.titulo}
                    className="card-img"
                />
            </div>

            <div className="card-content">
                <h3>{projeto.titulo}</h3>

                <p className='desc-card'>{projeto.descricaoCurta}</p>

                <div className="card-tags">
                    {projeto.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <div 
                    className="card-actions" >
                    <div onClick={() => onClick(projeto)} className="action">
                        <FaLink className='link' />
                        <p>Ver Projeto</p>
                    </div>
                    <a href={projeto.linkGit} className="action">
                        <FaGithub className='link-git'/>
                        GitHub
                    </a>
                        
                    
                </div>


            </div>

        </div>
    )
}
