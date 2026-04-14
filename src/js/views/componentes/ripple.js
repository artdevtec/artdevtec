CompPages["ripple"] = function(c) {

    H.render(c,
        H.header("Ripple", "Efeito de onda ao clicar. Calculado dinamicamente via ripple.js — posição e cor extraídas do ponto de toque.", "ripple.css"),

        H.section("DEMO — Clique em qualquer elemento"),
        H.demo("Botões com ripple",
            `<div style="display:flex;gap:12px;flex-wrap:wrap;">
                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary"
                        style="position:relative;">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Primary</span>
                </button>
                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-18 piece-secondary piece-outlined"
                        style="position:relative;">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Outlined</span>
                </button>
                <div class="piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 piece-tertiary"
                     style="padding:16px 24px;border-radius:12px;cursor:pointer;position:relative;font-size:14px;font-weight:500;user-select:none;">
                    <span class="piece-ripple"></span>
                    Div com ripple
                </div>
            </div>`,
            `<!-- 1. Adicione position:relative ao container -->
<!-- 2. Insira <span class="piece-ripple"></span> dentro -->
<!-- 3. Defina a cor: ripple-color-auto-00 (branco) ou ripple-color-auto-18 (escuro) -->
<!-- ripple.js detecta cliques e injeta .piece-ripple-effect -->

<button class="piece-button ... ripple-color-auto-00" style="position:relative;">
    <span class="piece-ripple"></span>
    Label
</button>`
        ),

        H.section("CORES DE RIPPLE"),
        H.demo("ripple-color-auto-XX define a cor da onda",
            `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
                ${[
                    ['ripple-color-auto-00','background-color-auto-11','text-color-auto-00','Auto-00 (branco)'],
                    ['ripple-color-auto-18','background-color-auto-04','text-color-auto-18','Auto-18 (escuro)'],
                    ['ripple-color-inverse-02','background-color-auto-18','text-color-auto-02','Inverse-02'],
                ].map(([rc, bg, tc, label]) =>
                    `<button class="piece-button piece-medium piece-surface piece-s-40 ${bg} background-color-auto-05-hover ${tc} ${rc} piece-primary"
                             style="position:relative;">
                        <span class="piece-ripple"></span>
                        <span class="piece-label">${label}</span>
                    </button>`
                ).join('')}
            </div>`,
            `<!-- Padrão preenchido: ripple-color-auto-00 (onda clara) -->
<button class="... ripple-color-auto-00"> ... </button>

<!-- Outlined/text: ripple-color-auto-18 (onda escura no light, clara no dark) -->
<button class="... ripple-color-auto-18"> ... </button>

<!-- Sobre fundo escuro: ripple-color-inverse-02 -->
<button class="... ripple-color-inverse-02"> ... </button>`
        ),

        H.section("COMO FUNCIONA"),
        H.demo(null,
            `<div class="piece-surface background-color-auto-04" style="border-radius:16px;padding:16px;font-size:13px;line-height:1.8;">
                <ol style="padding-left:20px;display:grid;gap:4px;">
                    <li>ripple.js ouve <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">click</code> em toda a página (event delegation)</li>
                    <li>Encontra o <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">.piece-ripple</code> mais próximo do elemento clicado</li>
                    <li>Calcula posição relativa do clique no container</li>
                    <li>Injeta um <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">.piece-ripple-effect</code> com transform: scale</li>
                    <li>Remove após a animação CSS terminar</li>
                </ol>
            </div>`,
            null
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-ripple",               "Placeholder — ripple.js injeta .piece-ripple-effect aqui"],
            [".piece-ripple-effect",        "Círculo de onda (injetado por JS, removido após animação)"],
            ["ripple-color-auto-00",        "Cor da onda: nível 00 (branco no tema escuro, escuro no claro)"],
            ["ripple-color-auto-18",        "Cor da onda: nível 18 (para superfícies claras)"],
            ["ripple-color-inverse-XX",     "Cor invertida (útil sobre superfícies de contraste)"],
            ["position:relative (no pai)",  "Necessário para a onda ficar contida no elemento"],
        ])
    )
}
