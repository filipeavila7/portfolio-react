import "../../styles/navBar.css";
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
  return (
    <header className="nav-header">
      <nav className="nav-bar">
        <a href="#inicio" className="logo-box">
          <img src={asset("code.png")} alt="" />
          <p>Filipe Pereira</p>
        </a>

        <ul className="nav-links">
          {linksNavegacao.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={secaoAtiva === link.id ? "nav-link-active" : ""}
              >
                {link.label}
              </a>
            </li>
          ))}

          <a href={asset("currículo-Filipe-final.pdf")} download className="curriculo-box">
            <img src={asset("downloads.png")} alt="" className="cv-icon" />
            <p>Download CV</p>
          </a>
        </ul>
      </nav>
    </header>
  );
}
