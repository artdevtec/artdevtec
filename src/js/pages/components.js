art.pages.push({
    name: 'components',
    icon: 'edit',
    showInNavigation: true,
    main() {
        //m-header
        // document.querySelector('#m-header #titulo h2').innerText = this.name
        //m-main
        const mMain = document.querySelector(`#m-main`)
        //inserir m-layout da pagina
        mMain.innerHTML = /*html*/`
            <section id="page-components" class="
                piece-surface
                scrollbar-track-outline-color-auto-04
                scrollbar-thumb-background-color-auto-10
                scrollbar-thumb-border-color-auto-00
                webkit-scrollbar-display-1
            ">



                <h3>Tooltip</h3>
        <div
            style="height: 250px; place-items: center;"
            class="
                piece-surface
                bg-dot
            "
        >
            <button
                class="
                    piece-icon-button
                    piece-large
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 top left piece-visible">top left</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 top piece-visible">top</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 top right piece-visible">top right</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 left piece-visible">left</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 right piece-visible">right</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 bottom left piece-visible">bottom left</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 bottom piece-visible">bottom</span>
                <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 bottom right piece-visible">bottom right</span>
            </button>
        </div>
        <h3>FAB menu</h3>
        <div
            style="height: 220px; place-items: center;"
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >
            <div class="piece-FAB-menu piece-interactive piece-surface">
                <div>
                    <button class="menu-item piece-surface background-color-auto-04">
                        <span class="material-symbols-rounded piece-icon" translate="no">table</span>
                        <span class="piece-label">Excel</span>
                    </button>
                    <button class="menu-item piece-surface background-color-auto-04">
                        <span class="material-symbols-rounded piece-icon" translate="no">print</span>
                        <span class="piece-label">Imprimir</span>
                    </button>
                </div>
                <button class="
                    piece-toggle-button
                    piece-surface
                    piece-parent
                    background-color-auto-04
                    background-color-auto-05-hover
                    background-color-auto-12-active
                    background-color-auto-13-hover-active
                    text-color-auto-20
                    text-color-auto-00-active
                ">
                    <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
                    <span class="material-symbols-rounded piece-icon piece-true" translate="no">save</span>
                </button>
            </div>
        </div>
        <h3>Radio</h3>
        <div
            style="height: 170px; place-items: center;"
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >
            <label
                class="
                    piece-radio
                    piece-medium
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
                <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
                <input type="radio" class="piece-controller" name="radio">
            </label>
            <label
                class="
                    piece-radio
                    piece-medium
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
                <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
                <input type="radio" class="piece-controller" name="radio">
            </label>
        </div>
        <h3>Checkbox</h3>
        <div
            style="height: 170px; place-items: center;"
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >
            <label
                id="icon-button-presentation"
                class="
                    piece-checkbox
                    piece-medium
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon piece-true" translate="no">check_box</span>
                <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
                <input type="checkbox" class="piece-controller" name="checkbox">
            </label>
        </div>
        <h3>split buttons</h3>
        <div
            style="place-items: center; padding: 16px;"
            class="
                piece-surface
                bg-dot
            "
        >
            <div
                class="
                    piece-split-button
                    piece-extra-small
                    piece-interactive
                "
            >
                <button
                    class="
                        piece-not-interactive
                        piece-leading-button
                        piece-surface
                        background-color-auto-20
                        background-color-auto-21-hover
                        text-color-auto-00
                    "
                >
                    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                    <span class="piece-label">Label</span>
                </button>
                <button class="
                        piece-trailing-button
                        piece-surface
                        background-color-auto-20
                        background-color-auto-21-hover
                        text-color-auto-00
                    ">
                    <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
                </button>
                <ul
                    class="
                        piece-surface
                        background-color-auto-00
                        text-color-auto-22
                    "
                >
                    <li>primeiro</li>
                    <li>segundo</li>
                    <li>terceiro</li>
                </ul>
            </div>
            <div
                class="
                    piece-split-button
                    piece-small
                "
            >
                <button
                    class="
                        piece-leading-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    "
                >
                    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                    <span class="piece-label">Label</span>
                </button>
                <button class="
                        piece-trailing-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    ">
                    <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
                </button>
            </div>
            <div
                class="
                    piece-split-button
                    piece-medium
                "
            >
                <button
                    class="
                        piece-leading-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    "
                >
                    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                    <span class="piece-label">Label</span>
                </button>
                <button class="
                        piece-trailing-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    ">
                    <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
                </button>
            </div>
            <div
                class="
                    piece-split-button
                    piece-large
                "
            >
                <button
                    class="
                        piece-leading-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    "
                >
                    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                    <span class="piece-label">Label</span>
                </button>
                <button class="
                        piece-trailing-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    ">
                    <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
                </button>
            </div>
            <div
                class="
                    piece-split-button
                    piece-extra-large
                "
            >
                <button
                    class="
                        piece-leading-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    "
                >
                    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                    <span class="piece-label">Label</span>
                </button>
                <button class="
                        piece-trailing-button
                        piece-surface
                        background-color-auto-04
                        background-color-auto-05-hover
                        text-color-auto-20
                    ">
                    <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
                </button>
            </div>
        </div>
        <h3>Snackbar</h3>
        <div
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >
            <div class="
                piece-snackbar
                piece-surface
                background-color-inverse-02
                text-color-inverse-22
            ">
                <span class="material-symbols-rounded piece-icon" translate="no">info</span>
                <span class="piece-label">Texto copiado com sucesso!</span>
            </div>
        </div>
        <h3>FAB</h3>
        <div
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >

            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-small
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
            </button>
            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
            </button>
            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-medium
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
            </button>
            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-large
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
            </button>

        </div>
        <h3>FABs Extended</h3>
        <div
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >

            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-small
                    piece-extended
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                <span class="piece-label">Label</span>
            </button>
            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-extended
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                <span class="piece-label">Label</span>
            </button>
            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-extended
                    piece-medium
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                <span class="piece-label">Label</span>
            </button>
            <button
                id="button-presentation"
                class="
                    piece-FAB
                    piece-extended
                    piece-large
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                <span class="piece-label">Label</span>
            </button>

        </div>
        <h3>Switches</h3>
        <div
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >

            <label class="
                piece-switch
                piece-surface

                background-color-auto-00
                background-color-auto-02-hover

                background-color-auto-12-active
                background-color-auto-14-active-hover


                border-color-auto-04
                border-color-auto-10-active
                
                ripple-to-fg
                ripple-to-accent-active
            ">
                <span class="piece-ripple"></span>
                <input type="checkbox" class="piece-controller" name="switch" value="switch">
                <span class="
                    piece-indicator
                    piece-surface
                    piece-parent
                    background-color-auto-12
                    background-color-auto-00-active
                "></span>
            </label>

        </div>
        <h3>Text Fields</h3>
        <div
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >

            <div class="piece-text-field">
                <label class="
                    piece-surface
                    background-color-auto-00
                    text-color-to-mg
                    background-color-fg-active
                    text-color-to-fg-active

                    border-color-auto-04
                    border-color-auto-20-active
                ">
                    <input type="text" class="piece-controller" value="" required="">
                    <span class="piece-label">PRODUTOR</span>
                    <button
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-small
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded icon" translate="no">content_copy</span>
                    </button>
                </label>
            </div>

            <div class="piece-text-field">
                <label class="
                    piece-surface
                    background-color-auto-00
                    text-color-to-mg
                    background-color-fg-active
                    text-color-to-fg-active

                    border-color-auto-04
                    border-color-auto-20-active
                ">
                    <input type="text" class="piece-controller" value="Texto Texte" required="">
                    <span class="piece-label">PRODUTOR</span>
                    <button
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-small
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded icon" translate="no">content_copy</span>
                    </button>
                </label>
            </div>

        </div>
        <h3>buttons</h3>
        <div
            style="height: 224px; place-items: center;"
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >
            <button
                id="button-presentation"
                class="
                    piece-button
                    piece-small
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                <span class="piece-label">Label</span>
            </button>
            <button
                id="button-presentation"
                class="
                    piece-button
                    piece-small
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="piece-label">Label</span>
            </button>
        </div>
        <h3>Icon buttons</h3>
        <div
            style="height: 170px; place-items: center;"
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
            "
        >
            <button
                id="icon-button-presentation"
                class="
                    piece-icon-button
                    piece-medium
                    piece-narrow
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    text-color-auto-20
                "
            >
                <span class="material-symbols-rounded piece-icon" translate="no">add</span>
            </button>
        </div>
        <h3>Navigation</h3>
        <div
            class="
                card
                piece-surface
                background-color-auto-02
                border-color-auto-04
            "
        >
            <h3>Bar</h3>
            <div
                class="
                    piece-navigation
                    piece-bar
                    piece-floating
                    piece-surface
                    background-color-auto-00
                "
            >
                <div class="piece-items">
                    <label class="piece-item">
                        <span class="
                            piece-indicator
                            piece-surface
                            background-color-auto-04
                        "></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">label</span>
                        <span class="piece-label">label-large-text</span>
                        <input type="radio" name="navgation-bar" class="piece-controller">
                    </label>
                    <label class="piece-item">
                        <span class="
                            piece-indicator
                            piece-surface
                            background-color-auto-04
                        "></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">label</span>
                        <span class="piece-label">label</span>
                        <input type="radio" name="navgation-bar" class="piece-controller" checked>
                    </label>
                    <label class="piece-item">
                        <span class="
                            piece-indicator
                            piece-surface
                            background-color-auto-04
                        "></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">label</span>
                        <span class="piece-label">label</span>
                        <input type="radio" name="navgation-bar" class="piece-controller">
                    </label>
                </div>
            </div>
            <h3>Rail</h3>
            <div
                class="
                    piece-navigation
                    piece-rail
                    piece-floating
                    piece-surface
                    background-color-auto-00
                "
            >
                <!-- header -->
                <header>
                    <!-- logo -->
                    <h1 id="logo" class="
                        piece-logo
                        piece-surface
                        background-color-auto-04
                        text-color-auto-12
                    ">Logo</h1>
                    <!-- menu -->
                    <label
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-menu
                            piece-medium
                            piece-surface
                            background-color-auto-02-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded piece-icon piece-false" translate="no">menu</span>
                        <span class="material-symbols-rounded piece-icon piece-true" translate="no">menu_open</span>
                        <input type="checkbox" class="piece-controller">
                    </label>
                    <!-- FAB -->
                    <button id="button-presentation" class="
                            piece-FAB
                            piece-extended
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                            piece-secondary
                        ">
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                        <span class="piece-label">Label</span>
                    </button>
                </header>
                <!-- items -->
                <div
                    class="piece-items"
                >
                    <label class="piece-item">
                        <span class="
                            piece-indicator
                            piece-surface
                            background-color-auto-04
                            background-color-auto-08-hover
                        "></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">label</span>
                        <span class="piece-label">label-large</span>
                        <!-- <span class="piece-label">label-large-text-teste-overflow</span> -->
                        <input type="radio" name="navgation-rail" class="piece-controller" checked>
                    </label>
                    <label class="piece-item">
                        <span class="
                            piece-indicator
                            piece-surface
                            background-color-auto-04
                        "></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">label</span>
                        <span class="piece-label">label</span>
                        <input type="radio" name="navgation-rail" class="piece-controller">
                    </label>
                    <label class="piece-item">
                        <span class="
                            piece-indicator
                            piece-surface
                            background-color-auto-04
                        "></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">label</span>
                        <span class="piece-label">label</span>
                        <input type="radio" name="navgation-rail" class="piece-controller">
                    </label>
                </div>
            </div>
            <h3>Bar - Rail</h3>
            <div
                class="
                    piece-navigation
                    piece-bar-rail
                    piece-floating
                    piece-surface
                    background-color-auto-00
                "
            >
                <!-- header -->
                <header>
                    <!-- logo -->
                    <h1 id="logo" class="
                        piece-logo
                        piece-surface
                        background-color-auto-04
                        text-color-auto-12
                    ">Logo</h1>
                    <!-- menu -->
                    <label
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-menu
                            piece-medium
                            piece-surface
                            background-color-auto-02-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded piece-icon piece-false" translate="no">menu</span>
                        <span class="material-symbols-rounded piece-icon piece-true" translate="no">menu_open</span>
                        <input type="checkbox" class="piece-controller">
                    </label>
                    <!-- FAB -->
                    <button id="button-presentation" class="
                            piece-FAB
                            piece-extended
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                            piece-secondary
                        ">
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                        <span class="piece-label">Label</span>
                    </button>
                </header>
                <!-- items -->
                <div
                    class="piece-items"
                >
                    <label class="piece-item piece-surface">
                        <span class="
                            piece-indicator
                            piece-surface
                            piece-parent

                            background-color-auto-00
                            background-color-auto-04-hover

                            background-color-auto-11-active
                            background-color-auto-13-hover-active
                        "></span>
                        <span class="
                            material-symbols-rounded
                            piece-icon
                        " translate="no">label</span>
                        <span class="piece-label">label-large</span>
                        <!-- <span class="piece-label">label-large-text-teste-overflow</span> -->
                        <input type="radio" name="navgation-bar-rail" class="piece-controller" checked>
                    </label>
                    <label class="piece-item piece-surface">
                        <span class="
                            piece-indicator
                            piece-surface
                            piece-parent

                            background-color-auto-00
                            background-color-auto-04-hover

                            background-color-auto-11-active
                            background-color-auto-13-hover-active
                        "></span>
                        <span class="
                            material-symbols-rounded
                            piece-icon
                        " translate="no">label</span>
                        <span class="piece-label">label-large</span>
                        <!-- <span class="piece-label">label-large-text-teste-overflow</span> -->
                        <input type="radio" name="navgation-bar-rail" class="piece-controller" checked>
                    </label>
                    <label class="piece-item piece-surface">
                        <span class="
                            piece-indicator
                            piece-surface
                            piece-parent

                            background-color-auto-00
                            background-color-auto-04-hover

                            background-color-auto-11-active
                            background-color-auto-13-hover-active
                        "></span>
                        <span class="
                            material-symbols-rounded
                            piece-icon
                        " translate="no">label</span>
                        <span class="piece-label">label-large</span>
                        <!-- <span class="piece-label">label-large-text-teste-overflow</span> -->
                        <input type="radio" name="navgation-bar-rail" class="piece-controller" checked>
                    </label>

                </div>
            </div>
        </div>
        <h3>Toolbars</h3>
        <div
            class="
                card
                piece-surface
                background-color-auto-00
                border-color-auto-04
                
            "
        >
            <div class="piece-toolbar">
                <div
                    class="
                        piece-floating
                        piece-surface
                        background-color-auto-04
                    "
                >
                    <button
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-small
                            piece-surface
                            background-color-auto-04
                            background-color-auto-06-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                    </button>
                    <button
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-small
                            piece-surface
                            background-color-auto-04
                            background-color-auto-06-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                    </button>
                    <button
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-small
                            piece-wide
                            piece-surface
                            text-color-auto-20
                            background-color-auto-10
                        "
                    >
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                    </button>
                    <button
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-small
                            piece-surface
                            background-color-auto-04
                            background-color-auto-06-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                    </button>
                    <button
                        id="icon-button-presentation"
                        class="
                            piece-icon-button
                            piece-small
                            piece-surface
                            background-color-auto-04
                            background-color-auto-06-hover
                            text-color-auto-20
                        "
                    >
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                    </button>
                </div>
            </div>
        </div>



            </section>
        `
    }
})