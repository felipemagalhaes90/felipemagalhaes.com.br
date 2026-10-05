/* Comportamento do site. Para trocar contatos e projetos, edite assets/js/config.js. */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var contato = SITE.contato || {};
  var projetos = Array.isArray(SITE.projetos) ? SITE.projetos : [];
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (filhos || []).forEach(function (f) { if (f) n.appendChild(f); });
    return n;
  }

  function urlSegura(u) {
    try {
      var x = new URL(u);
      return x.protocol === "https:" ? x.href : "";
    } catch (e) { return ""; }
  }

  /* ---------- Menu no celular ---------- */
  var menuBtn = $("menu-btn"), menu = $("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      menuBtn.setAttribute("aria-expanded", String(aberto));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("aberto");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Contatos ---------- */
  var zapNumero = String(contato.whatsapp || "").replace(/\D/g, "");
  var zapUrl = zapNumero
    ? "https://wa.me/" + zapNumero + "?text=" + encodeURIComponent(contato.whatsappMensagem || "")
    : "";
  var email = String(contato.email || "").trim();
  var linkedin = urlSegura(contato.linkedin || "");

  if (zapUrl) {
    $("link-whatsapp").href = zapUrl;
    $("canal-whatsapp").hidden = false;
    $("zap-flutuante").href = zapUrl;
    $("zap-flutuante").hidden = false;
  }
  if (email) {
    $("link-email").href = "mailto:" + email;
    $("link-email").textContent = email;
    $("canal-email").hidden = false;
    $("copiar-email").addEventListener("click", function () {
      var btn = this;
      var feito = function () {
        btn.textContent = "Copiado";
        setTimeout(function () { btn.textContent = "Copiar"; }, 1800);
      };
      var selecionar = function () {
        var r = document.createRange();
        r.selectNodeContents($("link-email"));
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(feito, selecionar);
      } else {
        selecionar();
      }
    });
  }
  if (linkedin) {
    $("link-linkedin").href = linkedin;
    $("canal-linkedin").hidden = false;
  }

  $("ano").textContent = new Date().getFullYear();

  /* ---------- Projetos ---------- */
  // Miniatura desenhada automaticamente para projetos sem imagem de capa
  function miniatura(semente) {
    var h = 0;
    String(semente).split("").forEach(function (c) { h = (h * 31 + c.charCodeAt(0)) >>> 0; });
    var rnd = function () { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; };
    var s = '<svg class="mini" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    s += '<rect class="mi-fundo" width="320" height="180"/>';
    for (var k = 0; k < 3; k++) {
      var kx = 16 + k * 100;
      s += '<rect class="mi-bloco" x="' + kx + '" y="48" width="88" height="34" rx="5"/>';
      s += '<rect class="mi-traco" x="' + (kx + 9) + '" y="57" width="' + Math.round(26 + rnd() * 20) + '" height="4" rx="2"/>';
      s += '<rect class="' + (k === 0 ? "mi-barra" : "mi-traco") + '" x="' + (kx + 9) + '" y="67" width="' + Math.round(34 + rnd() * 30) + '" height="7" rx="2"/>';
    }
    s += '<rect class="mi-bloco" x="16" y="92" width="172" height="74" rx="5"/>';
    var n = 9, base = 158;
    for (var i = 0; i < n; i++) {
      var alt = Math.round(14 + rnd() * 38 + i * 1.2);
      s += '<rect class="' + (rnd() > 0.78 ? "mi-barra-2" : "mi-barra") + '" x="' + (27 + i * 17) + '" y="' + (base - alt) + '" width="10" height="' + alt + '" rx="2"/>';
    }
    s += '<rect class="mi-eixo" x="24" y="' + base + '" width="156" height="1"/>';
    s += '<rect class="mi-bloco" x="200" y="92" width="104" height="74" rx="5"/>';
    var pts = [];
    for (var j = 0; j < 7; j++) pts.push((210 + j * 14) + "," + Math.round(150 - rnd() * 26 - j * 3));
    s += '<polyline class="mi-linha" points="' + pts.join(" ") + '"/>';
    return s + "</svg>";
  }

  function capa(p, alvo) {
    if (p.capa) {
      alvo.appendChild(el("img", { src: p.capa, alt: "Tela do projeto " + p.titulo, loading: "lazy" }));
    } else {
      alvo.insertAdjacentHTML("beforeend", miniatura(p.id || p.titulo));
    }
  }

  var lista = $("lista-projetos");

  function desenharProjetos() {
    lista.textContent = "";
    if (!projetos.length) {
      lista.appendChild(el("p", { class: "vazio", text: "Novos projetos serão publicados em breve." }));
      return;
    }
    projetos.forEach(function (p) {
      var capaEl = el("div", { class: "projeto__capa" });
      capa(p, capaEl);

      var card = el("button", { class: "projeto", type: "button", "aria-haspopup": "dialog" }, [
        capaEl,
        el("div", { class: "projeto__corpo" }, [
          p.setor ? el("span", { class: "projeto__setor", text: p.setor }) : null,
          el("h3", { text: p.titulo }),
          el("p", { class: "projeto__resumo", text: p.resumo || "" }),
          el("span", { class: "projeto__ver", text: "Abrir relatório interativo" })
        ])
      ]);
      card.addEventListener("click", function () { abrirProjeto(p); });
      lista.appendChild(card);
    });
  }

  // Vitrine do topo: os três primeiros projetos com capa
  function desenharVitrine() {
    var vitrine = $("vitrine");
    if (!vitrine) return;
    var comCapa = projetos.filter(function (p) { return p.capa; }).slice(0, 3);
    if (!comCapa.length) {
      vitrine.hidden = true;
      vitrine.parentNode.classList.add("hero__grid--so-texto");
      return;
    }
    var menores = el("div", { class: "vitrine__linha" });
    comCapa.forEach(function (p, i) {
      var item = el("button", { class: "vitrine__item" + (i === 0 ? " vitrine__item--grande" : ""), type: "button", "aria-haspopup": "dialog" }, [
        el("img", { src: p.capa, alt: "Tela do relatório " + p.titulo }),
        el("span", { class: "vitrine__legenda" }, [
          el("span", { class: "vitrine__titulo", text: p.titulo }),
          i === 0 ? el("span", { class: "vitrine__acao", text: "Abrir relatório" }) : null
        ])
      ]);
      item.addEventListener("click", function () { abrirProjeto(p); });
      if (i === 0) vitrine.appendChild(item); else menores.appendChild(item);
    });
    if (menores.children.length) vitrine.appendChild(menores);
  }

  /* ---------- Janela do projeto ---------- */
  var modal = $("modal-projeto"), quadro = $("modal-quadro");
  var projetoAberto = null;

  function trocarHash(h) {
    try { history.replaceState(null, "", h); } catch (e) { /* sem histórico disponível */ }
  }

  function abrirProjeto(p) {
    projetoAberto = p;
    $("modal-titulo").textContent = p.titulo;
    $("modal-setor").textContent = p.setor || "";

    quadro.textContent = "";
    var link = urlSegura(p.embedUrl || "");
    if (link) {
      quadro.appendChild(el("iframe", { src: link, title: "Relatório interativo: " + p.titulo, allowfullscreen: "", loading: "lazy" }));
    } else {
      var sem = el("div", { class: "modal__semlink" });
      capa(p, sem);
      sem.appendChild(el("p", { text: "Relatório interativo disponível em breve." }));
      quadro.appendChild(sem);
    }
    var abrir = $("modal-abrir");
    abrir.hidden = !link;
    if (link) abrir.href = link;

    var det = $("modal-detalhes");
    det.textContent = "";
    [
      ["O que o painel mostra", p.mostra],
      ["Páginas do relatório", (p.paginas || []).join(" · ")],
      ["Para testar", p.recursos],
      ["Desafio", p.desafio], ["Solução", p.solucao], ["Resultado", p.resultado]
    ].forEach(function (par) {
      if (!par[1]) return;
      det.appendChild(el("div", {}, [el("dt", { text: par[0] }), el("dd", { text: par[1] })]));
    });
    if (!det.children.length && p.resumo) det.appendChild(el("div", {}, [el("dt", { text: "Sobre o projeto" }), el("dd", { text: p.resumo })]));

    var fer = $("modal-ferramentas");
    fer.textContent = "";
    (p.ferramentas || []).forEach(function (f) { fer.appendChild(el("li", { text: f })); });

    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    if (p.id) trocarHash("#p-" + p.id);
  }

  function fecharProjeto() {
    if (typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
  }

  modal.addEventListener("close", function () {
    quadro.textContent = ""; // descarrega o relatório
    if (location.hash.indexOf("#p-") === 0) trocarHash("#projetos");
  });
  $("modal-fechar").addEventListener("click", fecharProjeto);
  modal.addEventListener("click", function (e) { if (e.target === modal) fecharProjeto(); });
  $("modal-contato").addEventListener("click", function () {
    var msg = $("f-mensagem");
    if (projetoAberto && msg && !msg.value.trim()) {
      msg.value = "Tenho interesse em um painel parecido com o projeto \"" + projetoAberto.titulo + "\". ";
    }
    fecharProjeto();
  });

  desenharProjetos();
  desenharVitrine();

  if (location.hash.indexOf("#p-") === 0) {
    var alvo = projetos.filter(function (p) { return "#p-" + p.id === location.hash; })[0];
    if (alvo) abrirProjeto(alvo);
  }

  /* ---------- Formulário ---------- */
  var form = $("form-contato"), status = $("form-status"), enviar = $("f-enviar");

  function avisar(texto, tipo) {
    status.textContent = texto;
    status.className = "form__status" + (tipo ? " " + tipo : "");
  }

  // Botão "Conversar sobre parceria": já deixa o assunto de consultor selecionado
  var parceria = $("consultores-contato");
  if (parceria) {
    parceria.addEventListener("click", function () {
      $("f-assunto").value = "Sou consultor e busco um parceiro técnico";
    });
  }

  // Telefone: aceita só números e formata como (DD) 99999-9999 enquanto a pessoa digita
  var tel = $("f-telefone");
  function digitosTelefone() {
    var d = tel.value.replace(/\D/g, "");
    if (d.length > 11 && d.indexOf("55") === 0) d = d.slice(2); // tira o +55, se digitado
    return d.slice(0, 11);
  }
  tel.addEventListener("input", function () {
    var d = digitosTelefone();
    var f = d;
    if (d.length > 2) f = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 6) f = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
    tel.value = f;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if ($("f-gotcha").value) return; // preenchido só por robôs

    var nome = $("f-nome"), mail = $("f-email"), msg = $("f-mensagem");
    var problemas = [];
    [nome, mail, tel, msg].forEach(function (c) { c.classList.remove("invalido"); });
    if (!nome.value.trim()) { nome.classList.add("invalido"); problemas.push("seu nome"); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) { mail.classList.add("invalido"); problemas.push("um e-mail válido"); }
    if (!/^[1-9]{2}\d{8,9}$/.test(digitosTelefone())) { tel.classList.add("invalido"); problemas.push("um telefone com DDD"); }
    if (!msg.value.trim()) { msg.classList.add("invalido"); problemas.push("a mensagem"); }
    if (problemas.length) {
      avisar("Preencha " + problemas.join(", ").replace(/, ([^,]*)$/, " e $1") + ".", "erro");
      form.querySelector(".invalido").focus();
      return;
    }

    var chave = String(contato.formChave || "").trim();
    var destino = chave ? "https://api.web3forms.com/submit" : urlSegura(contato.formEndpoint || "");
    var reserva = email ? " Se preferir, escreva para " + email + "." : "";
    if (!destino) {
      avisar("O formulário ainda não está configurado." + reserva, "erro");
      return;
    }

    var dados = new FormData(form);
    dados.delete("_gotcha");
    dados.append("subject", "Contato pelo site: " + $("f-assunto").value);
    if (chave) {
      dados.append("access_key", chave);
      dados.append("from_name", "Site felipemagalhaes.com.br");
    }

    enviar.disabled = true;
    avisar("Enviando…");
    fetch(destino, { method: "POST", body: dados, headers: { Accept: "application/json" } })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok || j.success === false) throw new Error(j.message || "HTTP " + r.status);
        });
      })
      .then(function () {
        form.reset();
        avisar("Mensagem enviada. Obrigado pelo contato, retorno em breve.", "ok");
      })
      .catch(function () {
        avisar("Não foi possível enviar agora. Tente de novo em instantes." + reserva, "erro");
      })
      .then(function () { enviar.disabled = false; });
  });
})();
