CompPages["divider"] = function(c) {

    H.render(c,
        H.header("Divider", "Linha divisória horizontal ou vertical para separar seções de conteúdo.", "divider.css"),

        H.section("HORIZONTAL"),
        H.demo(null,
            `<div style="width:100%;display:grid;gap:12px;">
                <p style="font-size:13px;opacity:.6;">Conteúdo acima</p>
                <div class="piece-divider piece-surface background-color-auto-06"></div>
                <p style="font-size:13px;opacity:.6;">Conteúdo abaixo</p>
            </div>`,
            `<div class="piece-divider piece-surface background-color-auto-06"></div>`
        ),

        H.section("COM INSET (recuo lateral)"),
        H.demo(null,
            `<div style="width:100%;display:grid;gap:0;">
                ${[1,2,3].map(i =>
                    `<div style="display:flex;align-items:center;gap:12px;padding:12px 0;">
                        <div class="piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 piece-primary"
                             style="width:40px;height:40px;border-radius:12px;display:grid;place-content:center;flex-shrink:0;">
                            <span class="material-symbols-rounded" style="font-size:20px;" translate="no">person</span>
                        </div>
                        <div style="flex:1;">
                            <p style="font-size:13px;font-weight:600;">Item ${i}</p>
                            <p style="font-size:12px;opacity:.5;">Descrição do item</p>
                            ${i < 3 ? `<div class="piece-divider piece-surface background-color-auto-06" style="margin-top:12px;margin-left:52px;"></div>` : ''}
                        </div>
                    </div>`
                ).join('')}
            </div>`,
            `<!-- Inset: adicione margin-left ao divider para criar o recuo -->
<div class="piece-divider piece-surface background-color-auto-06"
     style="margin-left: 52px;"></div>`
        ),

        H.section("VERTICAL"),
        H.demo(null,
            `<div style="display:flex;align-items:center;gap:12px;height:40px;">
                <span style="font-size:13px;">Seção A</span>
                <div class="piece-divider piece-surface background-color-auto-06"
                     style="width:1px;height:100%;"></div>
                <span style="font-size:13px;">Seção B</span>
                <div class="piece-divider piece-surface background-color-auto-06"
                     style="width:1px;height:100%;"></div>
                <span style="font-size:13px;">Seção C</span>
            </div>`,
            `<!-- Para vertical: width:1px; height:100% -->
<div class="piece-divider piece-surface background-color-auto-06"
     style="width:1px;height:100%;"></div>`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-divider",             "Linha divisória — height:1px por padrão"],
            ["background-color-auto-06",   "Cor suave (nível 6 da escala auto)"],
            ["style=\"margin-left:Xpx\"",  "Inset manual para criar recuo"],
            ["style=\"width:1px;height:100%\"", "Variante vertical"],
        ])
    )
}
