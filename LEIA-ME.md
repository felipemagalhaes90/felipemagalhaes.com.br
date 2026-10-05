# Site Felipe Magalhães — guia rápido

Site estático (HTML, CSS e JavaScript puros), com dashboards e modelagem de dados para indústria e RH, publicado em https://felipemagalhaes.com.br pelo GitHub Pages. Não precisa instalar nada nem "compilar": o que está nesta pasta é o site.

Repositório: https://github.com/felipemagalhaes90/felipemagalhaes.com.br

## Ver o site no seu computador (prévia)

Abra um terminal nesta pasta e rode:

```
python -m http.server 8080
```

Depois abra http://localhost:8080 no navegador. Para parar, aperte Ctrl+C no terminal.

Dar dois cliques em `index.html` também abre a página, mas assim os relatórios do Power BI e o envio do formulário podem não funcionar. Use a prévia acima para testar.

## Estrutura

| Arquivo | Para que serve |
|---|---|
| `index.html` | Textos e seções da página (início, serviços, projetos, como trabalho, para consultores, sobre, contato) e campos do formulário |
| `assets/js/config.js` | **Contatos e projetos. É o arquivo que você edita no dia a dia** |
| `assets/css/style.css` | Visual (cores e fontes ficam no bloco `:root`, no topo) |
| `assets/js/main.js` | Funcionamento (vitrine do topo, janela do projeto, formulário) |
| `assets/img/projetos/` | Imagens de capa dos projetos |
| `assets/img/felipe-magalhaes.jpg` | Foto da seção Sobre (quadrada, 800 x 800 px; o site mostra em círculo). Para trocar, salve a nova foto com o mesmo nome |
| `assets/img/favicon.svg` | Ícone da aba do navegador |
| `CNAME` | Domínio do site (`felipemagalhaes.com.br`). **Não apague nem altere**: sem ele o site perde o domínio |
| `_config.yml` | Lista dos arquivos que ficam no repositório, mas **não** são publicados no site (seção 6) |
| `robots.txt` | Libera o site para os buscadores (Google etc.) |
| `LEIA-ME.md` | Este guia (não é publicado no site) |
| `README.md` | Apresentação exibida na página do repositório no GitHub (não é publicado no site) |

## 1. Contatos (`assets/js/config.js`)

- `whatsapp`: só números, com 55 + DDD. Vazio = botões de WhatsApp ficam ocultos.
- `whatsappMensagem`: texto que já vem escrito quando o visitante abre a conversa no WhatsApp.
- `email`: e-mail exibido na seção de contato.
- `linkedin`: endereço completo do perfil. Vazio = link oculto.
- `formChave`: chave do Web3Forms, que faz as mensagens do formulário chegarem no seu e-mail (seção 3).
- `formEndpoint`: opcional. Endereço de outro serviço de formulário (ex.: Formspree). Só é usado se `formChave` estiver vazio.

## 2. Projetos

Em `config.js`, copie um bloco `{ ... }` dentro de `projetos`, cole abaixo do último (com vírgula entre eles) e altere os textos.

- `id`: nome curto, sem espaços nem acentos (ex.: `controle-producao`). Vira o link direto do projeto.
- `titulo`, `setor`, `resumo`: textos do card.
- `embedUrl`: link público do relatório.
  - **Power BI**: abra o relatório > Arquivo > Inserir relatório > Publicar na Web (público). Use o link que começa com `https://app.powerbi.com/view?r=`. Links `reportEmbed?...autoAuth=true` pedem login e não funcionam para visitantes.
  - **Looker Studio**: Compartilhar > Incorporar relatório. Use o link `https://lookerstudio.google.com/embed/reporting/...`.
  - Sem link, a janela mostra a capa com o aviso "Relatório interativo disponível em breve".
- `capa`: imagem do card, salva em `assets/img/projetos/` (sugestão: 1280 x 720 px). Os três primeiros projetos com capa também aparecem no topo do site. Para trocar uma capa, salve o novo print com o mesmo nome de arquivo. Sem capa, o site desenha uma miniatura.
- `mostra`, `paginas`, `recursos`: textos da janela do projeto. `desafio`, `solucao` e `resultado` são opcionais e aparecem se preenchidos.
- `ferramentas`: etiquetas exibidas na janela (ex.: `["Power BI", "SQL", "SAP", "Excel"]`).

Cada projeto ganha um link direto, útil para mandar a um cliente: `https://felipemagalhaes.com.br/#p-` + o `id`. Exemplo: https://felipemagalhaes.com.br/#p-controle-producao

> Atenção: "Publicar na Web" deixa o relatório acessível a qualquer pessoa com o link. Em cases reais, publique só com autorização do cliente e com dados anonimizados.

## 3. Formulário de contato

As mensagens enviadas pelo formulário chegam direto no seu e-mail, pelo serviço gratuito Web3Forms. O visitante não sai do site.

**Campos:** nome, e-mail, telefone/WhatsApp e mensagem são obrigatórios. Empresa é opcional, e "O que você precisa?" é uma lista de opções. O telefone é formatado enquanto a pessoa digita, como `(19) 99999-9999`, e só é aceito com DDD + 8 ou 9 dígitos.

**Configurar ou trocar a chave:**

