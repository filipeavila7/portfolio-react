import { useEffect, useState, useCallback } from "react";
import "../styles/proj.css";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";

export default function ProjectModal({
  aberto,
  titulo,
  subtitulo,
  descricao,
  imagem,
  imagens = [],
  fotoInicial = 0,
  tags = [],
  links = [],
  tipo = "detalhes",
  onClose,
}) {
  const listaImagens =
    Array.isArray(imagens) && imagens.length > 0
      ? imagens
      : imagem
      ? [imagem]
      : [];

  const totalFotos = listaImagens.length;
  const [fotoAtual, setFotoAtual] = useState(0);

  // Touch gesture support for mobile swiping
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    if (aberto) {
      const idx =
        typeof fotoInicial === "number" &&
        fotoInicial >= 0 &&
        fotoInicial < listaImagens.length
          ? fotoInicial
          : 0;
      setFotoAtual(idx);
    }
  }, [aberto, fotoInicial, listaImagens.length]);

  const handlePrev = useCallback(() => {
    if (totalFotos <= 1) return;
    setFotoAtual((prev) => (prev === 0 ? totalFotos - 1 : prev - 1));
  }, [totalFotos]);

  const handleNext = useCallback(() => {
    if (totalFotos <= 1) return;
    setFotoAtual((prev) => (prev === totalFotos - 1 ? 0 : prev + 1));
  }, [totalFotos]);

  // Lock body scroll and set up keyboard navigation
  useEffect(() => {
    if (!aberto) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [aberto, onClose, handlePrev, handleNext]);

  const minSwipeDistance = 45;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!aberto) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar"
          title="Fechar (Esc)"
        >
          <FaTimes />
        </button>

        {totalFotos > 0 && tipo === "detalhes" && (
          <div className="modal-carousel-wrapper">
            <div
              className="modal-image-box"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                key={fotoAtual}
                src={listaImagens[fotoAtual]}
                alt={`${titulo} - Foto ${fotoAtual + 1} de ${totalFotos}`}
                className="modal-image"
              />

              {totalFotos > 1 && (
                <>
                 

                  <button
                    type="button"
                    className="carousel-arrow carousel-arrow-prev"
                    onClick={handlePrev}
                    aria-label="Foto anterior"
                    title="Foto anterior (Seta esquerda)"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    type="button"
                    className="carousel-arrow carousel-arrow-next"
                    onClick={handleNext}
                    aria-label="Próxima foto"
                    title="Próxima foto (Seta direita)"
                  >
                    <FaChevronRight />
                  </button>

                  <div className="modal-carousel-dots">
                    {listaImagens.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`modal-carousel-dot ${
                          idx === fotoAtual ? "active" : ""
                        }`}
                        onClick={() => setFotoAtual(idx)}
                        aria-label={`Ir para a foto ${idx + 1}`}
                        title={`Foto ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {totalFotos > 1 && (
              <div className="modal-thumbnails">
                {listaImagens.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`modal-thumbnail-btn ${
                      idx === fotoAtual ? "active" : ""
                    }`}
                    onClick={() => setFotoAtual(idx)}
                    aria-label={`Ver miniatura ${idx + 1}`}
                    title={`Ver foto ${idx + 1}`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Miniatura ${idx + 1}`}
                      className="modal-thumbnail-img"
                    />
                  </button>
                ))}
              </div>
            )}
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
