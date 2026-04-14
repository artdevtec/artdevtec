CompPages["navigation"] = function(c) {

    const mkItem = (icon, label, checked, name) => {
        return `<label class="piece-item piece-surface background-color-auto-03-hover" style="cursor:pointer;">
            <input type="radio" name="${name}"${checked ? ' checked' : ''}>
            <div class="piece-indicator piece-surface piece-s-40 background-color-auto-11 ripple-color-auto-00 piece-primary"></div>
            <div class="piece-icon">
                <span class="material-symbols-rounded" translate="no">${icon}</span>
            </div>
            <span class="piece-label text-color-auto-16">${label}</span>
            <span class="piece-ripple"></span>
        </label>`
    }

    H.render(c,
        H.header("Navigation", "Rail lateral ou barra inferior que gerencia a navegação principal do app via radio inputs.", "navigation.css"),

        H.section("DEMO — Rail (desktop) com 4 itens"),
        H.demo(null,
            `<div class="piece-navigation piece-bar-rail piece-surface background-color-auto-02"
                  style="height:280px;width:96px;padding:8px 0;display:flex;flex-direction:column;gap:4px;border-radius:16px;overflow:hidden;">
                ${mkItem('home','Início',true,'nav-demo')}
                ${mkItem('widgets','Componentes',false,'nav-demo')}
                ${mkItem('layers','Surface',false,'nav-demo')}
                ${mkItem('settings','Config',false,'nav-demo')}
            </div>`,
            `<aside class="piece-navigation piece-bar-rail piece-floating piece-surface background-color-auto-02">
    <div class="piece-items">
        <label class="piece-item piece-surface background-color-auto-03-hover">
            <input type="radio" name="nav" checked>
            <div class="piece-indicator piece-surface piece-s-40 background-color-auto-11 piece-primary"></div>
            <div class="piece-icon">
                <span class="material-symbols-rounded">home</span>
            </div>
            <span class="piece-label">Início</span>
            <span class="piece-ripple"></span>
        </label>
        <!-- mais itens -->
    </div>
</aside>`
        ),

        H.section("COMPORTAMENTO RESPONSIVO"),
        H.demo(null,
            `<div class="piece-surface background-color-auto-04" style="border-radius:16px;padding:16px;font-size:13px;line-height:1.7;">
                <p><strong>Mobile (&lt;800px)</strong> — barra horizontal inferior (height 64px), itens em colunas iguais</p>
                <p><strong>SVGA (800–1279px)</strong> — rail estreito de 96px sem botão de menu</p>
                <p><strong>HD+ (≥1280px)</strong> — rail com botão menu que expande para mostrar labels</p>
            </div>`,
            null
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-navigation",          "Namespace — não aplica estilos diretos"],
            [".piece-bar-rail",            "Componente principal — adapta entre bar e rail"],
            [".piece-floating",            "Adiciona z-index e sombra (floating above content)"],
            [".piece-item",                "Item de navegação — label com radio input"],
            [".piece-indicator",           "Pílula de destaque quando selecionado"],
            [".piece-icon",                "Container do ícone material"],
            [".piece-label",               "Texto do item"],
            ["input[type=radio]",          "Controla seleção — mesmo name = grupo exclusivo"],
        ])
    )
}
