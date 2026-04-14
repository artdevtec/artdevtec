CompPages["split-button"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        size:    'piece-small',
        variant: 'elevated',
        palette: 'piece-primary',
        selected: 0,
    }

    const actions = [
        { label: 'Copiar',       icon: 'content_copy', value: 'copy'     },
        { label: 'Baixar',       icon: 'download',      value: 'download' },
        { label: 'Compartilhar', icon: 'share',         value: 'share'    },
    ]

    // ─── Classes por variante ─────────────────────────────────
    const variants = {
        elevated: {
            container: 'piece-elevated',
            btn:   `piece-not-interactive piece-leading-button piece-surface
                box-shadow-color-auto-12
                background-color-auto-04 background-color-auto-05-hover
                text-color-auto-20`,
            trail: `piece-trailing-button piece-surface
                box-shadow-color-auto-12
                background-color-auto-04 background-color-auto-05-hover
                text-color-auto-20`,
        },
        filled: {
            container: '',
            btn:   `piece-not-interactive piece-leading-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00`,
            trail: `piece-trailing-button piece-surface
                background-color-auto-11 background-color-auto-12-hover
                text-color-auto-00`,
        },
        tonal: {
            container: '',
            btn:   `piece-not-interactive piece-leading-button piece-surface
                background-color-auto-06 background-color-auto-07-hover
                text-color-auto-18`,
            trail: `piece-trailing-button piece-surface
                background-color-auto-06 background-color-auto-07-hover
                text-color-auto-18`,
        },
        outlined: {
            container: '',
            btn:   `piece-not-interactive piece-leading-button piece-surface piece-border piece-background-alpha-00
                background-color-auto-04-hover
                border-color-auto-06 text-color-auto-20`,
            trail: `piece-trailing-button piece-surface piece-border piece-background-alpha-00
                background-color-auto-04-hover
                border-color-auto-06 text-color-auto-20`,
        },
    }

    const itemCls = `piece-surface background-color-auto-00 background-color-auto-01-hover
        background-color-auto-06-active background-color-auto-07-hover-active`

    // ─── Construção ───────────────────────────────────────────
    function buildSplit(forCode = false) {
        const sel       = actions[state.selected]
        const v         = variants[state.variant]
        const menuName  = forCode ? 'split-action' : 'split-live'
        const id        = forCode ? '' : ' id="sb-live"'
        const extraCls  = v.container ? ` ${v.container}` : ''
        const paletteCls = ` ${state.palette}`

        const menuItems = actions.map((a, i) => {
            const checked = i === state.selected && !forCode ? ' checked' : ''
            return `        <label class="${itemCls}">
            <input type="radio" class="piece-controller" name="${menuName}" value="${a.value}"${checked}>
            <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">${a.icon}</span>
            <span class="material-symbols-rounded piece-menu-icon piece-true" translate="no">${a.icon}</span>
            <span class="piece-menu-label">${a.label}</span>
        </label>`
        }).join('\n')

        return `<div${id} style="width:min-content;" class="piece-split-button ${state.size}${paletteCls}${extraCls} piece-interactive">
    <button data-action="${sel.value}" class="${v.btn}">
        <span class="material-symbols-rounded piece-icon" translate="no">${sel.icon}</span>
        <span class="piece-label">${sel.label}</span>
        <span class="piece-ripple"></span>
    </button>
    <button class="${v.trail}">
        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
        <span class="piece-ripple"></span>
    </button>
    <nav class="piece-menu">
        <ul class="piece-surface background-color-auto-00">
${menuItems}
        </ul>
    </nav>
</div>`
    }

    // ─── Helpers de controle ──────────────────────────────────
    const ON  = 'background-color-auto-11 text-color-auto-00 ripple-color-auto-00 piece-actived'
    const OFF = 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18'

    const ctrlBtn = (val, label, active, ctrl) =>
        `<button class="piece-button piece-extra-small piece-surface piece-s-40
            ${active ? ON : OFF} piece-secondary"
         data-ctrl="${ctrl}" data-val="${val}">
            <span class="piece-ripple"></span>
            <span class="piece-label">${label}</span>
        </button>`

    const sizes    = ['piece-extra-small','piece-small','piece-medium','piece-large','piece-extra-large']
    const sizeLbls = ['XS','S','M','L','XL']

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Split Button", "Botão duplo: ação principal à esquerda e seta que abre um menu de opções à direita.", "split-button.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:200px;display:grid;place-content:center;padding:40px;overflow:visible;">
                <div id="sb-preview"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Variante</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('elevated', 'Elevated', true,  'variant')}
                        ${ctrlBtn('filled',   'Filled',   false, 'variant')}
                        ${ctrlBtn('tonal',    'Tonal',    false, 'variant')}
                        ${ctrlBtn('outlined', 'Outlined', false, 'variant')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Paleta</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('piece-primary',   'Primary',   true,  'palette')}
                        ${ctrlBtn('piece-secondary', 'Secondary', false, 'palette')}
                        ${ctrlBtn('piece-tertiary',  'Tertiary',  false, 'palette')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Tamanho</span>
                    <div class="piece-group-button">
                        ${sizes.map((s,i) => ctrlBtn(s, sizeLbls[i], s === 'piece-small', 'size')).join('')}
                    </div>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="sb-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            [".piece-split-button",      "Container — display:grid 2 colunas, position:relative"],
            [".piece-interactive",       "No container — piece-interactive.js toggle .piece-actived ao clicar no trailing"],
            ["&lt;button&gt; leading",   "Ação principal — obrigatório .piece-not-interactive para não abrir o menu"],
            ["&lt;button&gt; trailing",  "Seta — clicar abre/fecha o menu (gerenciado por piece-interactive)"],
            ["&lt;nav&gt; .piece-menu",  "Menu dropdown — animated via clip-path + opacity"],
        ]),

        H.section("VARIANTES"),
        H.ref([
            ["Elevated",   "piece-box-shadow nos botões — fundo surface com sombra suave"],
            ["Filled",     "background-color-auto-11 — fundo sólido na cor da paleta"],
            ["Tonal",      "background-color-auto-06 — fundo suave/tonal da paleta"],
            ["Outlined",   "piece-border + background transparente — apenas borda"],
        ]),

        H.section("MENU INTERNO"),
        H.ref([
            ["ul .background-color-auto-00",   "Lista de itens do menu com fundo neutro"],
            ["label .piece-controller (radio)", "Cada opção é um label com input radio — name compartilhado entre todos"],
            [".piece-menu-icon .piece-false",   "Ícone quando NÃO selecionado"],
            [".piece-menu-icon .piece-true",    "Ícone quando selecionado (FILL:1 automático)"],
            ["data-action no leading",          "Atualize via JS ao selecionar uma opção do menu"],
        ]),

        H.section("ESTADOS"),
        H.ref([
            [".piece-actived",            "No container — abre o menu (clip-path reveal) e rotaciona o ícone da seta"],
            [":not(.piece-actived)",      "Menu oculto (clip-path: inset 100%)"],
        ]),

        H.section("TAMANHOS"),
        H.ref([
            [".piece-extra-small",  "Altura 32px"],
            [".piece-small",        "Altura 40px"],
            [".piece-medium",       "Altura 56px"],
            [".piece-large",        "Altura 96px"],
            [".piece-extra-large",  "Altura 136px"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('sb-preview')
        const code    = document.getElementById('sb-code')

        function wireInteraction() {
            const container = document.getElementById('sb-live')
            if (!container) return

            container.querySelectorAll('input[type="radio"]').forEach((input, i) => {
                input.addEventListener('change', () => {
                    if (!input.checked) return
                    state.selected = i
                    const a       = actions[i]
                    const leading = container.querySelector('[data-action]')
                    if (leading) {
                        leading.dataset.action = a.value
                        leading.querySelector('.piece-icon').textContent = a.icon
                        leading.querySelector('.piece-label').textContent = a.label
                    }
                    container.classList.remove('piece-actived')
                    if (code) code.textContent = buildSplit(true)
                })
            })
        }

        function update() {
            if (preview) preview.innerHTML = buildSplit()
            if (code)    code.textContent  = buildSplit(true)
            wireInteraction()
        }

        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = btn.dataset.val
                state[ctrl] = val
                document.querySelectorAll(`[data-ctrl="${ctrl}"]`).forEach(b => {
                    const isActive = b.dataset.val === val
                    b.className = b.className.replace(ON + ' piece-actived', OFF).replace(ON, OFF)
                    if (isActive) b.className = b.className.replace(OFF, ON + ' piece-actived')
                })
                update()
            })
        })

        update()
    })
}
