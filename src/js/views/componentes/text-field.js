CompPages["text-field"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        palette:  'piece-primary',
        size:     'piece-medium',
        leading:  false,
        prefix:   false,
        suffix:   false,
        iconBtn:  false,
        support:  false,
    }

    // ─── Construção do campo ──────────────────────────────────
    function buildField(forCode = false) {
        const label = 'E-mail'

        const leadHtml = state.leading
            ? `\n            <span class="material-symbols-rounded piece-icon-leading" translate="no">mail</span>`
            : ''

        const prefixHtml = state.prefix
            ? `\n            <span class="piece-field-prefix">R$</span>`
            : ''

        const suffixHtml = state.suffix
            ? `\n            <span class="piece-field-suffix">.com</span>`
            : ''

        const iconBtnHtml = state.iconBtn
            ? `\n            <button class="piece-icon-button piece-surface piece-s-40 ${state.palette} piece-extra-small
                background-color-auto-06 background-color-auto-07-hover
                background-color-auto-11-active background-color-auto-12-hover-active
                text-color-auto-19 text-color-auto-00-active ripple-color-auto-19" type="button">
                <span class="piece-ripple"></span>
                <span class="material-symbols-rounded piece-icon piece-false" translate="no">visibility_off</span>
                <span class="material-symbols-rounded piece-icon piece-true" translate="no">visibility</span>
            </button>`
            : ''

        const supportHtml = state.support
            ? `\n        <div class="piece-field-support">
            <span>Texto de suporte</span>
        </div>`
            : ''

        return `<div class="piece-text-field ${state.size} ${state.palette}">
    <fieldset class="piece-field-outline piece-background-alpha-00 piece-surface
        border-color-auto-06 border-color-auto-20-active">
        <legend><span>${label}</span></legend>
        <label class="piece-field-container piece-surface piece-background-alpha-00">${leadHtml}${prefixHtml}
            <input type="text" class="piece-controller" required>
            <span class="piece-label">${label}</span>${suffixHtml}${iconBtnHtml}
        </label>
    </fieldset>${supportHtml}
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

    const sizes    = ['piece-extra-small','piece-small','piece-medium','piece-large','piece-extra-large']
    const sizeLbls = ['XS','S','M','L','XL']

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Text Field", "Campo de texto com label flutuante, ícone leading, prefixo, sufixo, icon button e texto de suporte.", "text-field.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:160px;display:grid;place-content:center;padding:48px 40px;">
                <div id="tf-preview" style="width:280px;"></div>
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
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Partes</span>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${toggle('Ícone leading', 'leading', false)}
                        ${toggle('Prefixo',       'prefix',  false)}
                        ${toggle('Sufixo',        'suffix',  false)}
                        ${toggle('Icon button',   'iconBtn', false)}
                        ${toggle('Suporte',       'support', false)}
                    </div>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="tf-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            [".piece-text-field",           "Container raiz — define tamanho e paleta via classes filhas"],
            ["fieldset .piece-field-outline","Borda do campo com recuo para a legend — não use div aqui"],
            ["legend > span",               "Cria o recuo visível para a label flutuante quando ativa"],
            [".piece-field-container",       "Flex row interno — contém ícone, prefixo, label, input, sufixo, icon button"],
            [".piece-label",                 "Label flutuante — sobe ao focar ou quando input tem valor (:valid)"],
            ["class=\"piece-controller\"",      "Obrigatório no input — CSS usa :has(.piece-controller:valid) para ativar a label flutuante"],
            ["input[required]",              "Necessário — :valid só dispara com required presente"],
        ]),

        H.section("PARTES OPCIONAIS"),
        H.ref([
            [".piece-icon-leading",          "Ícone à esquerda — desloca a label quando o campo está vazio"],
            [".piece-field-prefix",          "Texto antes do input (ex: R$) — visível só quando ativo ou válido"],
            [".piece-field-suffix",          "Texto após o input (ex: .com) — visível só quando ativo ou válido"],
            ["&lt;button&gt; .piece-icon-button",  "Use &lt;button type=\"button\"&gt; — piece-false/piece-true alternam via .piece-actived por JS"],
            [".piece-field-support",         "Linha de texto abaixo do fieldset — suporte, erro, contagem de caracteres"],
        ]),

        H.section("TAMANHOS — altura do .piece-field-container"),
        H.ref([
            [".piece-extra-small",  "40px"],
            [".piece-small",        "46px"],
            [".piece-medium",       "52px  (padrão)"],
            [".piece-large",        "58px"],
            [".piece-extra-large",  "64px"],
        ]),

        H.section("CORES"),
        H.ref([
            ["piece-background-alpha-00",     "Fundo transparente no fieldset e no label container"],
            ["border-color-auto-06",          "Borda padrão do fieldset"],
            ["border-color-auto-20-active",   "Borda quando o campo está em foco (-active responde ao :focus-within)"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('tf-preview')
        const code    = document.getElementById('tf-code')

        function update() {
            if (preview) preview.innerHTML = buildField()
            if (code)    code.textContent  = buildField(true)
        }

        // Controles de grupo (palette, size)
        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = btn.dataset.val
                state[ctrl] = val

                document.querySelectorAll(`[data-ctrl="${ctrl}"]`).forEach(b => {
                    const isActive = b.dataset.val === val
                    b.className = b.className
                        .replace(ON + ' piece-actived', OFF)
                        .replace(ON, OFF)
                    if (isActive) b.className = b.className.replace(OFF, ON + ' piece-actived')
                })
                update()
            })
        })

        // Toggles de partes opcionais
        document.querySelectorAll('[data-toggle]').forEach(lbl => {
            const input = lbl.querySelector('input.piece-controller')
            if (!input) return
            input.addEventListener('change', () => {
                const ctrl = lbl.dataset.toggle
                state[ctrl] = input.checked
                lbl.className = lbl.className
                    .replace(ON + ' piece-actived', OFF)
                    .replace(ON, OFF)
                if (input.checked) lbl.className = lbl.className.replace(OFF, ON + ' piece-actived')
                update()
            })
        })

        update()
    })
}
