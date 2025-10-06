MPSO.newView({
    name: "Configurações",
    icon: "settings",
    showInNavigation: true,
    
    main() {
        this.initSyncLyric("#m-main section") // chama a função da própria view
        this.initThemeToggle("#m-main section") // chama a função da própria view
        this.initFontSize("#m-main section") // chama a função da própria view

        this.initVersion("#m-main section") // chama a função da própria view
    },

    // função modular dentro da view
    initVersion(containerSelector) {
        const container = $(containerSelector)
        container.appendAll(this.create(/*html*/`<div>2.0.0</div>`))
    },
    initFontSize(containerSelector) {
        const container = $(containerSelector)
    
        const sizes = [16, 20, 24, 28, 32]
        const savedValue = MPSO.storage.fontSize.get() || 1
    
        const labelsHTML = sizes.map((size, i) => `
            <label class="
                piece-surface
                piece-button
                background-color-auto-02
                background-color-auto-03-hover
                background-color-auto-11-active
                background-color-auto-12-hover-active
                text-color-auto-23
                text-color-auto-00-active
            ">
                <input class="piece-controller" type="radio" name="font-size" value="${i + 1}" ${savedValue == i + 1 ? "checked" : ""}>
                <span class="label">${size}</span>
                <span class="piece-ripple"></span>
            </label>
        `).join("")
    
        container.appendAll(this.create(/*html*/`
            <style>
                .piece-segmented-button {
                    display: grid;
                    grid-auto-flow: column;
                    gap: 2px;
                    label {
                        padding: inset !important;
                        cursor: var(--cursor-pointer);
                        border-radius: 8px;
                        &:not(:last-of-type){margin-right: -1px;}
                        &:first-of-type { border-radius: 40px 16px 16px 40px;}
                        &:last-of-type { border-radius: 16px 40px 40px 16px;}
                        .label {font-weight: 500; text-align: center; 	padding: 0;}
                        * {pointer-events: none;}
                        &:has(input:checked) {border-radius: 500px; padding: inset !important;}
                        padding: 0;
                    }
                    input {display: none;}
                }
                #tema {}
                #tema .letra {
                    display: grid;
                    gap: 4px;
                    p {
                        padding: 16px;
                        border-radius: 8px;
                        &:first-of-type {border-radius: 32px 32px 8px 8px;}
                        &:last-of-type {border-radius: 8px 8px  32px 32px;}
                    }
                }
            </style>
            <div id="tema" class="piece-surface background-color-auto-04 text-color-012" style="padding:16px;">
                <h1>Tamanho da letra</h1>
                <div id="font-size" style="display:grid;" class="piece-segmented-button">
                    ${labelsHTML}
                </div>
                <span class="letra" style="font-weight:500; border-radius: 16px; font-size: calc(16px + ((var(--font-size) - 1) * 4px));">
                    <p class="letra piece-surface background-color-auto-08 text-color-auto-21 piece-secondary piece-s-40">Deus prometeu com certeza</p>
                    <p class="letra piece-surface background-color-auto-08 text-color-auto-21 piece-secondary piece-s-40">Chuvas de graça mandar;...</p>
                </span>
            </div>
        `))
    
        // aplicar tamanho salvo
        document.documentElement.style.setProperty('--font-size', savedValue)
    
        // listeners para mudar fonte e salvar no storage
        container.$$('#font-size input').forEach(input => {
            input.addEventListener('input', () => {
                const value = input.value
                document.documentElement.style.setProperty('--font-size', value)
                MPSO.storage.fontSize.set(value)
            })
        })
    },
    initSyncLyric(containerSelector) {
        const container = $(containerSelector)
        container.appendAll(this.create(/*html*/`
            <button
                data-offline="disable"
                onclick="carregarLetrasNoLocalStorage()"
                class="
                    piece-button
                    piece-surface
                    piece-s-40
                    background-color-auto-13
                    text-color-auto-00
                    background-color-15-hover
                "
            >  
                <span class="material-symbols-rounded piece-icon" translate="no">sync</span>
                <span class="piece-label">Atualizar Letras</span>
            </button>
        `))
    },
    initThemeToggle(containerSelector) {
        const container = $(containerSelector)

        container.appendAll(MPSO.globalFns.create(/*html*/`
            <style>
                #view-${this.normalize(this.name)}>#tema {
                    display: grid;
                    border-radius: 16px;
                    gap: 16px;
                    grid-template-rows: auto 1fr;
                    h1 {font-size:20px;font-weight:900;}
                    #tgg-mm {
                        border-radius: 40px;
                        display: grid;
                        grid-template-columns: 1fr auto;
                        padding:16px;
                        gap: 4px;
                        cursor: var(--cursor-pointer);
                        & *:active {pointer-events: none;}
                        & .label {
                            display: grid;
                            place-content: center start;
                            padding: 0 16px;
                            font-weight: 500;
                        }
                        & input {display: none;}
                        .active-indicator {
                            border-radius: 40px;
                            position: absolute;
                            width: calc(50% - 8px);
                            height: calc(100% - 8px);
                            top: 4px;
                            left: 4px;
                            transition: left .3s;
                            z-index: 1;
                        }
                        &:has(input:checked) {
                            .active-indicator {
                                left: calc(50% + 4px);
                            }
                        }
                    }
                }
            </style>
            <div id="tema" class="piece-surface background-color-auto-04 text-color-012" style="padding:16px;">
                <h1>Tema</h1>
                <label id="tgg-mm" class="
                    piece-surface
                    background-color-auto-02
                    piece-s-40
                ">
                <span class="label">Modo Escuro</span>
                <div class="
                            piece-switch
                            piece-surface

                            background-color-auto-04
                            background-color-auto-05-hover

                            background-color-auto-11-active
                            background-color-auto-12-active-hover


                            border-color-auto-08
                            border-color-auto-11-active
                            
                            ripple-to-fg
                            ripple-to-accent-active
                        ">
                            
                            <input type="checkbox" class="piece-controller" name="switch" value="switch">
                            <span class="
                                piece-indicator
                                piece-surface
                                piece-parent
                                background-color-auto-12
                                background-color-auto-00-active
                            "></span>
                        </div>
                    <span class="piece-ripple"></span>
                </label>
            </div>
        `))

        const checkbox = container.$('input[type="checkbox"]')
        checkbox.checked = MPSO.storage.darkMode.get()
        applyTheme(checkbox.checked)

        checkbox.addEventListener('change', () => {
            MPSO.storage.darkMode.set()
            applyTheme(checkbox.checked)
        })

        function applyTheme(isDark) {
            document.body.classList.toggle("piece-dark", isDark)
            document.body.classList.toggle("piece-light", !isDark)

            document.documentElement.classList.add("tema-transition");
            setTimeout(() => {
            document.documentElement.classList.remove("tema-transition");
            }, 300);

        }
    }
})