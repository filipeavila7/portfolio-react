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
import { FaCode, FaLaptopCode, FaGlobe, FaClock, FaGithub, FaFolder, FaDocker, FaCss3, FaFigma, FaBootstrap, FaHtml5, FaGitAlt, FaJava, FaPython, FaReact, FaGraduationCap, FaAward, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { SiVite, SiFastapi, SiTypescript, SiJavascript, SiSpringsecurity, SiMysql, SiSpringboot, SiFlask } from "react-icons/si";
import { projetos } from "./service/projetos";
import CardProj from "./components/CardProj";
import ProjectModal from "./components/ProjectModal";

function App() {
  const [secaoAtiva, setSecaoAtiva] = useState("inicio");
  const [filtro, setFiltro] = useState("TODOS");
  const [modalProjeto, setModalProjeto] = useState(null);
  const [tipoModalProjeto, setTipoModalProjeto] = useState("detalhes");

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

    function atualizarSecaoAtiva() {
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

    atualizarSecaoAtiva();
    window.addEventListener("scroll", atualizarSecaoAtiva);

    return () => {
      window.removeEventListener("scroll", atualizarSecaoAtiva);
    };
  }, []);

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

  function abrirProjeto(projeto) {
    setModalProjeto(projeto);
    setTipoModalProjeto("detalhes");
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
        "Visualizar deploy ou demonstracao"
      ),
      linksGit: normalizarLinks(
        modalProjeto.linkGit,
        modalProjeto.linksGit,
        "Abrir repositorio",
        "Codigo-fonte do projeto"
      ),
    }
    : null;

  const contatos = [
    {
      titulo: "LinkedIn",
      descricao: "Para networking, oportunidades e conversas profissionais.",
      acao: "Abrir perfil",
      valor: "https://www.linkedin.com/in/filipe-pereira-ab843530a",
      href: "https://www.linkedin.com/in/filipe-pereira-ab843530a",
      destaque: false,
      icone: <FaLinkedin />
    },
    {
      titulo: "E-mail",
      descricao: "Melhor canal para propostas, freelance ou contato direto.",
      acao: "Enviar e-mail",
      valor: "filipeavila076@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=filipeavila076@gmail.com",
      destaque: true,
      icone: <FaEnvelope />
    },
    {
      titulo: "GitHub",
      descricao: "Aqui voce pode acompanhar meus projetos e meu codigo.",
      acao: "Ver GitHub",
      valor: "https://github.com/filipeavila7",
      href: "https://github.com/filipeavila7",
      destaque: false,
      icone: <FaGithub />
    },
    {
      titulo: "WhatsApp",
      descricao: "Contato rapido para conversas objetivas e alinhamentos.",
      acao: "Chamar no WhatsApp",
      valor: "55 (61) 98418-8269",
      href: "https://wa.me/5561984188269",
      destaque: false,
      icone: <FaWhatsapp />
    }
  ];


  return (
    <>
      <div className="app-inicio-lay">
        <div className="overlay"></div>
        <NavBar secaoAtiva={secaoAtiva} />
        <section id="inicio" className="inicio-sec">
          <div className="inicio-box">
            <div className="dados-box">
              <div className="dev">
                <p>● FULLSTACK DEVELOPER</p>
              </div>
              <h1>
                Filipe <span>Pereira</span>
              </h1>
              <p className="descricao">
                Desenvolvedor Full Stack em inicio de carreira, focado no
                desenvolvimento de aplicacoes web modernas e responsivas.
              </p>
              <div className="redes-box">
                <div className="redes-lay">
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <div className="redes-lay">
                  <i className="fa-brands fa-linkedin"></i>
                </div>
                <div className="redes-lay">
                  <i className="fa-brands fa-github"></i>
                </div>
              </div>
              <div className="botao-box">
                <button className="btn-projetos">
                  Ver Projetos
                  <img className="btn-icon" src="/flecha.png" alt="" />
                </button>
                <button className="btn-contato">
                  Entre em contato
                  <img className="btn-icon" src="/balao.png" alt="" />
                </button>
              </div>
            </div>
            <div className="img-inicio-box">
              <img src="/foto.jpeg" alt="Foto de Filipe Pereira" />
            </div>
          </div>
        </section>
      </div>

      <main className="app-lay">
        <section id="sobre" className="sobre-sec">
          <div className="sobre-box">
            <div className="sobre-content sobre-principal">

              <h2>
                <span>●</span> Sobre <span>mim</span>
              </h2>
              <p>
                Sou um desenvolvedor Full Stack em constante evolução, apaixonado por transformar ideias em aplicações funcionais, bem estruturadas e com ótima experiência para o usuário.
              </p>
              <p>
                Tenho foco tanto no desenvolvimento de interfaces modernas e intuitivas no frontend, quanto na construção de backends robustos, escaláveis e bem organizados, com atenção especial a boas práticas de desenvolvimento, principalmente com Java.
              </p>
              <p>
                Atualmente, estou em busca da minha primeira oportunidade na área de tecnologia, enquanto aprofundo meus estudos em desenvolvimento frontend, backend e engenharia de software.
              </p>
              <p>
                Estou cursando Engenharia de Software e concluí o ensino médio junto a um curso técnico em Desenvolvimento de Sistemas, o que me proporcionou uma base sólida em lógica de programação, arquitetura de sistemas e desenvolvimento de aplicações completas.
              </p>


            </div>

            <div className="sobre-side">
              <div className="sobre-card">
                <p className="card-top">Meu foco</p>

                <p>
                  Tenho como objetivo constante aprimorar minha criatividade e raciocínio lógico, aplicando essas habilidades na resolução de problemas de maneira eficiente, estruturada e orientada a boas práticas.
                </p>
              </div>

              <div className="sobre-card stack-card">

                <div className="stack-grid">
                  <div className="destaque-item">
                    <img src="/rocket.png" alt="" className="destaque-icon" />
                    <p>Ágil</p>
                  </div>
                  <div className="destaque-item">
                    <img src="/chat.png" alt="" className="destaque-icon" />
                    <p>Comunicativo</p>
                  </div>
                  <div className="destaque-item">
                    <img src="/grupo.png" alt="" className="destaque-icon" />
                    <p>Trabalho em equipe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="tecnologias" className="tec-sec">
          <div className="tec-box">
            <h2>Tecnologias</h2>
            <div className="tec-lay">
              <p className="tec-descricao">Back-end</p>
              <div className="tecs">
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaJava className="tec" />
                  </div>
                  <p>Java</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaPython className="tec" />
                  </div>
                  <p>Python</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiFastapi className="tec" />
                  </div>
                  <p>Fast api</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    < SiFlask className="tec" />
                  </div>
                  <p>Flask</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiMysql className="tec" />
                  </div>
                  <p>MySql</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiSpringboot className="tec" />
                  </div>
                  <p>Spring boot</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiSpringsecurity className="tec" />
                  </div>
                  <p>S-security</p>
                </div>
              </div>
            </div>
            <div className="tec-lay">
              <p className="tec-descricao">Front-end</p>
              <div className="tecs">
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiJavascript className="tec" />
                  </div>
                  <p>Java-script</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaReact className="tec" />
                  </div>
                  <p>React</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaCss3 className="tec" />
                  </div>
                  <p>CSS</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaFigma className="tec" />
                  </div>
                  <p>Figma</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaBootstrap className="tec" />
                  </div>
                  <p>Bootstrap</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaHtml5 className="tec" />
                  </div>
                  <p>HTML</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiTypescript className="tec" />
                  </div>
                  <p>Type-script</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <SiVite className="tec" />
                  </div>
                  <p>Vite</p>
                </div>
              </div>
            </div>
            <div className="tec-lay">
              <p className="tec-descricao">Ferramentas</p>
              <div className="tecs">
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaGitAlt className="tec" />
                  </div>
                  <p>Git</p>
                </div>
                <div className="tec-content">
                  <div className="tec-box-content">
                    <FaGithub className="tec" />
                  </div>
                  <p>Git hub</p>
                </div>
                <div className="tec-content">
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
          <div className="form-box">
            <div className="form-header">
              <p className="form-tag">MINHA JORNADA</p>
              <h2>Formações</h2>
              <p className="form-intro">
                Minha base foi construida unindo teoria, pratica e contato com
                desenvolvimento de sistemas desde cedo.
              </p>
            </div>
          </div>

          <div className="form-timeline">
            <div className="form-line"></div>
            <article className="form-card">
              <div className="form-dot">
                <FaGraduationCap />
              </div>
              <div className="form-periodo">2023 - 2025 - Concluído</div>
              <h3>Ensino Médio + Técnico em Desenvolvimento de Sistemas</h3>
              <p className="form-local">Curso técnico - Senai</p>
              <p>
                Etapa que fortaleceu minha lógica de programação, banco de
                dados, estrutura de sistemas e construção de projetos na
                prática.
              </p>
            </article>
            <article className="form-card">
              <div className="form-dot">
                <FaGraduationCap />
              </div>
              <div className="form-periodo">2026 - Atual</div>
              <h3>Engenharia de Software</h3>
              <p className="form-local">Graduação - Uni Projeção</p>
              <p>
                Formação voltada para arquitetura de software, boas práticas,
                qualidade de código e desenvolvimento de aplicações completas.
              </p>
            </article>


          </div>
        </section>
        <section id="certificados" className="cert-sec">
          <div className="cert-header">
            <p className="cert-tag">APRENDIZADO CONTINUO</p>
            <h2>Certificados</h2>
            <p className="cert-intro">
              Cursos e certificacoes que reforcaram minha base tecnica em
              desenvolvimento, ferramentas e boas praticas.
            </p>
          </div>
          <div className="cert-box">
            <article className="cert-card cert-card-destaque">
              <div className="cert-card-top">
                <span className="cert-pill">Java</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>Java Orientado a Objetos</h3>
              <p className="cert-origem">Curso complementar</p>
              <p>
                Estudos focados em POO, classes, encapsulamento, heranca e
                organizacao de codigo para projetos backend.
              </p>
              <div className="cert-meta">
                <span>Concluido</span>
                <span>Certificado disponivel</span>
              </div>
            </article>

            <article className="cert-card">
              <div className="cert-card-top">
                <span className="cert-pill">Frontend</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>HTML, CSS e JavaScript</h3>
              <p className="cert-origem">Curso complementar</p>
              <p>
                Base para criacao de interfaces responsivas, estruturacao de
                paginas e interatividade no navegador.
              </p>
              <div className="cert-meta">
                <span>Concluido</span>
                <span>Web</span>
              </div>
            </article>

            <article className="cert-card">
              <div className="cert-card-top">
                <span className="cert-pill">Banco de Dados</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>Modelagem e SQL</h3>
              <p className="cert-origem">Curso complementar</p>
              <p>
                Conteudos voltados para consultas, relacoes, estrutura de
                tabelas e uso de banco de dados em sistemas reais.
              </p>
              <div className="cert-meta">
                <span>Concluido</span>
                <span>SQL</span>
              </div>
            </article>

            <article className="cert-card">
              <div className="cert-card-top">
                <span className="cert-pill">Ferramentas</span>
                <div className="cert-icon">
                  <FaAward />
                </div>
              </div>
              <h3>Git e Versionamento</h3>
              <p className="cert-origem">Curso complementar</p>
              <p>
                Aprendizado sobre controle de versao, fluxo de trabalho e
                organizacao de projetos em equipe.
              </p>
              <div className="cert-meta">
                <span>Concluido</span>
                <span>Git</span>
              </div>
            </article>
          </div>
        </section>

        <section id="projetos" className="proj-sec">
          <div className="proj-header">
            <p className="proj-tag">NA PRÁTICA</p>
            <h2>Meus <span>Projetos</span> </h2>


            <p className="proj-intro">Meus projetos práticos</p>

            <div className="filtro-box">
              <div onClick={() => setFiltro("TODOS")}
                className={`filtro ${filtro === "TODOS" ? "active" : ""}`}>
                <FaFolder className={`filtro-icon ${filtro === "TODOS" ? "active" : ""}`} />
                <p>Todos</p>
              </div>
              <div onClick={() => setFiltro("API")} 
              className={`filtro ${filtro === "API" ? "active" : ""}`}>
                <FaCode className={`filtro-icon ${filtro === "API" ? "active" : ""}`} />
                <p>Api</p>
              </div>
              <div onClick={() => setFiltro("FULL")} 
              className={`filtro ${filtro === "FULL" ? "active" : ""}`}>
                <FaLaptopCode className={`filtro-icon ${filtro === "FULL" ? "active" : ""}`} />
                <p>Full</p>
              </div>
              <div onClick={() => setFiltro("PAGINA")} 
              className={`filtro ${filtro === "PAGINA" ? "active" : ""}`}>
                <FaGlobe className={`filtro-icon ${filtro === "PAGINA" ? "active" : ""}`} />
                <p>Páginas</p>
              </div>
              <div onClick={() => setFiltro("ANDAMENTO")} 
              className={`filtro ${filtro === "ANDAMENTO" ? "active" : ""}`}>
                <FaClock className={`filtro-icon ${filtro === "ANDAMENTO" ? "active" : ""}`} />
                <p>Em andamento</p>
              </div>

            </div>
          </div>


          <div className="proj-box">
            {projetosFiltrados.map((projeto, index) => (
              <CardProj
                key={index}
                projeto={projeto}
                onOpenProject={abrirProjeto}
                onOpenGithub={abrirGithub}
              />
            ))}
          </div>
        </section>

        <section id="contato" className="contato-sec">
          <div className="contato-header">
            <p className="contato-tag">VAMOS CONVERSAR</p>
            <h2>
              Entre em <span>contato</span>
            </h2>
            <p className="contato-intro">
              Se quiser conversar sobre projetos, oportunidade de estagio,
              freelance ou tecnologia, estes sao os canais mais rapidos para me
              encontrar.
            </p>
          </div>

          <div className="contato-box">
            {contatos.map((contato, index) => (
              <article
                key={index}
                className={`contato-card ${contato.destaque ? "contato-card-destaque" : ""}`}
              >
                <div className="contato-card-top">
                  <div className="contato-icon">
                    {contato.icone}
                  </div>
                  {contato.destaque && (
                    <span className="contato-badge">Canal principal</span>
                  )}
                </div>

                <h3>{contato.titulo}</h3>
                <p className="contato-desc">{contato.descricao}</p>
                <p className="contato-valor">{contato.valor}</p>

                <a href={contato.href} className="contato-link">
                  {contato.acao}
                </a>
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
          tags={tipoModalProjeto === "github" ? [] : projetoSelecionado?.tags}
          links={
            tipoModalProjeto === "github"
              ? projetoSelecionado?.linksGit || []
              : projetoSelecionado?.linksProjeto || []
          }
          onClose={fecharModalProjeto}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
