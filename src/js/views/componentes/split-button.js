CompPages["split-button"] = function(c) {

    const mkSplit = (size, color, label, icon) => {
        const ico = icon ? `<span class="material-symbols-rounded piece-icon" translate="no">${icon}</span>` : ''
        return `<div class="piece-split-button piece-interactive ${size} piece-surface piece-s-40">
            <div class="piece-leading-button background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ${color}">
                <span class="piece-ripple"></span>
                ${ico}
                <span class="piece-label">${label}</span>
            </div>
            <div class="piece-trailing-button background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ${color}">
                <span class="piece-ripple"></span>
                <span class="material-symbols-rounded piece-icon" translate="no">arrow_drop_down</span>
            </div>
            <!-- menu revelado ao ativar -->
            <div class="piece-menu piece-surface background-color-auto-04" style="box-shadow:0 2px 8px rgba(0,0,0,.2);border-radius:16px;overflow:hidden;">
                <ul style="list-style:none;padding:4px;margin:0;display:grid;gap:2px;">
                    <li class="piece-surface background-color-auto-04 background-color-auto-05-hover" style="display:flex;align-items:center;gap:12px;padding:0 16px;height:48px;cursor:pointer;border-radius:12px 12px 4px 4px;">
                        <span class="material-symbols-rounded" style="font-size:20px;" translate="no">edit</span>
                        <span style="font-size:14px;">Editar</span>
                    </li>
                    <li class="piece-surface background-color-auto-04 background-color-auto-05-hover" style="display:flex;align-items:center;gap:12px;padding:0 16px;height:48px;cursor:pointer;border-radius:4px;">
                        <span class="material-symbols-rounded" style="font-size:20px;" translate="no">content_copy</span>
                        <span style="font-size:14px;">Duplicar</span>
                    </li>
                    <li class="piece-surface background-color-auto-04 background-color-auto-05-hover" style="display:flex;align-items:center;gap:12px;padding:0 16px;height:48px;cursor:pointer;border-radius:4px 4px 12px 12px;">
                        <span class="material-symbols-rounded" style="font-size:20px;" translate="no">delete</span>
                        <span style="font-size:14px;">Excluir</span>
                    </li>
                </ul>
            </div>
        </div>`
    }

    H.render(c,
        H.header("Split Button", "Botão duplo: ação primária à esquerda e seta de menu à direita. O menu abre/fecha via piece-interactive.", "split-button.css"),

        H.section("DEMO — Clique na seta para abrir"),
        H.demo(null,
            `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
                ${mkSplit('piece-small','piece-primary','Salvar','save')}
                ${mkSplit('piece-small','piece-secondary','Publicar','publish')}
                ${mkSplit('piece-small','piece-tertiary','Exportar','download')}
            </div>`,
            `<div class="piece-split-button piece-interactive piece-small piece-surface piece-s-40">
    <div class="piece-leading-button background-color-auto-11 text-color-auto-00 piece-primary">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon">save</span>
        <span class="piece-label">Salvar</span>
    </div>
    <div class="piece-trailing-button background-color-auto-11 text-color-auto-00 piece-primary">
        <span class="piece-ripple"></span>
        <span class="material-symbols-rounded piece-icon">arrow_drop_down</span>
    </div>
    <div class="piece-menu piece-surface background-color-auto-04">
        <ul> ... </ul>
    </div>
</div>`
        ),

        H.section("TODOS OS TAMANHOS — Primary"),
        H.demo(null,
            `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
                ${['piece-extra-small','piece-small','piece-medium'].map(s => mkSplit(s,'piece-primary','Ação','check')).join('')}
            </div>`,
            null
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-split-button",     "Container — grid 2 colunas"],
            [".piece-interactive",      "JS: toggle .piece-actived ao clicar no .piece-trailing-button"],
            [".piece-leading-button",   "Botão de ação principal (esquerda)"],
            [".piece-trailing-button",  "Botão seta que abre o menu (direita)"],
            [".piece-menu",             "Menu dropdown revelado quando piece-actived"],
            [".piece-actived",          "Estado aberto — menu visível, ícone rotacionado"],
            [".piece-extra-small",      "Altura 32px"],
            [".piece-small",            "Altura 40px"],
            [".piece-medium",           "Altura 56px"],
            [".piece-large",            "Altura 96px"],
            [".piece-extra-large",      "Altura 136px"],
        ])
    )
}
