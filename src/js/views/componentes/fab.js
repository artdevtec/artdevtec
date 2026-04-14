CompPages["fab"] = function(c) {

    const fab = (size, color, icon, label) => {
        const sizeClass = size ? `piece-${size}` : ''
        const extClass  = label ? 'piece-extended' : ''
        const lbl = label ? `<span class="piece-label">${label}</span>` : ''
        return `<div class="piece-FAB ${sizeClass} ${extClass} piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 ${color}">
            <span class="material-symbols-rounded piece-icon" translate="no">${icon}</span>
            ${lbl}
        </div>`
    }

    H.render(c,
        H.header("FAB", "Floating Action Button — ação principal da tela. Disponível em 4 tamanhos e variante extended com rótulo.", "FAB.css"),

        H.section("TAMANHOS — Filled Primary"),
        H.demo(null,
            `<div style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap;">
                <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                    ${fab('small','piece-primary','add',null)}
                    <span style="font-size:10px;opacity:.4;">Small 40px</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                    ${fab('','piece-primary','edit',null)}
                    <span style="font-size:10px;opacity:.4;">Default 56px</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                    ${fab('medium','piece-primary','create',null)}
                    <span style="font-size:10px;opacity:.4;">Medium 80px</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                    ${fab('large','piece-primary','add_photo_alternate',null)}
                    <span style="font-size:10px;opacity:.4;">Large 96px</span>
                </div>
            </div>`,
            `<div class="piece-FAB piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 piece-primary">
    <span class="material-symbols-rounded piece-icon">edit</span>
</div>
<!-- piece-small | sem classe | piece-medium | piece-large -->`
        ),

        H.section("EXTENDED — Com rótulo"),
        H.demo(null,
            `<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
                ${fab('','piece-primary','add','Novo item')}
                ${fab('','piece-secondary','upload','Enviar arquivo')}
                ${fab('medium','piece-tertiary','create','Novo documento')}
            </div>`,
            `<div class="piece-FAB piece-extended piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 piece-primary">
    <span class="material-symbols-rounded piece-icon">add</span>
    <span class="piece-label">Novo item</span>
</div>`
        ),

        H.section("PALETAS"),
        H.demo(null,
            `<div style="display:flex;gap:12px;flex-wrap:wrap;">
                ${fab('','piece-primary','favorite',null)}
                ${fab('','piece-secondary','bookmark',null)}
                ${fab('','piece-tertiary','star',null)}
            </div>`,
            `<!-- piece-primary | piece-secondary | piece-tertiary -->`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-FAB",         "Elemento base — 56×56px por padrão"],
            [".piece-small",       "40×40px, borda-radius 12px"],
            [".piece-medium",      "80×80px, borda-radius 20px"],
            [".piece-large",       "96×96px, borda-radius 28px"],
            [".piece-extended",    "Largura automática para acomodar rótulo"],
            [".piece-label",       "Texto do FAB extended"],
            [".piece-icon",        "Ícone material-symbols"],
        ])
    )
}
