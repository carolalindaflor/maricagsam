import { useEffect, useState, useCallback } from "react";

// CSS
// @ts-expect-error CSS imports are handled by the bundler.
import "./App.css";

import Loading from "./components/loading";
import AdicionarProduto from "./components/AdicionarProduto";
import CadastroUsuario from "./components/CadastroUsuario";
import LoginUsuario from "./components/LoginUsuario";
import CadastroEmpreendedor from "./components/CadastroEmpreendedor";
import {
  getEmpreendedores,
  getProdutos,
  type Empreendedor,
  type Produto,
} from "./services/api";

// ========================================
// FUNÇÃO PARA CORRIGIR CAMINHO DAS IMAGENS
// ========================================
function getImagem(url?: string) {
  if (!url) {
    return "/assets/default-avatar.png";
  }

  if (url.startsWith("http")) {
    return url;
  }

  if (url.startsWith("/")) {
    return url;
  }

  return `/assets/${url}`;
}

// ========================================
// IMAGEM DOS PRODUTOS
// ========================================
function getImagemProduto(url?: string) {
  if (!url) {
    return "/assets/default-product.png";
  }

  if (url.startsWith("http")) {
    return url;
  }

  if (url.startsWith("/")) {
    return url;
  }

  return `/assets/${url}`;
}

