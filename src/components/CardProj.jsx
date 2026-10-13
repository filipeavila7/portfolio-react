import { useState } from "react";
import "../styles/proj.css";
import { FaGithub, FaLink, FaChevronLeft, FaChevronRight, FaImages } from "react-icons/fa";

export default function CardProj({
  projeto,
  onOpenProject,
  onOpenGithub,
}) {
  const listaImagens = Array.isArray(projeto.imagens) && projeto.imagens.length > 0
    ? projeto.imagens
    : (projeto.imagem ? [projeto.imagem] : []);

  const [fotoAtual, setFotoAtual] = useState(0);

  const totalFotos = listaImagens.length;

  const handlePrev = (e) => {
    e.stopPropagation();
    setFotoAtual((prev) => (prev === 0 ? totalFotos - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setFotoAtual((prev) => (prev === totalFotos - 1 ? 0 : prev + 1));
  };

  return (
    <div className="card">
      <div
        className="card-img-box"
        onClick={() => onOpenProject(projeto, fotoAtual)}
        title="Clique para ver detalhes do projeto"
      >
        <img
          src={listaImagens[fotoAtual] || projeto.imagem}
          alt={`${projeto.titulo} - Imagem ${fotoAtual + 1}`}
          className="card-img"
        />

        {totalFotos > 1 && (
          <>
            <span className="card-badge-count">
              <FaImages className="card-badge-icon" />
              {fotoAtual + 1}/{totalFotos}
            </span>

            <button
              type="button"
              className="card-nav-btn card-nav-prev"
              onClick={handlePrev}
              aria-label="Imagem anterior"
              title="Foto anterior"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              className="card-nav-btn card-nav-next"
              onClick={handleNext}
              aria-label="Próxima imagem"
              title="Próxima foto"
            >
              <FaChevronRight />
            </button>

            <div className="card-dots">
              {listaImagens.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`card-dot ${idx === fotoAtual ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFotoAtual(idx);
                  }}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="card-content">
        <h3>{projeto.titulo}</h3>

        <p className="desc-card">{projeto.descricaoCurta}</p>

        <div className="card-tags">
          {projeto.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-actions">
          <div
            onClick={() => onOpenProject(projeto, fotoAtual)}
            className="action"
            role="button"
            tabIndex={0}
          >
            <FaLink className="link" />
            <p>Ver Projeto</p>
          </div>
          <div
            onClick={() => onOpenGithub(projeto)}
            className="action"
            role="button"
            tabIndex={0}
          >
            <FaGithub className="link-git" />
            GitHub
          </div>
        </div>
      </div>
    </div>
  );
}
