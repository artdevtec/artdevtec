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
    <input type="checkbox" class="piece-controller" style="display:none;pointer-events:none;">
    <span class="piece-ripple"></span>
    <span style="font-size:10px;opacity:.35;text-transform:uppercase;letter-spacing:.08em;pointer-events:none;">
        Clique para ativar
    </span>
    <span style="font-size:16px;font-weight:700;pointer-events:none;">Título da surface</span>
    <span style="font-size:13px;line-height:1.5;opacity:.6;pointer-events:none;">
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
    const allLevels = Array.from({length:26}, (_,i) => String(i).padStart(2,'0'))

    // ─── ID do swatch row / indicador ────────────────────────
    function swKey(prop, suf, type) {
        return `${type === 'alpha' ? 'a-' : type === 'blur' ? 'b-' : ''}${prop}-${suf}`
    }

    // ─── Row simples (Paleta, Saturação) ─────────────────────
    const row = (label, html) =>
        `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <span class="sf-row-label">${label}</span>${html}
        </div>`

    // ─── Details row (swatches colapsáveis) ──────────────────
    function detailsRow(label, prop, suf, type) {
        const key = swKey(prop, suf, type)
        return `<details class="sf-details">
            <summary>
                <span class="sf-arrow">▶</span>
                <span class="sf-row-label">${label}</span>
                <span id="sf-ind-${key}" style="display:flex;align-items:center;gap:4px;"></span>
            </summary>
            <div style="padding:6px 0 2px 20px;">
                <div id="sf-sw-${key}" class="sf-swatch-row"
                    data-prop="${prop}" data-suf="${suf}" data-type="${type}"
                    style="display:flex;gap:3px;flex-wrap:wrap;"></div>
            </div>
        </details>`
    }

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
                ${detailsRow('Normal',       'bg','base','color')}
                ${detailsRow('Hover',        'bg','hover','color')}
                ${detailsRow('Active',       'bg','active','color')}
                ${detailsRow('Hover-active', 'bg','hactive','color')}

                ${sep('TEXTO')}
                ${detailsRow('Normal',       'text','base','color')}
                ${detailsRow('Hover',        'text','hover','color')}
                ${detailsRow('Active',       'text','active','color')}
                ${detailsRow('Hover-active', 'text','hactive','color')}

                ${sep('BORDA')}
                ${detailsRow('Normal',       'border','base','color')}
                ${detailsRow('Hover',        'border','hover','color')}
                ${detailsRow('Active',       'border','active','color')}
                ${detailsRow('Hover-active', 'border','hactive','color')}

                ${sep('RIPPLE')}
                ${detailsRow('Normal',       'ripple','base','color')}
                ${detailsRow('Hover',        'ripple','hover','color')}
                ${detailsRow('Active',       'ripple','active','color')}
                ${detailsRow('Hover-active', 'ripple','hactive','color')}

                ${sep('ALPHA — BACKGROUND')}
                ${detailsRow('Normal',       'bg','base','alpha')}
                ${detailsRow('Hover',        'bg','hover','alpha')}
                ${detailsRow('Active',       'bg','active','alpha')}
                ${detailsRow('Hover-active', 'bg','hactive','alpha')}

                ${sep('ALPHA — TEXTO')}
                ${detailsRow('Normal',       'text','base','alpha')}
                ${detailsRow('Hover',        'text','hover','alpha')}
                ${detailsRow('Active',       'text','active','alpha')}
                ${detailsRow('Hover-active', 'text','hactive','alpha')}

                ${sep('ALPHA — BORDA')}
                ${detailsRow('Normal',       'border','base','alpha')}
                ${detailsRow('Hover',        'border','hover','alpha')}
                ${detailsRow('Active',       'border','active','alpha')}
                ${detailsRow('Hover-active', 'border','hactive','alpha')}

                ${sep('BLUR')}
                ${detailsRow('Intensidade',  'blur','base','blur')}

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

        let blurImgUrl = ''   // gerada uma vez por ativação do blur

        function swatchBgCls(type, n) {
            const num = Number(n)
            if (type === 'color') {
                const textCls = num < 13 ? 'text-color-auto-21' : 'text-color-auto-02'
                return { bgCls: `piece-surface ${meta.palette} background-color-auto-${n} ${textCls}`, label: n, title: `auto-${n}` }
            }
            if (type === 'alpha') {
                return { bgCls: `piece-surface piece-s-40 ${meta.palette} background-color-auto-11 piece-background-alpha-${n} text-color-auto-21`, label: n, title: `alpha-${n} (${num*4}%)` }
            }
            // blur
            return { bgCls: `piece-surface background-color-auto-06 text-color-auto-20`, label: `${num*2}`, title: `blur-${n} (${num*2}px)` }
        }

        function renderSwatchContainer(el) {
            const { prop, suf, type } = el.dataset
            const current = type === 'alpha' ? A[prop][suf]
                          : type === 'blur'  ? meta.blur
                          :                   C[prop][suf]

            el.innerHTML = allLevels.map(n => {
                const isActive = n === current
                const { bgCls, label, title } = swatchBgCls(type, n)
                // Outline: duplo anel sempre visível (branco interno + preto externo)
                const ring = isActive
                    ? 'box-shadow:0 0 0 2px rgba(255,255,255,0.9),0 0 0 4px rgba(0,0,0,0.6);'
                    : ''
                return `<button
                    class="${bgCls}"
                    data-prop="${prop}" data-suf="${suf}" data-type="${type}" data-val="${n}"
                    style="width:28px;height:28px;border-radius:5px;cursor:pointer;border:none;
                           ${ring}font-size:8px;font-weight:700;display:grid;place-content:center;"
                    title="${title}">${label}</button>`
            }).join('') +
            // Botão ✕ com cor explícita — evita herdar preto em dark mode
            `<button
                class="piece-surface background-color-auto-04 text-color-auto-18"
                data-prop="${prop}" data-suf="${suf}" data-type="${type}" data-val=""
                style="width:28px;height:28px;border-radius:5px;cursor:pointer;border:none;
                       font-size:12px;opacity:${current ? '.8' : '.25'};"
                title="Limpar">✕</button>`

            // Atualiza indicador no summary
            const ind = document.getElementById(`sf-ind-${swKey(prop, suf, type)}`)
            if (ind) {
                if (current) {
                    const { bgCls, label } = swatchBgCls(type, current)
                    ind.innerHTML =
                        `<span class="${bgCls}"
                            style="width:26px;height:20px;border-radius:4px;display:inline-grid;
                                   place-content:center;font-size:8px;font-weight:700;">${label}</span>` +
                        `<button class="piece-surface background-color-auto-04 text-color-auto-18"
                            data-prop="${prop}" data-suf="${suf}" data-type="${type}" data-val=""
                            style="width:20px;height:20px;border-radius:4px;cursor:pointer;
                                   border:none;font-size:10px;display:inline-grid;place-content:center;"
                            title="Limpar">✕</button>`
                } else {
                    ind.innerHTML = ''
                }
            }
        }

        function renderAllSwatches() {
            document.querySelectorAll('.sf-swatch-row').forEach(renderSwatchContainer)
        }

        function update() {
            if (preview)     preview.innerHTML = buildSurface()
            if (code)        code.textContent  = buildSurface(true)
            // Troca o fundo do preview: foto quando blur ativo, neutro quando não
            if (previewWrap) {
                if (meta.blur) {
                    // Gera URL apenas na primeira ativação; mantém ao mudar intensidade
                    if (!blurImgUrl) {
                        const seed = Math.floor(Math.random() * 1000)
                        blurImgUrl = `https://picsum.photos/seed/${seed}/800/400`
                    }
                    previewWrap.style.backgroundImage    = `url(${blurImgUrl})`
                    previewWrap.style.backgroundSize     = 'cover'
                    previewWrap.style.backgroundPosition = 'center'
                    previewWrap.classList.remove('background-color-auto-04')
                } else {
                    blurImgUrl = ''   // reset: próxima ativação sorteia nova imagem
                    previewWrap.style.backgroundImage    = ''
                    previewWrap.style.backgroundSize     = ''
                    previewWrap.style.backgroundPosition = ''
                    previewWrap.classList.add('background-color-auto-04')
                }
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
