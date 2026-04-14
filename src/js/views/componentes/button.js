CompPages["button"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        palette:  'piece-primary',
        size:     'piece-medium',
        variant:  'filled',
        icon:     false,
        toggle:   false,
        disabled: false
    }

    // ─── Construção das classes ──────────────────────────────
    function buildClasses() {
        const base = `piece-button piece-surface piece-s-40 ${state.palette} ${state.size}`
        let bg

        if (state.toggle) {
            // Toggle: bg diferenciado que mostra estado checked visualmente
            const border = state.variant === 'outlined' ? 'piece-border' : ''
            bg = `background-color-auto-06 background-color-auto-07-hover
                background-color-auto-11-active background-color-auto-12-hover-active
                text-color-auto-19 text-color-auto-00-active
                ripple-color-auto-19 ${border}`
        } else if (state.variant === 'filled') {
            bg = 'background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00'
        } else if (state.variant === 'outlined') {
            bg = 'piece-border background-color-auto-11 background-color-auto-12-hover text-color-auto-18 ripple-color-auto-18 piece-background-alpha-02 piece-background-alpha-04-hover'
        } else if (state.variant === 'text') {
            bg = 'background-color-auto-11 background-color-auto-12-hover text-color-auto-18 ripple-color-auto-18 piece-background-alpha-00 piece-background-alpha-02-hover'
        } else if (state.variant === 'elevated') {
            bg = 'piece-elevated box-shadow-color-auto-12 background-color-auto-04 background-color-auto-06-hover text-color-auto-18 ripple-color-auto-18'
        }

        const disabled = state.disabled ? 'piece-disabled' : ''
        return [base, bg.trim().replace(/\s+/g, ' '), disabled].filter(Boolean).join(' ')
    }

    function buildStyle() { return '' }

    function buildInner(forCode = false) {
        const sep = forCode ? '\n    ' : ''
        const iconHtml = state.icon
            ? `${sep}<span class="material-symbols-rounded piece-icon${state.toggle ? ' piece-false' : ''}" translate="no">star${state.toggle ? '_border' : ''}</span>`
            : ''
        const iconTrue = (state.icon && state.toggle)
            ? `${sep}<span class="material-symbols-rounded piece-icon piece-true" translate="no">star</span>`
            : ''
        const inputHtml = state.toggle
            ? `${sep}<input type="checkbox" class="piece-controller">`
            : ''
        return `${inputHtml}${sep}<span class="piece-ripple"></span>${iconHtml}${iconTrue}${sep}<span class="piece-label">Label</span>`
    }

    function buildHTML() {
        const cls   = buildClasses()
        const style = buildStyle()
        const tag   = state.toggle ? 'label' : 'button'
        const styleAttr = style ? `\n     style="${style}"` : ''

        // Formata classes em múltiplas linhas ~52 chars
        const words = cls.split(' ')
        const lines = words.reduce((acc, w) => {
            const cur = acc[acc.length - 1]
            if (cur.length + w.length + 1 > 52) acc.push('         ' + w)
            else acc[acc.length - 1] += (cur.endsWith('"') ? '' : ' ') + w
            return acc
        }, ['class="'])
        const clsStr = lines.join('\n') + '"'

        return `<${tag} ${clsStr}${styleAttr}>\n    ${buildInner(true).trim()}\n</${tag}>`
    }

    // ─── Atualiza preview + output ───────────────────────────
    function update() {
        const btn  = document.getElementById('btn-live')
        const code = document.getElementById('btn-code')
        if (!btn) return

        const tag = state.toggle ? 'LABEL' : 'BUTTON'
        if (btn.tagName !== tag) {
            // Precisa trocar o elemento (button ↔ label)
            const parent = btn.parentElement
            const newEl  = document.createElement(state.toggle ? 'label' : 'button')
            newEl.id = 'btn-live'
            parent.replaceChild(newEl, btn)
        }

        const el = document.getElementById('btn-live')
        el.className = buildClasses()
        el.setAttribute('style', buildStyle())
        el.style.cursor = 'var(--cursor-pointer)'
        el.innerHTML = buildInner()

        if (code) code.textContent = buildHTML()
    }

    // ─── Checkbox helper ─────────────────────────────────────
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

    // ─── Group button control helper ─────────────────────────
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
    const variants = ['filled','outlined','text','elevated']
    const varLbls  = ['Filled','Outlined','Text','Elevated']

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Button", "Botão de ação. 5 tamanhos, 4 variantes, paletas e modo toggle com input:checkbox.", "button.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:160px;display:grid;place-content:center;padding:40px;">
                <button id="btn-live"
                    class="piece-button piece-surface piece-s-40 piece-primary piece-medium background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00"
                    style="cursor:var(--cursor-pointer);">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Label</span>
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

                <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Extras</span>
                    ${mkCheckbox('chk-icon',     'Ícone')}
                    ${mkCheckbox('chk-toggle',   'Toggle')}
                    ${mkCheckbox('chk-disabled', 'Disabled')}
                </div>
            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="btn-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        // ── Toggle — Estrutura ───────────────────────────────
        H.section("TOGGLE — label + input:checkbox"),
        H.demo("Clique nos botões para alternar",
            `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
                <label class="piece-button piece-medium piece-surface piece-s-40
                    background-color-auto-06 background-color-auto-07-hover
                    background-color-auto-11-active background-color-auto-12-hover-active
                    text-color-auto-19 text-color-auto-00-active
                    ripple-color-auto-19 piece-primary"
                    style="cursor:var(--cursor-pointer);">
                    <input type="checkbox" class="piece-controller">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon piece-false" translate="no">favorite_border</span>
                    <span class="material-symbols-rounded piece-icon piece-true" translate="no">favorite</span>
                    <span class="piece-label">Curtir</span>
                </label>
                <label class="piece-button piece-medium piece-surface piece-s-40
                    piece-border
                    background-color-auto-06 background-color-auto-07-hover
                    background-color-auto-11-active background-color-auto-12-hover-active
                    text-color-auto-19 text-color-auto-00-active
                    ripple-color-auto-19 piece-secondary"
                    style="cursor:var(--cursor-pointer);">
                    <input type="checkbox" class="piece-controller">
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon piece-false" translate="no">bookmark_border</span>
                    <span class="material-symbols-rounded piece-icon piece-true" translate="no">bookmark</span>
                    <span class="piece-label">Salvar</span>
                </label>
                <label class="piece-button piece-medium piece-surface piece-s-40
                    background-color-auto-06 background-color-auto-07-hover
                    background-color-auto-11-active background-color-auto-12-hover-active
                    text-color-auto-19 text-color-auto-00-active
                    ripple-color-auto-19 piece-tertiary"
                    style="cursor:var(--cursor-pointer);">
                    <input type="checkbox" class="piece-controller" checked>
                    <span class="piece-ripple"></span>
                    <span class="material-symbols-rounded piece-icon piece-false" translate="no">notifications_off</span>
                    <span class="material-symbols-rounded piece-icon piece-true" translate="no">notifications</span>
                    <span class="piece-label">Notificações</span>
                </label>
            </div>`,
            `<label class="piece-button piece-medium piece-surface piece-s-40
    background-color-auto-06 background-color-auto-07-hover
    background-color-auto-11-active background-color-auto-12-hover-active
    text-color-auto-19 text-color-auto-00-active
    ripple-color-auto-19 piece-primary"
    style="cursor:var(--cursor-pointer);">
    <input type="checkbox" class="piece-controller">
    <span class="piece-ripple"></span>
    <span class="material-symbols-rounded piece-icon piece-false">favorite_border</span>
    <span class="material-symbols-rounded piece-icon piece-true">favorite</span>
    <span class="piece-label">Curtir</span>
</label>`
        ),

        // ── Referência agrupada ──────────────────────────────
        H.section("REFERÊNCIA — Elemento e Tamanhos"),
        H.ref([
            [".piece-button",       "Elemento base — display:grid, min-width 40px, border:none"],
            [".piece-extra-small",  "h 32px  ·  font 14px  ·  radius 16px  ·  padding 12px"],
            [".piece-small",        "h 40px  ·  font 14px  ·  radius 20px  ·  padding 16px"],
            [".piece-medium",       "h 56px  ·  font 16px  ·  radius 28px  ·  padding 24px"],
            [".piece-large",        "h 96px  ·  font 24px  ·  radius 48px  ·  padding 48px"],
            [".piece-extra-large",  "h 136px ·  font 32px  ·  radius 68px  ·  padding 64px"],
        ]),

        H.section("REFERÊNCIA — Variantes"),
        H.ref([
            ["(padrão — filled)",              "background-color-auto-11 sólido, texto claro"],
            [".piece-border",                  "Borda 1px solid — usa border-color do surface"],
            ["piece-background-alpha-02",      "--piece-background-a: 0.08 → fundo 8% (outlined)"],
            ["piece-background-alpha-02-hover","Alpha cresce no hover"],
            ["piece-background-alpha-00",      "--piece-background-a: 0 → fundo invisível (text)"],
            ["piece-background-alpha-02-hover","Hover ganha leve fundo no text"],
            [".piece-elevated",                "box-shadow definida em button.css"],
            ["box-shadow-color-auto-XX",       "Luminosidade da sombra (token × 4 = % de L)"],
        ]),

        H.section("REFERÊNCIA — Toggle"),
        H.ref([
            ["background-color-auto-06",            "Fundo base sutil"],
            ["background-color-auto-07-hover",       "Hover no estado off"],
            ["background-color-auto-11-active",      "Fundo colorido quando :checked"],
            ["background-color-auto-12-hover-active","Hover no estado on"],
            ["text-color-auto-19",                   "Texto quando off"],
            ["text-color-auto-00-active",            "Texto claro quando on"],
        ]),

        H.section("REFERÊNCIA — Cor e Paleta"),
        H.ref([
            [".piece-primary",    "Matiz primário (--piece-main-color + 0°)"],
            [".piece-secondary",  "Matiz secundário (varia com a paleta ativa)"],
            [".piece-tertiary",   "Matiz terciário (varia com a paleta ativa)"],
            [".piece-s-40",       "Eleva saturação de 16% → 40% (mais vibrante)"],
        ]),

        H.section("REFERÊNCIA — Toggle"),
        H.ref([
            ["<label> (no lugar de <button>)",  "Permite encapsular input sem JS extra"],
            ["input[type=checkbox]",             "Estado checked ativa :has() no CSS"],
            [".piece-false",                     "Ícone visível quando desmarcado"],
            [".piece-true",                      "Ícone visível quando marcado (+ FILL:1 automático)"],
            [".piece-actived",                   "Alternativa JS ao checked — mesmo efeito"],
        ]),

        H.section("REFERÊNCIA — Conteúdo e Estado"),
        H.ref([
            [".piece-label",   "Texto do botão — font-weight 500, text-wrap nowrap"],
            [".piece-icon",    "Ícone material-symbols-rounded"],
            [".piece-ripple",  "Gatilho para o efeito de onda (ripple.js)"],
            [".piece-disabled","Desabilita visualmente — SEM atributo disabled HTML"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {

        // Group button controls
        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = btn.dataset.val
                state[ctrl] = val

                document.querySelectorAll(`[data-ctrl="${ctrl}"]`).forEach(b => {
                    const isActive = b.dataset.val === val
                    b.classList.toggle('piece-actived', isActive)
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

        // Checkboxes
        document.getElementById('chk-icon')    ?.addEventListener('change', e => { state.icon     = e.target.checked; update() })
        document.getElementById('chk-toggle')  ?.addEventListener('change', e => { state.toggle   = e.target.checked; update() })
        document.getElementById('chk-disabled')?.addEventListener('change', e => { state.disabled = e.target.checked; update() })

        update()
    })
}
