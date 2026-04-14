CompPages["badge"] = function(c) {

    const mkBadge = (variant, content, color) => {
        const cls = variant === 'small' ? 'piece-badge piece-small' : variant === 'large' ? 'piece-badge piece-large' : 'piece-badge'
        return `<span class="${cls} piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 ${color}">${content}</span>`
    }

    const iconWithBadge = (icon, badge, color) => {
        return `<div style="position:relative;display:inline-flex;width:40px;height:40px;justify-content:center;align-items:center;">
            <div class="piece-icon-button piece-small piece-surface background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00">
                <span class="material-symbols-rounded piece-icon" translate="no">${icon}</span>
                <span class="piece-ripple"></span>
            </div>
            <div style="position:absolute;top:0;right:0;">${badge}</div>
        </div>`
    }

    H.render(c,
        H.header("Badge", "Indicador numérico ou de ponto sobre ícones/botões. 3 tamanhos: small (ponto 6px), default (16px), large (texto).", "badge.css"),

        H.section("TAMANHOS"),
        H.demo(null,
            `<div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
                <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    ${mkBadge('small','','piece-primary')}
                    <span style="font-size:10px;opacity:.4;">Small (6px)</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    ${mkBadge('default','','piece-primary')}
                    <span style="font-size:10px;opacity:.4;">Default (16px)</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    ${mkBadge('large','3','piece-primary')}
                    <span style="font-size:10px;opacity:.4;">Large (número)</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    ${mkBadge('large','99+','piece-primary')}
                    <span style="font-size:10px;opacity:.4;">Large (máx)</span>
                </div>
            </div>`,
            `<!-- Small: ponto 6×6px -->
<span class="piece-badge piece-small piece-surface piece-s-40 background-color-auto-11 piece-primary"></span>

<!-- Default: círculo 16×16px -->
<span class="piece-badge piece-surface piece-s-40 background-color-auto-11 piece-primary"></span>

<!-- Large: min 16px, max 34px, com texto -->
<span class="piece-badge piece-large piece-surface piece-s-40 background-color-auto-11 piece-primary">3</span>`
        ),

        H.section("PALETAS"),
        H.demo(null,
            `<div style="display:flex;gap:16px;align-items:center;">
                ${['piece-primary','piece-secondary','piece-tertiary'].map(p =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                        ${mkBadge('large','5',p)}
                        <span style="font-size:10px;opacity:.4;">${p.replace('piece-','')}</span>
                    </div>`
                ).join('')}
            </div>`,
            null
        ),

        H.section("EM USO — Badge sobre ícone"),
        H.demo(null,
            `<div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
                ${iconWithBadge('notifications', mkBadge('large','4','piece-primary'), 'piece-primary')}
                ${iconWithBadge('mail', mkBadge('large','12','piece-secondary'), 'piece-secondary')}
                ${iconWithBadge('shopping_cart', mkBadge('small','','piece-tertiary'), 'piece-tertiary')}
            </div>`,
            `<!-- Badge posicionado com position:absolute sobre o ícone -->
<div style="position:relative;display:inline-flex;">
    <div class="piece-icon-button ..."> ... </div>
    <span class="piece-badge piece-large ... piece-primary"
          style="position:absolute;top:0;right:0;">4</span>
</div>`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-badge",         "Base — 16×16px, aspect-ratio 1/1, border-radius 16px"],
            [".piece-small",         "Versão ponto — 6×6px"],
            [".piece-large",         "Versão texto — min 16px, max 34px, padding 0 4px"],
            ["pointer-events:none",  "Badge não captura eventos de mouse"],
        ])
    )
}
