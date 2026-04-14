CompPages["menu"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        select:   'single',  // 'single' | 'multiple'
        leading:  false,
        trailing: false,
        grouping: 'none',    // 'none' | 'gap' | 'divider'
        badge:    false,
    }

    // ─── Itens ───────────────────────────────────────────────
    const items = [
        { label: 'Caixa de entrada', icon: 'inbox',        trail: '⌘I', badge: '24'  },
        { label: 'Enviados',         icon: 'send',         trail: '⌘E', badge: null  },
        { label: 'Rascunhos',        icon: 'draft',        trail: '⌘R', badge: '3'   },
        { label: 'Lixeira',          icon: 'delete',       trail: '⌘L', badge: null  },
    ]

    const itemCls = 'piece-surface background-color-auto-00 background-color-auto-01-hover background-color-auto-06-active background-color-auto-07-hover-active'

    // ─── Construção ───────────────────────────────────────────
    function buildItem(item, idx, groupName) {
        const inputType = state.select === 'single' ? 'radio' : 'checkbox'
        const nameAttr  = state.select === 'single' ? ` name="${groupName}"` : ''
        const checked   = idx === 0 ? ' checked' : ''

        const inputHtml = `<input type="${inputType}" class="piece-controller"${nameAttr}${checked}>`

        const icoFalse = state.select === 'multiple' ? 'check_box_outline_blank' : item.icon
        const icoTrue  = state.select === 'multiple' ? 'check_box'              : item.icon
        const iconHtml = state.leading
            ? `<span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">${icoFalse}</span>
            <span class="material-symbols-rounded piece-menu-icon piece-true" translate="no">${icoTrue}</span>`
            : ''

        const badgeHtml = (state.badge && item.badge)
            ? `<span class="piece-badge piece-surface piece-large background-color-auto-14 text-color-auto-00">${item.badge}</span>`
            : ''

        const trailHtml = state.trailing
            ? `<span class="piece-menu-trailing text-color-auto-14">${item.trail}</span>`
            : ''

        return `        <label class="${itemCls}">
            ${inputHtml}${iconHtml}
            <span class="piece-menu-label">${item.label}</span>${badgeHtml}${trailHtml}
        </label>`
    }

    const dividerRow =
        `        <li style="height:1px;padding:0;margin:2px 0;pointer-events:none;" class="piece-surface background-color-auto-08"></li>`

    let _gid = 0
    function buildMenu(forCode = false) {
        const gname = forCode ? 'menu-group' : `mn-${++_gid}`
        const rows  = items.map((item, i) => buildItem(item, i, gname))

        const ulOpen  = `    <ul class="piece-surface background-color-auto-00">`
        const ulClose = `    </ul>`

        if (state.grouping === 'gap') {
            return `<div class="piece-menu piece-gap piece-s-40">
${ulOpen}
${rows.slice(0,2).join('\n')}
${ulClose}
${ulOpen}
${rows.slice(2).join('\n')}
${ulClose}
</div>`
        }

        const listItems = state.grouping === 'divider'
            ? [...rows.slice(0,2), dividerRow, ...rows.slice(2)].join('\n')
            : rows.join('\n')

        return `<div class="piece-menu piece-s-40">
${ulOpen}
${listItems}
${ulClose}
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

    const toggle = (label, ctrl, active) =>
        `<label class="piece-button piece-extra-small piece-surface piece-s-40
            ${active ? ON : OFF} piece-secondary" data-toggle="${ctrl}">
            <input type="checkbox" class="piece-controller"${active ? ' checked' : ''}>
            <span class="piece-ripple"></span>
            <span class="piece-label">${label}</span>
        </label>`

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Menu", "Lista de opções com bordas arredondadas adaptáveis. Suporta ícone leading, trailing text, badge, múltiplos grupos e divider.", "menu.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:200px;display:grid;place-content:center;padding:40px;">
                <div id="mn-preview"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Seleção</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('single',   'Única',    true,  'select')}
                        ${ctrlBtn('multiple', 'Múltipla', false, 'select')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Partes</span>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${toggle('Ícone leading', 'leading',  false)}
                        ${toggle('Trailing text', 'trailing', false)}
                        ${toggle('Badge',         'badge',    false)}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Grupos</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('none',    'Simples',   true,  'grouping')}
                        ${ctrlBtn('gap',     'piece-gap', false, 'grouping')}
                        ${ctrlBtn('divider', 'Divider',   false, 'grouping')}
                    </div>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="mn-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            [".piece-menu .piece-s-40",          "Container — max-width 280px, border-radius 16px, box-shadow"],
            ["ul .piece-surface background-color-auto-00", "Grupo de itens — fundo próprio, padding 4px, gap 2px"],
            ["ul > label",                       "Item selecionável — envolve o input.piece-controller"],
            ["ul > li",                          "Item de ação simples — sem input, sem seleção"],
            ["border-radius adaptável",          "Primeiro: 12 12 4 4 · Meio: 4 · Último: 4 4 12 12 · Único: 12"],
        ]),

        H.section("SELEÇÃO"),
        H.ref([
            ["input type=\"radio\"",             "Seleção única — todos do grupo devem ter o mesmo name"],
            ["input type=\"checkbox\"",           "Seleção múltipla — cada item independente"],
            ["class=\"piece-controller\"",        "Obrigatório — CSS usa :has(.piece-controller:checked) para o estado ativo"],
            [":has(input:checked)",              "Ativa: border-radius 12px, ícone FILL:1, piece-true visível"],
        ]),

        H.section("PARTES DO ITEM"),
        H.ref([
            [".piece-menu-icon .piece-false",    "Ícone quando NÃO ativo (FILL:0)"],
            [".piece-menu-icon .piece-true",     "Ícone quando ativo (FILL:1 automático) — pode ser o mesmo nome"],
            [".piece-menu-label",                "Rótulo — flex:1, empurra badge e trailing para o final"],
            [".piece-badge .piece-large",        "Badge com texto — use .piece-large para valor numérico"],
            [".piece-menu-trailing",             "Texto à direita — ex: atalho de teclado"],
        ]),

        H.section("AGRUPAMENTO"),
        H.ref([
            [".piece-gap",               "No .piece-menu — remove shadow do container, cada ul ganha shadow própria"],
            ["ul:first-child",           "No piece-gap: border-radius 16 16 8 8"],
            ["ul:last-child",            "No piece-gap: border-radius 8 8 16 16"],
            ["divider (li)",             "height:1px + background-color-auto-08 — separador dentro do ul"],
        ]),

        H.section("CORES"),
        H.ref([
            ["background-color-auto-00",               "Fundo do ul e do label"],
            ["background-color-auto-01-hover",         "Fundo do label no hover"],
            ["background-color-auto-06-active",        "Fundo do label quando ativo (-active responde ao :checked)"],
            ["background-color-auto-07-hover-active",  "Fundo hover quando ativo"],
            ["background-color-auto-14",               "Fundo do badge"],
            ["text-color-auto-14",                     "Cor do trailing text (mais fraca)"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('mn-preview')
        const code    = document.getElementById('mn-code')

        function update() {
            if (preview) preview.innerHTML = buildMenu()
            if (code)    code.textContent  = buildMenu(true)
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

        document.querySelectorAll('[data-toggle]').forEach(lbl => {
            const input = lbl.querySelector('input.piece-controller')
            if (!input) return
            input.addEventListener('change', () => {
                const ctrl = lbl.dataset.toggle
                state[ctrl] = input.checked
                lbl.className = lbl.className.replace(ON + ' piece-actived', OFF).replace(ON, OFF)
                if (input.checked) lbl.className = lbl.className.replace(OFF, ON + ' piece-actived')
                update()
            })
        })

        update()
    })
}
