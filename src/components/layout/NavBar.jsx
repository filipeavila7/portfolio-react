import "../../styles/navBar.css";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { asset } from "../../utils/asset";

const linksNavegacao = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "formacoes", label: "Formações" },
  { id: "certificados", label: "Certificados" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

export default function NavBar({ secaoAtiva }) {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="nav-header">
      <nav className="nav-bar">
        <a href="#inicio" className="logo-box" onClick={fecharMenu}>
          <img src={asset("code.png")} alt="" />
          <p>Filipe Pereira</p>
        </a>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="nav-links"
        >
          {menuAberto ? <FaTimes /> : <FaBars />}
        </button>

        <ul
          id="nav-links"
          className={`nav-links ${menuAberto ? "nav-links-open" : ""}`}
        >
          {linksNavegacao.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={secaoAtiva === link.id ? "nav-link-active" : ""}
                onClick={fecharMenu}
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href={asset("currículo-Filipe-final.pdf")}
              download
              className="curriculo-box"
              onClick={fecharMenu}
            >
              <img src={asset("downloads.png")} alt="" className="cv-icon" />
              <p>Download CV</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
