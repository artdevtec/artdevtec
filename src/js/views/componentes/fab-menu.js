CompPages["fab-menu"] = function(c) {

    H.render(c,
        H.header("FAB Menu", "Speed dial — botão de ação que revela um menu de opções ao ser ativado. Usa piece-interactive para gerenciar o estado.", "FAB-menu.css"),

        H.section("DEMO — Clique no botão para abrir/fechar"),
        H.demo(null,
            `<div style="position:relative;height:220px;width:200px;">
                <div class="piece-FAB-menu piece-interactive piece-surface"
                     style="position:absolute;bottom:0;right:0;">

                    <!-- Itens do menu -->
                    <div>
                        <div class="menu-item piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 piece-secondary">
                            <span class="material-symbols-rounded piece-icon" translate="no">upload</span>
                            <span class="piece-label">Enviar</span>
                        </div>
                        <div class="menu-item piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 piece-secondary">
                            <span class="material-symbols-rounded piece-icon" translate="no">folder</span>
                            <span class="piece-label">Pasta</span>
                        </div>
                        <div class="menu-item piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 piece-secondary">
                            <span class="material-symbols-rounded piece-icon" translate="no">image</span>
                            <span class="piece-label">Imagem</span>
                        </div>
                    </div>

                    <!-- Botão principal -->
                    <div class="piece-toggle-button piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 piece-primary"
                         style="display:grid;place-content:center;">
                        <span class="material-symbols-rounded piece-icon piece-false" translate="no">add</span>
                        <span class="material-symbols-rounded piece-icon piece-true" translate="no">close</span>
                    </div>
                </div>
            </div>`,
            `<div class="piece-FAB-menu piece-interactive piece-surface">

    <!-- lista de itens — visível apenas quando piece-actived -->
    <div>
        <div class="menu-item piece-surface piece-s-40
            background-color-auto-11 text-color-auto-00 piece-secondary">
            <span class="material-symbols-rounded piece-icon">upload</span>
            <span class="piece-label">Enviar</span>
        </div>
        <!-- mais itens... -->
    </div>

    <!-- botão de ativação -->
    <div class="piece-toggle-button piece-surface piece-s-40
        background-color-auto-11 text-color-auto-00 piece-primary"
         style="display:grid;place-content:center;">
        <span class="material-symbols-rounded piece-icon piece-false">add</span>
        <span class="material-symbols-rounded piece-icon piece-true">close</span>
    </div>
</div>
<!-- interactive.js adiciona .piece-actived ao clicar -->`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-FAB-menu",       "Container do speed dial — position: absolute"],
            [".piece-interactive",    "Atributo JS: toggle .piece-actived ao clicar no .piece-toggle-button"],
            [".piece-actived",        "Estado aberto — revela os itens do menu"],
            [".piece-toggle-button",  "Botão de abertura/fechamento (56×56px)"],
            [".menu-item",            "Item do menu (height 56px, border-radius 56px)"],
            [".piece-false",          "Ícone visível quando fechado"],
            [".piece-true",           "Ícone visível quando aberto"],
            [".piece-label",          "Rótulo do item"],
        ])
    )
}
