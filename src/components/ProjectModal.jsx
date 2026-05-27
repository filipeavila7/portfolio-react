import { useEffect } from "react";
import "../styles/proj.css";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";

export default function ProjectModal({
  aberto,
  titulo,
  subtitulo,
  descricao,
  imagem,
  tags = [],
  links = [],
  tipo = "detalhes",
  onClose,
}) {
  useEffect(() => {
    if (!aberto) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [aberto]);

  if (!aberto) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <FaTimes />
        </button>

        {imagem && tipo === "detalhes" && (
          <div className="modal-image-box">
            <img src={imagem} alt={titulo} className="modal-image" />
          </div>
        )}

        <div className="modal-content">
          <p className="modal-kicker">{subtitulo}</p>
          <h3>{titulo}</h3>
          {descricao && <p className="modal-description">{descricao}</p>}

          {tags.length > 0 && (
            <div className="modal-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="modal-links">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="modal-link-card"
              >
                <div className="modal-link-icon">
                  {tipo === "github" ? <FaGithub /> : <FaExternalLinkAlt />}
                </div>
                <div className="modal-link-texts">
                  <strong>{link.label}</strong>
                  {link.descricao && <span>{link.descricao}</span>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
