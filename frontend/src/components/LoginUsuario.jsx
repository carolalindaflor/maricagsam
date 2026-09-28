import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

function LoginUsuario() {
  const [aberto, setAberto] = useState(false);

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");

  // ========================================
  // ESCUTA O EVENTO DE CADASTRO CONCLUÍDO
  // ========================================
  useEffect(() => {
    function abrirLogin() {
      setAberto(true);
      setMensagem(
        "✅ Cadastro realizado! Agora entre na sua conta."
      );
    }

    window.addEventListener(
      "cadastroGSAMConcluido",
      abrirLogin
    );

    return () => {
      window.removeEventListener(
        "cadastroGSAMConcluido",
        abrirLogin
      );
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMensagem("Entrando...");

    try {
      const response = await fetch(
        `${API_URL}/usuarios/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao fazer login."
        );
      }

      // ========================================
      // USUÁRIO LOGADO COM SUCESSO
      // ========================================

      // Salva o usuário no localStorage
      localStorage.setItem(
        "usuarioGSAM",
        JSON.stringify(data.usuario)
      );

      // Avisa o App que o login foi realizado
      window.dispatchEvent(
        new Event("usuarioGSAMLogado")
      );

      // Mensagem de sucesso
      setMensagem(
        `✅ Bem-vinda, ${data.usuario.nome}!`
      );

      // Limpa os campos
      setForm({
        email: "",
        senha: "",
      });

    } catch (error) {
      console.error("Erro:", error);
      setMensagem(`❌ ${error.message}`);
    }
  }

  return (
    <section className="login-usuario">
      {!aberto ? (
        <div className="login-container login-convite">
          <h2>Entrar no GSAM</h2>
          <p>Acesse sua conta para continuar.</p>
          <button
            type="button"
            onClick={() => {
              setAberto(true);
              setMensagem("");
            }}
          >
            Entrar
          </button>
        </div>
      ) : (
        <div className="login-container">
          <h2>Entrar na sua conta</h2>
          <p>Digite seu e-mail e sua senha para acessar.</p>

          <form onSubmit={handleSubmit}>
            <label>
              E-mail
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </label>

            <label>
              Senha
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                placeholder="Sua senha"
                required
              />
            </label>

            <button type="submit">
              Entrar
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setAberto(false);
                setMensagem("");
              }}
            >
              Fechar
            </button>
          </form>

          {mensagem && (
            <p className="mensagem-login">
              {mensagem}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default LoginUsuario;