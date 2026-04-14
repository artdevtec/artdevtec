CompPages["tooltip"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        pos:    'top',     // 'top' | 'bottom' | 'left' | 'right'
        align:  '',        // '' | 'left' | 'right' | 'start' | 'end'
        vis:    'hover',   // 'hover' | 'visible'
    }

    // ─── Construção ───────────────────────────────────────────
    function tooltipClasses() {
        return [state.pos, state.align, state.vis === 'visible' ? 'piece-visible' : 'hover']
            .filter(Boolean).join(' ')
    }

    function buildDemo(forCode = false) {
        const cls  = tooltipClasses()
        const text = `${state.pos}${state.align ? ' ' + state.align : ''}`
        const rel  = forCode ? '' : ' style="position:relative;"'
        return `<button class="piece-button piece-medium piece-surface piece-s-40
    background-color-auto-11 background-color-auto-12-hover
    text-color-auto-00 ripple-color-auto-00 piece-primary"${rel}>
    <span class="piece-ripple"></span>
    <span class="piece-label">Hover aqui</span>
    <span class="piece-tooltip piece-surface background-color-auto-18 text-color-auto-02 ${cls}">${text}</span>
</button>`
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

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Tooltip", "Dica contextual via :hover ou :active. Position:absolute — o pai precisa de position:relative.", "tooltip.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:200px;display:grid;place-items:center;padding:80px 60px;">
                <div id="tt-preview" style="position:relative;display:inline-block;"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Posição</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('top',    'Top',    true,  'pos')}
                        ${ctrlBtn('bottom', 'Bottom', false, 'pos')}
                        ${ctrlBtn('left',   'Left',   false, 'pos')}
                        ${ctrlBtn('right',  'Right',  false, 'pos')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Alinhamento</span>
                    <div class="piece-group-button" id="tt-align-group">
                        ${ctrlBtn('',      'Centro', true,  'align')}
                        ${ctrlBtn('left',  'Left',   false, 'align')}
                        ${ctrlBtn('right', 'Right',  false, 'align')}
                        ${ctrlBtn('start', 'Start',  false, 'align')}
                        ${ctrlBtn('end',   'End',    false, 'align')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Exibição</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('hover',   'Hover',         true,  'vis')}
                        ${ctrlBtn('visible', 'Sempre visível',false, 'vis')}
                    </div>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="tt-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            [".piece-tooltip",      "Filho direto do elemento alvo — position:absolute, opacity:0 por padrão"],
            ["pai position:relative","Obrigatório no elemento que contém o tooltip para posicionamento correto"],
            [".hover",              "Exibe quando o pai recebe :hover (não funciona em elementos .disabled)"],
            [".piece-visible",      "Força visibilidade permanente — útil para documentação e debug"],
        ]),

        H.section("POSIÇÕES PRINCIPAIS"),
        H.ref([
            [".top",               "Acima — centralizado horizontalmente (top:-28px, left:50%)"],
            [".bottom",            "Abaixo — centralizado horizontalmente (bottom:-28px, left:50%)"],
            [".left",              "À esquerda — centralizado verticalmente"],
            [".right",             "À direita — centralizado verticalmente"],
        ]),

        H.section("MODIFICADORES DE ALINHAMENTO"),
        H.ref([
            [".top.left",          "Acima, alinhado à direita do elemento (desloca para a esquerda)"],
            [".top.right",         "Acima, alinhado à esquerda do elemento (desloca para a direita)"],
            [".top.start",         "Acima, borda esquerda alinhada com o elemento"],
            [".top.end",           "Acima, borda direita alinhada com o elemento"],
            [".bottom.left/right/start/end", "Mesma lógica, abaixo do elemento"],
            [".right.start / .right.end",    "À direita, topo ou base alinhados com o elemento"],
            [".left.start / .left.end",      "À esquerda, topo ou base alinhados com o elemento"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('tt-preview')
        const code    = document.getElementById('tt-code')

        function update() {
            if (preview) {
                preview.innerHTML = buildDemo()
                // Re-attach so the tooltip inside is relative to tt-preview
                const btn = preview.querySelector('button')
                if (btn) btn.style.position = 'relative'
            }
            if (code) code.textContent = buildDemo(true)
        }

        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = btn.dataset.val
                state[ctrl] = val

                // Quando troca de posição, reseta alinhamento
                if (ctrl === 'pos') {
                    state.align = ''
                    document.querySelectorAll('[data-ctrl="align"]').forEach(b => {
                        b.className = b.className.replace(ON + ' piece-actived', OFF).replace(ON, OFF)
                        if (b.dataset.val === '') b.className = b.className.replace(OFF, ON + ' piece-actived')
                    })
                }

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
