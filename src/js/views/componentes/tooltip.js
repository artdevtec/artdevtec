CompPages["tooltip"] = function(c) {

    const mkTip = (pos, posClass, label, tipText) => {
        return `<button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary"
                style="position:relative;">
            <span class="piece-ripple"></span>
            <span class="piece-label">${label}</span>
            <span class="piece-tooltip piece-surface background-color-auto-18 text-color-auto-02 ${posClass} hover">${tipText}</span>
        </button>`
    }

    H.render(c,
        H.header("Tooltip", "Dica contextual exibida ao passar o mouse (hover) ou no :active. Position: absolute — o pai deve ter position:relative.", "tooltip.css"),

        H.section("POSIÇÕES — Hover nos botões para ver"),
        H.demo(null,
            `<div style="display:flex;gap:16px;flex-wrap:wrap;padding:32px 16px;">
                ${mkTip('top','top','Top','Tooltip top')}
                ${mkTip('bottom','bottom','Bottom','Tooltip bottom')}
                ${mkTip('left','left','Left','Tooltip left')}
                ${mkTip('right','right','Right','Tooltip right')}
            </div>`,
            `<!-- Pai precisa de position:relative -->
<button style="position:relative;" class="piece-button ...">
    Label
    <span class="piece-tooltip piece-surface background-color-auto-18 text-color-auto-02 top hover">
        Texto do tooltip
    </span>
</button>

<!-- Classes de posição: top | bottom | left | right -->
<!-- Modificadores: .left .right (combinados com top/bottom) -->
<!-- .hover: exibe ao :hover | .piece-visible: exibe sempre -->`
        ),

        H.section("POSIÇÕES COMBINADAS"),
        H.demo(null,
            `<div style="display:flex;gap:24px;flex-wrap:wrap;padding:48px 16px;">
                ${[
                    ['top left','top.left','Top Left','Esquerda-cima'],
                    ['top right','top.right','Top Right','Direita-cima'],
                    ['bottom left','bottom.left','Bottom Left','Esquerda-baixo'],
                    ['bottom right','bottom.right','Bottom Right','Direita-baixo'],
                ].map(([_,cls,lbl,tip]) =>
                    `<button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-secondary piece-outlined"
                             style="position:relative;">
                        <span class="piece-ripple"></span>
                        <span class="piece-label">${lbl}</span>
                        <span class="piece-tooltip piece-surface background-color-auto-18 text-color-auto-02 ${cls} hover">${tip}</span>
                    </button>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("SEMPRE VISÍVEL (.piece-visible)"),
        H.demo(null,
            `<div style="padding:32px 24px;">
                <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-tertiary"
                        style="position:relative;">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Sempre visível</span>
                    <span class="piece-tooltip piece-surface background-color-auto-18 text-color-auto-02 top piece-visible">piece-visible</span>
                </button>
            </div>`,
            `<span class="piece-tooltip ... piece-visible">Sempre visível</span>`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-tooltip",        "Base — 24px altura, font-size 12px, opacity 0"],
            [".top",                  "Posição acima (top:-28px)"],
            [".bottom",               "Posição abaixo (bottom:-28px)"],
            [".left",                 "Posição à esquerda"],
            [".right",                "Posição à direita"],
            [".top.left / .top.right","Diagonais superior"],
            [".bottom.left / .bottom.right", "Diagonais inferior"],
            [".hover",                "Exibe quando o pai recebe :hover"],
            [".piece-visible",        "Força visibilidade permanente"],
        ])
    )
}
