CompPages["snackbar"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        message: 'saved',   // 'saved' | 'sent' | 'error' | 'restored'
        action:  false,
        close:   false,
    }

    const messages = {
        saved:    'Arquivo salvo com sucesso',
        sent:     'Mensagem enviada',
        error:    'Erro ao conectar',
        restored: 'Conexão restaurada',
    }

    const actions = {
        saved:    'Desfazer',
        sent:     'Desfazer',
        error:    'Tentar novamente',
        restored: 'Ok',
    }

    // ─── Construção ───────────────────────────────────────────
    function buildSnackbar(forCode = false) {
        const inline = forCode ? '' : ' style="position:relative;bottom:auto;left:auto;"'

        const actionHtml = state.action
            ? `\n    <button class="piece-button piece-small piece-surface piece-s-40
        background-color-auto-18 background-color-auto-17-hover
        text-color-auto-11 ripple-color-auto-11 piece-primary piece-text"
        type="button">
        <span class="piece-ripple"></span>
        <span class="piece-label">${actions[state.message]}</span>
    </button>`
            : ''

        const closeHtml = state.close
            ? `\n    <button class="piece-icon-button piece-surface piece-s-40 piece-extra-small
        background-color-auto-18 background-color-auto-17-hover
        text-color-auto-02 ripple-color-auto-02" type="button">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon" translate="no">close</span>
    </button>`
            : ''

        return `<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02"${inline}>
    <span class="label">${messages[state.message]}</span>${actionHtml}${closeHtml}
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
        H.header("Snackbar", "Notificação temporária fixada no canto inferior. Contém label e opcionalmente botão de ação e/ou fechar.", "snackbar.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:140px;display:grid;place-items:center;padding:40px;">
                <div id="sb-preview"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Mensagem</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('saved',    'Salvo',      true,  'message')}
                        ${ctrlBtn('sent',     'Enviado',    false, 'message')}
                        ${ctrlBtn('error',    'Erro',       false, 'message')}
                        ${ctrlBtn('restored', 'Restaurado', false, 'message')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Partes</span>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${toggle('Botão de ação', 'action', false)}
                        ${toggle('Fechar',        'close',  false)}
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
            [".piece-snackbar",          "Container — position:fixed, bottom:16px, left:16px, height 48px"],
            [".label",                   "Texto principal — font body-medium, text-wrap nowrap"],
            ["&lt;button&gt; ação",      "Botão de texto no snackbar — use .piece-button.piece-text com cores invertidas"],
            ["&lt;button&gt; fechar",    "Icon button de fechar — use .piece-icon-button com cores invertidas"],
        ]),

        H.section("CORES"),
        H.ref([
            ["background-color-auto-18",         "Fundo invertido do container (contraste máximo com a tela)"],
            ["text-color-auto-02",               "Cor do label e do ícone fechar (claro sobre escuro)"],
            ["text-color-auto-11",               "Cor do label do botão de ação (destaca a ação)"],
            ["background-color-auto-17-hover",   "Hover dos botões internos"],
        ]),

        H.section("POSICIONAMENTO"),
        H.ref([
            ["position: fixed",   "Snackbar fica fixo na tela independente do scroll"],
            ["bottom: 16px",      "Distância do rodapé"],
            ["left: 16px",        "Distância da esquerda — ajuste para centralizar se necessário"],
            ["z-index",           "Garanta z-index alto o suficiente para sobrepor outros elementos"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('sb-preview')
        const code    = document.getElementById('sb-code')

        function update() {
            if (preview) preview.innerHTML = buildSnackbar()
            if (code)    code.textContent  = buildSnackbar(true)
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
    })
}