1. Acesse https://web3forms.com, informe o e-mail que vai receber as mensagens e clique em "Create Access Key".
2. Copie a chave que chega nesse e-mail.
3. Cole em `formChave` no `config.js`.
4. Envie uma mensagem de teste pelo site.

A chave fica ligada ao e-mail cadastrado. Para receber em outro e-mail, gere uma chave nova com ele e substitua no `config.js`. A chave não é senha e pode ficar visível no site.

**Bom saber:**

- As primeiras mensagens podem cair no Spam. Marque como "não é spam" para as próximas chegarem na caixa de entrada.
- O plano gratuito do Web3Forms tem um limite mensal de envios. Confira o valor atual no site deles.
- Sem chave, o formulário avisa que não está configurado e mostra o seu e-mail.
- Para tornar o telefone **opcional**: em `index.html`, apague o `required` do campo `f-telefone` e troque o texto "Telefone / WhatsApp" por `Telefone / WhatsApp <span class="opcional">(opcional)</span>`. Em `assets/js/main.js`, apague a linha que contém `"um telefone com DDD"`.
- Para mudar as opções de "O que você precisa?", edite as linhas `<option>` em `index.html`.

## 4. Cores

Tema escuro, quase preto (`#0F1316` e `#0A0D0F`), com o amarelo dos relatórios `#FED51B` como destaque. Fonte: Inter. Tudo fica no bloco `:root`, no topo de `assets/css/style.css`.

## 5. Atualizar o site

Altere os arquivos, confira na prévia e depois, no VS Code, vá em Controle do Código-Fonte, escreva uma mensagem, clique em Confirmar (Commit) e depois em Sincronizar.

O GitHub publica sozinho em cerca de 1 minuto. Acompanhe na aba **Actions** do repositório (execução "pages build and deployment"). Se a página não mudar, aperte Ctrl+F5 no navegador.

## 6. Configuração da publicação (já feita)

Isto já está configurado. Serve de referência se algo precisar ser refeito.

**GitHub** (repositório > Settings > Pages):

- Repositório **público**.
- Source: **Deploy from a branch**. Branch: **main**, pasta **/ (root)**.
- Custom domain: `felipemagalhaes.com.br`.
- **Enforce HTTPS**: marcado.

**O que é publicado:** todos os arquivos do repositório, exceto os listados em `exclude` no `_config.yml` (hoje, `LEIA-ME.md` e `README.md`). Ao criar um arquivo que não faz parte do site, inclua o nome dele nessa lista. Arquivos e pastas cujo nome começa com `_` ou `.` também não são publicados.

O repositório é público, então tudo o que está nele continua visível no GitHub, inclusive os arquivos que não vão para o site. Não guarde senhas nem dados pessoais aqui.

**DNS** (Registro.br > domínio > DNS > Configurar zona DNS):

| Tipo | Nome | Valor |
|---|---|---|
| A | (domínio) | 185.199.108.153 |
| A | (domínio) | 185.199.109.153 |
| A | (domínio) | 185.199.110.153 |
| A | (domínio) | 185.199.111.153 |
| CNAME | www | felipemagalhaes90.github.io |

Não apague nem altere os registros MX e TXT (são os do e-mail) e não troque os servidores DNS.

**Verificação do domínio (recomendada):** impede que outra conta do GitHub publique um site no seu domínio.

1. Na sua conta do GitHub (foto do perfil > Settings > Pages, ou https://github.com/settings/pages), clique em **Add a domain**, digite `felipemagalhaes.com.br` e confirme.
2. O GitHub mostra um registro **TXT** com nome `_github-pages-challenge-felipemagalhaes90` e um código.
3. Crie esse TXT no Registro.br, com o nome e o código exatamente como aparecem. Ele não interfere nos registros do e-mail.
4. Volte à tela do GitHub e clique em **Verify**. Se falhar, espere a propagação do DNS e tente de novo.

## 7. Quando lançar as automações

O card "Automações" está escondido na seção Serviços até o lançamento. Em `index.html`, procure por `servico--breve`:

- Para **mostrar** o card como "Em breve": apague o atributo `hidden` da linha `<li class="servico servico--breve" hidden>`.
- Para **lançar** o serviço: apague o `hidden`, a classe `servico--breve` e o selo `<span class="selo selo--breve">Em breve</span>`, e ajuste o texto.

Para mostrar projetos de automação, adicione-os em `projetos` no `config.js` como qualquer outro projeto, usando por exemplo `setor: "Automação"`.

## 8. Depoimentos

O componente de depoimento já está pronto, mas desativado (fica como comentário em `index.html`, no fim da seção Projetos, logo abaixo da lista de projetos). Nada aparece no site enquanto ele estiver comentado.

Quando tiver um depoimento **real e autorizado** pela pessoa:

1. Em `index.html`, procure por `TODO`.
2. Apague a linha que abre o comentário (`<!-- Depoimento: ...` e as linhas de explicação logo abaixo dela) e a linha `-->` que fecha o bloco.
3. Preencha a frase dentro de `<p></p>`, o nome em `depoimento__nome` e o cargo e a empresa em `depoimento__cargo`.
4. Para mais de um depoimento, repita o bloco `<figure class="depoimento">`.
