CompPages["toast"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        message: 'saved',   // 'saved' | 'sent' | 'error' | 'restored'
        icon:    true,
    }

    const messages = {
        saved:    'Arquivo salvo com sucesso',
        sent:     'Mensagem enviada',
        error:    'Erro ao conectar',
        restored: 'Conexão restaurada',
    }

    const icons = {
        saved:    'check_circle',
        sent:     'send',
        error:    'error',
        restored: 'wifi',
    }

    // ─── Construção ───────────────────────────────────────────
    function buildToast(forCode = false) {
        const inline = forCode ? '' : ' style="position:relative;bottom:auto;left:auto;transform:none;margin:auto;"'

        const iconHtml = state.icon
            ? `\n    <span class="material-symbols-rounded piece-icon" translate="no">${icons[state.message]}</span>`
            : ''

        return `<div class="piece-toast piece-surface background-color-inverse-00 text-color-inverse-25"${inline}>${iconHtml}
    <span class="piece-label">${messages[state.message]}</span>
</div>`
    }

    // ─── Dispara toast real na tela ───────────────────────────
    function showToast() {
        const icon = state.icon ? icons[state.message] : ''
        PieceToast.show(messages[state.message], icon)
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
        H.header("Toast", "Notificação informativa simples, centralizada na tela. Sem ações — use o Snackbar quando precisar de botões.", "toast.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:140px;display:grid;place-items:center;padding:40px;">
                <div id="toast-preview"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div class="pg-ctrl-row" style="display:flex;align-items:center;gap:12px;flex-wrap:nowrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Mensagem</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('saved',    'Salvo',      true,  'message')}
                        ${ctrlBtn('sent',     'Enviado',    false, 'message')}
                        ${ctrlBtn('error',    'Erro',       false, 'message')}
                        ${ctrlBtn('restored', 'Restaurado', false, 'message')}
                    </div>
                </div>

                <div class="pg-ctrl-row" style="display:flex;align-items:center;gap:12px;flex-wrap:nowrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Partes</span>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${toggle('Ícone', 'icon', true)}
                    </div>
                </div>

                <div style="display:flex;justify-content:flex-start;">
                    <button id="toast-fire-btn"
                            class="piece-button piece-small piece-surface piece-s-40 piece-primary
                                   background-color-auto-13 background-color-auto-14-hover
                                   text-color-auto-00 ripple-color-auto-00"
                            type="button">
                        <span class="material-symbols-rounded piece-icon" translate="no">play_arrow</span>
                        <span class="piece-label">Disparar</span>
                        <span class="piece-ripple"></span>
                    </button>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="toast-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            [".piece-toast",        "Container — position:fixed, centralizado horizontalmente via left:50% + translateX(-50%), border-radius:28px"],
            [".piece-icon",         "Ícone opcional — Material Symbol à esquerda do label; quando presente adiciona padding-left:8px automaticamente"],
            [".piece-label",        "Texto da mensagem — sem wrap, fonte 16px"],
        ]),

        H.section("CORES"),
        H.ref([
            ["background-color-inverse-00",  "Fundo invertido — máximo contraste com a tela (preto no tema claro, branco no escuro)"],
            ["text-color-inverse-25",         "Texto sobre fundo invertido — legível em qualquer tema"],
        ]),

        H.section("POSICIONAMENTO"),
        H.ref([
            ["position: fixed",              "Toast fica fixo na tela independente do scroll"],
            ["bottom: 16px",                 "Distância do rodapé"],
            ["left: 50% + translateX(-50%)", "Centraliza horizontalmente na tela"],
            ["pointer-events: none",         "Não bloqueia cliques na página"],
        ]),

        H.section("DIFERENÇA: TOAST vs SNACKBAR"),
        H.ref([
            ["Toast",    "Só informativo — sem ações. Centralizado. Usado para confirmações simples e rápidas."],
            ["Snackbar", "Pode ter botão de ação e/ou fechar. Fixado à esquerda. Usado quando o usuário precisa agir."],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('toast-preview')
        const code    = document.getElementById('toast-code')

        function update() {
            if (preview) preview.innerHTML = buildToast()
            if (code)    code.textContent  = buildToast(true)
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
                state[lbl.dataset.toggle] = input.checked
                lbl.className = lbl.className.replace(ON + ' piece-actived', OFF).replace(ON, OFF)
                if (input.checked) lbl.className = lbl.className.replace(OFF, ON + ' piece-actived')
                update()
            })
        })

        update()

        document.getElementById('toast-fire-btn')?.addEventListener('click', showToast)
    })
}
