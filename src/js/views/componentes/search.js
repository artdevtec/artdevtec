CompPages["search"] = function(c) {

    H.render(c,
        H.header("Search", "Barra de busca com área de resultados expansível. Largura adaptativa (clamp 360–720px).", "search.css"),

        H.section("DEMO"),
        H.demo("Clique para focar",
            `<div class="piece-search piece-primary" style="width:100%;max-width:480px;">
                <div class="piece-surface piece-s-40 background-color-auto-04 border-color-auto-08 text-color-auto-21">
                    <div class="piece-icon-button piece-small piece-surface piece-s-40 background-color-auto-03-hover text-color-auto-18 ripple-color-auto-00 piece-primary"
                         style="flex-shrink:0;display:grid;place-content:center;width:40px;height:40px;border-radius:50%;">
                        <span class="material-symbols-rounded" style="font-size:20px;" translate="no">search</span>
                    </div>
                    <input type="text" placeholder="Buscar..." class="text-color-auto-21">
                    <div class="piece-icon-button piece-small piece-surface piece-s-40 background-color-auto-03-hover text-color-auto-18 ripple-color-auto-00"
                         style="flex-shrink:0;display:grid;place-content:center;width:40px;height:40px;border-radius:50%;">
                        <span class="material-symbols-rounded" style="font-size:20px;" translate="no">mic</span>
                    </div>
                </div>
            </div>`,
            `<div class="piece-search piece-primary">
    <div class="piece-surface piece-s-40 background-color-auto-04 border-color-auto-08 text-color-auto-21">
        <!-- ícone leading (ordem invertida via CSS: order:-1) -->
        <div class="piece-icon-button ...">
            <span class="material-symbols-rounded">search</span>
        </div>
        <input type="text" placeholder="Buscar...">
        <!-- ícone trailing -->
        <div class="piece-icon-button ...">
            <span class="material-symbols-rounded">mic</span>
        </div>
    </div>
    <!-- div 2º filho: painel de resultados (display:none → block ao abrir) -->
    <div class="piece-surface background-color-auto-04">
        <div> ... resultados ... </div>
    </div>
</div>`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-search",         "Container — largura clamp(360px, 0px, 720px)"],
            ["> div:nth-child(1)",    "Barra de busca — height 56px, border-radius 56px"],
            ["input",                 "all:unset, flex:1 — ocupa espaço restante"],
            ["> div:nth-child(2)",    "Painel de resultados — position absolute, display:none"],
            [":has(input:focus)",     "Borda vira 2px quando focado"],
        ])
    )
}
