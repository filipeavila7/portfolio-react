import "../../styles/navBar.css";

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
          <img src="/code.png" alt="" />
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

          <div className="curriculo-box">
            <img src="/downloads.png" alt="" className="cv-icon" />
            <p>Download CV</p>
          </div>
        </ul>
      </nav>
    </header>
  );
}
