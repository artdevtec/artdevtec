CompPages["group-button"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        palette:  'piece-primary',
        size:     'piece-medium',
        content:  'label',      // 'icon' | 'icon-label' | 'label'
        select:   'single',     // 'single' | 'multiple'
        iconMode: 'fixed',      // 'fixed' | 'toggle'
        active:   [0]
    }

    // ─── Itens do grupo de demonstração ──────────────────────
    const items = [
        { label: 'Grade',   icon: 'grid_view',  iconTrue: 'grid_on'    },
        { label: 'Lista',   icon: 'list',        iconTrue: 'list_alt'   },
        { label: 'Mapa',    icon: 'map',         iconTrue: 'location_on'},
        { label: 'Gráfico', icon: 'bar_chart',   iconTrue: 'insights'   },
    ]

    const ON  = 'background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00'
    const OFF = 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18'

    // ─── Construção do grupo (playground) ────────────────────
    function buildGroup(forCode = false) {
        const inputType = state.select === 'single' ? 'radio' : 'checkbox'
        const groupName = forCode ? 'gb-group' : 'gb-live'

        const btns = items.map((item, i) => {
            const isActive  = state.active.includes(i)
            const cls = ['piece-button', 'piece-surface', 'piece-s-40',
                         state.palette, state.size, isActive ? ON : OFF].join(' ')

            const nameAttr    = inputType === 'radio' ? ` name="${groupName}"` : ''
            const checkedAttr = isActive ? ' checked' : ''
            let inner = `<input type="${inputType}" class="piece-controller"${nameAttr}${checkedAttr}>`
            inner += '<span class="piece-ripple"></span>'

            if (state.content !== 'label') {
                if (state.content === 'icon-label') {
                    // Checkmark como indicador de seleção no modo icon+label
                    inner += `<span class="material-symbols-rounded piece-icon piece-false" translate="no">${item.icon}</span>`
                    inner += `<span class="material-symbols-rounded piece-icon piece-true" translate="no">check</span>`
                } else if (state.iconMode === 'toggle') {
                    inner += `<span class="material-symbols-rounded piece-icon piece-false" translate="no">${item.icon}</span>`
                    inner += `<span class="material-symbols-rounded piece-icon piece-true" translate="no">${item.iconTrue}</span>`
                } else {
                    inner += `<span class="material-symbols-rounded piece-icon" translate="no">${item.icon}</span>`
                }
            }

            if (state.content !== 'icon') {
                inner += `<span class="piece-label">${item.label}</span>`
            }

            const data = forCode ? '' : ` data-item="${i}"`
            return `    <label class="${cls}"${data}>\n        ${inner}\n    </label>`
        }).join('\n')

        return `<div class="piece-group-button">\n${btns}\n</div>`
    }

    // ─── Helpers de controle (playground) ────────────────────
    const ctrlBtn = (val, label, active, ctrl) =>
        `<button class="piece-button piece-small piece-surface piece-s-40
            ${active ? ON + ' piece-actived' : OFF}
            piece-secondary"
         data-ctrl="${ctrl}" data-val="${val}">
            <span class="piece-ripple"></span>
            <span class="piece-label">${label}</span>
        </button>`

    const sizes    = ['piece-extra-small','piece-small','piece-medium','piece-large','piece-extra-large']
    const sizeLbls = ['XS','S','M','L','XL']

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Group Button", "Conjunto de botões agrupados com bordas e raio compartilhados. Suporta seleção única (radio) e múltipla (checkbox), ícone, label e toggle de ícone.", "button.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:160px;display:grid;place-content:center;padding:40px;">
                <div id="gb-preview"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Paleta</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('piece-primary',  'Primary',   true,  'palette')}
                        ${ctrlBtn('piece-secondary','Secondary', false, 'palette')}
                        ${ctrlBtn('piece-tertiary', 'Tertiary',  false, 'palette')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Tamanho</span>
                    <div class="piece-group-button">
                        ${sizes.map((s,i) => ctrlBtn(s, sizeLbls[i], s === 'piece-medium', 'size')).join('')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Conteúdo</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('icon',       'Ícone',         false, 'content')}
                        ${ctrlBtn('icon-label', 'Ícone + Label', false, 'content')}
                        ${ctrlBtn('label',      'Label',         true,  'content')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Seleção</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('single',   'Única',    true,  'select')}
                        ${ctrlBtn('multiple', 'Múltipla', false, 'select')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Ícone</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('fixed',  'Fixo',   true,  'iconMode')}
                        ${ctrlBtn('toggle', 'Toggle', false, 'iconMode')}
                    </div>
                    <span style="font-size:11px;opacity:.35;">piece-false / piece-true quando ativo</span>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="gb-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            [".piece-group-button",        "Container do grupo — inline-flex, gap 2px entre os itens, sem padding"],
            [".piece-button .piece-surface .piece-s-40", "Classes obrigatórias em cada item junto com tamanho e paleta de cor"],
            [".piece-ripple",              "Efeito de ripple — adicione como primeiro filho dentro do item"],
        ]),

        H.section("MODO 1 — input (recomendado)"),
        H.ref([
            ["&lt;label&gt;",                   "Use &lt;label&gt; como elemento raiz quando o item envolve um input — semântica correta"],
            ["input type=\"radio\"",            "Seleção única — o browser garante exclusividade no grupo pelo atributo name"],
            ["input type=\"checkbox\"",          "Seleção múltipla — cada item é independente, qualquer número pode estar ativo"],
            ["name=\"grupo\"",                   "Obrigatório nos radios — todos do mesmo grupo devem ter o mesmo name"],
            ["class=\"piece-controller\"",       "Obrigatório no input — CSS usa :has(.piece-controller:checked) para ativar o estado"],
            [":has(.piece-controller:checked)",  "CSS aplica: border-radius fully-round, FILL:1 no ícone, piece-true visível — zero JS"],
        ]),

        H.section("MODO 2 — piece-actived via JS"),
        H.ref([
            ["&lt;button&gt; ou qualquer tag", "Sem input, use o elemento que fizer sentido — &lt;button&gt;, &lt;a&gt;, &lt;div&gt;"],
            [".piece-actived",                 "Adicione/remova via JS para ativar o estado visual do item"],
            [":has(.piece-actived)",           "CSS também responde a .piece-actived — mesmo efeito visual do input:checked"],
            ["JS — seleção única",             "Ao clicar, remova .piece-actived de todos os irmãos e adicione ao clicado"],
            ["JS — seleção múltipla",          "Ao clicar, apenas toggle de .piece-actived no item clicado"],
        ]),

        H.section("ÍCONES"),
        H.ref([
            [".piece-icon",              "Ícone fixo — sempre visível, recebe FILL:1 automaticamente quando o item está ativo"],
            [".piece-icon.piece-false",  "Ícone do estado inativo — some quando :has(.piece-controller:checked) for verdadeiro"],
            [".piece-icon.piece-true",   "Ícone do estado ativo — aparece com FILL:1 quando o item está marcado"],
            ["check (piece-true)",       "Em modo ícone + label use 'check' como piece-true para indicar seleção sem repetir o ícone"],
        ]),

        H.section("CORES — estado ativo e inativo"),
        H.ref([
            ["background-color-auto-11",        "Fundo do item ativo"],
            ["background-color-auto-12-hover",  "Fundo hover do item ativo"],
            ["text-color-auto-00",              "Cor do texto/ícone no item ativo"],
            ["ripple-color-auto-00",            "Cor do ripple no item ativo"],
            ["background-color-auto-06",        "Fundo do item inativo"],
            ["background-color-auto-07-hover",  "Fundo hover do item inativo"],
            ["text-color-auto-18",              "Cor do texto/ícone no item inativo"],
            ["ripple-color-auto-18",            "Cor do ripple no item inativo"],
        ]),

        H.section("TAMANHOS"),
        H.ref([
            [".piece-extra-small",  "h 32px  ·  borda flat 4px   ·  borda ativa 16px"],
            [".piece-small",        "h 40px  ·  borda flat 8px   ·  borda ativa 20px"],
            [".piece-medium",       "h 56px  ·  borda flat 8px   ·  borda ativa 28px"],
            [".piece-large",        "h 96px  ·  borda flat 16px  ·  borda ativa 48px"],
            [".piece-extra-large",  "h 136px ·  borda flat 20px  ·  borda ativa 68px"],
        ])
    )

    // ─── Eventos do playground ────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('gb-preview')
        const code    = document.getElementById('gb-code')

        function wireGroup() {
            if (!preview) return
            preview.querySelectorAll('[data-item]').forEach((lbl, i) => {
                const input = lbl.querySelector('input.piece-controller')
                if (!input) return
                input.addEventListener('change', () => {
                    const idx = Number(lbl.dataset.item)
                    if (state.select === 'single') {
                        state.active = [idx]
                    } else {
                        state.active = input.checked
                            ? [...state.active, idx]
                            : state.active.filter(x => x !== idx)
                    }
                    // Atualiza apenas o code output — CSS já cuida de border-radius e ícones
                    // Reconstrói para sincronizar as classes de background
                    update()
                })
            })
        }

        function update() {
            if (!preview) return
            preview.innerHTML = buildGroup()
            if (code) code.textContent = buildGroup(true)
            wireGroup()
        }

        // Controles de configuração
        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = btn.dataset.val
                state[ctrl] = val

                if (ctrl === 'select' && val === 'single') {
                    state.active = state.active.length ? [state.active[0]] : [0]
                }

                document.querySelectorAll(`[data-ctrl="${ctrl}"]`).forEach(b => {
                    const isActive = b.dataset.val === val
                    b.className = b.className
                        .replace(ON + ' piece-actived', OFF)
                        .replace(ON, OFF)
                    if (isActive) {
                        b.className = b.className.replace(OFF, ON + ' piece-actived')
                    }
                })

                update()
            })
        })

        update()
    })
}
