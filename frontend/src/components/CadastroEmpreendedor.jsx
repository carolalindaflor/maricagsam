import { useState } from "react";

const API_URL = "http://localhost:3000";

function CadastroEmpreendedor({ onCadastroSucesso }) {
  const [aberto, setAberto] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    nacionalidade: "",
    descricao: "",
    telefone: "",
    foto: "",
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

    setMensagem("Cadastrando empreendedor...");

    try {
      const response = await fetch(`${API_URL}/empreendedores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erro ao cadastrar empreendedor."
        );
      }

      setMensagem("✅ Empreendedor cadastrado com sucesso!");
      await onCadastroSucesso();

      setForm({
        nome: "",
        nacionalidade: "",
        descricao: "",
        telefone: "",
        foto: "",
      });
    } catch (error) {
      console.error("Erro:", error);
      setMensagem(`❌ Erro: ${error.message}`);
    }
  }

  return (
    <section className="cadastro-empreendedor">
      {!aberto && (
        <div className="cadastro-convite">
          <h2>Quer fazer parte do GSAM Maricá?</h2>

          <p>
            Cadastre seu perfil e divulgue seus produtos ou serviços
            para a comunidade.
          </p>

          <button
            type="button"
            className="botao-abrir-cadastro"
            onClick={() => setAberto(true)}
          >
            + Cadastrar como empreendedor
          </button>
        </div>
      )}

      {aberto && (
        <div className="cadastro-form-container">
          <div className="cadastro-form-header">
            <div>
              <h2>Cadastrar empreendedor</h2>

              <p>
                Preencha seus dados para fazer parte da comunidade
                empreendedora do GSAM Maricá.
              </p>
            </div>

            <button
              type="button"
              className="botao-fechar-cadastro"
              onClick={() => setAberto(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Nome completo
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex.: Maria Silva"
                required
              />
            </label>

            <label>
                  Nacionalidade
                 <select
                 name="nacionalidade"
                 value={form.nacionalidade}
                onChange={handleChange}
                 required
                >
                 <option value="">Selecione sua nacionalidade</option>
                 <option value="Venezuelana">🇻🇪 Venezuelana</option>
                 <option value="Argentina">🇦🇷 Argentina</option>
                 <option value="Cubana">🇨🇺 Cubana</option>
                 <option value="Colombiana">🇨🇴 Colombiana</option>
                 <option value="Peruana">🇵🇪 Peruana</option>
                 <option value="Boliviana">🇧🇴 Boliviana</option>
                 <option value="Paraguaia">🇵🇾 Paraguaia</option>
                 <option value="Uruguaia">🇺🇾 Uruguaia</option>
                 <option value="Brasileira">🇧🇷 Brasileira</option>
                 <option value="Outra">🌎 Outra</option>
                 </select>
                </label>

            <label>
              Descrição
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Conte um pouco sobre você e seu trabalho..."
                rows={4}
              />
            </label>

            <label>
              WhatsApp para contato
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="+55 21 99999-9999"
              />
            </label>

            <label>
              Foto
              <input
                type="text"
                name="foto"
                value={form.foto}
                onChange={handleChange}
                placeholder="/assets/minha-foto.jpeg"
              />
            </label>

            <button
              type="submit"
              className="botao-publicar-empreendedor"
            >
              Cadastrar empreendedor
            </button>
          </form>

          {mensagem && (
            <p className="mensagem-cadastro">{mensagem}</p>
          )}
        </div>
      )}
    </section>
  );
}

export default CadastroEmpreendedor;