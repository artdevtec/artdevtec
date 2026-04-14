CompPages["switch"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        palette:  'piece-primary',
        iconMode: 'none',   // 'none' | 'true-only' | 'false-only' | 'both'
        disabled: false,
    }

    // ─── Construção do switch ─────────────────────────────────
    function buildSwitch(checked = false, forCode = false) {
        const checkedAttr  = checked        ? ' checked'  : ''
        const disabledAttr = state.disabled ? ' disabled' : ''
        const disabledCls  = state.disabled ? ' piece-disabled' : ''

        let icons = ''
        if (state.iconMode === 'true-only') {
            icons = `\n            <span class="material-symbols-rounded piece-icon piece-true" translate="no">check</span>`
        } else if (state.iconMode === 'false-only') {
            icons = `\n            <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>`
        } else if (state.iconMode === 'both') {
            icons = `\n            <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>`
                  + `\n            <span class="material-symbols-rounded piece-icon piece-true" translate="no">check</span>`
        }

        return `<label class="piece-switch piece-surface piece-s-40
    background-color-auto-04 background-color-auto-11-active
    border-color-auto-08 border-color-auto-11-active
    text-color-light-00 text-color-light-11-active
    ${state.palette}${disabledCls}">
    <input type="checkbox" class="piece-controller"${checkedAttr}${disabledAttr}>
    <span class="piece-indicator piece-surface piece-parent
        background-color-auto-12 background-color-auto-00-active">${icons}
    </span>
</label>`
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
        H.header("Switch", "Toggle de liga/desliga. Usa input type=\"checkbox\" com class=\"piece-controller\".", "switch.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview: Off e On lado a lado -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:140px;display:flex;gap:48px;align-items:center;justify-content:center;padding:40px;">
                <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
                    <div id="sw-preview-off"></div>
                    <span style="font-size:10px;opacity:.4;letter-spacing:.06em;">OFF</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
                    <div id="sw-preview-on"></div>
                    <span style="font-size:10px;opacity:.4;letter-spacing:.06em;">ON</span>
                </div>
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
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Ícone</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('none',       'Nenhum',      true,  'iconMode')}
                        ${ctrlBtn('true-only',  'Só true',     false, 'iconMode')}
                        ${ctrlBtn('false-only', 'Só false',    false, 'iconMode')}
                        ${ctrlBtn('both',       'Ambos',       false, 'iconMode')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Estado</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('false', 'Normal',   true,  'disabled')}
                        ${ctrlBtn('true',  'Disabled', false, 'disabled')}
                    </div>
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="sw-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Referências ──────────────────────────────────────
        H.section("ESTRUTURA"),
        H.ref([
            [".piece-switch",                   "Container do switch — 52×32px, border-radius total, overflow:hidden"],
            ["input type=\"checkbox\"",          "Input filho direto do .piece-switch — controla o estado on/off"],
            ["class=\"piece-controller\"",       "Obrigatório no input — CSS usa :has(.piece-controller:checked) para o estado ativo"],
            [".piece-indicator",                 "Bolinha deslizante — recebe os ícones opcionais como filhos"],
            ["&lt;label&gt; como raiz",           "Use &lt;label&gt; como a própria tag do .piece-switch — sem wrapper extra"],
        ]),

        H.section("ÍCONES — modos"),
        H.ref([
            ["sem ícone",                        "Indicador começa pequeno (16px) off → cresce (24px) quando on"],
            [".piece-true apenas",               "Mesmo comportamento sem ícone — exibe o ícone só quando on"],
            [".piece-false apenas",              "Indicador começa grande (24px) — exibe o ícone só quando off, some quando on"],
            [".piece-false + .piece-true",       "Indicador sempre grande (24px) — troca de ícone entre off e on"],
            ["piece-false / piece-true",         "Visibilidade controlada por CSS via :has(.piece-controller:checked) — zero JS"],
        ]),

        H.section("ESTADOS"),
        H.ref([
            [".piece-disabled",                  "Adicione ao .piece-switch — desativa visualmente e bloqueia interação"],
            ["checked",                          "Atributo no input — define o estado inicial on no HTML"],
        ]),

        H.section("CORES"),
        H.ref([
            ["background-color-auto-04",         "Fundo do track quando off"],
            ["background-color-auto-11-active",  "Fundo do track quando on (-active responde ao :checked)"],
            ["border-color-auto-08",             "Borda do track quando off"],
            ["border-color-auto-11-active",      "Borda do track quando on"],
            ["background-color-auto-12",         "Cor do indicador quando off"],
            ["background-color-auto-00-active",  "Cor do indicador quando on"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const previewOff = document.getElementById('sw-preview-off')
        const previewOn  = document.getElementById('sw-preview-on')
        const code       = document.getElementById('sw-code')

        function update() {
            if (previewOff) previewOff.innerHTML = buildSwitch(false)
            if (previewOn)  previewOn.innerHTML  = buildSwitch(true)
            if (code)       code.textContent     = buildSwitch(false)
        }

        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = btn.dataset.val

                state[ctrl] = ctrl === 'disabled' ? val === 'true' : val

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

        update()
    })
}