// ========================================
// APP
// ========================================
function App() {
  // ========================================
  // ESTADOS
  // ========================================

  const [loadingInicial, setLoadingInicial] = useState(true);

  const [empreendedores, setEmpreendedores] = useState<
    Empreendedor[]
  >([]);

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [loadingApi, setLoadingApi] = useState(true);

  const [erro, setErro] = useState("");

  const [contatoAberto, setContatoAberto] = useState(false);

  const [empreendedoraSelecionada, setEmpreendedoraSelecionada] =
    useState<Empreendedor | null>(null);

  // ========================================
  // USUÁRIO LOGADO
  // ========================================

  const [usuarioLogado, setUsuarioLogado] = useState<{
    nome: string;
  } | null>(() => {
    const usuarioSalvo = localStorage.getItem("usuarioGSAM");

    if (!usuarioSalvo) {
      return null;
    }

    try {
      return JSON.parse(usuarioSalvo) as { nome: string };
    } catch {
      return null;
    }
  });

  // ========================================
  // ATUALIZAR ESTADO DE LOGIN VIA EVENTO
  // ========================================
  useEffect(() => {
    function atualizarUsuario() {
      const usuarioSalvo =
        localStorage.getItem("usuarioGSAM");

      if (!usuarioSalvo) {
        setUsuarioLogado(null);
        return;
      }

      try {
        setUsuarioLogado(
          JSON.parse(usuarioSalvo)
        );
      } catch {
        setUsuarioLogado(null);
      }
    }

    window.addEventListener(
      "usuarioGSAMLogado",
      atualizarUsuario
    );

    return () => {
      window.removeEventListener(
        "usuarioGSAMLogado",
        atualizarUsuario
      );
    };
  }, []);

  // ========================================
  // SAIR DO GSAM
  // ========================================

  function sairDoGSAM() {
    localStorage.removeItem("usuarioGSAM");
    setUsuarioLogado(null);
  }

  // ========================================
  // LOADING INICIAL
  // ========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingInicial(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // ========================================
  // BUSCAR EMPREENDEDORES E PRODUTOS
  // ========================================

  const carregarDados = useCallback(async () => {
    try {
      setLoadingApi(true);
      setErro("");

      const [dadosEmpreendedores, dadosProdutos] =
        await Promise.all([
          getEmpreendedores(),
          getProdutos(),
        ]);

      setEmpreendedores(
        Array.isArray(dadosEmpreendedores)
          ? dadosEmpreendedores
          : []
      );

      setProdutos(
        Array.isArray(dadosProdutos)
          ? dadosProdutos
          : []
      );
    } catch (error) {
      console.error("Erro ao carregar dados:", error);

      setErro(
        "Não foi possível carregar os dados. Verifique se a API está funcionando."
      );
    } finally {
      setLoadingApi(false);
    }
  }, []);

  // ========================================
  // CARREGAR API
  // ========================================

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // ========================================
  // SELECIONAR EMPREENDEDORA
  // ========================================

  function selecionarEmpreendedora(
    empreendedor: Empreendedor
  ) {
    setEmpreendedoraSelecionada(empreendedor);
  }

  // ========================================
  // PRODUTOS DA EMPREENDEDORA
  // ========================================

  const produtosDaEmpreendedora =
    empreendedoraSelecionada
      ? produtos.filter(
          (produto) =>
            Number(produto.empreendedorId) ===
            Number(empreendedoraSelecionada.id)
        )
      : [];

  // ========================================
  // LOADING INICIAL
  // ========================================

  if (loadingInicial) {
    return <Loading />;
  }

  // ========================================
  // RETURN
  // ========================================

  return (
    <div className="gsam-app">

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="header">
        <div className="container header-content">
          <div className="logo-area">
            <img
              src="/assets/logo.jpeg"
              alt="GSAM Maricá"
              className="logo"
            />
            <div>
              <strong>GSAM</strong>
              <span>Maricá</span>
            </div>
          </div>

          <nav className="nav">
            <a href="#inicio">Início</a>
            <a href="#sobre">Conheça o GSAM</a>
            <a href="#empreendedores">Empreendedores</a>
            <a href="#projetos">Projetos</a>
            <a href="#contato">Contato</a>
          </nav>

          {usuarioLogado ? (
            <span className="usuario-menu">
              Olá, {usuarioLogado.nome} 👋
            </span>
          ) : (
            <a href="#login" className="login-button">
              Entrar
            </a>
          )}
        </div>
      </header>

      <main>
        {/* ========================================
            HERO
        ======================================== */}
        <section id="inicio" className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <span className="hero-tag">GSAM • MARICÁ</span>
              <h1>
                Acolher.
                <br />
                Integrar.
                <br />
                <strong>Conectar.</strong>
              </h1>
              <p>
                Uma plataforma para valorizar pessoas migrantes, fortalecer seus negócios e conectar a comunidade empreendedora de Maricá.
              </p>
              <div className="hero-actions">
                <a href="#sobre" className="primary-button">
                  Conheça o GSAM
                </a>
                <a href="#empreendedores" className="secondary-button">
                  Ver empreendedores
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src="/assets/Marica.jpeg" alt="Maricá" />
            </div>
          </div>
        </section>

        {/* ========================================
            SOBRE
        ======================================== */}
        <section id="sobre" className="section">
          <div className="container">
            <span className="section-tag">QUEM SOMOS</span>
            <h2>Uma comunidade que acolhe e transforma</h2>
            <p className="section-description">
              O GSAM Maricá promove acolhimento, integração, diversidade e oportunidades para pessoas migrantes e refugiadas, fortalecendo seus talentos, negócios e conexões com a comunidade local.
            </p>

            <div className="sobre-cards">
  <div className="sobre-card">
    <span className="sobre-icon">🤝</span>
    <h3>Acolhimento</h3>
    <p>
      Criar espaços de integração e pertencimento para pessoas migrantes e refugiadas.
    </p>
  </div>

  <div className="sobre-card">
    <span className="sobre-icon">🌎</span>
    <h3>Diversidade</h3>
    <p>
      Valorizar diferentes culturas, histórias, talentos e experiências.
    </p>
  </div>

  <div className="sobre-card">
    <span className="sobre-icon">🚀</span>
    <h3>Oportunidades</h3>
    <p>
      Conectar pessoas, negócios e novas possibilidades de crescimento.
    </p>
  </div>
</div>
          </div>
        </section>

        {/* ========================================
            EMPREENDEDORES
        ======================================== */}
        <section id="empreendedores" className="section section-light">
          <div className="container">
            <span className="section-tag">EMPREENDEDORISMO</span>
            <h2>Conheça nossos empreendedores</h2>
            <p className="section-description">
              Conheça as histórias, talentos e negócios de pessoas migrantes que empreendem em Maricá.
               Clique em uma empreendedora para conhecer seus produtos e serviços
            </p>

            {loadingApi && (
              <div className="entrepreneur-card">
                <div>
                  <h3>Carregando...</h3>
                  <p>Buscando dados na API GSAM.</p>
                </div>
              </div>
            )}

            {!loadingApi && erro && (
              <div className="entrepreneur-card">
                <div>
                  <h3>Não foi possível carregar</h3>
                  <p>{erro}</p>
                </div>
              </div>
            )}

            {!loadingApi && !erro && empreendedores.length > 0 && (
              <div className="entrepreneurs-grid">
                {empreendedores.map((empreendedor) => (
                  <article
                    className="entrepreneur-card"
                    key={empreendedor.id}
                    onClick={() => selecionarEmpreendedora(empreendedor)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        selecionarEmpreendedora(empreendedor);
                      }
                    }}
                  >
                    <div className="card-photo">
                      <img
                        src={getImagem(empreendedor.foto)}
                        alt={empreendedor.nome}
                        onError={(event) => {
                          event.currentTarget.src = "/assets/default-avatar.png";
                        }}
                      />
                    </div>

                    <div className="card-content">
                      <h3>{empreendedor.nome}</h3>
                      <p>{empreendedor.nacionalidade === "Venezuelana" && "🇻🇪 "}
                         {empreendedor.nacionalidade === "Argentina" && "🇦🇷 "}
                         {empreendedor.nacionalidade === "Cubana" && "🇨🇺 "}
                         {empreendedor.nacionalidade}</p>
                      <span>{empreendedor.descricao}</span>

                      {empreendedor.telefone && (
                        <small>Telefone: {empreendedor.telefone}</small>
                      )}

                      <button
                        type="button"
                        className="primary-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          selecionarEmpreendedora(empreendedor);
                        }}
                      >
                        Ver produtos
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ========================================
                PRODUTOS
            ======================================== */}
            {empreendedoraSelecionada && (
              <section className="products-section">
                <div className="products-header">
                  <div>
                    <span className="section-tag">PRODUTOS</span>
                    <h2>Produtos de {empreendedoraSelecionada.nome}</h2>
                  </div>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setEmpreendedoraSelecionada(null)}
                  >
                    Fechar
                  </button>
                </div>
                    <div className="aviso-produtos">
                  <strong>Importante:</strong> O GSAM Maricá atua como uma plataforma de divulgação e conexão.
                  A negociação, o pagamento, a entrega e a prestação dos produtos ou serviços são de responsabilidade exclusiva do empreendedor e do cliente.
                 </div>
                {produtosDaEmpreendedora.length === 0 ? (
                  <div className="entrepreneur-card">
                    <div>
                      <h3>Nenhum produto cadastrado</h3>
                      <p>Esta empreendedora ainda não possui produtos cadastrados.</p>
                    </div>
                  </div>
                ) : (
                  <div className="products-grid">
                    {produtosDaEmpreendedora.map((produto) => (
                      <article className="product-card" key={produto.id}>
                        <div className="product-photo">
                          <img
                            src={getImagemProduto(produto.foto)}
                            alt={produto.nome}
                            onError={(event) => {
                              event.currentTarget.src = "/assets/default-product.png";
                            }}
                          />
                        </div>

                        <div className="product-content">
                          <h3>{produto.nome}</h3>
                          <p>{produto.categoria}</p>

                          {produto.descricao && <span>{produto.descricao}</span>}

                          {produto.preco && (
                            <strong>
                              {typeof produto.preco === "number"
                                ? Number(produto.preco).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })
                                : produto.preco}
                            </strong>
                          )}

                          {produto.telefone && (
                            <small>Contato: {produto.telefone}</small>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </section>

        {/* ========================================
            ADICIONAR PRODUTO
        ======================================== */}
       <section id="adicionar-produto" className="section">
       <div className="container">
      <AdicionarProduto empreendedores={empreendedores} />
       </div>
       </section>
       <section id="cadastro-empreendedor" className="section">
       <div className="container">
      <CadastroEmpreendedor onCadastroSucesso={carregarDados} />
       </div>
      </section>

        {/* ========================================
            CADASTRO
        ======================================== */}
        <section id="cadastro" className="section">
          <div className="container">
            <CadastroUsuario />
          </div>
        </section>

        {/* ========================================
            LOGIN
        ======================================== */}
        <section id="login" className="section">
          <div className="container">
            {usuarioLogado ? (
              <div className="usuario-logado">
                <strong>Olá, {usuarioLogado.nome}! 👋</strong>
                <p>Você está conectada ao GSAM Maricá.</p>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={sairDoGSAM}
                >
                  Sair
                </button>
              </div>
            ) : (
              <LoginUsuario />
            )}
          </div>
        </section>

        {/* ========================================
            PROJETOS
        ======================================== */}
        <section id="projetos" className="section">
          <div className="container">
            <span className="section-tag">NOSSOS PROJETOS</span>
            <h2>Iniciativas que aproximam pessoas</h2>
            <div className="projects-grid">
              <article className="project-card">
                <h3>Sementinhas da Inclusão</h3>
                <p>Ações de inclusão e integração comunitária.</p>
              </article>
              <article className="project-card">
                <h3>Sabores sem Fronteiras</h3>
                <p>Gastronomia, cultura e empreendedorismo.</p>
              </article>
              <article className="project-card">
                <h3>Orientação ao Migrante</h3>
                <p>Informação e apoio para a comunidade migrante.</p>
              </article>
              <article className="project-card">
                <h3>Cultura e Diversidade</h3>
                <p>Valorização das diferentes culturas.</p>
              </article>
              <article className="project-card">
                 <h3>Ludoteca Poliglota</h3>
                 <p>Atividades lúdicas e educativas para aproximar crianças e famílias de diferentes culturas e idiomas.
                </p>
              </article>
              
            </div>
          </div>
        </section>

        {/* ========================================
            CONTATO
        ======================================== */}
        <section id="contato" className="section section-light">
       <div className="container">
       <span className="section-tag">CONTATO</span>

       <h2>Fale com o GSAM Maricá</h2>

      <p className="section-description">
      Entre em contato para conhecer melhor o trabalho do GSAM Maricá,
      tirar dúvidas ou saber mais sobre nossas iniciativas.
      </p>

     {contatoAberto && (
     <div className="contato-info">
     <div className="contato-card">
      <span className="contato-icon">📞</span>
      <h3>Telefone</h3>
      <a href="tel:+5521996171684">
        +55 21 99617-1684
      </a>
    </div>

    <div className="contato-card">
      <span className="contato-icon">📱</span>
      <h3>Instagram</h3>
      <a
        href="https://www.instagram.com/migracaomarica/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @migracaomarica
      </a>
    </div>
  </div>
)}
    </div>
      
     </section>
       
       <button
       type="button"
       className="botao-contato"
       onClick={() => setContatoAberto(!contatoAberto)}
      > {contatoAberto ? "Fechar contato" : "Ver contatos"}
      </button>

        </main>

        {/* ========================================
          FOOTER
        ======================================== */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 GSAM Maricá • Acolher • Integrar • Conectar • Empreender</p>
        </div>
      </footer>
    </div>
  );
}

export default App;