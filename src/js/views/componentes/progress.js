CompPages["progress"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        type:         'bar',     // 'bar' | 'circle'
        palette:      'piece-primary',
        pct:          65,
        indeterminate: false,
        trackWidth:   4,
        size:         56,        // só circle
    }

    // ─── Builders ────────────────────────────────────────────
    function buildBar() {
        const indet = state.indeterminate ? 'piece-indeterminate' : ''
        const pctStyle = state.indeterminate ? '' : `--piece-percentage:${state.pct}%;`
        return `<div class="piece-progress-indicator piece-bar piece-surface background-color-auto-06 ${indet}"
     style="width:320px;${pctStyle}">
    <div class="piece-indicator piece-surface piece-s-40 background-color-auto-11 ${state.palette}"></div>
</div>`
    }

    function buildCircle() {
        const indet = state.indeterminate ? 'piece-indeterminate' : ''
        const pctStyle = state.indeterminate ? '' : `--piece-percentage:${state.pct}%;`
        return `<div class="piece-progress-indicator piece-circle piece-surface background-color-auto-06 ${indet}"
     style="width:${state.size}px;height:${state.size}px;--piece-track-width:${state.trackWidth}px;${pctStyle}">
    <div class="piece-indicator piece-surface piece-s-40 background-color-auto-11 ${state.palette}"></div>
</div>`
    }

    function buildLive() {
        return state.type === 'bar' ? buildBar() : buildCircle()
    }

    function update() {
        const preview = document.getElementById('pg-preview')
        const code    = document.getElementById('pg-code')
        if (!preview) return
        preview.innerHTML = buildLive()
        if (code) code.textContent = buildLive()

        // mostra/esconde controles relevantes
        const circleControls = document.getElementById('pg-ctrl-circle')
        const pctControl     = document.getElementById('pg-ctrl-pct')
        if (circleControls) circleControls.style.display = state.type === 'circle' ? 'flex' : 'none'
        if (pctControl)     pctControl.style.opacity     = state.indeterminate ? '0.3' : '1'
        if (preview) preview.style.justifyItems = state.type === 'circle' ? 'center' : 'stretch'
    }

    // ─── Helpers ─────────────────────────────────────────────
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

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Progress Indicator", "Barra ou círculo de progresso. Valor via --piece-percentage. Modo indeterminado com animação de segmento deslizante (bar) ou arco girando (circle).", "progressIndicator.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:160px;display:grid;place-content:center;place-items:center;padding:40px;">
                <div id="pg-preview" style="width:100%;display:grid;align-items:center;"></div>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Tipo</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('bar',    'Bar',    true,  'type')}
                        ${ctrlBtn('circle', 'Circle', false, 'type')}
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

                <div id="pg-ctrl-pct" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;transition:opacity .2s;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Valor</span>
                    <input id="pg-range" type="range" min="0" max="100" value="65" style="flex:1;max-width:200px;">
                    <span id="pg-range-label" style="font-size:12px;font-weight:700;opacity:.6;min-width:32px;">65%</span>
                </div>

                <div id="pg-ctrl-circle" style="display:none;align-items:center;gap:24px;flex-wrap:wrap;">
                    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                        <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Tamanho</span>
                        <div class="piece-group-button">
                            ${[32,40,56,72,96].map(s => ctrlBtn(s, s+'px', s===56, 'size')).join('')}
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                        <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Espessura</span>
                        <div class="piece-group-button">
                            ${[2,4,6,8].map(w => ctrlBtn(w, w+'px', w===4, 'trackWidth')).join('')}
                        </div>
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Extras</span>
                    ${mkCheckbox('chk-indet', 'Indeterminado')}
                </div>

            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="pg-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        H.section("REFERÊNCIA"),
        H.ref([
            [".piece-progress-indicator", "Container base"],
            [".piece-bar",                "Variante barra — height:4px, width:100%"],
            [".piece-circle",             "Variante círculo — conic-gradient via mask"],
            [".piece-indeterminate",      "Ativa animação — bar: segmento deslizante · circle: arco girando"],
            ["--piece-percentage",        "Progresso de 0% a 100% (ignorado no indeterminate)"],
            ["--piece-track-width",       "Espessura do anel/track do circle (padrão: 4px)"],
            [".piece-indicator",          "Elemento de preenchimento — recebe background-color-xxx-xx"],
            [".piece-absolute",           "Position absolute para sobreposição em containers"],
        ])
    )

    // ─── Eventos ─────────────────────────────────────────────
    requestAnimationFrame(() => {

        document.querySelectorAll('[data-ctrl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const ctrl = btn.dataset.ctrl
                const val  = isNaN(btn.dataset.val) ? btn.dataset.val : Number(btn.dataset.val)
                state[ctrl] = val

                document.querySelectorAll(`[data-ctrl="${ctrl}"]`).forEach(b => {
                    const isActive = b.dataset.val == val
                    b.className = b.className
                        .replace('background-color-auto-11 text-color-auto-00 ripple-color-auto-00', '__A__')
                        .replace('background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18', '__I__')
                        .replace('__A__', isActive ? 'background-color-auto-11 text-color-auto-00 ripple-color-auto-00' : 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18')
                        .replace('__I__', isActive ? 'background-color-auto-11 text-color-auto-00 ripple-color-auto-00' : 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18')
                    b.classList.toggle('piece-actived', isActive)
                })

                update()
            })
        })

        document.getElementById('pg-range')?.addEventListener('input', e => {
            state.pct = Number(e.target.value)
            const label = document.getElementById('pg-range-label')
            if (label) label.textContent = state.pct + '%'
            update()
        })

        document.getElementById('chk-indet')?.addEventListener('change', e => {
            state.indeterminate = e.target.checked
            update()
        })

        update()
    })
}
