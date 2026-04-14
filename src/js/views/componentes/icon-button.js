CompPages["icon-button"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        palette:  'piece-primary',
        size:     'piece-medium',
        shape:    'default',        // 'piece-narrow' | 'default' | 'piece-wide'
        variant:  'filled',         // 'filled' | 'tonal' | 'outlined' | 'standard'
        toggle:   false,
        disabled: false
    }

    // ─── Construção das classes ──────────────────────────────
    function buildClasses() {
        const shapeClass = state.shape !== 'default' ? state.shape : ''
        const base = ['piece-icon-button', 'piece-surface', 'piece-s-40',
                      state.palette, state.size, shapeClass]
                     .filter(Boolean).join(' ')
        let bg

        if (state.toggle) {
            bg = `background-color-auto-06 background-color-auto-07-hover
                background-color-auto-11-active background-color-auto-12-hover-active
                text-color-auto-19 text-color-auto-00-active ripple-color-auto-19`
        } else if (state.variant === 'filled') {
            bg = 'background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00'
        } else if (state.variant === 'tonal') {
            bg = 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18'
        } else if (state.variant === 'outlined') {
            bg = 'piece-border background-color-auto-11 background-color-auto-12-hover text-color-auto-18 ripple-color-auto-18 piece-background-alpha-02 piece-background-alpha-04-hover'
        } else if (state.variant === 'standard') {
            bg = 'background-color-auto-11 text-color-auto-18 ripple-color-auto-18 piece-background-alpha-00 piece-background-alpha-02-hover'
        }

        const disabled = state.disabled ? 'piece-disabled' : ''
        return [base, bg.trim().replace(/\s+/g, ' '), disabled].filter(Boolean).join(' ')
    }

    function buildInner(forCode = false) {
        const sep = forCode ? '\n    ' : ''
        if (state.toggle) {
            return `${sep}<input type="checkbox" class="piece-controller">`
                 + `${sep}<span class="piece-ripple"></span>`
                 + `${sep}<span class="material-symbols-rounded piece-icon piece-false" translate="no">favorite_border</span>`
                 + `${sep}<span class="material-symbols-rounded piece-icon piece-true" translate="no">favorite</span>`
        }
        return `${sep}<span class="piece-ripple"></span>`
             + `${sep}<span class="material-symbols-rounded piece-icon" translate="no">star</span>`
    }

    function buildHTML() {
        const cls = buildClasses()
        const tag = state.toggle ? 'label' : 'button'
        const words = cls.split(' ')
        const lines = words.reduce((acc, w) => {
            const cur = acc[acc.length - 1]
            if (cur.length + w.length + 1 > 52) acc.push('         ' + w)
            else acc[acc.length - 1] += (cur.endsWith('"') ? '' : ' ') + w
            return acc
        }, ['class="'])
        return `<${tag} ${lines.join('\n')}">\n    ${buildInner(true).trim()}\n</${tag}>`
    }

    // ─── Atualiza preview + output ───────────────────────────
    function update() {
        const btn  = document.getElementById('ib-live')
        const code = document.getElementById('ib-code')
        if (!btn) return

        const tag = state.toggle ? 'LABEL' : 'BUTTON'
        if (btn.tagName !== tag) {
            const parent = btn.parentElement
            const newEl  = document.createElement(state.toggle ? 'label' : 'button')
            newEl.id = 'ib-live'
            parent.replaceChild(newEl, btn)
        }

        const el = document.getElementById('ib-live')
        el.className = buildClasses()
        el.style.cursor = 'var(--cursor-pointer)'
        el.innerHTML = buildInner()

        if (code) code.textContent = buildHTML()
    }

    // ─── Helpers de controle ─────────────────────────────────
    const mkCheckbox = (id, label) =>
        `<label style="cursor:var(--cursor-pointer);display:flex;align-items:center;gap:10px;">
            <div class="piece-checkbox piece-small piece-surface piece-s-40
                background-color-auto-04 background-color-auto-05-hover
                text-color-auto-20 piece-secondary">
                <span class="material-symbols-rounded piece-icon piece-true" translate="no">check_box</span>
                <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
                <input type="checkbox" class="piece-controller" id="${id}">
            </div>
            <span style="font-size:13px;font-weight:600;">${label}</span>
        </label>`

    const ctrlBtn = (val, label, active, ctrl) =>
        `<button class="piece-button piece-small piece-surface piece-s-40
            ${active
                ? 'background-color-auto-11 text-color-auto-00 ripple-color-auto-00 piece-actived'
                : 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18'}
            piece-secondary"
         data-ctrl="${ctrl}" data-val="${val}">
            <span class="piece-ripple"></span>
            <span class="piece-label">${label}</span>
        </button>`

    const sizes    = ['piece-extra-small','piece-small','piece-medium','piece-large','piece-extra-large']
    const sizeLbls = ['XS','S','M','L','XL']
    const variants = ['filled','tonal','outlined','standard']
    const varLbls  = ['Filled','Tonal','Outlined','Standard']
    const shapes   = ['piece-narrow','default','piece-wide']
    const shapeLbls= ['Narrow','Default','Wide']

    // ─── Dimensões reais por tamanho × forma ─────────────────
    const dims = {
        'piece-extra-small': { 'piece-narrow': 28,  default: 32,  'piece-wide': 40  },
        'piece-small':       { 'piece-narrow': 32,  default: 40,  'piece-wide': 52  },
        'piece-medium':      { 'piece-narrow': 48,  default: 56,  'piece-wide': 72  },
        'piece-large':       { 'piece-narrow': 64,  default: 96,  'piece-wide': 128 },
        'piece-extra-large': { 'piece-narrow': 104, default: 136, 'piece-wide': 184 },
    }

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Icon Button", "Botão de ícone. 5 tamanhos · 4 variantes · 3 formas (narrow / default / wide) · toggle.", "icon-button.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:160px;display:grid;place-content:center;padding:40px;">
                <button id="ib-live"
                    class="piece-icon-button piece-surface piece-s-40 piece-primary piece-medium background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00"
                    style="cursor:var(--cursor-pointer);">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon" translate="no">star</span>
                </button>
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
                        ${sizes.map((s,i) => ctrlBtn(s, sizeLbls[i], s==='piece-medium', 'size')).join('')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Variante</span>
                    <div class="piece-group-button">
                        ${variants.map((v,i) => ctrlBtn(v, varLbls[i], v==='filled', 'variant')).join('')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Forma</span>
                    <div class="piece-group-button">
                        ${shapes.map((s,i) => ctrlBtn(s, shapeLbls[i], s==='default', 'shape')).join('')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Extras</span>
                    ${mkCheckbox('ib-chk-toggle',   'Toggle')}
                    ${mkCheckbox('ib-chk-disabled', 'Disabled')}
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="ib-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Formas — todos os tamanhos ───────────────────────
        H.section("FORMAS — narrow · default · wide"),
        H.demo("Diferença de largura em cada tamanho",
            `<div style="display:grid;gap:12px;">
                ${sizes.map((size, si) => `
                <div style="display:flex;align-items:center;gap:16px;">
                    <span style="font-size:10px;font-family:monospace;font-weight:700;opacity:.35;width:18px;text-align:right;">${sizeLbls[si]}</span>
                    <div style="display:flex;align-items:center;gap:8px;">
                        ${shapes.map(shape => {
                            const sc = shape !== 'default' ? shape : ''
                            const px = dims[size][shape]
                            return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
                                <button class="piece-icon-button piece-surface piece-s-40 piece-primary ${size} ${sc} background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00" style="cursor:var(--cursor-pointer);">
                                    <span class="piece-ripple"></span>
                                    <span class="material-symbols-rounded piece-icon" translate="no">star</span>
                                </button>
                                <span style="font-size:9px;font-family:monospace;opacity:.35;">${px}px</span>
                            </div>`
                        }).join('')}
                    </div>
                    <span style="font-size:9px;font-family:monospace;opacity:.3;">narrow · default · wide</span>
                </div>`).join('')}
            </div>`,
            `<!-- narrow -->
<button class="piece-icon-button piece-surface piece-s-40
    piece-primary piece-medium piece-narrow
    background-color-auto-11 background-color-auto-12-hover
    text-color-auto-00 ripple-color-auto-00">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon">star</span>
</button>

<!-- wide -->
<button class="piece-icon-button piece-surface piece-s-40
    piece-primary piece-medium piece-wide
    background-color-auto-11 background-color-auto-12-hover
    text-color-auto-00 ripple-color-auto-00">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon">star</span>
</button>`
        ),

        // ── Toggle ───────────────────────────────────────────
        H.section("TOGGLE — label + input:checkbox"),
        H.demo("Clique para alternar · narrow / default / wide",
            `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
                <label class="piece-icon-button piece-medium piece-narrow piece-surface piece-s-40
                    background-color-auto-06 background-color-auto-07-hover
                    background-color-auto-11-active background-color-auto-12-hover-active
                    text-color-auto-19 text-color-auto-00-active
                    ripple-color-auto-19 piece-primary"
                    style="cursor:var(--cursor-pointer);">
                    <input type="checkbox" class="piece-controller">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon piece-false" translate="no">favorite_border</span>
                    <span class="material-symbols-rounded piece-icon piece-true" translate="no">favorite</span>
                </label>
                <label class="piece-icon-button piece-medium piece-surface piece-s-40
                    background-color-auto-06 background-color-auto-07-hover
                    background-color-auto-11-active background-color-auto-12-hover-active
                    text-color-auto-19 text-color-auto-00-active
                    ripple-color-auto-19 piece-secondary"
                    style="cursor:var(--cursor-pointer);">
                    <input type="checkbox" class="piece-controller" checked>
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon piece-false" translate="no">bookmark_border</span>
                    <span class="material-symbols-rounded piece-icon piece-true" translate="no">bookmark</span>
                </label>
                <label class="piece-icon-button piece-medium piece-wide piece-surface piece-s-40
                    background-color-auto-06 background-color-auto-07-hover
                    background-color-auto-11-active background-color-auto-12-hover-active
                    text-color-auto-19 text-color-auto-00-active
                    ripple-color-auto-19 piece-tertiary"
                    style="cursor:var(--cursor-pointer);">
                    <input type="checkbox" class="piece-controller">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon piece-false" translate="no">notifications_off</span>
                    <span class="material-symbols-rounded piece-icon piece-true" translate="no">notifications</span>
                </label>
            </div>`,
            `<label class="piece-icon-button piece-medium piece-surface piece-s-40
    background-color-auto-06 background-color-auto-07-hover
    background-color-auto-11-active background-color-auto-12-hover-active
    text-color-auto-19 text-color-auto-00-active
    ripple-color-auto-19 piece-primary"
    style="cursor:var(--cursor-pointer);">
    <input type="checkbox" class="piece-controller">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon piece-false">favorite_border</span>
    <span class="material-symbols-rounded piece-icon piece-true">favorite</span>
</label>`
        ),

        // ── Referências ──────────────────────────────────────
        H.section("REFERÊNCIA — Elemento e Tamanhos"),
        H.ref([
            [".piece-icon-button", "Base — display:grid, place-content:center, sem padding interno"],
            [".piece-extra-small", "32 × 32px  ·  ícone 20px  ·  radius 16px  ·  active-radius 12px"],
            [".piece-small",       "40 × 40px  ·  ícone 24px  ·  radius 20px  ·  active-radius 12px"],
            [".piece-medium",      "56 × 56px  ·  ícone 24px  ·  radius 28px  ·  active-radius 16px"],
            [".piece-large",       "96 × 96px  ·  ícone 32px  ·  radius 48px  ·  active-radius 28px"],
            [".piece-extra-large", "136 × 136px · ícone 40px  ·  radius 68px  ·  active-radius 28px"],
        ]),

        H.section("REFERÊNCIA — Formas"),
        H.ref([
            ["(padrão)",       "Largura = altura — botão quadrado"],
            [".piece-narrow",  "XS 28 · S 32 · M 48 · L 64 · XL 104px de largura"],
            [".piece-wide",    "XS 40 · S 52 · M 72 · L 128 · XL 184px de largura"],
        ]),

        H.section("REFERÊNCIA — Variantes"),
        H.ref([
            ["filled",   "background-color-auto-11 sólido · texto auto-00"],
            ["tonal",    "background-color-auto-06 sutil · texto auto-18"],
            ["outlined", "piece-border + piece-background-alpha-02 · hover alpha-04"],
            ["standard", "piece-background-alpha-00 (transparente) · hover alpha-02"],
        ]),

        H.section("REFERÊNCIA — Toggle e Estado"),
        H.ref([
            ["<label> + input:checkbox", "Toggle sem JS — :has(.piece-controller:checked) ativa os estilos"],
            [".piece-false",             "Ícone exibido quando desmarcado"],
            [".piece-true",              "Ícone exibido quando marcado (FILL:1 automático via CSS)"],
            [".piece-disabled",          "Desabilita visualmente — SEM atributo disabled HTML"],
            [".piece-s-40",              "Eleva saturação 16% → 40%"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {

        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = btn.dataset.val
                state[ctrl] = val

                document.querySelectorAll(`[data-ctrl="${ctrl}"]`).forEach(b => {
                    const isActive = b.dataset.val === val
                    b.className = b.className
                        .replace('background-color-auto-11 text-color-auto-00 ripple-color-auto-00',
                                 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18')
                        .replace('background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18',
                                 isActive
                                    ? 'background-color-auto-11 text-color-auto-00 ripple-color-auto-00'
                                    : 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18')
                    b.classList.toggle('piece-actived', isActive)
                })

                update()
            })
        })

        document.getElementById('ib-chk-toggle')  ?.addEventListener('change', e => { state.toggle   = e.target.checked; update() })
        document.getElementById('ib-chk-disabled')?.addEventListener('change', e => { state.disabled = e.target.checked; update() })

        update()
    })
}
