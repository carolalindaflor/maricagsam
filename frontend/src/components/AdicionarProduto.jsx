import { useState } from "react";

const API_URL = "http://localhost:3000";

function AdicionarProduto({ empreendedores }) {
  const [aberto, setAberto] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    preco: "",
    telefone: "",
    empreendedorId: "",
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
    setMensagem("Publicando produto ou serviço...");

    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao publicar produto ou serviço.");
      }

      setMensagem("✅ Produto ou serviço publicado com sucesso!");

      // Limpa o formulário após o sucesso
      setForm({
        nome: "",
        categoria: "",
        descricao: "",
        preco: "",
        telefone: "",
        empreendedorId: "",
        foto: "",
      });
    } catch (error) {
      console.error("Erro:", error);
      setMensagem(`❌ Erro: ${error.message}`);
    }
  }

  return (
    <section className="adicionar-produto">
      {!aberto && (
        <div className="produto-convite">
          <h2>Tem um produto ou serviço?</h2>
          <p>
            Divulgue seu trabalho e faça parte da comunidade empreendedora do GSAM Maricá.
          </p>
          <button
            type="button"
            className="botao-abrir-produto"
            onClick={() => setAberto(true)}
          >
            + Adicionar produto ou serviço
          </button>
        </div>
      )}

      {aberto && (
        <div className="produto-form-container">
          <div className="produto-form-header">
            <div>
              <h2>Adicionar produto ou serviço</h2>
              <p> Divulgue seu produto ou serviço na comunidade GSAM Maricá.
  Os clientes poderão entrar em contato diretamente com você para conhecer
  seu trabalho e combinar os detalhes.</p>
            </div>
            <button
              type="button"
              className="botao-fechar-produto"
              onClick={() => setAberto(false)}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Nome do produto ou serviço
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex.: Sabonete artesanal"
                required
              />
            </label>

            <label>
              Categoria
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Artesanato">Artesanato</option>
                <option value="Moda">Moda</option>
                <option value="Beleza">Beleza</option>
                <option value="Bem-estar">Bem-estar</option>
                <option value="Educação">Educação</option>
                <option value="Serviços">Serviços</option>
                <option value="Outros">Outros</option>
              </select>
            </label>

            <label>
              Descrição
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Conte um pouco sobre seu produto ou serviço..."
                rows={4}
              />
            </label>

            <label>
              Preço
              <input
                type="text"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                placeholder="Ex.: R$ 20,00 ou A combinar"
              />
            </label>

            <label>
              WhatsApp para contato
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="+55 21 99565-0410"
              />
            </label>

            
              <label>
             Empreendedor
             <select
               name="empreendedorId"
               value={form.empreendedorId}
               onChange={handleChange}
               required
              >
             <option value="">Selecione seu nome</option>

             {empreendedores.map((empreendedor) => (
             <option key={empreendedor.id} value={empreendedor.id}>
             {empreendedor.nome}
             </option>
             ))}
            </select>
            </label>
              
            <label>
              Foto do produto ou serviço
              <input
                type="text"
                name="foto"
                value={form.foto}
                onChange={handleChange}
                placeholder="/assets/produto.jpg"
              />
            </label>

            <button type="submit" className="botao-publicar-produto">
              Publicar produto ou serviço
            </button>
          </form>

          {mensagem && <p className="mensagem-produto">{mensagem}</p>}
        </div>
      )}
    </section>
  );
}

export default AdicionarProduto;