export async function up(queryInterface) {
  await queryInterface.bulkInsert("Produtos", [
    {
      nome: "Sabonete artesanal",
      categoria: "Artesanato",
      descricao: "Sabonete feito à mão",
      preco: "R$ 5,00",
      foto: "/assets/sabonete.jpeg",
      telefone: "+5521995650410",
      empreendedorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nome: "Terapêutica",
      categoria: "Bem-estar",
      descricao: "Atendimento terapêutico",
      preco: null,
      foto: "/assets/natalia.jpeg",
      telefone: null,
      empreendedorId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nome: "Professora de Tarô",
      categoria: "Bem-estar",
      descricao: "Atendimento e orientação com Tarô",
      preco: null,
      foto: "/assets/natalia.jpeg",
      telefone: null,
      empreendedorId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nome: "Aula de Piano",
      categoria: "Educação",
      descricao: "Aulas de piano",
      preco: null,
      foto: "/assets/isa.jpeg",
      telefone: null,
      empreendedorId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nome: "Aula de Canto",
      categoria: "Educação",
      descricao: "Aulas de canto",
      preco: null,
      foto: "/assets/isa.jpeg",
      telefone: null,
      empreendedorId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Produtos", null, {});
}