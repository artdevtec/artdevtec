CompPages["surface"] = function(c) {

    H.render(c,
        H.header("Surface", "O núcleo do sistema. Toda superfície recebe variáveis HSL dinâmicas via CSS — background, texto, borda e ripple.", "surface.css"),

        H.section("O QUE É PIECE-SURFACE"),
        H.demo(null,
            `<pre class="comp-demo-code piece-surface background-color-auto-06 text-color-auto-16"
                  style="border-radius:12px;padding:16px;font-size:11px;line-height:1.8;overflow-x:auto;white-space:pre;">/* Ao adicionar .piece-surface, o elemento recebe: */
--piece-h:    var(--primary);           /* matiz da paleta ativa */
--piece-s:    16%;                      /* saturação base */
--piece-bg:   var(--auto-02);          /* nível de luminosidade background */
--piece-text: var(--auto-21);          /* nível de luminosidade texto */

/* Todas as classes auto-XX e inverse-XX usam essas vars */</pre>`,
            null
        ),

        H.section("ESCALA DE LUMINOSIDADE — auto-00 a auto-25"),
        H.demo(null,
            `<div style="display:grid;gap:2px;">
                ${Array.from({length:26},(_,i)=> {
                    const n = String(i).padStart(2,'0')
                    return `<div class="piece-surface background-color-auto-${n}" style="height:28px;border-radius:4px;display:flex;align-items:center;padding:0 12px;justify-content:space-between;">
                        <span class="text-color-auto-${i < 13 ? '21' : '02'}" style="font-size:11px;font-family:monospace;">background-color-auto-${n}</span>
                        <span class="text-color-auto-${i < 13 ? '21' : '02'}" style="font-size:10px;opacity:.5;">${i < 13 ? 'light →' : '← dark'}</span>
                    </div>`
                }).join('')}
            </div>`,
            `<div class="piece-surface background-color-auto-02"> ... </div>
<div class="piece-surface background-color-auto-04"> ... </div>
<div class="piece-surface background-color-auto-06"> ... </div>
<!-- 26 níveis: auto-00 (mais escuro em dark / mais claro em light) → auto-25 (inverso) -->`
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
            `<!-- S-16: saturação padrão (acinzentado) -->
<div class="piece-surface background-color-auto-11 piece-primary"> ... </div>

<!-- S-40: saturação vibrante (botões, FABs, ícones ativos) -->
<div class="piece-surface piece-s-40 background-color-auto-11 piece-primary"> ... </div>`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-surface",             "Injeta variáveis HSL no elemento — base de tudo"],
            [".piece-s-40",                "Eleva saturação de 16% para 40% (componentes interativos)"],
            ["background-color-auto-XX",   "Define background em 26 níveis (00–25) que invertem dark/light"],
            ["text-color-auto-XX",         "Define cor de texto em 26 níveis"],
            ["border-color-auto-XX",       "Define cor de borda em 26 níveis"],
            ["ripple-color-auto-XX",       "Define cor da onda ripple"],
            ["ripple-color-inverse-XX",    "Cor de ripple no canal invertido"],
            [".piece-primary",             "Usa o matiz primário (--piece-main-color + 0°)"],
            [".piece-secondary",           "Usa o matiz secundário (+30° ou +120°)"],
            [".piece-tertiary",            "Usa o matiz terciário (+90° ou +150°)"],
        ])
    )
}
