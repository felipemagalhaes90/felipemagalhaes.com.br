# Site Felipe Magalhães — guia rápido

Site estático (HTML, CSS e JavaScript puros). Não precisa instalar nada nem "compilar": o que está nesta pasta é o site.

## Ver o site no seu computador

Dê dois cliques em `index.html`. Ele abre no navegador.

## Estrutura

| Arquivo | Para que serve |
|---|---|
| `index.html` | Textos e seções da página (início, serviços, processo, sobre, contato) |
| `assets/js/config.js` | **Contatos e projetos. É o arquivo que você edita no dia a dia** |
| `assets/css/style.css` | Visual (cores e fontes ficam no bloco `:root`, no topo) |
| `assets/js/main.js` | Funcionamento (vitrine do topo, janela do projeto, formulário) |
| `assets/img/projetos/` | Imagens de capa dos projetos |

## 1. Preencher os contatos (`assets/js/config.js`)

- `whatsapp`: só números, com 55 + DDD (já preenchido). Vazio = botões de WhatsApp ficam ocultos.
- `email`: confira se é o e-mail que você quer divulgar.
- `linkedin`: endereço completo do perfil (já preenchido). Vazio = link oculto.
- `formEndpoint`: endereço do serviço que recebe o formulário (passo 3).

## 2. Adicionar um projeto

Em `config.js`, copie um bloco `{ ... }` dentro de `projetos`, cole abaixo do último (com vírgula entre eles) e altere os textos.

- `embedUrl`: link público do relatório.
  - **Power BI**: abra o relatório > Arquivo > Inserir relatório > Publicar na Web (público). Use o link que começa com `https://app.powerbi.com/view?r=`. Links `reportEmbed?...autoAuth=true` pedem login e não funcionam para visitantes.
  - **Looker Studio**: Compartilhar > Incorporar relatório. Use o link `https://lookerstudio.google.com/embed/reporting/...`.
- `capa`: imagem do card, salva em `assets/img/projetos/` (sugestão: 1280 x 720 px). Os três primeiros projetos com capa também aparecem no topo do site. Para trocar uma capa, salve o novo print com o mesmo nome de arquivo.
- `mostra`, `paginas`, `recursos`: textos da janela do projeto. `desafio`, `solucao` e `resultado` são opcionais e aparecem se preenchidos.

Cada projeto ganha um link direto, útil para mandar a um cliente: `seudominio.com.br/#p-id-do-projeto`.

> Atenção: "Publicar na Web" deixa o relatório acessível a qualquer pessoa com o link. Em cases reais, publique só com autorização do cliente e com dados anonimizados.

## Cores

Tema escuro nas cores dos relatórios: amarelo `#FED51B` e ardósia `#3A444A`, com fundos em ardósia mais escura. Fonte: Inter. Tudo fica no bloco `:root`, no topo de `assets/css/style.css`.

## 3. Ativar o formulário

Sem configuração, o botão "Enviar mensagem" abre o aplicativo de e-mail do visitante com a mensagem pronta. Para receber direto na sua caixa de entrada:

1. Crie uma conta em um serviço de formulários para sites estáticos (ex.: Formspree ou Web3Forms; ambos têm plano gratuito).
2. Crie um formulário e copie o endereço de envio (endpoint).
3. Cole em `formEndpoint` no `config.js`.
4. Envie uma mensagem de teste pelo site.

## 4. Publicar em felipemagalhaes.com.br (GitHub Pages, gratuito)

O site fica em um repositório público do GitHub e é servido pelo GitHub Pages. O arquivo `CNAME` desta pasta informa o domínio; o `.nojekyll` faz o GitHub publicar os arquivos como estão.

**DNS (feito uma vez, no Registro.br > domínio > DNS > Configurar zona DNS):**

| Tipo | Nome | Valor |
|---|---|---|
| A | (domínio) | 185.199.108.153 |
| A | (domínio) | 185.199.109.153 |
| A | (domínio) | 185.199.110.153 |
| A | (domínio) | 185.199.111.153 |
| CNAME | www | SEU-USUARIO.github.io |

Não apague nem altere os registros MX e TXT (são os do e-mail) e não troque os servidores DNS.

**Para atualizar o site depois:** abra esta pasta no VS Code, altere os arquivos, vá em Controle do Código-Fonte, escreva uma mensagem, clique em Confirmar (Commit) e depois em Sincronizar. Em um ou dois minutos a alteração está no ar.

## Quando lançar as automações

Em `index.html`, procure por `servico--breve`. Remova essa classe e o selo "Em breve" e ajuste o texto. Se quiser uma seção própria de projetos de automação, dá para adicionar um terceiro `tipo` em `config.js`.
