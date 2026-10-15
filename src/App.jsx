import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "./styles/inicio.css";
import "./styles/sobre.css";
import "./styles/tec.css";
import "./styles/form.css";
import "./styles/cert.css";
import "./styles/proj.css";
import "./styles/contato.css";
import "./styles/footer.css";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import {
  FaCode,
  FaLaptopCode,
  FaGlobe,
  FaClock,
  FaGithub,
  FaFolder,
  FaDocker,
  FaCss3,
  FaFigma,
  FaBootstrap,
  FaHtml5,
  FaGitAlt,
  FaJava,
  FaPython,
  FaReact,
  FaGraduationCap,
  FaAward,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaChevronUp,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import {
  SiVite,
  SiFastapi,
  SiTypescript,
  SiJavascript,
  SiSpringsecurity,
  SiMysql,
  SiSpringboot,
  SiFlask,
} from "react-icons/si";
import { projetos } from "./service/projetos";
import CardProj from "./components/CardProj";
import ProjectModal from "./components/ProjectModal";
import { asset } from "./utils/asset";

const roles = [
  "Desenvolvedor Full Stack",
  "Ecossistema Java & Spring Boot",
  "Interfaces Modernas com React",
  "APIs RESTful & Bancos de Dados",
  "TypeScript & Web Design",
];

function App() {
  const [secaoAtiva, setSecaoAtiva] = useState("inicio");
  const [filtro, setFiltro] = useState("TODOS");
  const [modalProjeto, setModalProjeto] = useState(null);
  const [tipoModalProjeto, setTipoModalProjeto] = useState("detalhes");
  const [fotoInicialModal, setFotoInicialModal] = useState(0);

  // Dynamic role rotation
  const [roleIndex, setRoleIndex] = useState(0);

  // Scroll tracking: progress bar and back to top button
  const [progressoScroll, setProgressoScroll] = useState(0);
  const [mostrarTopo, setMostrarTopo] = useState(false);

  // Email copy notification
  const [copiado, setCopiado] = useState(false);

  // Rotating hero subtitle
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for active section, progress bar, and back to top button
  useEffect(() => {
    const secoes = [
      "inicio",
      "sobre",
      "tecnologias",
      "formacoes",
      "certificados",
      "projetos",
      "contato",
    ];

    function onScroll() {
      const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
      const progresso =
        scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
      setProgressoScroll(progresso);
      setMostrarTopo(window.scrollY > 350);

      const posicaoBase = window.scrollY + 180;
      for (let index = secoes.length - 1; index >= 0; index -= 1) {
        const secao = document.getElementById(secoes[index]);
        if (secao && posicaoBase >= secao.offsetTop) {
          setSecaoAtiva(secoes[index]);
          return;
        }
      }
      setSecaoAtiva("inicio");
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal entrance animations via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elementos = document.querySelectorAll(".reveal, .reveal-scale");
    elementos.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filtro]);

  function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function copiarEmail(email) {
    navigator.clipboard.writeText(email);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2400);
  }

  function normalizarLinks(valorPadrao, lista, labelPadrao, descricaoPadrao) {
    if (Array.isArray(lista) && lista.length > 0) {
      return lista;
    }
    if (valorPadrao) {
      return [
        {
          label: labelPadrao,
          descricao: descricaoPadrao,
          href: valorPadrao,
        },
      ];
    }
    return [];
  }

  function abrirProjeto(projeto, indexFoto = 0) {
    setModalProjeto(projeto);
    setTipoModalProjeto("detalhes");
    setFotoInicialModal(typeof indexFoto === "number" ? indexFoto : 0);
  }

  function abrirGithub(projeto) {
    setModalProjeto(projeto);
    setTipoModalProjeto("github");
  }

  function fecharModalProjeto() {
    setModalProjeto(null);
  }

  const projetosFiltrados = projetos.filter((projeto) => {
    if (filtro === "TODOS") {
      return true;
    }
    return projeto.tipo === filtro;
  });

  const projetoSelecionado = modalProjeto
    ? {
        ...modalProjeto,
        linksProjeto: normalizarLinks(
          modalProjeto.linkProjeto,
          modalProjeto.linksProjeto,
          "Abrir projeto",
          "Visualizar deploy ou demonstração"
        ),
        linksGit: normalizarLinks(
          modalProjeto.linkGit,
          modalProjeto.linksGit,
          "Abrir repositório",
          "Codigo-fonte do projeto"
        ),
      }
    : null;

  const contatos = [
    {
      titulo: "LinkedIn",
      descricao: "Para networking, oportunidades e conversas profissionais.",
      acao: "Abrir perfil",
      valor: "https://www.linkedin.com/in/filipe-pereira-devspnx",
      href: "https://www.linkedin.com/in/filipe-pereira-devspnx",
      destaque: false,
      icone: <FaLinkedin />,
    },
    {
      titulo: "E-mail",
      descricao: "Melhor canal para propostas, freelance ou contato direto.",
      acao: "Enviar e-mail",
      valor: "filipeavila076@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=filipeavila076@gmail.com",
      destaque: true,
      icone: <FaEnvelope />,
      isEmail: true,
    },
    {
      titulo: "GitHub",
      descricao: "Aqui voce pode acompanhar meus projetos e meu código.",
      acao: "Ver GitHub",
      valor: "https://github.com/filipeavila7",
      href: "https://github.com/filipeavila7",
      destaque: false,
      icone: <FaGithub />,
    },
    {
      titulo: "WhatsApp",
      descricao: "Contato rápido para conversas objetivas e alinhamentos.",
      acao: "Chamar no WhatsApp",
      valor: "55 (61) 98418-8269",
      href: "https://wa.me/5561984188269",
      destaque: false,
      icone: <FaWhatsapp />,
    },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${progressoScroll}%` }}
      />

      {/* Ambient glowing background orbs */}
      <div className="ambient-background">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <div
        className="app-inicio-lay"
        style={{ "--inicio-bg": `url("${asset("fundo.png")}")` }}
      >
        <div className="overlay" />
        <NavBar secaoAtiva={secaoAtiva} />

        <section id="inicio" className="inicio-sec">
          <div className="inicio-box">
            <div className="dados-box reveal">
            
              <h1>
                Filipe <span className="highlight">Pereira</span>
              </h1>

              <div className="role-box">
                <span className="role-tag">Especialidade:</span>
                <span key={roleIndex} className="role-dynamic">
                  {roles[roleIndex]}
                </span>
              </div>

              <p className="descricao">
                Desenvolvedor Full Stack focado na construção de aplicações web
                modernas, APIs robustas, arquitetura limpa e interfaces de alta
                performance.
              </p>

              <div className="redes-box">
                <a
                  href="https://www.linkedin.com/in/filipe-pereira-devspnx"
                  target="_blank"
                  rel="noreferrer"
                  className="redes-lay"
                  title="LinkedIn de Filipe"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/filipeavila7"
                  target="_blank"
                  rel="noreferrer"
                  className="redes-lay"
                  title="GitHub de Filipe"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=filipeavila076@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="redes-lay"
                  title="Enviar e-mail para Filipe"
                  aria-label="E-mail"
                >
                  <FaEnvelope />
                </a>
              </div>

              <div className="botao-box">
                <a href="#projetos" className="btn-projetos">
                  Ver Projetos
                  <img className="btn-icon" src={asset("flecha.png")} alt="" />
                </a>
                <a href="#contato" className="btn-contato">
                  Entre em contato
                  <img className="btn-icon" src={asset("balao.png")} alt="" />
                </a>
              </div>
            </div>

            <div className="img-inicio-box reveal reveal-scale">
              <div className="avatar-inner">
                <img src={asset("foto2.png")} alt="Foto de Filipe Pereira" />
              </div>

              {/* Floating interactive badges */}
              
            </div>
          </div>
        </section>
      </div>

      <main className="app-lay">
        <section id="sobre" className="sobre-sec">
          <div className="sobre-box">
            <div className="sobre-content sobre-principal reveal">
              <p className="sobre-tag">SOBRE MIM</p>
              <h2>
                Transformando <span>ideias</span> em código de <span>impacto</span>
              </h2>
              <p>
                Sou um desenvolvedor Full Stack em constante evolução, apaixonado por
                transformar ideias em aplicações funcionais, bem estruturadas e com ótima
                experiência para o usuário.
              </p>
              <p>
                Tenho foco tanto no desenvolvimento de interfaces modernas e intuitivas no
                frontend, quanto na construção de backends robustos, escaláveis e bem
                organizados, com atenção especial a boas práticas de desenvolvimento,
                principalmente com Java e Spring Boot.
              </p>
              <p>
                Atualmente, estou em busca da minha primeira oportunidade na área de
                tecnologia, enquanto aprofundo meus estudos em desenvolvimento frontend,
                backend e engenharia de software na graduação.
              </p>

              {/* Quick stats counter */}
              
            </div>

            <div className="sobre-side">
              <div className="sobre-card reveal reveal-delay-1">
                <p className="card-top">MEU FOCO</p>
                <h3>
                  Soluções inteligentes, <span>código limpo</span> e evolução constante.
                </h3>
                <p>
                  Tenho como objetivo constante aprimorar minha criatividade e raciocínio
                  lógico, aplicando essas habilidades na resolução de problemas de maneira
                  eficiente, estruturada e orientada a boas práticas de engenharia.
                </p>
              </div>

              <div className="sobre-card stack-card reveal reveal-delay-2">
                <p className="card-top">HABILIDADES ESSENCIAIS</p>
                <div className="stack-grid">
                  <div className="destaque-item">
                    <img src={asset("rocket.png")} alt="" className="destaque-icon" />
                    <p>Ágil e focado em resultados</p>
                  </div>
                  <div className="destaque-item">
                    <img src={asset("chat.png")} alt="" className="destaque-icon" />
                    <p>Comunicação clara e objetiva</p>
                  </div>
                  <div className="destaque-item">
                    <img src={asset("grupo.png")} alt="" className="destaque-icon" />
                    <p>Trabalho em equipe e empatia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tecnologias" className="tec-sec">
          <div className="tec-box reveal">
            <div className="tec-header-box">
              <p className="tec-tag">HABILIDADES TÉCNICAS</p>
              <h2>
                Minhas <span>Tecnologias</span> & Ferramentas
              </h2>
              <p className="tec-intro">
                Tecnologias modernas utilizadas para projetar e construir aplicações
                completas do frontend ao backend.
              </p>
            </div>

            <div className="tec-lay reveal reveal-delay-1">
              <p className="tec-descricao">Back-end & Banco de Dados</p>
              <div className="tecs">
                <div className="tec-content tec-item-java">
                  <div className="tec-box-content">
                    <FaJava className="tec" />
                  </div>
                  <p>Java</p>
                </div>
                <div className="tec-content tec-item-spring">
                  <div className="tec-box-content">
                    <SiSpringboot className="tec" />
                  </div>
                  <p>Spring Boot</p>
                </div>
                <div className="tec-content tec-item-spring">
                  <div className="tec-box-content">
                    <SiSpringsecurity className="tec" />
                  </div>
                  <p>Spring Security</p>
                </div>
                <div className="tec-content tec-item-python">
                  <div className="tec-box-content">
                    <FaPython className="tec" />
                  </div>
                  <p>Python</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiFastapi className="tec" />
                  </div>
                  <p>FastAPI</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiFlask className="tec" />
                  </div>
                  <p>Flask</p>
                </div>
                <div className="tec-content tec-item-mysql">
                  <div className="tec-box-content">
                    <SiMysql className="tec" />
                  </div>
                  <p>MySQL</p>
                </div>
              </div>
            </div>

            <div className="tec-lay reveal reveal-delay-2">
              <p className="tec-descricao">Front-end & Interfaces</p>
              <div className="tecs">
                <div className="tec-content tec-item-react">
                  <div className="tec-box-content">
                    <FaReact className="tec" />
                  </div>
                  <p>React</p>
                </div>
                <div className="tec-content tec-item-ts">
                  <div className="tec-box-content">
                    <SiTypescript className="tec" />
                  </div>
                  <p>TypeScript</p>
                </div>
                <div className="tec-content tec-item-js">
                  <div className="tec-box-content">
                    <SiJavascript className="tec" />
                  </div>
                  <p>JavaScript</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaHtml5 className="tec" />
                  </div>
                  <p>HTML5</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaCss3 className="tec" />
                  </div>
                  <p>CSS3</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiVite className="tec" />
                  </div>
                  <p>Vite</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaBootstrap className="tec" />
                  </div>
                  <p>Bootstrap</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaFigma className="tec" />
                  </div>
                  <p>Figma</p>
                </div>
              </div>
            </div>

            <div className="tec-lay reveal reveal-delay-3">
              <p className="tec-descricao">DevOps & Ferramentas</p>
              <div className="tecs">
                <div className="tec-content tec-item-git">
                  <div className="tec-box-content">
                    <FaGitAlt className="tec" />
                  </div>
                  <p>Git</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaGithub className="tec" />
                  </div>
                  <p>GitHub</p>
                </div>
                <div className="tec-content tec-item-docker">
                  <div className="tec-box-content">
                    <FaDocker className="tec" />
                  </div>
                  <p>Docker</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="formacoes" className="form-sec">
          <div className="form-box reveal">
            <div className="form-header">
              <p className="form-tag">MINHA JORNADA</p>
              <h2>
                Formações
              </h2>
              <p className="form-intro">
                Minha base foi construída unindo teoria, prática e contato com
                desenvolvimento de sistemas desde cedo.
              </p>
            </div>
          </div>

          <div className="form-timeline">
            <div className="form-line" />
            <article className="form-card reveal">
              <div className="form-dot">
                <FaGraduationCap />
              </div>
              <div className="form-periodo">2023 - 2025 - Concluído</div>
              <h3>Ensino Médio + Técnico em Desenvolvimento de Sistemas</h3>
              <p className="form-local">Curso técnico - SENAI</p>
              <p>
                Etapa fundamental que fortaleceu minha lógica de programação, banco
                de dados, arquitetura de sistemas e construção de aplicações completas
                na prática.
              </p>
            </article>

            <article className="form-card reveal reveal-delay-1">
              <div className="form-dot">
                <FaGraduationCap />
              </div>
              <div className="form-periodo">2026 - Atual</div>
              <h3>Engenharia de Software</h3>
              <p className="form-local">Graduação - UniProjeção</p>
              <p>
                Formação voltada para engenharia de software, modelagem de sistemas,
                padrões de projeto, qualidade de código e desenvolvimento de aplicações
                escaláveis.
              </p>
            </article>
          </div>
        </section>

        <section id="certificados" className="cert-sec">
          <div className="cert-header reveal">
            <p className="cert-tag">APRENDIZADO CONTÍNUO</p>
            <h2>
              Cursos & <span>Certificações</span>
            </h2>
            <p className="cert-intro">
              Cursos e certificações que reforçaram minha base técnica em
              desenvolvimento backend, frontend e boas práticas.
            </p>
          </div>

          <div className="cert-box">
            <article className="cert-card cert-card-destaque reveal">
              <div className="cert-card-top">
                <span className="cert-pill">Java & POO</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>Java Orientado a Objetos</h3>
              <p className="cert-origem">Maratona Java - DevDojo</p>
              <p>
                Estudos aprofundados focados em POO, herança, polimorfismo, interfaces,
                encapsulamento, coleções e organização de código profissional para
                projetos backend.
              </p>
              <div className="cert-meta">
                <span>Concluído</span>
                <span>Java 21</span>
                <span>POO</span>
              </div>
            </article>

            <article className="cert-card reveal reveal-delay-1">
              <div className="cert-card-top">
                <span className="cert-pill">Frontend</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>HTML, CSS e JavaScript Moderno</h3>
              <p className="cert-origem">Curso complementar</p>
              <p>
                Base sólida para criação de interfaces responsivas, semânticas,
                acessibilidade e interatividade no navegador.
              </p>
              <div className="cert-meta">
                <span>Concluído</span>
                <span>Web Moderno</span>
              </div>
            </article>

            <article className="cert-card reveal reveal-delay-2">
              <div className="cert-card-top">
                <span className="cert-pill">Banco de Dados</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>Modelagem de Dados e SQL</h3>
              <p className="cert-origem">Curso complementar</p>
              <p>
                Conteúdos voltados para consultas complexas, relações relacionais,
                índices e normalização de tabelas em sistemas reais.
              </p>
              <div className="cert-meta">
                <span>Concluído</span>
                <span>SQL</span>
                <span>Relacional</span>
              </div>
            </article>

            <article className="cert-card reveal reveal-delay-3">
              <div className="cert-card-top">
                <span className="cert-pill">Ferramentas</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>Git e Versionamento Profissional</h3>
              <p className="cert-origem">Curso complementar</p>
              <p>
                Aprendizado sobre controle de versão, fluxos de trabalho (Git Flow),
                branches, commits semânticos e organização em equipe.
              </p>
              <div className="cert-meta">
                <span>Concluído</span>
                <span>Git & GitHub</span>
              </div>
            </article>
          </div>
        </section>

        <section id="projetos" className="proj-sec">
          <div className="proj-header reveal">
            <p className="proj-tag">NA PRÁTICA</p>
            <h2>
              Meus <span>Projetos</span>
            </h2>
            <p className="proj-intro">
              Projetos práticos desenvolvidos com foco em usabilidade, arquitetura e
              qualidade.
            </p>

            <div className="filtro-box">
              <div
                onClick={() => setFiltro("TODOS")}
                className={`filtro ${filtro === "TODOS" ? "active" : ""}`}
              >
                <FaFolder
                  className={`filtro-icon ${filtro === "TODOS" ? "active" : ""}`}
                />
                <p>Todos ({projetos.length})</p>
              </div>

              <div
                onClick={() => setFiltro("API")}
                className={`filtro ${filtro === "API" ? "active" : ""}`}
              >
                <FaCode
                  className={`filtro-icon ${filtro === "API" ? "active" : ""}`}
                />
                <p>API ({projetos.filter((p) => p.tipo === "API").length})</p>
              </div>

              <div
                onClick={() => setFiltro("FULL")}
                className={`filtro ${filtro === "FULL" ? "active" : ""}`}
              >
                <FaLaptopCode
                  className={`filtro-icon ${filtro === "FULL" ? "active" : ""}`}
                />
                <p>Full Stack ({projetos.filter((p) => p.tipo === "FULL").length})</p>
              </div>

              <div
                onClick={() => setFiltro("PAGINA")}
                className={`filtro ${filtro === "PAGINA" ? "active" : ""}`}
              >
                <FaGlobe
                  className={`filtro-icon ${filtro === "PAGINA" ? "active" : ""}`}
                />
                <p>Páginas ({projetos.filter((p) => p.tipo === "PAGINA").length})</p>
              </div>

              <div
                onClick={() => setFiltro("ANDAMENTO")}
                className={`filtro ${filtro === "ANDAMENTO" ? "active" : ""}`}
              >
                <FaClock
                  className={`filtro-icon ${filtro === "ANDAMENTO" ? "active" : ""}`}
                />
                <p>
                  Em andamento (
                  {projetos.filter((p) => p.tipo === "ANDAMENTO").length})
                </p>
              </div>
            </div>
          </div>

          <div className="proj-box">
            {projetosFiltrados.map((projeto, index) => (
              <div key={index} className="reveal">
                <CardProj
                  projeto={projeto}
                  onOpenProject={abrirProjeto}
                  onOpenGithub={abrirGithub}
                />
              </div>
            ))}
          </div>
        </section>

        <section id="contato" className="contato-sec">
          <div className="contato-header reveal">
            <p className="contato-tag">VAMOS CONVERSAR</p>
            <h2>
              Entre em <span>contato</span>
            </h2>
            <p className="contato-intro">
              Se quiser conversar sobre projetos, oportunidade de estágio, freelance
              ou tecnologia, estes são os canais mais rápidos para me encontrar.
            </p>
          </div>

          <div className="contato-box">
            {contatos.map((contato, index) => (
              <article
                key={index}
                className={`contato-card ${
                  contato.destaque ? "contato-card-destaque" : ""
                } reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className="contato-card-top">
                  <div className="contato-icon">{contato.icone}</div>
                  {contato.destaque && (
                    <span className="contato-badge">Canal principal</span>
                  )}
                </div>

                <h3>{contato.titulo}</h3>
                <p className="contato-desc">{contato.descricao}</p>
                <p className="contato-valor">{contato.valor}</p>

                <div className="contato-botoes-row">
                  <a
                    href={contato.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contato-link"
                  >
                    {contato.acao}
                  </a>

                  {contato.isEmail && (
                    <button
                      type="button"
                      className={`contato-copy-btn ${copiado ? "copiado" : ""}`}
                      onClick={() => copiarEmail(contato.valor)}
                      title="Copiar endereço de e-mail"
                    >
                      {copiado ? <FaCheck /> : <FaCopy />}
                      <span>{copiado ? "Copiado! 🎉" : "Copiar"}</span>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <ProjectModal
          aberto={Boolean(projetoSelecionado)}
          tipo={tipoModalProjeto}
          titulo={projetoSelecionado?.titulo}
          subtitulo={
            tipoModalProjeto === "github"
              ? "Escolha o repositorio"
              : projetoSelecionado?.tipo
          }
          descricao={
            tipoModalProjeto === "github"
              ? "Alguns projetos podem ter mais de um link. Escolha qual repositorio voce quer abrir."
              : projetoSelecionado?.descricaoDetalhada
          }
          imagem={projetoSelecionado?.imagem}
          imagens={
            projetoSelecionado?.imagens ||
            (projetoSelecionado?.imagem ? [projetoSelecionado.imagem] : [])
          }
          fotoInicial={fotoInicialModal}
          tags={tipoModalProjeto === "github" ? [] : projetoSelecionado?.tags}
          links={
            tipoModalProjeto === "github"
              ? projetoSelecionado?.linksGit || []
              : projetoSelecionado?.linksProjeto || []
          }
          onClose={fecharModalProjeto}
        />
      </main>

      {/* Floating Scroll to Top button */}
      <button
        type="button"
        className={`scroll-top-btn ${mostrarTopo ? "visible" : ""}`}
        onClick={voltarAoTopo}
        aria-label="Voltar ao topo da página"
        title="Voltar ao topo"
      >
        <FaChevronUp />
      </button>

      <Footer />
    </>
  );
}

export default App;
