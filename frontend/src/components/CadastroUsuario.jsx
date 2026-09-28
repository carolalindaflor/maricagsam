import { useState } from "react";

const API_URL = "http://localhost:3000";

function CadastroUsuario() {
  const [aberto, setAberto] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
  });

  const [mensagem, setMensagem] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMensagem("Cadastrando...");

    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao cadastrar usuário."
        );
      }

      // ========================================
      // CADASTRO REALIZADO
      // ========================================

      setMensagem(
        "✅ Cadastro realizado com sucesso! Abrindo o login..."
      );

      setForm({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
      });

      // Fecha o formulário de cadastro
      setAberto(false);

      // Avisa a aplicação sobre o cadastro concluído
      window.dispatchEvent(
        new Event("cadastroGSAMConcluido")
      );

      // Leva o usuário até a área de login suavemente
      setTimeout(() => {
        document
          .getElementById("login")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 300);

    } catch (error) {
      console.error("Erro:", error);

      setMensagem(
        `❌ ${error.message}`
      );
    }
  }

  return (
    <section className="cadastro-usuario">
      {!aberto ? (
        <div className="cadastro-container cadastro-convite">
          <h2>Faça parte do GSAM</h2>
          <p>Cadastre-se e faça parte da nossa comunidade.</p>
          <button
            type="button"
            onClick={() => {
              setAberto(true);
              setMensagem("");
            }}
          >
            Criar minha conta
          </button>

          {mensagem && (
            <p className="mensagem-cadastro">
              {mensagem}
            </p>
          )}
        </div>
      ) : (
        <div className="cadastro-container">
          <h2>Crie sua conta</h2>
          <p>
            Cadastre-se no GSAM Maricá e faça parte
            da nossa comunidade.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Nome
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />
            </label>

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
                placeholder="Crie uma senha"
                required
              />
            </label>

            <label>
              WhatsApp
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="+55 21 99999-9999"
              />
            </label>

            <button type="submit">
              Criar minha conta
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
            <p className="mensagem-cadastro">
              {mensagem}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default CadastroUsuario;