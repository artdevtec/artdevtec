CompPages["radio"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        size:     'piece-small',
        palette:  'piece-primary',
        disabled: false,
    }

    const baseCls = () =>
        `piece-radio piece-surface
        background-color-auto-04 background-color-auto-05-hover
        background-color-auto-11-active
        text-color-auto-18 text-color-auto-00-active
        ripple-color-auto-18 ripple-color-auto-00-active
        ${state.size} ${state.palette}${state.disabled ? ' piece-disabled' : ''}`

    // ─── Construção ───────────────────────────────────────────
    const options = ['Opção A', 'Opção B', 'Opção C']

    function buildOne(label, checked = false, forCode = false) {
        const checkedAttr = checked && !forCode ? ' checked' : ''
        const namePart    = forCode ? 'grupo' : 'radio-live'
        return `<label class="${baseCls()}">
    <input type="radio" class="piece-controller" name="${namePart}"${checkedAttr}>
    <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
    <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
    <span class="piece-ripple"></span>
</label>`
    }

    function buildPreview() {
        return options.map((opt, i) =>
            `<div style="display:flex;align-items:center;gap:12px;">
                ${buildOne(opt, i === 0, false)}
                <span style="font-size:14px;">${opt}</span>
            </div>`
        ).join('\n')
    }

    function buildCode() {
        return options.map((opt, i) =>
            `<!-- ${opt} -->\n${buildOne(opt, i === 0, true)}`
        ).join('\n\n')
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
        H.header("Radio", "Seleção única dentro de um grupo — se comporta como icon-button toggle com input[type=radio]. Usa piece-false/piece-true para alternar ícones via CSS.", "radio.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:200px;display:grid;place-content:center;padding:40px;">
                <div id="rb-preview" style="display:flex;flex-direction:column;gap:12px;"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Tamanho</span>
                    <div class="piece-group-button">
                        ${sizes.map((s,i) => ctrlBtn(s, sizeLbls[i], s === 'piece-small', 'size')).join('')}
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
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Estado</span>
                    <div style="display:flex;gap:6px;">
                        ${toggle('Disabled', 'disabled', false)}
                    </div>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="rb-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            ["&lt;label&gt; .piece-radio",              "O próprio label É o componente — não há wrapper extra"],
            ["input[type=radio] .piece-controller",     "Input hidden — mesmo name = grupo de seleção única"],
            [".piece-false",                            "Ícone exibido quando não selecionado (radio_button_unchecked)"],
            [".piece-true",                             "Ícone exibido quando selecionado — CSS aplica FILL:1 automaticamente"],
            [".piece-ripple",                           "Onda de toque"],
        ]),

        H.section("MODO 1 — input (recomendado)"),
        H.ref([
            ["&lt;label class=\"piece-radio\"&gt;",       "Tag label como raiz — click nativo propaga ao input"],
            ["input[type=radio] name=\"grupo\"",          "Todos os radios com mesmo name formam um grupo exclusivo"],
            ["CSS usa :has(.piece-controller:checked)",   "Nenhum JS necessário para alternar estado"],
        ]),

        H.section("MODO 2 — piece-actived via JS"),
        H.ref([
            ["&lt;div class=\"piece-radio\"&gt; ou &lt;button&gt;", "Qualquer tag — estado controlado por JS"],
            [".piece-actived no container",                          "Adicionar/remover via JS → CSS alterna piece-false/piece-true"],
            ["Útil quando",                                          "Estado vem de fonte externa (API, store, roteador)"],
        ]),

        H.section("TAMANHOS"),
        H.ref([
            [".piece-extra-small",  "32px — sempre circular (border-radius 136px)"],
            [".piece-small",        "40px — sempre circular"],
            [".piece-medium",       "56px — sempre circular"],
            [".piece-large",        "96px — sempre circular"],
            [".piece-extra-large",  "136px — sempre circular"],
        ]),

        H.section("CORES"),
        H.ref([
            ["background-color-auto-04",         "Fundo padrão (neutro)"],
            ["background-color-auto-05-hover",   "Hover"],
            ["background-color-auto-11-active",  "Fundo quando selecionado (cor da paleta)"],
            ["text-color-auto-18",               "Cor do ícone não selecionado"],
            ["text-color-auto-00-active",        "Cor do ícone selecionado (contraste sobre a paleta)"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview = document.getElementById('rb-preview')
        const code    = document.getElementById('rb-code')

        function update() {
            if (preview) preview.innerHTML = buildPreview()
            if (code)    code.textContent  = buildCode()
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
