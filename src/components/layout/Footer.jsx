import "../../styles/footer.css";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { asset } from "../../utils/asset";

const atalhos = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#tecnologias", label: "Tecnologias" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

const redes = [
  {
    href: "https://www.linkedin.com/in/filipe-pereira-ab843530a",
    label: "LinkedIn",
    icone: <FaLinkedin />,
  },
  {
    href: "https://github.com/filipeavila7",
    label: "GitHub",
    icone: <FaGithub />,
  },
  {
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=filipeavila076@gmail.com",
    label: "E-mail",
    icone: <FaEnvelope />,
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={asset("code.png")} alt="" />
            <p>Filipe Pereira</p>
          </div>
          <p className="footer-text">
            Desenvolvedor Full Stack em formacao, aberto para estagio e novas
            oportunidades.
          </p>
        </div>

        <div className="footer-links">
          {atalhos.map((atalho) => (
            <a key={atalho.href} href={atalho.href}>
              {atalho.label}
            </a>
          ))}
        </div>

        <div className="footer-social">
          {redes.map((rede) => (
            <a
              key={rede.label}
              href={rede.href}
              target={rede.href.startsWith("http") ? "_blank" : undefined}
              rel={rede.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={rede.label}
              className="footer-social-link"
            >
              {rede.icone}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Filipe Pereira</p>
        <a href="#inicio">Voltar ao topo</a>
      </div>
    </footer>
  );
}
