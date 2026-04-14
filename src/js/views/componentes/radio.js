CompPages["radio"] = function(c) {

    const mkRadio = (size, color, checked, name) => {
        return `<label style="cursor:pointer;display:flex;align-items:center;gap:8px;">
            <div class="piece-radio ${size} piece-surface piece-s-40
                background-color-auto-04 background-color-auto-11-active
                border-color-auto-08 border-color-auto-11-active ${color}">
                <input type="radio" class="piece-controller" name="${name}"${checked ? ' checked' : ''}>
                <span class="piece-indicator piece-surface piece-parent
                    background-color-auto-04 background-color-auto-00-active">
                </span>
                <span class="piece-ripple"></span>
            </div>
        </label>`
    }

    const sizes = ['piece-extra-small','piece-small','piece-medium','piece-large','piece-extra-large']
    const sizeLabels = ['XS','S','M','L','XL']

    H.render(c,
        H.header("Radio", "Seleção única dentro de um grupo. Estrutura idêntica ao Checkbox — sem ícone no indicator.", "radio.css"),

        H.section("GRUPO — Medium Primary"),
        H.demo(null,
            `<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
                <div style="display:flex;align-items:center;gap:8px;">
                    ${mkRadio('piece-medium','piece-primary',true,'demo-p')}
                    <span style="font-size:13px;">Opção A</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    ${mkRadio('piece-medium','piece-primary',false,'demo-p')}
                    <span style="font-size:13px;">Opção B</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    ${mkRadio('piece-medium','piece-primary',false,'demo-p')}
                    <span style="font-size:13px;">Opção C</span>
                </div>
            </div>`,
            `<label style="cursor:pointer;display:flex;align-items:center;gap:8px;">
    <div class="piece-radio piece-medium piece-surface piece-s-40
        background-color-auto-04 background-color-auto-11-active
        border-color-auto-08 border-color-auto-11-active piece-primary">
        <input type="radio" class="piece-controller" name="grupo">
        <span class="piece-indicator piece-surface piece-parent
            background-color-auto-04 background-color-auto-00-active">
        </span>
        <span class="piece-ripple"></span>
    </div>
    Opção A
</label>`
        ),

        H.section("PALETAS — Medium"),
        H.demo(null,
            `<div style="display:flex;gap:16px;align-items:center;">
                ${['piece-primary','piece-secondary','piece-tertiary'].map((p, i) =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                        ${mkRadio('piece-medium',p,true,`pal-${i}`)}
                        <span style="font-size:10px;opacity:.4;">${p.replace('piece-','')}</span>
                    </div>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("TAMANHOS — Selecionados"),
        H.demo(null,
            `<div style="display:flex;gap:12px;align-items:flex-end;">
                ${sizes.map((s, i) =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                        ${mkRadio(s,'piece-primary',true,`sz-${i}`)}
                        <span style="font-size:9px;opacity:.4;">${sizeLabels[i]}</span>
                    </div>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-radio",                       "Container do radio button"],
            [".piece-controller",                  "input[type=radio] hidden — mesmo name = grupo"],
            [".piece-indicator",                   "Ponto central visível quando selecionado"],
            [".piece-ripple",                      "Onda de toque"],
            ["background-color-auto-11-active",    "Fundo quando selecionado"],
            ["border-color-auto-11-active",        "Borda quando selecionado"],
            [".piece-extra-small … .piece-extra-large", "5 tamanhos"],
        ])
    )
}
