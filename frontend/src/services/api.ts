const API_URL = "http://localhost:3000";

export interface Empreendedor {
  id: number;
  nome: string;
  nacionalidade: string;
  descricao: string;
  telefone?: string;
  foto?: string;
}

export async function getEmpreendedores(): Promise<Empreendedor[]> {
  const response = await fetch(`${API_URL}/empreendedores`);

  if (!response.ok) {
    throw new Error("Erro ao buscar empreendedores");
  }

  return response.json();
}
export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  descricao?: string;
  preco?: string;
  foto?: string;
  telefone?: string;
  empreendedorId: number;
}

export async function getProdutos(): Promise<Produto[]> {
  const response = await fetch(`${API_URL}/produtos`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}