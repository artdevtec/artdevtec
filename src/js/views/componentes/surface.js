CompPages["surface"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const meta = { palette: 'piece-secondary', sat: 'piece-s-40', blur: '' }

    const props   = ['bg', 'text', 'border', 'ripple']
    const sufKeys = ['base', 'hover', 'active', 'hactive']
    const C = {}
    props.forEach(p => { C[p] = { base: '', hover: '', active: '', hactive: '' } })
    C.bg.base     = '00'
    C.bg.hover    = '01'
    C.bg.active   = '11'
    C.bg.hactive  = '12'
    C.text.base   = '23'
    C.text.active = '00'
    C.ripple.base   = '25'
    C.ripple.active = '00'

    const alphaProps = ['bg', 'text', 'border']
    const A = {}
    alphaProps.forEach(p => { A[p] = { base: '', hover: '', active: '', hactive: '' } })

    // ─── Mapping ──────────────────────────────────────────────
    const cssProp = { bg: 'background', text: 'text', border: 'border', ripple: 'ripple' }
    const cssSuf  = { base: '', hover: '-hover', active: '-active', hactive: '-hover-active' }

    function cls(prop, suf, level) {
        if (!level) return ''
        return `${cssProp[prop]}-color-auto-${level}${cssSuf[suf]}`
    }
    function alphaCls(prop, suf, level) {
        if (!level) return ''
        return `piece-${cssProp[prop]}-alpha-${level}${cssSuf[suf]}`
    }

    // ─── Build da surface ─────────────────────────────────────
    function buildSurface(forCode = false) {
        const classes = ['piece-surface', meta.sat, meta.palette].filter(Boolean)

        props.forEach(p => sufKeys.forEach(s => {
            const v = cls(p, s, C[p][s]); if (v) classes.push(v)
        }))
        alphaProps.forEach(p => sufKeys.forEach(s => {
            const v = alphaCls(p, s, A[p][s]); if (v) classes.push(v)
        }))

        const hasBorder = sufKeys.some(s => C.border[s] || A.border[s])
        if (hasBorder) classes.push('piece-border')
        if (meta.blur)  classes.push(`piece-blur-${meta.blur}`)

        const clsStr = classes.join('\n    ')

        if (forCode) return (
`<label class="${clsStr}"
    style="border-radius:16px;padding:28px;display:grid;gap:8px;max-width:360px;cursor:pointer;">
    <input type="checkbox" class="piece-controller">
    <span class="piece-ripple"></span>
    <span style="font-size:16px;font-weight:700;">Título da surface</span>
    <span style="font-size:13px;line-height:1.5;opacity:.6;">
        Texto de exemplo. As cores respondem aos tokens configurados e ao estado ativo.
    </span>
</label>`)

        return (
`<label class="${clsStr}"
    style="border-radius:16px;padding:28px;display:grid;gap:8px;max-width:360px;cursor:pointer;">
    <input type="checkbox" class="piece-controller" style="display:none;">
    <span class="piece-ripple"></span>
    <span style="font-size:10px;opacity:.35;text-transform:uppercase;letter-spacing:.08em;">
        Clique para ativar
    </span>
    <span style="font-size:16px;font-weight:700;">Título da surface</span>
    <span style="font-size:13px;line-height:1.5;opacity:.6;">
        Texto de exemplo. As cores respondem aos tokens configurados e ao estado ativo.
    </span>
</label>`)
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

    // ─── Níveis disponíveis ───────────────────────────────────
    // Cor e alpha: 26 níveis (00–25); blur: 00–25 → 0px–50px
    const allLevels  = Array.from({length:26}, (_,i) => String(i).padStart(2,'0'))
    const blurLevels = allLevels  // mesmo range, label mostra px

    function swatches(prop, suf, type) {
        const id = `sf-sw-${type === 'alpha' ? 'a-' : type === 'blur' ? 'b-' : ''}${prop}-${suf}`
        return `<div id="${id}" class="sf-swatch-row"
            data-prop="${prop}" data-suf="${suf}" data-type="${type}"
            style="display:flex;gap:3px;flex-wrap:wrap;"></div>`
    }

    const row = (label, html) =>
        `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <span class="sf-row-label">${label}</span>${html}
        </div>`

    const sep = label =>
        `<div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
            opacity:.35;padding-top:8px;border-top:1px solid rgba(128,128,128,.12);margin-top:4px;">
            ${label}
        </div>`

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Surface", "O núcleo do sistema. Toda superfície recebe variáveis HSL dinâmicas via CSS — background, texto, borda, ripple e blur.", "surface.css"),

        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
             style="border-radius:20px;overflow:clip;">

            <!-- Preview sticky -->
            <div id="sf-preview-wrap"
                 class="piece-surface background-color-auto-04"
                 style="position:sticky;top:0;z-index:5;
                        min-height:200px;display:grid;place-items:center;padding:40px;
                        border-bottom:1px solid rgba(128,128,128,.1);">
                <div id="sf-preview"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:12px;padding:20px 24px 24px;">

                ${row('Paleta',
                    `<div class="piece-group-button">
                        ${ctrlBtn('piece-primary',   'Primary',   false, 'palette')}
                        ${ctrlBtn('piece-secondary', 'Secondary', true,  'palette')}
                        ${ctrlBtn('piece-tertiary',  'Tertiary',  false, 'palette')}
                    </div>`
                )}
                ${row('Saturação',
                    `<div class="piece-group-button">
                        ${ctrlBtn('',           'S-16 padrão',   false, 'sat')}
                        ${ctrlBtn('piece-s-40', 'S-40 vibrante', true,  'sat')}
                    </div>`
                )}

                ${sep('BACKGROUND')}
                ${row('Normal',       swatches('bg','base','color'))}
                ${row('Hover',        swatches('bg','hover','color'))}
                ${row('Active',       swatches('bg','active','color'))}
                ${row('Hover-active', swatches('bg','hactive','color'))}

                ${sep('TEXTO')}
                ${row('Normal',       swatches('text','base','color'))}
                ${row('Hover',        swatches('text','hover','color'))}
                ${row('Active',       swatches('text','active','color'))}
                ${row('Hover-active', swatches('text','hactive','color'))}

                ${sep('BORDA')}
                ${row('Normal',       swatches('border','base','color'))}
                ${row('Hover',        swatches('border','hover','color'))}
                ${row('Active',       swatches('border','active','color'))}
                ${row('Hover-active', swatches('border','hactive','color'))}

                ${sep('RIPPLE')}
                ${row('Normal',       swatches('ripple','base','color'))}
                ${row('Hover',        swatches('ripple','hover','color'))}
                ${row('Active',       swatches('ripple','active','color'))}
                ${row('Hover-active', swatches('ripple','hactive','color'))}

                ${sep('ALPHA — BACKGROUND')}
                ${row('Normal',       swatches('bg','base','alpha'))}
                ${row('Hover',        swatches('bg','hover','alpha'))}
                ${row('Active',       swatches('bg','active','alpha'))}
                ${row('Hover-active', swatches('bg','hactive','alpha'))}

                ${sep('ALPHA — TEXTO')}
                ${row('Normal',       swatches('text','base','alpha'))}
                ${row('Hover',        swatches('text','hover','alpha'))}
                ${row('Active',       swatches('text','active','alpha'))}
                ${row('Hover-active', swatches('text','hactive','alpha'))}

                ${sep('ALPHA — BORDA')}
                ${row('Normal',       swatches('border','base','alpha'))}
                ${row('Hover',        swatches('border','hover','alpha'))}
                ${row('Active',       swatches('border','active','alpha'))}
                ${row('Hover-active', swatches('border','hactive','alpha'))}

                ${sep('BLUR')}
                ${row('Intensidade',  swatches('blur','base','blur'))}

            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="sf-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;
                            border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        H.section("ESCALA DE LUMINOSIDADE — auto-00 a auto-25"),
        H.demo(null,
            `<div style="display:grid;gap:2px;">
                ${Array.from({length:26},(_,i)=> {
                    const n = String(i).padStart(2,'0')
                    return `<div class="piece-surface background-color-auto-${n}" style="height:28px;border-radius:4px;display:flex;align-items:center;padding:0 12px;justify-content:space-between;">
                        <span class="text-color-auto-${i<13?'21':'02'}" style="font-size:11px;font-family:monospace;">background-color-auto-${n}</span>
                        <span class="text-color-auto-${i<13?'21':'02'}" style="font-size:10px;opacity:.5;">${i<13?'light →':'← dark'}</span>
                    </div>`
                }).join('')}
            </div>`,
            `<div class="piece-surface background-color-auto-02"> ... </div>
<!-- 26 níveis: auto-00 a auto-25 — invertem automaticamente em dark/light -->`
        ),

        H.section("PIECE-S-40 — Saturação elevada"),
        H.demo("S-16 vs S-40 na mesma cor",
            `<div style="display:flex;gap:12px;flex-wrap:wrap;">
                <div style="display:flex;flex-direction:column;gap:4px;align-items:center;">
                    <div class="piece-surface background-color-auto-11 text-color-auto-00 piece-primary"
                         style="width:80px;height:48px;border-radius:12px;display:grid;place-content:center;font-size:12px;">S-16</div>
                    <span style="font-size:10px;opacity:.5;">piece-surface</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:4px;align-items:center;">
                    <div class="piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 piece-primary"
                         style="width:80px;height:48px;border-radius:12px;display:grid;place-content:center;font-size:12px;">S-40</div>
                    <span style="font-size:10px;opacity:.5;">+ piece-s-40</span>
                </div>
            </div>`,
            `<!-- S-16 padrão -->
<div class="piece-surface background-color-auto-11 piece-primary"> ... </div>
<!-- S-40 vibrante -->
<div class="piece-surface piece-s-40 background-color-auto-11 piece-primary"> ... </div>`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-surface",                        "Injeta variáveis HSL no elemento — base de tudo"],
            [".piece-s-40",                           "Eleva saturação de 16% para 40%"],
            ["background-color-auto-XX[-hover/-active/-hover-active]", "Background em 26 níveis com variantes de estado"],
            ["text / border / ripple -color-auto-XX[...]", "Mesma lógica para texto, borda e ripple"],
            ["piece-background-alpha-XX[...]",        "Alpha do fundo — 00 transparente, 25 sólido"],
            ["piece-text-alpha / piece-border-alpha", "Alpha para texto e borda"],
            ["piece-blur-XX",                         "Aplica backdrop-filter: blur (token × 2 = px)"],
            [".piece-primary/secondary/tertiary",     "Seleciona o matiz da paleta"],
            [".piece-border",                         "Ativa borda 1px solid — adicionado auto ao usar border-color"],
            ["input.piece-controller",                "Checkbox/radio — :checked ativa estados -active"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {
        const preview     = document.getElementById('sf-preview')
        const previewWrap = document.getElementById('sf-preview-wrap')
        const code        = document.getElementById('sf-code')

        function renderSwatchContainer(el) {
            const { prop, suf, type } = el.dataset
            const levels  = allLevels   // todos os tipos usam 00–25
            const current = type === 'alpha' ? A[prop][suf]
                          : type === 'blur'  ? meta.blur
                          :                   C[prop][suf]

            el.innerHTML = levels.map(n => {
                const isActive = n === current
                const num = Number(n)

                let bgCls, label, title
                if (type === 'color') {
                    // Contraste automático: claro usa texto escuro, escuro usa texto claro
                    const textCls = num < 13 ? 'text-color-auto-21' : 'text-color-auto-02'
                    bgCls  = `piece-surface ${meta.palette} background-color-auto-${n} ${textCls}`
                    label  = n
                    title  = `auto-${n}`
                } else if (type === 'alpha') {
                    // Alpha: mostra cor sólida com opacidade; texto sempre escuro
                    bgCls  = `piece-surface piece-s-40 ${meta.palette} background-color-auto-11 piece-background-alpha-${n} text-color-auto-21`
                    label  = n
                    title  = `alpha-${n} (${num * 4}%)`
                } else {
                    // Blur: fundo neutro, label em px
                    bgCls  = `piece-surface background-color-auto-06 text-color-auto-20`
                    label  = `${num * 2}`
                    title  = `blur-${n} (${num * 2}px)`
                }

                return `<button
                    class="${bgCls}"
                    data-prop="${prop}" data-suf="${suf}" data-type="${type}" data-val="${n}"
                    style="width:28px;height:28px;border-radius:5px;cursor:pointer;border:none;
                           outline:${isActive ? '2px solid currentColor' : '2px solid transparent'};
                           outline-offset:2px;
                           font-size:8px;font-weight:700;
                           display:grid;place-content:center;"
                    title="${title}">${label}</button>`
            }).join('') +
            `<button
                data-prop="${prop}" data-suf="${suf}" data-type="${type}" data-val=""
                style="width:28px;height:28px;border-radius:5px;cursor:pointer;
                       font-size:12px;opacity:${current ? '.55' : '.2'};
                       background:transparent;border:1px dashed currentColor;"
                title="Limpar">✕</button>`
        }

        function renderAllSwatches() {
            document.querySelectorAll('.sf-swatch-row').forEach(renderSwatchContainer)
        }

        function update() {
            if (preview)     preview.innerHTML = buildSurface()
            if (code)        code.textContent  = buildSurface(true)
            // Troca o fundo do preview: textura quando blur ativo, neutro quando não
            if (previewWrap) {
                previewWrap.classList.toggle('sf-blur-bg', !!meta.blur)
                previewWrap.classList.toggle('background-color-auto-04', !meta.blur)
            }
            renderAllSwatches()
        }

        // Paleta / saturação
        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const { ctrl, val } = btn.dataset
                meta[ctrl] = val
                btn.closest('.piece-group-button')
                    ?.querySelectorAll('[data-ctrl]')
                    .forEach(b => {
                        const on = b.dataset.val === val
                        b.className = b.className.replace(ON + ' piece-actived', OFF).replace(ON, OFF)
                        if (on) b.className = b.className.replace(OFF, ON + ' piece-actived')
                    })
                update()
            })
        })

        // Swatches (delegação — renderizados dinamicamente)
        c.addEventListener('click', e => {
            const btn = e.target.closest('[data-prop][data-suf][data-type][data-val]')
            if (!btn || btn.dataset.ctrl) return   // ignora group-buttons
            const { prop, suf, type, val } = btn.dataset
            if      (type === 'alpha') A[prop][suf] = val
            else if (type === 'blur')  meta.blur    = val
            else                       C[prop][suf] = val
            update()
        })

        update()
    })
}
