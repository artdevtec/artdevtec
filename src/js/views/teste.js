MPSO.newView({
    name: "Teste",
    icon: "science",
    showInNavigation: false,

    main() {
        const section = $("#m-main section")
        section.className = "piece-surface background-color-auto-02"
        section.innerHTML = ""
        section.appendAll(MPSO.globalFns.create(this.template()))
    },

    template() {
        const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.`

        const itemCls = `piece-surface background-color-auto-00 background-color-auto-01-hover
            background-color-auto-06-active background-color-auto-07-hover-active`

        return /*html*/`
        <div id="view-teste-inner">

            <h2 style="font-size:20px;font-weight:800;margin-bottom:4px;">Teste — menus flutuantes</h2>
            <p style="font-size:13px;opacity:.5;margin-bottom:32px;">
                Cada componente com menu deve flutuar sobre o texto abaixo sem ser cortado.
            </p>

            <!-- ── 1. BUTTON COM MENU ──────────────────────────────── -->
            <div class="teste-block">
                <p class="teste-label">Button + Menu</p>
                <div class="piece-interactive" style="width:fit-content;">
                    <button class="piece-button piece-medium piece-surface piece-s-40 piece-primary
                        background-color-auto-11 background-color-auto-12-hover
                        text-color-auto-00 ripple-color-auto-00">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">send</span>
                        <span class="piece-label">Enviar</span>
                    </button>
                    <nav class="piece-menu">
                        <ul class="piece-surface background-color-auto-00">
                            <label class="${itemCls}">
                                <span class="material-symbols-rounded piece-menu-icon" translate="no">send</span>
                                <span class="piece-menu-label">Enviar agora</span>
                            </label>
                            <label class="${itemCls}">
                                <span class="material-symbols-rounded piece-menu-icon" translate="no">schedule_send</span>
                                <span class="piece-menu-label">Agendar envio</span>
                            </label>
                            <label class="${itemCls}">
                                <span class="material-symbols-rounded piece-menu-icon" translate="no">drafts</span>
                                <span class="piece-menu-label">Salvar rascunho</span>
                            </label>
                        </ul>
                    </nav>
                </div>
                <p class="teste-lorem">${lorem}</p>
            </div>

            <!-- ── 2. ICON BUTTON COM MENU ─────────────────────────── -->
            <div class="teste-block">
                <p class="teste-label">Icon Button + Menu</p>
                <div class="piece-interactive" style="width:fit-content;">
                    <button class="piece-icon-button piece-small piece-surface piece-s-40 piece-primary
                        background-color-auto-04 background-color-auto-05-hover text-color-auto-18">
                        <span class="material-symbols-rounded piece-icon" translate="no">more_vert</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <nav class="piece-menu">
                        <ul class="piece-surface background-color-auto-00">
                            <label class="${itemCls}">
                                <span class="material-symbols-rounded piece-menu-icon" translate="no">edit</span>
                                <span class="piece-menu-label">Editar</span>
                            </label>
                            <label class="${itemCls}">
                                <span class="material-symbols-rounded piece-menu-icon" translate="no">content_copy</span>
                                <span class="piece-menu-label">Duplicar</span>
                            </label>
                            <label class="${itemCls}">
                                <span class="material-symbols-rounded piece-menu-icon" translate="no">delete</span>
                                <span class="piece-menu-label">Excluir</span>
                            </label>
                        </ul>
                    </nav>
                </div>
                <p class="teste-lorem">${lorem}</p>
            </div>

            <!-- ── 3. SPLIT BUTTON ────────────────────────────────── -->
            <div class="teste-block">
                <p class="teste-label">Split Button</p>
                <div style="width:min-content;" class="piece-split-button piece-small piece-primary piece-interactive">
                    <button data-action="copy" class="piece-not-interactive piece-leading-button piece-surface
                        box-shadow-color-auto-12 background-color-auto-04 background-color-auto-05-hover
                        text-color-auto-20">
                        <span class="material-symbols-rounded piece-icon" translate="no">content_copy</span>
                        <span class="piece-label">Copiar</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <button class="piece-trailing-button piece-surface
                        box-shadow-color-auto-12 background-color-auto-04 background-color-auto-05-hover
                        text-color-auto-20">
                        <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <nav class="piece-menu">
                        <ul class="piece-surface background-color-auto-00">
                            <label class="${itemCls}">
                                <input type="radio" class="piece-controller" name="teste-split" value="copy" checked>
                                <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">content_copy</span>
                                <span class="material-symbols-rounded piece-menu-icon piece-true" translate="no">content_copy</span>
                                <span class="piece-menu-label">Copiar</span>
                            </label>
                            <label class="${itemCls}">
                                <input type="radio" class="piece-controller" name="teste-split" value="download">
                                <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">download</span>
                                <span class="material-symbols-rounded piece-menu-icon piece-true" translate="no">download</span>
                                <span class="piece-menu-label">Baixar</span>
                            </label>
                            <label class="${itemCls}">
                                <input type="radio" class="piece-controller" name="teste-split" value="share">
                                <span class="material-symbols-rounded piece-menu-icon piece-false" translate="no">share</span>
                                <span class="material-symbols-rounded piece-menu-icon piece-true" translate="no">share</span>
                                <span class="piece-menu-label">Compartilhar</span>
                            </label>
                        </ul>
                    </nav>
                </div>
                <p class="teste-lorem">${lorem}</p>
            </div>

            <!-- ── 4. TEXT-FIELD SELECT COM MENU ─────────────────── -->
            <div class="teste-block">
                <p class="teste-label">Text-field Select + Menu</p>
                <div class="piece-interactive piece-text-field piece-medium piece-primary" style="width:240px;">
                    <fieldset class="piece-field-outline piece-background-alpha-00 piece-surface
                        border-color-auto-06 border-color-auto-20-active">
                        <legend><span>Categoria</span></legend>
                        <label class="piece-field-container piece-surface piece-background-alpha-00"
                            style="cursor:pointer;">
                            <input id="teste-select-input" type="text" class="piece-controller"
                                readonly required style="cursor:pointer;">
                            <span class="piece-label">Categoria</span>
                            <span class="material-symbols-rounded piece-icon-trailing" translate="no"
                                style="transition:transform .3s cubic-bezier(0.2,0,0,1);">
                                keyboard_arrow_down
                            </span>
                        </label>
                    </fieldset>
                    <nav class="piece-menu">
                        <ul class="piece-surface background-color-auto-00">
                            <label class="${itemCls}">
                                <input type="radio" class="piece-controller" name="teste-select" value="Design">
                                <span class="piece-menu-label">Design</span>
                            </label>
                            <label class="${itemCls}">
                                <input type="radio" class="piece-controller" name="teste-select" value="Desenvolvimento">
                                <span class="piece-menu-label">Desenvolvimento</span>
                            </label>
                            <label class="${itemCls}">
                                <input type="radio" class="piece-controller" name="teste-select" value="Marketing">
                                <span class="piece-menu-label">Marketing</span>
                            </label>
                            <label class="${itemCls}">
                                <input type="radio" class="piece-controller" name="teste-select" value="Produto">
                                <span class="piece-menu-label">Produto</span>
                            </label>
                        </ul>
                    </nav>
                </div>
                <p class="teste-lorem">${lorem}</p>
            </div>

        </div>
        `
    }
})
