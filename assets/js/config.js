/* =====================================================================
   CONFIGURAÇÃO DO SITE — este é o único arquivo que você precisa editar
   no dia a dia (contatos e projetos).
   ===================================================================== */

window.SITE = {

  /* ---------- CONTATO ---------- */
  contato: {
    // WhatsApp: só números, com código do país (55) e DDD. Ex.: "5519999998888"
    // Se ficar vazio, os botões de WhatsApp não aparecem no site.
    whatsapp: "5519982828786",
    whatsappMensagem: "Olá, Felipe! Vi seu site e gostaria de conversar sobre um projeto de BI.",

    email: "felipe.bitencourt.magalhaes@gmail.com",

    // Endereço completo do perfil. Ex.: "https://www.linkedin.com/in/seu-usuario"
    // Se ficar vazio, o link do LinkedIn não aparece.
    linkedin: "https://www.linkedin.com/in/felipebitencourtmagalhaes/",

    // Chave do Web3Forms (https://web3forms.com): as mensagens do formulário
    // chegam direto no e-mail cadastrado lá. A chave pode ficar pública no site.
    formChave: "74cb1993-37b2-43a4-821a-01c37ffade4f",

    // Opcional: endereço de outro serviço de formulário (ex.: "https://formspree.io/f/abcdwxyz").
    // Só é usado se formChave estiver vazio.
    formEndpoint: ""
  },

  /* ---------- PROJETOS ----------
     Cada bloco { ... } é um projeto. Para adicionar um novo, copie um bloco
     inteiro, cole abaixo do último (com vírgula entre eles) e altere os textos.

     embedUrl .... link público do relatório:
                   Power BI  → Arquivo > Inserir relatório > Publicar na Web
                               (link que começa com https://app.powerbi.com/view?r=...)
                   Looker Studio → Compartilhar > Incorporar relatório
                               (https://lookerstudio.google.com/embed/reporting/...)
     capa ........ imagem do card. Salve em assets/img/projetos/ e informe o caminho.
                   Os três primeiros projetos com capa também aparecem no topo do site.
                   Tamanho sugerido: 1280 x 720 px. Sem capa, o site desenha uma miniatura.
     mostra ...... o que o painel mostra (texto da janela do projeto)
     paginas ..... nomes das páginas do relatório
     recursos .... filtros e interações que o visitante pode testar
     Opcionais ... desafio, solucao, resultado (aparecem na janela se preenchidos)
  */
  projetos: [
    {
      id: "controle-producao",
      titulo: "Controle de Produção",
      setor: "Indústria",
      resumo: "Horas produtivas e não produtivas, taxa de utilização, planejado contra executado e despesas por centro de custo, com atualização diária.",
      mostra: "Quanto das horas apontadas vira produção e quanto se perde. O painel mede a taxa de utilização, aponta as atividades e os motivos que mais consomem horas não produtivas, compara as horas planejadas com as executadas e acompanha as despesas por centro de custo.",
      paginas: ["Controle de Horas", "Atividades Não Produtivas", "Atividades Planejadas vs Executadas", "Despesas Centro de Custos"],
      recursos: "Alterne entre percentual e valor, e entre cálculo sobre horas ou sobre valor. Filtre por período, atividade e tipo de serviço. As despesas podem ser vistas por data de documento ou de vencimento.",
      ferramentas: ["Power BI", "DAX"],
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMGJiMjVhZjUtY2FmNy00MTA3LWJmNjMtZWE5NGY0YTZiOGMzIiwidCI6IjZmN2Q0MGQ1LTUwNjctNDRkNi05MzRlLTI0MmVjODg2ODdiNSJ9",
      capa: "assets/img/projetos/controle-producao.jpg"
    },
    {
      id: "eficiencia-maquina",
      titulo: "Eficiência de Máquina",
      setor: "Indústria",
      resumo: "Eficiência e volume produzido por fábrica e máquina, com o detalhamento das paradas planejadas e não planejadas.",
      mostra: "A eficiência de cada fábrica e máquina, mês a mês, ao lado do volume produzido. A página de paradas separa as horas planejadas das não planejadas e mostra em que grupo e motivo o tempo foi perdido.",
      paginas: ["Visão Geral", "Resumo de Paradas"],
      recursos: "Filtre por ano, mês, unidade de negócio, fábrica, classificação e máquina. Os botões trocam a evolução mensal pela visão diária e pelos grupos de paradas.",
      ferramentas: ["Power BI", "DAX"],
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMWJiZjY2YWMtNGE0ZC00NDI4LTk5ZTktYjU1OWM0Y2E1NDEwIiwidCI6IjZmN2Q0MGQ1LTUwNjctNDRkNi05MzRlLTI0MmVjODg2ODdiNSJ9",
      capa: "assets/img/projetos/eficiencia-maquina.jpg"
    },
    {
      id: "recursos-humanos",
      titulo: "Recursos Humanos",
      setor: "Gestão de pessoas",
      resumo: "Headcount, turnover, custo de folha, absenteísmo, treinamento e recrutamento em sete páginas, da visão executiva ao detalhe.",
      mostra: "Os indicadores de pessoas em um só lugar, sempre comparados com o ano anterior: headcount, admissões e desligamentos, turnover, custo de folha, absenteísmo por motivo, diversidade e diferença salarial por cargo, horas de treinamento e o funil de vagas.",
      paginas: ["Visão Executiva", "Principais Indicadores", "Custos", "Pessoas e Diversidade", "Absenteísmo", "Treinamento", "Recrutamento"],
      recursos: "Filtre por período, cidade, departamento, cargo e funcionário. Nas páginas de indicadores e de custos, um seletor troca a medida analisada em todos os gráficos.",
      ferramentas: ["Power BI", "DAX"],
      embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiNmUwNjA5YjItMmQ0My00YWJmLWFkYzktY2NhOTE2NGZlODFkIiwidCI6IjZmN2Q0MGQ1LTUwNjctNDRkNi05MzRlLTI0MmVjODg2ODdiNSJ9",
      capa: "assets/img/projetos/recursos-humanos.jpg"
    }
  ]
};
