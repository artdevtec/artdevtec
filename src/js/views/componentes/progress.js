CompPages["progress"] = function(c) {

    const mkBar = (pct, color) => {
        return `<div class="piece-progress-indicator piece-bar piece-active piece-surface background-color-auto-06"
                     style="width:100%;--piece-percentage:${pct}%;">
            <div class="piece-indicator piece-surface piece-s-40 background-color-auto-11 ${color}"></div>
        </div>`
    }

    const mkCircle = (pct, size, color) => {
        return `<div class="piece-progress-indicator piece-circle piece-active piece-surface piece-s-40 background-color-auto-11 ${color}"
                     style="--piece-percentage:${pct}%;width:${size}px;height:${size}px;">
            <div class="piece-indicator"></div>
        </div>`
    }

    H.render(c,
        H.header("Progress Indicator", "Barra ou círculo de progresso. Valor controlado por --piece-percentage. Animação de pulso quando ativo.", "progressIndicator.css"),

        H.section("BARRA — Porcentagens"),
        H.demo(null,
            `<div style="display:grid;gap:12px;width:100%;">
                ${[20,45,65,80,100].map(p =>
                    `<div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-size:11px;opacity:.5;width:32px;text-align:right;">${p}%</span>
                        ${mkBar(p,'piece-primary')}
                    </div>`
                ).join('')}
            </div>`,
            `<div class="piece-progress-indicator piece-bar piece-active piece-surface background-color-auto-06"
     style="width:100%; --piece-percentage: 65%;">
    <div class="piece-indicator piece-surface piece-s-40 background-color-auto-11 piece-primary"></div>
</div>`
        ),

        H.section("BARRA — Paletas"),
        H.demo(null,
            `<div style="display:grid;gap:12px;width:100%;">
                ${['piece-primary','piece-secondary','piece-tertiary'].map((p, i) =>
                    `<div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-size:11px;opacity:.5;width:60px;">${p.replace('piece-','')}</span>
                        ${mkBar(40 + i * 20, p)}
                    </div>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("CÍRCULO — Porcentagens"),
        H.demo(null,
            `<div style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap;">
                ${[15,30,50,75,100].map(p =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                        ${mkCircle(p, 56, 'piece-primary')}
                        <span style="font-size:10px;opacity:.4;">${p}%</span>
                    </div>`
                ).join('')}
            </div>`,
            `<div class="piece-progress-indicator piece-circle piece-active piece-surface piece-s-40 background-color-auto-11 piece-primary"
     style="--piece-percentage: 75%; width:56px; height:56px;">
    <div class="piece-indicator"></div>
</div>`
        ),

        H.section("CÍRCULO — Tamanhos × Paletas"),
        H.demo(null,
            `<div style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap;">
                ${[
                    [32,'piece-primary',70],
                    [40,'piece-secondary',55],
                    [56,'piece-tertiary',80],
                    [72,'piece-primary',40],
                    [96,'piece-secondary',90],
                ].map(([sz, pal, pct]) =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                        ${mkCircle(pct, sz, pal)}
                        <span style="font-size:9px;opacity:.4;">${sz}px</span>
                    </div>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("INDETERMINADO — Sem piece-active (animação de pulso)"),
        H.demo(null,
            `<div style="display:grid;gap:12px;width:100%;">
                <div class="piece-progress-indicator piece-bar piece-surface background-color-auto-06"
                     style="width:100%;--piece-percentage:60%;">
                    <div class="piece-indicator piece-surface piece-s-40 background-color-auto-11 piece-primary" style="animation:piece-progress-light 1s infinite alternate;"></div>
                </div>
                <span style="font-size:11px;opacity:.5;">Sem .piece-active → opacity:0 | Com .piece-active → opacity:1</span>
            </div>`,
            `<!-- Sem piece-active: opacity 0 (oculto) -->
<!-- Com piece-active: opacity 1 (visível) + animação de pulso -->
<div class="piece-progress-indicator piece-bar piece-active ...">
    <div class="piece-indicator ..."></div>
</div>`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-progress-indicator", "Container base — opacity:0"],
            [".piece-active",             "Torna visível (opacity:1)"],
            [".piece-bar",                "Variante barra — height:4px, width:100%"],
            [".piece-circle",             "Variante círculo — conic-gradient com máscara central"],
            [".piece-absolute",           "Position absolute para sobreposição"],
            ["--piece-percentage",        "Variável CSS que define o progresso (0% a 100%)"],
            [".piece-indicator",          "Elemento visual de preenchimento"],
        ])
    )
}
