MPSO.newView({
    name: "Componentes",
    icon: "widgets",
    showInNavigation: true,

    // ─── Helpers ────────────────────────────────────────────

    section(title) {
        const html = `<div class="comp-section"><p class="comp-section-title text-color-auto-14">${title}</p></div>`
        const el = MPSO.globalFns.create(html)[0]
        return el
    },

    demoCard(label, demoHtml, codeStr) {
        return /*html*/`
        <div class="comp-demo-card piece-surface background-color-auto-04">
            ${label ? `<p class="comp-demo-label text-color-auto-21">${label}</p>` : ''}
            <div class="comp-demo-area piece-surface background-color-auto-02">${demoHtml}</div>
            ${codeStr ? `<pre class="comp-demo-code piece-surface background-color-auto-06 text-color-auto-16">${codeStr}</pre>` : ''}
        </div>`
    },

    classTable(rows) {
        return /*html*/`
        <div class="comp-class-table">
            ${rows.map((r, i) => `
            <div class="comp-class-row piece-surface ${i % 2 === 0 ? 'background-color-auto-04' : 'background-color-auto-06'}">
                <span class="comp-class-name text-color-auto-18">${r[0]}</span>
                <span class="comp-class-desc">${r[1]}</span>
            </div>`).join("")}
        </div>`
    },

    header(name, desc, file) {
        return /*html*/`
        <div class="comp-page-header">
            <button class="comp-back-btn text-color-auto-16" onclick="location.hash='inicio'">
                <span class="material-symbols-rounded" style="font-size:18px;" translate="no">arrow_back</span>
                Todos os componentes
            </button>
            <h1 class="comp-page-title text-color-auto-21">${name}</h1>
            <p class="comp-page-desc">${desc}</p>
            <span class="comp-file-tag piece-surface background-color-auto-06 text-color-auto-14">${file}</span>
        </div>`
    },

    // ─── Router ─────────────────────────────────────────────

    pages: {
        surface:      'renderSurface',
        theme:        'renderTheme',
        button:       'renderButton',
        'icon-button':'renderIconButton',
        'fab-menu':   'renderFabMenu',
        'split-button':'renderSplitButton',
        checkbox:     'renderCheckbox',
        radio:        'renderRadio',
        switch:       'renderSwitch',
        'text-field': 'renderTextField',
        textarea:     'renderTextarea',
        search:       'renderSearch',
        navigation:   'renderNavigation',
        menu:         'renderMenu',
        divider:      'renderDivider',
        badge:        'renderBadge',
        tooltip:      'renderTooltip',
        snackbar:     'renderSnackbar',
        table:        'renderTable',
        progress:     'renderProgress',
        ripple:       'renderRipple',
    },

    main(params) {
        const section = $("#m-main section")
        section.className = "piece-surface background-color-auto-02"
        section.innerHTML = `<div id="view-componentes"><div class="comp-scroll"></div></div>`

        const id  = params[0]
        const fn  = id && this.pages[id]
        const out = $("#m-main .comp-scroll")

        if (fn && this[fn]) {
            this[fn](out)
        } else {
            location.hash = "inicio"
        }
    },

    // ══════════════════════════════════════════════════════
    // SURFACE
    // ══════════════════════════════════════════════════════
    renderSurface(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Surface", "Classe base de todo o sistema. Injeta as variáveis de cor, texto, borda e ripple via HSL dinâmico.", "surface.css") +
            `<p class="comp-section-title text-color-auto-14">Elevações</p>` +
            this.demoCard("Níveis auto-00 → auto-08",
                `<div class="piece-surface background-color-auto-00" style="padding:12px 20px;border-radius:10px;font-size:12px;font-family:monospace;">auto-00</div>
                 <div class="piece-surface background-color-auto-02" style="padding:12px 20px;border-radius:10px;font-size:12px;font-family:monospace;">auto-02</div>
                 <div class="piece-surface background-color-auto-04" style="padding:12px 20px;border-radius:10px;font-size:12px;font-family:monospace;">auto-04</div>
                 <div class="piece-surface background-color-auto-06" style="padding:12px 20px;border-radius:10px;font-size:12px;font-family:monospace;">auto-06</div>
                 <div class="piece-surface background-color-auto-08" style="padding:12px 20px;border-radius:10px;font-size:12px;font-family:monospace;">auto-08</div>`,
                `&lt;div class="piece-surface background-color-auto-04"&gt;...&lt;/div&gt;`) +
            `<p class="comp-section-title text-color-auto-14">Referência de classes</p>` +
            this.classTable([
                [".piece-surface",               "Classe base. Define todas as variáveis CSS de cor."],
                [".background-color-auto-XX",    "Fundo na escala 00–25. Adapta ao tema claro/escuro."],
                [".text-color-auto-XX",          "Cor de texto na escala 00–25."],
                [".border-color-auto-XX",        "Cor de borda na escala 00–25."],
                [".background-color-auto-XX-hover", "Fundo ao hover."],
                [".background-color-auto-XX-active","Fundo quando :checked / .piece-actived."],
                [".piece-s-40",                  "Eleva saturação de 16% para 40%."],
                [".piece-box-shadow",             "Ativa box-shadow com a cor do tema."],
                [".piece-border",                 "Ativa border 1px solid."],
                [".piece-disabled",               "Estado desabilitado: opacidade reduzida."],
                [".piece-skeleton",               "Animação de carregamento (pulsating)."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // THEME
    // ══════════════════════════════════════════════════════
    renderTheme(c) {
        const swatches = Array.from({length:26},(_,i)=>{
            const n=String(i).padStart(2,"0")
            return `<div class="piece-surface background-color-auto-${n}" style="height:48px;border-radius:8px;display:grid;place-content:center;font-size:10px;font-family:monospace;font-weight:700;color:${i<13?'rgba(0,0,0,.6)':'rgba(255,255,255,.8)'};">${n}</div>`
        }).join("")

        c.appendAll(MPSO.globalFns.create(
            this.header("Theme", "Sistema de temas HSL com paletas dinâmicas e suporte a light/dark automático.", "theme.css") +
            `<p class="comp-section-title text-color-auto-14">Escala completa auto-00 → auto-25</p>` +
            this.demoCard(null,
                `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:4px;width:100%;">${swatches}</div>`,
                `.piece-dark  { --piece-theme: 0%;   --piece-theme-inverse: 100%; }
.piece-light { --piece-theme: 100%; --piece-theme-inverse: 0%;   }`
            ) +
            `<p class="comp-section-title text-color-auto-14">Color roles</p>` +
            this.demoCard("Primary / Secondary / Tertiary",
                `<div class="piece-surface piece-primary   piece-s-40 background-color-auto-11" style="padding:14px 24px;border-radius:12px;font-size:13px;font-weight:700;color:#fff;">Primary</div>
                 <div class="piece-surface piece-secondary piece-s-40 background-color-auto-11" style="padding:14px 24px;border-radius:12px;font-size:13px;font-weight:700;color:#fff;">Secondary</div>
                 <div class="piece-surface piece-tertiary  piece-s-40 background-color-auto-11" style="padding:14px 24px;border-radius:12px;font-size:13px;font-weight:700;color:#fff;">Tertiary</div>`,
                `.piece-primary   { --piece-h: var(--piece-primary);   }
.piece-secondary { --piece-h: var(--piece-secondary); }
.piece-tertiary  { --piece-h: var(--piece-tertiary);  }`
            ) +
            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-analoga",     "Paleta analógica: primary, +30°, +90°."],
                [".piece-complementar","Paleta complementar: primary, +120°, +150°."],
                [".piece-triade",      "Paleta triádica: primary, +120°, +240°."],
                [".piece-dark",        "Aplica tema escuro no elemento e filhos."],
                [".piece-light",       "Aplica tema claro no elemento e filhos."],
                ["--piece-main-color", "CSS var. Matiz base (0–360). Padrão: 248."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // BUTTON
    // ══════════════════════════════════════════════════════
    renderButton(c) {
        const btn = (size, label) =>
            `<button class="piece-button ${size} piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary">
                <span class="piece-ripple"></span><span class="piece-label">${label}</span>
            </button>`

        c.appendAll(MPSO.globalFns.create(
            this.header("Button", "Botão de ação com 5 tamanhos e 4 variantes visuais. Suporta ícone, ripple e estado disabled.", "button.css") +

            `<p class="comp-section-title text-color-auto-14">Tamanhos</p>` +
            this.demoCard(null,
                btn("piece-extra-small","XSmall") + btn("piece-small","Small") +
                btn("piece-medium","Medium") + btn("piece-large","Large") + btn("piece-extra-large","XLarge"),
                `&lt;button class="piece-button piece-small piece-surface piece-s-40
    background-color-auto-11 background-color-auto-12-hover
    text-color-auto-00 ripple-color-auto-00 piece-primary"&gt;
  &lt;span class="piece-ripple"&gt;&lt;/span&gt;
  &lt;span class="piece-label"&gt;Label&lt;/span&gt;
&lt;/button&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Variantes</p>` +
            this.demoCard(null,
                `<button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary">
                    <span class="piece-ripple"></span><span class="piece-label">Filled</span></button>
                 <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary piece-outlined">
                    <span class="piece-ripple"></span><span class="piece-label">Outlined</span></button>
                 <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary piece-text">
                    <span class="piece-ripple"></span><span class="piece-label">Text</span></button>
                 <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary piece-elevated">
                    <span class="piece-ripple"></span><span class="piece-label">Elevated</span></button>`,
                `/* Variante: adicione ao lado de piece-button */
piece-outlined  → borda 1px, fundo transparente no hover
piece-text      → sem fundo quando não hover
piece-elevated  → box-shadow com cor do tema`) +

            `<p class="comp-section-title text-color-auto-14">Com ícone</p>` +
            this.demoCard(null,
                `<button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                    <span class="piece-label">Adicionar</span>
                </button>
                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-secondary">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon" translate="no">send</span>
                    <span class="piece-label">Enviar</span>
                </button>`,
                `&lt;button class="piece-button ..."&gt;
  &lt;span class="piece-ripple"&gt;&lt;/span&gt;
  &lt;span class="material-symbols-rounded piece-icon"&gt;add&lt;/span&gt;
  &lt;span class="piece-label"&gt;Adicionar&lt;/span&gt;
&lt;/button&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Group Button</p>` +
            this.demoCard(null,
                `<div class="piece-group-button">
                    <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary"><span class="piece-ripple"></span><span class="piece-label">Um</span></button>
                    <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary"><span class="piece-ripple"></span><span class="piece-label">Dois</span></button>
                    <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary"><span class="piece-ripple"></span><span class="piece-label">Três</span></button>
                </div>`,
                `&lt;div class="piece-group-button"&gt;
  &lt;button class="piece-button piece-small ..."&gt;...&lt;/button&gt;
  &lt;button class="piece-button piece-small ..."&gt;...&lt;/button&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência de classes</p>` +
            this.classTable([
                [".piece-button",        "Classe base do botão."],
                [".piece-extra-small",   "Altura 32px, border-radius 16px."],
                [".piece-small",         "Altura 40px, border-radius 20px."],
                [".piece-medium",        "Altura 56px, border-radius 28px."],
                [".piece-large",         "Altura 96px, border-radius 48px."],
                [".piece-extra-large",   "Altura 136px, border-radius 68px."],
                [".piece-outlined",      "Borda 1px solid, fundo transparente sem hover."],
                [".piece-text",          "Sem fundo quando não está em hover."],
                [".piece-elevated",      "Adiciona box-shadow com a cor do tema."],
                [".piece-group-button",  "Wrapper que ajusta os border-radius dos filhos."],
                [".piece-label",         "Span de texto dentro do botão."],
                [".piece-icon",          "Span de ícone (Material Symbols)."],
                [".piece-ripple",        "Span vazio que recebe o efeito ripple."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // ICON BUTTON
    // ══════════════════════════════════════════════════════
    renderIconButton(c) {
        const ib = (size, icon, role) =>
            `<button class="piece-icon-button ${size} piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-${role}">
                <span class="material-symbols-rounded piece-icon" translate="no">${icon}</span>
                <span class="piece-ripple"></span>
            </button>`

        c.appendAll(MPSO.globalFns.create(
            this.header("Icon Button", "Botão compacto com apenas ícone. 4 tamanhos. Ideal para ações secundárias e barras de ferramentas.", "icon-button.css") +

            `<p class="comp-section-title text-color-auto-14">Tamanhos</p>` +
            this.demoCard(null,
                ib("piece-extra-small","close","primary") +
                ib("piece-small","favorite","secondary") +
                ib("piece-medium","settings","tertiary") +
                ib("piece-large","delete","primary"),
                `&lt;button class="piece-icon-button piece-small piece-surface piece-s-40
    background-color-auto-04 background-color-auto-05-hover
    text-color-auto-18 ripple-color-auto-00 piece-primary"&gt;
  &lt;span class="material-symbols-rounded piece-icon"&gt;favorite&lt;/span&gt;
  &lt;span class="piece-ripple"&gt;&lt;/span&gt;
&lt;/button&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Filled (fundo colorido)</p>` +
            this.demoCard(null,
                `<button class="piece-icon-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary">
                    <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                    <span class="piece-ripple"></span>
                </button>
                <button class="piece-icon-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-secondary">
                    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                    <span class="piece-ripple"></span>
                </button>`,
                `/* Troque background-color-auto-04 por auto-11 para filled */`) +

            `<p class="comp-section-title text-color-auto-14">Com tooltip</p>` +
            this.demoCard(null,
                `<button class="piece-icon-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary" style="position:relative;">
                    <span class="material-symbols-rounded piece-icon" translate="no">info</span>
                    <span class="piece-ripple"></span>
                    <span class="piece-tooltip piece-surface background-color-inverse-00 text-color-inverse-25 bottom hover">Informação</span>
                </button>`,
                `&lt;span class="piece-tooltip piece-surface background-color-inverse-00
    text-color-inverse-25 bottom hover"&gt;Texto&lt;/span&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência de classes</p>` +
            this.classTable([
                [".piece-icon-button",   "Classe base."],
                [".piece-extra-small",   "24px"],
                [".piece-small",         "40px"],
                [".piece-medium",        "48px"],
                [".piece-large",         "56px"],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // FAB MENU
    // ══════════════════════════════════════════════════════
    renderFabMenu(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("FAB Menu", "Menu flutuante de ações expandido a partir de um FAB. Usa piece-interactive para controlar abertura.", "FAB-menu.css") +

            `<p class="comp-section-title text-color-auto-14">Demo</p>` +
            this.demoCard("Clique no botão (+) para expandir",
                `<div style="position:relative;height:200px;width:100%;">
                    <div class="piece-FAB-menu piece-interactive" style="position:absolute;bottom:8px;right:8px;">
                        <div>
                            <div class="menu-item piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 piece-secondary ripple-color-auto-00" style="position:relative;">
                                <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                                <span class="piece-label">Editar</span>
                                <span class="piece-ripple"></span>
                            </div>
                            <div class="menu-item piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 piece-tertiary ripple-color-auto-00" style="position:relative;">
                                <span class="material-symbols-rounded piece-icon" translate="no">share</span>
                                <span class="piece-label">Compartilhar</span>
                                <span class="piece-ripple"></span>
                            </div>
                        </div>
                        <button class="piece-toggle-button piece-FAB piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary" style="position:relative;">
                            <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
                            <span class="material-symbols-rounded piece-icon piece-true" translate="no">add</span>
                            <span class="piece-ripple"></span>
                        </button>
                    </div>
                </div>`,
                `&lt;div class="piece-FAB-menu piece-interactive"&gt;
  &lt;div&gt;
    &lt;div class="menu-item piece-surface ..."&gt;
      &lt;span class="piece-icon"&gt;edit&lt;/span&gt;
      &lt;span class="piece-label"&gt;Editar&lt;/span&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;button class="piece-toggle-button piece-FAB piece-surface ..."&gt;
    &lt;span class="piece-icon piece-false"&gt;close&lt;/span&gt;
    &lt;span class="piece-icon piece-true"&gt;add&lt;/span&gt;
  &lt;/button&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência de classes</p>` +
            this.classTable([
                [".piece-FAB-menu",      "Container principal. position:absolute, bottom/right."],
                [".piece-interactive",   "Classe do interactive.js. Gerencia .piece-actived."],
                [".piece-toggle-button", "Botão de abrir/fechar o menu."],
                [".menu-item",           "Item do menu. grid-auto-flow: column, height 56px."],
                [".piece-false",         "Ícone visível quando FECHADO (piece-actived ausente)."],
                [".piece-true",          "Ícone visível quando ABERTO (piece-actived presente)."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // SPLIT BUTTON
    // ══════════════════════════════════════════════════════
    renderSplitButton(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Split Button", "Botão com ação principal e seta de dropdown separadas por um divisor.", "split-button.css") +

            `<p class="comp-section-title text-color-auto-14">Demo</p>` +
            this.demoCard(null,
                `<div class="piece-split-button piece-surface piece-s-40 piece-primary" style="display:inline-flex;border-radius:28px;overflow:hidden;">
                    <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00" style="border-radius:28px 0 0 28px;">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">send</span>
                        <span class="piece-label">Enviar</span>
                    </button>
                    <div style="width:1px;background:rgba(255,255,255,.25);flex-shrink:0;"></div>
                    <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00" style="border-radius:0 28px 28px 0;padding-inline:12px;">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">arrow_drop_down</span>
                    </button>
                </div>`,
                `&lt;div class="piece-split-button ..."&gt;
  &lt;!-- Ação principal --&gt;
  &lt;button class="piece-button piece-medium ..."&gt;...&lt;/button&gt;
  &lt;!-- Divisor --&gt;
  &lt;div style="width:1px;..."&gt;&lt;/div&gt;
  &lt;!-- Dropdown --&gt;
  &lt;button class="piece-button piece-medium ..." style="padding-inline:12px;"&gt;
    &lt;span class="piece-icon"&gt;arrow_drop_down&lt;/span&gt;
  &lt;/button&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-split-button", "Wrapper inline-flex. Acomoda 2 botões com divisor central."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // CHECKBOX
    // ══════════════════════════════════════════════════════
    renderCheckbox(c) {
        const cb = (checked, label) =>
            `<label style="cursor:var(--cursor-pointer);display:flex;gap:10px;align-items:center;">
                <div class="piece-checkbox piece-surface piece-s-40
                    background-color-auto-04 background-color-auto-05-hover
                    background-color-auto-11-active border-color-auto-08
                    border-color-auto-11-active ripple-to-fg ripple-to-accent-active">
                    <input type="checkbox" class="piece-controller" ${checked ? "checked" : ""}>
                    <span class="piece-indicator piece-surface piece-parent background-color-auto-04 background-color-auto-00-active">
                        <span class="material-symbols-rounded piece-icon" translate="no">check</span>
                    </span>
                    <span class="piece-ripple"></span>
                </div>
                <span class="text-color-auto-18" style="font-size:14px;">${label}</span>
            </label>`

        c.appendAll(MPSO.globalFns.create(
            this.header("Checkbox", "Seleção binária ou múltipla. Controlado via input:checkbox invisível com piece-controller.", "checkbox.css") +

            `<p class="comp-section-title text-color-auto-14">Estados</p>` +
            this.demoCard(null,
                cb(false, "Desmarcado") + cb(true, "Marcado"),
                `&lt;label&gt;
  &lt;div class="piece-checkbox piece-surface piece-s-40
      background-color-auto-04 background-color-auto-11-active
      border-color-auto-08 border-color-auto-11-active
      ripple-to-fg ripple-to-accent-active"&gt;
    &lt;input type="checkbox" class="piece-controller"&gt;
    &lt;span class="piece-indicator piece-surface piece-parent
        background-color-auto-04 background-color-auto-00-active"&gt;
      &lt;span class="material-symbols-rounded piece-icon"&gt;check&lt;/span&gt;
    &lt;/span&gt;
    &lt;span class="piece-ripple"&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/label&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-checkbox",      "Container principal da caixa de seleção."],
                [".piece-controller",    "Input real. Transparente, posicionado sobre tudo."],
                [".piece-indicator",     "A caixa visual. Muda de cor via :checked."],
                [".piece-parent",        "Marca o span como filho direto do container (alvo de herança)."],
                [".ripple-to-fg",        "Ripple usa a cor de texto (foreground)."],
                [".ripple-to-accent-active","Ripple usa cor de destaque quando ativo."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // RADIO
    // ══════════════════════════════════════════════════════
    renderRadio(c) {
        const rb = (checked, name, label) =>
            `<label style="cursor:var(--cursor-pointer);display:flex;gap:10px;align-items:center;">
                <div class="piece-radio piece-surface piece-s-40
                    background-color-auto-04 background-color-auto-05-hover
                    background-color-auto-11-active border-color-auto-08
                    border-color-auto-11-active ripple-to-fg ripple-to-accent-active">
                    <input type="radio" class="piece-controller" name="${name}" ${checked ? "checked" : ""}>
                    <span class="piece-indicator piece-surface piece-parent background-color-auto-04 background-color-auto-00-active"></span>
                    <span class="piece-ripple"></span>
                </div>
                <span class="text-color-auto-18" style="font-size:14px;">${label}</span>
            </label>`

        c.appendAll(MPSO.globalFns.create(
            this.header("Radio", "Seleção exclusiva de um grupo. Idêntico ao Checkbox mas com indicador circular.", "radio.css") +

            `<p class="comp-section-title text-color-auto-14">Grupo</p>` +
            this.demoCard(null,
                rb(true,  "demo", "Opção A") + rb(false, "demo", "Opção B") + rb(false, "demo", "Opção C"),
                `&lt;div class="piece-radio piece-surface piece-s-40
    background-color-auto-04 background-color-auto-11-active
    border-color-auto-08 border-color-auto-11-active"&gt;
  &lt;input type="radio" class="piece-controller" name="grupo"&gt;
  &lt;span class="piece-indicator piece-surface piece-parent
      background-color-auto-04 background-color-auto-00-active"&gt;&lt;/span&gt;
  &lt;span class="piece-ripple"&gt;&lt;/span&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-radio",         "Estrutura idêntica ao checkbox, diferença: indicador circular."],
                [".piece-controller",    "Input radio real. Deve ter o mesmo name para exclusividade."],
                [".piece-indicator",     "Bolinha central. Visível quando :checked."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // SWITCH
    // ══════════════════════════════════════════════════════
    renderSwitch(c) {
        const sw = (checked) =>
            `<label style="cursor:var(--cursor-pointer);">
                <div class="piece-switch piece-surface piece-s-40
                    background-color-auto-04 background-color-auto-05-hover
                    background-color-auto-11-active border-color-auto-08 border-color-auto-11-active">
                    <input type="checkbox" ${checked ? "checked" : ""}>
                    <span class="piece-indicator piece-surface piece-parent background-color-auto-12 background-color-auto-00-active"></span>
                </div>
            </label>`

        c.appendAll(MPSO.globalFns.create(
            this.header("Switch", "Toggle para ligar/desligar opções. O polegar se anima suavemente entre os estados.", "switch.css") +

            `<p class="comp-section-title text-color-auto-14">Estados</p>` +
            this.demoCard(null, sw(false) + sw(true),
                `&lt;label&gt;
  &lt;div class="piece-switch piece-surface piece-s-40
      background-color-auto-04 background-color-auto-11-active
      border-color-auto-08 border-color-auto-11-active"&gt;
    &lt;input type="checkbox"&gt;
    &lt;span class="piece-indicator piece-surface piece-parent
        background-color-auto-12 background-color-auto-00-active"&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/label&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Com ícones</p>` +
            this.demoCard(null,
                `<label style="cursor:var(--cursor-pointer);">
                    <div class="piece-switch piece-surface piece-s-40 background-color-auto-04 background-color-auto-11-active border-color-auto-08 border-color-auto-11-active">
                        <input type="checkbox" checked>
                        <span class="piece-indicator piece-surface piece-parent background-color-auto-12 background-color-auto-00-active">
                            <span class="material-symbols-rounded piece-icon piece-true" translate="no">check</span>
                            <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
                        </span>
                    </div>
                </label>`,
                `&lt;span class="piece-indicator ..."&gt;
  &lt;span class="piece-icon piece-true"&gt;check&lt;/span&gt;   &lt;!-- visível quando ON --&gt;
  &lt;span class="piece-icon piece-false"&gt;close&lt;/span&gt;  &lt;!-- visível quando OFF --&gt;
&lt;/span&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-switch",        "Container (52×32px, border-radius 32px)."],
                [".piece-indicator",     "O polegar animado."],
                [".piece-true",          "Filho visível quando input está :checked (ON)."],
                [".piece-false",         "Filho visível quando input NÃO está :checked (OFF)."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // TEXT FIELD
    // ══════════════════════════════════════════════════════
    renderTextField(c) {
        const field = (lead, trail, ph) =>
            `<div class="piece-text-field piece-surface piece-s-40 background-color-auto-04 border-color-auto-08 text-color-auto-18"
                style="display:flex;align-items:center;padding:0 16px;border-radius:12px;border:1px solid;height:56px;gap:8px;min-width:220px;">
                ${lead ? `<span class="material-symbols-rounded" translate="no" style="opacity:.5;font-size:20px;">${lead}</span>` : ''}
                <input type="text" placeholder="${ph}" style="background:transparent;border:none;outline:none;flex:1;font-size:14px;color:inherit;font-family:inherit;">
                ${trail ? `<span class="material-symbols-rounded" translate="no" style="opacity:.4;font-size:20px;cursor:pointer;">${trail}</span>` : ''}
            </div>`

        c.appendAll(MPSO.globalFns.create(
            this.header("Text Field", "Campo de entrada de texto. Container flexbox com input real, suporte a ícones leading/trailing.", "text-field.css") +

            `<p class="comp-section-title text-color-auto-14">Variantes</p>` +
            this.demoCard(null,
                field("search", "", "Com ícone leading") + field("", "close", "Com ícone trailing") + field("", "", "Sem ícones"),
                `&lt;div class="piece-text-field piece-surface piece-s-40
    background-color-auto-04 border-color-auto-08 text-color-auto-18"
    style="display:flex;align-items:center;padding:0 16px;
           border-radius:12px;border:1px solid;height:56px;gap:8px;"&gt;
  &lt;span class="material-symbols-rounded"&gt;search&lt;/span&gt;
  &lt;input type="text" placeholder="..." style="background:transparent;
         border:none;outline:none;flex:1;color:inherit;font-family:inherit;"&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-text-field",    "Container flexbox do campo."],
                ["input (filho)",        "Input real, background:transparent, sem border/outline."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // TEXTAREA
    // ══════════════════════════════════════════════════════
    renderTextarea(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Textarea", "Campo de texto multilinhas. Mesma semântica do Text Field com suporte a resize.", "textarea.css") +

            `<p class="comp-section-title text-color-auto-14">Demo</p>` +
            this.demoCard(null,
                `<div class="piece-textarea piece-surface piece-s-40 background-color-auto-04 border-color-auto-08 text-color-auto-18"
                    style="border-radius:12px;border:1px solid;padding:12px 16px;min-width:260px;">
                    <textarea placeholder="Digite sua mensagem..." rows="4"
                        style="background:transparent;border:none;outline:none;width:100%;resize:vertical;font-size:14px;color:inherit;font-family:inherit;line-height:1.6;"></textarea>
                </div>`,
                `&lt;div class="piece-textarea piece-surface piece-s-40
    background-color-auto-04 border-color-auto-08 text-color-auto-18"
    style="border-radius:12px;border:1px solid;padding:12px 16px;"&gt;
  &lt;textarea placeholder="..." rows="4"
      style="background:transparent;border:none;outline:none;
             width:100%;resize:vertical;color:inherit;font-family:inherit;"&gt;
  &lt;/textarea&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-textarea",  "Container. Mesmo padrão do text-field, sem height fixa."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // SEARCH
    // ══════════════════════════════════════════════════════
    renderSearch(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Search", "Barra de busca elevada (box-shadow) com border-radius full e suporte a ícones de ação.", "search.css") +

            `<p class="comp-section-title text-color-auto-14">Demo</p>` +
            this.demoCard(null,
                `<div class="piece-search piece-surface piece-s-40 background-color-auto-04 text-color-auto-18"
                    style="display:flex;align-items:center;padding:0 16px;border-radius:28px;height:56px;gap:8px;min-width:260px;box-shadow:0 2px 8px rgba(0,0,0,.15);">
                    <span class="material-symbols-rounded" translate="no" style="opacity:.55;font-size:22px;">search</span>
                    <input type="search" placeholder="Pesquisar..."
                        style="background:transparent;border:none;outline:none;flex:1;font-size:16px;color:inherit;font-family:inherit;">
                    <span class="material-symbols-rounded" translate="no" style="opacity:.4;font-size:20px;cursor:pointer;">mic</span>
                </div>`,
                `&lt;div class="piece-search piece-surface piece-s-40
    background-color-auto-04 text-color-auto-18"
    style="border-radius:28px;height:56px;box-shadow:0 2px 8px rgba(0,0,0,.15);"&gt;
  &lt;span class="material-symbols-rounded"&gt;search&lt;/span&gt;
  &lt;input type="search" placeholder="Pesquisar..."&gt;
  &lt;span class="material-symbols-rounded"&gt;mic&lt;/span&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-search",    "Idêntico ao text-field mas com border-radius alto e box-shadow característico."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // NAVIGATION
    // ══════════════════════════════════════════════════════
    renderNavigation(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Navigation", "Rail lateral (desktop) e bar inferior (mobile). Responsivo via container queries. Suporta menu toggle.", "navigation.css") +

            `<p class="comp-section-title text-color-auto-14">Rail (desktop)</p>` +
            this.demoCard(null,
                `<nav style="width:96px;height:220px;display:flex;flex-direction:column;gap:4px;padding:8px;border-radius:16px;overflow:hidden;" class="piece-surface background-color-auto-04">
                    ${[["home","Início",true],["widgets","Comp.",false],["layers","Surface",false],["settings","Config",false]].map(([icon,label,active]) =>
                        `<label style="display:grid;place-content:center;place-items:center;gap:4px;height:56px;width:80px;cursor:pointer;border-radius:12px;position:relative;">
                            <span class="piece-indicator piece-surface piece-parent ${active ? 'piece-s-40 background-color-auto-11 piece-primary' : 'background-color-auto-06-hover'}"
                                style="position:absolute;inset:0;border-radius:12px;"></span>
                            <span class="material-symbols-rounded" translate="no" style="font-size:22px;z-index:1;${active?'color:#fff':''}">${icon}</span>
                            <span style="font-size:10px;font-weight:600;z-index:1;${active?'color:#fff':''}">${label}</span>
                            <input type="radio" name="nav-demo" style="display:none;" ${active?"checked":""}>
                        </label>`
                    ).join("")}
                </nav>`,
                `&lt;aside class="piece-navigation piece-bar-rail piece-surface"&gt;
  &lt;!-- header com logo e botão menu --&gt;
  &lt;header&gt;...&lt;/header&gt;
  &lt;!-- itens gerados pelo MPSO --&gt;
  &lt;div class="piece-items"&gt;
    &lt;label class="piece-item piece-surface"&gt;
      &lt;span class="piece-indicator ..."&gt;&lt;/span&gt;
      &lt;span class="piece-icon"&gt;home&lt;/span&gt;
      &lt;span class="piece-label"&gt;Início&lt;/span&gt;
      &lt;input type="radio" name="nav"&gt;
    &lt;/label&gt;
  &lt;/div&gt;
&lt;/aside&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-navigation",        "Classe base de navegação."],
                [".piece-bar-rail",          "Layout responsivo: rail no desktop, bar no mobile."],
                [".piece-floating",          "Posicionamento flutuante (não bloqueia layout)."],
                [".piece-item",              "Item de navegação (label com radio input)."],
                [".piece-indicator",         "Destaque visual do item ativo."],
                [".piece-items",             "Container dos itens."],
                [".piece-menu",              "Botão hamburguer (label+checkbox) que expande o rail."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // MENU
    // ══════════════════════════════════════════════════════
    renderMenu(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Menu", "Dropdown de opções com ícone leading, texto principal e trailing opcional. Suporta variante piece-gap.", "menu.css") +

            `<p class="comp-section-title text-color-auto-14">Demo</p>` +
            this.demoCard(null,
                `<div class="piece-menu piece-surface background-color-auto-04" style="min-width:200px;">
                    <ul>
                        <li class="piece-surface background-color-auto-05-hover" style="position:relative;">
                            <span class="material-symbols-rounded piece-menu-icon" translate="no">edit</span>
                            <span class="piece-menu-label">Editar</span>
                            <span class="piece-ripple"></span>
                        </li>
                        <li class="piece-surface background-color-auto-05-hover" style="position:relative;">
                            <span class="material-symbols-rounded piece-menu-icon" translate="no">content_copy</span>
                            <span class="piece-menu-label">Copiar</span>
                            <span class="piece-menu-trailing">⌘C</span>
                            <span class="piece-ripple"></span>
                        </li>
                        <li class="piece-surface background-color-auto-05-hover" style="position:relative;">
                            <span class="material-symbols-rounded piece-menu-icon" translate="no">share</span>
                            <span class="piece-menu-label">Compartilhar</span>
                            <span class="piece-ripple"></span>
                        </li>
                        <li class="piece-surface background-color-auto-05-hover" style="position:relative;">
                            <span class="material-symbols-rounded piece-menu-icon" translate="no" style="color:tomato;">delete</span>
                            <span class="piece-menu-label" style="color:tomato;">Excluir</span>
                            <span class="piece-ripple"></span>
                        </li>
                    </ul>
                </div>`,
                `&lt;div class="piece-menu piece-surface background-color-auto-04"&gt;
  &lt;ul&gt;
    &lt;li class="piece-surface background-color-auto-05-hover"&gt;
      &lt;span class="material-symbols-rounded piece-menu-icon"&gt;edit&lt;/span&gt;
      &lt;span class="piece-menu-label"&gt;Editar&lt;/span&gt;
      &lt;span class="piece-menu-trailing"&gt;⌘E&lt;/span&gt;  &lt;!-- opcional --&gt;
      &lt;span class="piece-ripple"&gt;&lt;/span&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-menu",          "Container principal. max-width:280px, border-radius:16px."],
                ["ul",                   "Lista com padding:4px e gap:2px entre itens."],
                ["li / label",           "Item de menu. height:48px, display:flex."],
                [".piece-menu-icon",     "Ícone leading (20px)."],
                [".piece-menu-label",    "Texto principal (flex:1)."],
                [".piece-menu-trailing", "Texto trailing (12px, margin-left:auto)."],
                [".piece-gap",          "Variante com grupos separados por box-shadow individuais."],
                [".piece-true / .piece-false","Ícone no estado ativo / inativo (label:checked)."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // DIVIDER
    // ══════════════════════════════════════════════════════
    renderDivider(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Divider", "Linha separadora horizontal ou vertical. Usa a cor da surface com luminosidade auto-06.", "divider.css") +

            `<p class="comp-section-title text-color-auto-14">Horizontal</p>` +
            this.demoCard(null,
                `<div style="width:100%;display:grid;gap:12px;">
                    <span class="text-color-auto-18" style="font-size:13px;">Seção acima</span>
                    <div class="piece-divider piece-surface background-color-auto-06" style="height:1px;width:100%;"></div>
                    <span class="text-color-auto-18" style="font-size:13px;">Seção abaixo</span>
                </div>`,
                `&lt;div class="piece-divider piece-surface background-color-auto-06"
     style="height:1px;"&gt;&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Vertical</p>` +
            this.demoCard(null,
                `<div style="display:flex;gap:16px;height:48px;align-items:center;">
                    <span class="text-color-auto-18" style="font-size:13px;">A</span>
                    <div class="piece-divider piece-surface background-color-auto-06" style="width:1px;height:100%;"></div>
                    <span class="text-color-auto-18" style="font-size:13px;">B</span>
                    <div class="piece-divider piece-surface background-color-auto-06" style="width:1px;height:100%;"></div>
                    <span class="text-color-auto-18" style="font-size:13px;">C</span>
                </div>`,
                `&lt;div class="piece-divider piece-surface background-color-auto-06"
     style="width:1px;height:100%;"&gt;&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-divider", "Classe semântica. Define height:1px (H) ou width:1px (V) via style inline."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // BADGE
    // ══════════════════════════════════════════════════════
    renderBadge(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Badge", "Indicador numérico ou de status. Posicionado sobre ícones e botões via position:absolute.", "badge.css") +

            `<p class="comp-section-title text-color-auto-14">Variantes</p>` +
            this.demoCard("Small (dot) / Regular / Large (número)",
                `<div style="position:relative;display:inline-flex;margin:12px;">
                    <button class="piece-icon-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary">
                        <span class="material-symbols-rounded piece-icon" translate="no">notifications</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <span class="piece-badge piece-small piece-surface piece-s-40 piece-primary background-color-auto-11"
                        style="position:absolute;top:6px;right:6px;"></span>
                </div>
                <div style="position:relative;display:inline-flex;margin:12px;">
                    <button class="piece-icon-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-secondary">
                        <span class="material-symbols-rounded piece-icon" translate="no">mail</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <span class="piece-badge piece-surface piece-s-40 piece-secondary background-color-auto-11 text-color-auto-00"
                        style="position:absolute;top:4px;right:4px;"></span>
                </div>
                <div style="position:relative;display:inline-flex;margin:12px;">
                    <button class="piece-icon-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-tertiary">
                        <span class="material-symbols-rounded piece-icon" translate="no">chat</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <span class="piece-badge piece-large piece-surface piece-s-40 piece-tertiary background-color-auto-11 text-color-auto-00"
                        style="position:absolute;top:2px;right:2px;">12</span>
                </div>`,
                `&lt;!-- Wrapper com position:relative --&gt;
&lt;div style="position:relative;display:inline-flex;"&gt;
  &lt;button class="piece-icon-button ..."&gt;...&lt;/button&gt;

  &lt;!-- dot --&gt;
  &lt;span class="piece-badge piece-small piece-surface piece-s-40
      background-color-auto-11 piece-primary"
      style="position:absolute;top:6px;right:6px;"&gt;&lt;/span&gt;

  &lt;!-- com número --&gt;
  &lt;span class="piece-badge piece-large piece-surface piece-s-40
      background-color-auto-11 text-color-auto-00 piece-primary"
      style="position:absolute;top:2px;right:2px;"&gt;12&lt;/span&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-badge",         "Base: border-radius:16px, aspect-ratio:1/1, width:16px."],
                [".piece-small",         "Dot: 6×6px, sem conteúdo."],
                [".piece-large",         "Com número: min-width:16px, max-width:34px, padding:0 4px."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // TOOLTIP
    // ══════════════════════════════════════════════════════
    renderTooltip(c) {
        const tip = (pos, label, icon) =>
            `<button class="piece-icon-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary" style="position:relative;">
                <span class="material-symbols-rounded piece-icon" translate="no">${icon}</span>
                <span class="piece-ripple"></span>
                <span class="piece-tooltip piece-surface background-color-inverse-00 text-color-inverse-25 ${pos} hover">${label}</span>
            </button>`

        c.appendAll(MPSO.globalFns.create(
            this.header("Tooltip", "Dica contextual sobre um elemento. Ativada por hover ou classe .piece-visible. Suporta 8 posições.", "tooltip.css") +

            `<p class="comp-section-title text-color-auto-14">Posições (hover para ver)</p>` +
            this.demoCard(null,
                `<div style="display:flex;gap:16px;flex-wrap:wrap;padding:16px;">
                    ${tip("top", "top", "arrow_upward")}
                    ${tip("bottom", "bottom", "arrow_downward")}
                    ${tip("left", "left", "arrow_back")}
                    ${tip("right", "right", "arrow_forward")}
                    ${tip("top start", "top start", "north_west")}
                    ${tip("top end", "top end", "north_east")}
                </div>`,
                `&lt;button style="position:relative;"&gt;
  &lt;!-- conteúdo do botão --&gt;
  &lt;span class="piece-tooltip
      piece-surface background-color-inverse-00 text-color-inverse-25
      top hover"&gt;
    Texto do tooltip
  &lt;/span&gt;
&lt;/button&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-tooltip",       "Classe base: position:absolute, opacity:0, pointer-events:none."],
                [".hover",               "Ativa opacity:1 quando pai recebe :hover."],
                [".piece-visible",       "Força opacity:1 sem hover (programático)."],
                ["top / bottom",         "Posição vertical."],
                ["left / right",         "Posição horizontal (ou lado quando sozinho)."],
                ["start / end",          "Alinhamento dentro do eixo."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // SNACKBAR
    // ══════════════════════════════════════════════════════
    renderSnackbar(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Snackbar", "Mensagem temporária de feedback. Posicionada via position:fixed no canto inferior.", "snackbar.css") +

            `<p class="comp-section-title text-color-auto-14">Demo</p>` +
            this.demoCard("Clique para disparar",
                `<button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary" id="snack-trigger">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon" translate="no">notifications</span>
                    <span class="piece-label">Mostrar Snackbar</span>
                </button>
                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-secondary piece-outlined" id="snack-trigger-action">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Com ação</span>
                </button>`,
                `&lt;!-- position:fixed, bottom/left: 16px --&gt;
&lt;div class="piece-snackbar piece-surface background-color-inverse-00 text-color-inverse-25"&gt;
  &lt;span class="label"&gt;Mensagem aqui&lt;/span&gt;
  &lt;!-- Opcional: botão de ação --&gt;
  &lt;button class="piece-button ..."&gt;Desfazer&lt;/button&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-snackbar",      "position:fixed, bottom:16px, left:16px. height:48–68px."],
                [".label",               "Texto da mensagem (font: body-medium)."],
            ])
        ))

        // Setup demo
        setTimeout(() => {
            const show = (msg, withAction) => {
                let s = document.getElementById("_snack_live")
                if (!s) {
                    const el = MPSO.globalFns.create(`
                        <div id="_snack_live" class="piece-snackbar piece-surface background-color-inverse-00 text-color-inverse-25"
                            style="transform:translateY(80px);opacity:0;transition:transform .3s,opacity .3s;z-index:9999;">
                            <span class="label" id="_snack_label"></span>
                        </div>`)
                    document.body.appendChild(el[0])
                    s = document.getElementById("_snack_live")
                }
                document.getElementById("_snack_label").textContent = msg
                const old = s.querySelector("._snack_action")
                if (old) old.remove()
                if (withAction) {
                    const ab = MPSO.globalFns.create(`<button class="_snack_action piece-button piece-extra-small piece-surface piece-s-40 piece-secondary background-color-auto-11 text-color-auto-00 ripple-color-auto-00" style="margin-left:8px;"><span class="piece-ripple"></span><span class="piece-label">Desfazer</span></button>`)[0]
                    s.appendChild(ab)
                }
                void s.offsetWidth
                s.style.transform = "translateY(0)"
                s.style.opacity = "1"
                clearTimeout(s._t)
                s._t = setTimeout(() => { s.style.transform = "translateY(80px)"; s.style.opacity = "0" }, 3000)
            }
            document.getElementById("snack-trigger")?.addEventListener("click", () => show("Ação realizada com sucesso", false))
            document.getElementById("snack-trigger-action")?.addEventListener("click", () => show("Item removido", true))
        }, 100)
    },

    // ══════════════════════════════════════════════════════
    // TABLE
    // ══════════════════════════════════════════════════════
    renderTable(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Table", "Tabela de dados com 5 tamanhos de linha. Suporte a thead, tbody, tfoot e células alinhadas.", "table.css") +

            `<p class="comp-section-title text-color-auto-14">Demo</p>` +
            this.demoCard(null,
                `<div style="width:100%;overflow:auto;">
                    <table class="piece-table piece-medium piece-surface" style="width:100%;">
                        <thead class="piece-surface background-color-auto-06">
                            <tr>
                                <th>Componente</th>
                                <th>Categoria</th>
                                <th>Arquivo</th>
                                <th class="piece-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${[["Button","Ação","button.css","Estável"],["Switch","Formulário","switch.css","Estável"],["Menu","Navegação","menu.css","Estável"],["FAB Menu","Ação","FAB-menu.css","Estável"]].map((r,i) =>
                                `<tr class="piece-surface ${i%2===0?'background-color-auto-02':'background-color-auto-04'} background-color-auto-06-hover">
                                    <td>${r[0]}</td><td style="opacity:.65;">${r[1]}</td>
                                    <td style="font-family:monospace;font-size:11px;opacity:.5;">${r[2]}</td>
                                    <td class="piece-center"><span class="piece-surface piece-primary piece-s-40 background-color-auto-11 text-color-auto-00" style="padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;">${r[3]}</span></td>
                                </tr>`
                            ).join("")}
                        </tbody>
                    </table>
                </div>`,
                `&lt;table class="piece-table piece-medium piece-surface"&gt;
  &lt;thead class="piece-surface background-color-auto-06"&gt;
    &lt;tr&gt;&lt;th&gt;Col 1&lt;/th&gt;&lt;th&gt;Col 2&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr class="piece-surface background-color-auto-02"&gt;
      &lt;td&gt;...&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-table",         "Classe base. border-collapse:separate, border-spacing:1px."],
                [".piece-extra-small",   "Linha tbody: 40px."],
                [".piece-small",         "Linha tbody: 43px."],
                [".piece-medium",        "Linha tbody: 46px. (padrão recomendado)"],
                [".piece-large",         "Linha tbody: 49px."],
                [".piece-extra-large",   "Linha tbody: 52px."],
                [".piece-center",        "Alinhamento central na célula."],
                [".piece-justify",       "text-align-last: justify."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // PROGRESS INDICATOR
    // ══════════════════════════════════════════════════════
    renderProgress(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Progress Indicator", "Indicador de progresso linear (bar) e circular (circle). Determinado ou indeterminado.", "progressIndicator.css") +

            `<p class="comp-section-title text-color-auto-14">Bar — Determinado</p>` +
            this.demoCard(null,
                `<div style="width:100%;display:grid;gap:12px;">
                    ${[25,50,75,100].map(p =>
                        `<div style="display:flex;gap:12px;align-items:center;">
                            <span style="font-size:11px;font-family:monospace;width:36px;opacity:.5;">${p}%</span>
                            <div class="piece-progress-indicator piece-bar piece-active piece-surface background-color-auto-06" style="flex:1;--piece-percentage:${p}%;">
                                <div class="piece-indicator piece-surface piece-primary piece-s-40 background-color-auto-11"></div>
                            </div>
                        </div>`
                    ).join("")}
                </div>`,
                `&lt;div class="piece-progress-indicator piece-bar piece-active piece-surface
    background-color-auto-06" style="--piece-percentage: 60%;"&gt;
  &lt;div class="piece-indicator piece-surface piece-primary
      piece-s-40 background-color-auto-11"&gt;&lt;/div&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Circle — Determinado</p>` +
            this.demoCard(null,
                `<div style="display:flex;gap:16px;flex-wrap:wrap;">
                    ${[25,50,75,100].map(p =>
                        `<div style="display:grid;place-items:center;gap:4px;">
                            <div class="piece-progress-indicator piece-circle piece-active piece-surface piece-primary piece-s-40 background-color-auto-11" style="--piece-percentage:${p}%;width:48px;height:48px;">
                                <div class="piece-indicator"></div>
                            </div>
                            <span style="font-size:10px;opacity:.5;font-family:monospace;">${p}%</span>
                        </div>`
                    ).join("")}
                </div>`,
                `&lt;div class="piece-progress-indicator piece-circle piece-active
    piece-surface piece-primary piece-s-40 background-color-auto-11"
    style="--piece-percentage: 75%;"&gt;
  &lt;div class="piece-indicator"&gt;&lt;/div&gt;
&lt;/div&gt;`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-progress-indicator", "Base: display:grid, overflow:hidden, opacity:0."],
                [".piece-active",             "Torna visível (opacity:1)."],
                [".piece-bar",                "Modo linear: height:4px, width:100%."],
                [".piece-circle",             "Modo circular: 40×40px, border-radius:50%, conic-gradient."],
                [".piece-absolute",           "position:absolute (ex: topo de um card)."],
                ["--piece-percentage",        "CSS var. Define o progresso (0% a 100%)."],
                [".piece-indicator",          "Barra interna (bar) ou máscara circular (circle)."],
            ])
        ))
    },

    // ══════════════════════════════════════════════════════
    // RIPPLE
    // ══════════════════════════════════════════════════════
    renderRipple(c) {
        c.appendAll(MPSO.globalFns.create(
            this.header("Ripple", "Efeito de onda granulada ao clicar. Injetado via ripple.js — adicione .piece-ripple como filho direto do alvo.", "ripple.css") +

            `<p class="comp-section-title text-color-auto-14">Demo — clique em qualquer elemento</p>` +
            this.demoCard(null,
                `<button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary" style="position:relative;">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Ripple padrão</span>
                </button>
                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-inverse-00 piece-primary">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Ripple inverse</span>
                </button>
                <button class="piece-FAB piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-secondary">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon" translate="no">water_drop</span>
                </button>`,
                `&lt;!-- 1. Adicione .piece-ripple como filho direto --&gt;
&lt;button style="position:relative;"&gt;
  &lt;span class="piece-ripple"&gt;&lt;/span&gt;
  ...
&lt;/button&gt;

&lt;!-- 2. Defina a cor do ripple no container --&gt;
ripple-color-auto-00     → usa cor do tema
ripple-color-inverse-00  → usa cor inversa (para fundos escuros)`) +

            `<p class="comp-section-title text-color-auto-14">Como funciona</p>` +
            this.demoCard(null,
                `<div style="font-size:13px;line-height:1.8;opacity:.75;padding:4px 0;">
                    O <strong>ripple.js</strong> escuta clicks em qualquer elemento.
                    Quando encontra um filho <code>.piece-ripple</code>, cria um
                    <code>.piece-ripple-effect</code> na posição do clique, anima de 0 até
                    o raio máximo e remove quando a animação termina.
                    O efeito é um gradiente pontilhado (granulado) que usa
                    <code>--ripple-color</code> herdado do <code>.piece-surface</code>.
                </div>`) +

            `<p class="comp-section-title text-color-auto-14">Referência</p>` +
            this.classTable([
                [".piece-ripple",            "Span vazio filho direto do alvo. position:absolute, inset:0."],
                [".piece-ripple-effect",     "Criado pelo ripple.js. Animado e removido automaticamente."],
                ["ripple-color-auto-XX",     "Define --ripple-color na escala auto (claro/escuro)."],
                ["ripple-color-inverse-XX",  "Define --ripple-color na escala inversa."],
                ["--ripple-color",           "CSS var calculada pela piece-surface."],
            ])
        ))
    },

})
