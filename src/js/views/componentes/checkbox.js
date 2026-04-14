CompPages["checkbox"] = function(c) {

    const mkCB = (size, color, checked, indeterminate) => {
        const indCls = indeterminate ? 'piece-indeterminate' : ''
        return `<label style="cursor:pointer;display:flex;align-items:center;gap:8px;">
            <div class="piece-checkbox ${size} piece-surface piece-s-40
                background-color-auto-04 background-color-auto-11-active
                border-color-auto-08 border-color-auto-11-active ${color} ${indCls}">
                <input type="checkbox" class="piece-controller"${checked ? ' checked' : ''}>
                <span class="piece-indicator piece-surface piece-parent
                    background-color-auto-04 background-color-auto-00-active">
                    <span class="material-symbols-rounded piece-icon" translate="no">check</span>
                </span>
                <span class="piece-ripple"></span>
            </div>
        </label>`
    }

    const sizes = ['piece-extra-small','piece-small','piece-medium','piece-large','piece-extra-large']
    const sizeLabels = ['XS','S','M','L','XL']

    H.render(c,
        H.header("Checkbox", "Controle de seleção booleana. Baseado em input:checked — sem JS necessário.", "checkbox.css"),

        H.section("ESTADOS — Medium Primary"),
        H.demo(null,
            `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
                <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                    ${mkCB('piece-medium','piece-primary',false,false)}
                    <span style="font-size:10px;opacity:.4;">Desmarcado</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                    ${mkCB('piece-medium','piece-primary',true,false)}
                    <span style="font-size:10px;opacity:.4;">Marcado</span>
                </div>
            </div>`,
            `<label style="cursor:pointer;display:flex;align-items:center;gap:8px;">
    <div class="piece-checkbox piece-medium piece-surface piece-s-40
        background-color-auto-04 background-color-auto-11-active
        border-color-auto-08 border-color-auto-11-active piece-primary">
        <input type="checkbox" class="piece-controller">
        <span class="piece-indicator piece-surface piece-parent
            background-color-auto-04 background-color-auto-00-active">
            <span class="material-symbols-rounded piece-icon">check</span>
        </span>
        <span class="piece-ripple"></span>
    </div>
    Label
</label>`
        ),

        H.section("PALETAS — Medium"),
        H.demo(null,
            `<div style="display:flex;gap:16px;align-items:center;">
                ${['piece-primary','piece-secondary','piece-tertiary'].map(p =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                        ${mkCB('piece-medium',p,true,false)}
                        <span style="font-size:10px;opacity:.4;">${p.replace('piece-','')}</span>
                    </div>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("TAMANHOS — Marcados"),
        H.demo(null,
            `<div style="display:flex;gap:12px;align-items:flex-end;">
                ${sizes.map((s, i) =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                        ${mkCB(s,'piece-primary',true,false)}
                        <span style="font-size:9px;opacity:.4;">${sizeLabels[i]}</span>
                    </div>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-checkbox",                    "Container do checkbox"],
            [".piece-controller",                  "Input hidden que dirige o estado via :checked"],
            [".piece-indicator",                   "Elemento visual (borda + fundo)"],
            [".piece-icon (check)",                "Ícone de confirmação dentro do indicator"],
            [".piece-ripple",                      "Onda de toque"],
            ["background-color-auto-11-active",    "Fundo primário quando marcado"],
            ["border-color-auto-11-active",        "Borda primária quando marcado"],
            ["background-color-auto-00-active",    "Fundo do indicator quando marcado"],
            [".piece-extra-small … .piece-extra-large", "5 tamanhos disponíveis"],
        ])
    )
}
