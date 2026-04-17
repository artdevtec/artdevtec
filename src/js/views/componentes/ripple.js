CompPages["ripple"] = function(c) {

    // ─── Estado ──────────────────────────────────────────────
    const state = {
        mode:      'grain',   // 'grain' | 'wave'
        grainSize: '3px',
        color:     'ripple-color-auto-00',
        bg:        'background-color-auto-11 background-color-auto-12-hover text-color-auto-00',
    }

    // ─── Atualiza preview ────────────────────────────────────
    function update() {
        const btn  = document.getElementById('rpl-live')
        const code = document.getElementById('rpl-code')
        if (!btn) return

        btn.className = [
            'piece-button piece-medium piece-surface piece-s-40 piece-primary',
            state.bg,
            state.color,
            state.mode === 'wave' ? 'piece-ripple-wave' : '',
        ].filter(Boolean).join(' ')

        btn.style.cssText = `cursor:var(--cursor-pointer);--ripple-grain-size:${state.grainSize};`

        const modeClass = state.mode === 'wave' ? '\n    piece-ripple-wave' : ''
        const grainAttr = state.mode === 'grain' && state.grainSize !== '3px'
            ? `\n    style="--ripple-grain-size:${state.grainSize};"` : ''

        if (code) code.textContent =
`<button class="piece-button piece-medium piece-surface
    piece-s-40 piece-primary
    ${state.bg.replace(/ /g,'\n    ')}
    ${state.color}${modeClass}"${grainAttr}>
    <span class="piece-ripple"></span>
    <span class="piece-label">Label</span>
</button>`
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

    // ─── Render ──────────────────────────────────────────────
    H.render(c,
        H.header("Ripple", "Efeito de onda ao clicar. Modo granulado (padrão) ou wave (sólido). Controlado por classe no elemento ou no body.", "ripple.css"),

        // ── Playground ──────────────────────────────────────
        `<div class="piece-surface background-color-auto-02 piece-border border-color-auto-06" style="border-radius:20px;overflow:hidden;">

            <!-- Preview -->
            <div class="piece-surface bg-dot background-color-auto-04"
                 style="min-height:160px;display:grid;place-content:center;padding:40px;">
                <button id="rpl-live"
                    class="piece-button piece-medium piece-surface piece-s-40 piece-primary background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00"
                    style="cursor:var(--cursor-pointer);--ripple-grain-size:3px;">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Clique aqui</span>
                </button>
            </div>

            <!-- Controles -->
            <div style="display:grid;gap:16px;padding:20px 24px 24px;">

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Modo</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('grain', 'Granulado', true,  'mode')}
                        ${ctrlBtn('wave',  'Wave',      false, 'mode')}
                    </div>
                </div>

                <div id="rpl-ctrl-grain" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Grão</span>
                    <div class="piece-group-button">
                        ${[['1px','1px'],['3px','3px — padrão'],['6px','6px'],['10px','10px']].map(([v,l]) => ctrlBtn(v, l, v==='3px', 'grainSize')).join('')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Cor</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('ripple-color-auto-00',    'Auto-00',    true,  'color')}
                        ${ctrlBtn('ripple-color-auto-18',    'Auto-18',    false, 'color')}
                        ${ctrlBtn('ripple-color-inverse-02', 'Inverse-02', false, 'color')}
                    </div>
                </div>

                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.4;min-width:68px;">Fundo</span>
                    <div class="piece-group-button">
                        ${ctrlBtn('background-color-auto-11 background-color-auto-12-hover text-color-auto-00', 'Escuro', true,  'bg')}
                        ${ctrlBtn('background-color-auto-04 background-color-auto-05-hover text-color-auto-18', 'Claro',  false, 'bg')}
                    </div>
                </div>

            </div>

            <!-- HTML Output -->
            <div style="border-top:1px solid rgba(128,128,128,.1);padding:16px 24px;display:grid;gap:8px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.4;">HTML Output</span>
                <pre id="rpl-code"
                     class="piece-surface background-color-auto-02 piece-border border-color-auto-06"
                     style="font-family:monospace;font-size:11px;line-height:1.8;padding:14px 16px;border-radius:12px;overflow-x:auto;white-space:pre;"></pre>
            </div>
        </div>`,

        H.section("COMO FUNCIONA"),
        H.demo(null,
            `<div class="piece-surface background-color-auto-04" style="border-radius:16px;padding:16px;font-size:13px;line-height:1.8;">
                <ol style="padding-left:20px;display:grid;gap:4px;">
                    <li>ripple.js ouve <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">click</code> em toda a página (event delegation)</li>
                    <li>Encontra <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">.piece-ripple</code> filho direto do elemento clicado</li>
                    <li>Calcula posição relativa e raio máximo até as bordas</li>
                    <li>Injeta <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">.piece-ripple-effect</code> com <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">--ripple-size</code></li>
                    <li>CSS aplica granulado ou wave dependendo da classe no elemento/body</li>
                    <li>Remove o span após <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">animationend</code></li>
                </ol>
            </div>`,
            null
        ),

        H.section("REFERÊNCIA"),
        H.ref([
            [".piece-ripple",            "Placeholder — ripple.js injeta .piece-ripple-effect aqui"],
            [".piece-ripple-effect",     "Círculo de onda (injetado por JS, removido após animação)"],
            [".piece-ripple-wave",       "No elemento ou no body — ativa ripple sólido (wave)"],
            ["--ripple-grain-size",      "Tamanho do grão (padrão: 3px). Menor = mais fino"],
            ["--ripple-duration",        "Duração da animação (padrão: 0.8s)"],
            ["ripple-color-auto-00",     "Cor da onda clara (fundos escuros)"],
            ["ripple-color-auto-18",     "Cor da onda escura (fundos claros)"],
            ["ripple-color-inverse-XX",  "Cor invertida (contraste)"],
            ["position:relative (pai)",  "Necessário para a onda ficar contida no elemento"],
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
                        .replace('background-color-auto-11 text-color-auto-00 ripple-color-auto-00', '__ACTIVE__')
                        .replace('background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18', '__INACTIVE__')
                        .replace('__ACTIVE__',   isActive ? 'background-color-auto-11 text-color-auto-00 ripple-color-auto-00' : 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18')
                        .replace('__INACTIVE__', isActive ? 'background-color-auto-11 text-color-auto-00 ripple-color-auto-00' : 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18 ripple-color-auto-18')
                    b.classList.toggle('piece-actived', isActive)
                })

                // esconde controle de grão no modo wave
                const grainCtrl = document.getElementById('rpl-ctrl-grain')
                if (grainCtrl) grainCtrl.style.display = state.mode === 'wave' ? 'none' : 'flex'

                update()
            })
        })

        update()
    })
}
