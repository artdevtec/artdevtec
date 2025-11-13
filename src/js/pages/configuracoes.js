MPSO.newView({
    name: "Configurações",
    icon: "settings",
    showInNavigation: true,
    
    main() {
        this.initThemeToggle("#m-main section")
        this.initVersion("#m-main section")
    },

    // função modular dentro da view
    initVersion(containerSelector) {
        const container = $(containerSelector)
        container.appendAll(this.create(/*html*/`<div style="display:grid;padding: 16px;place-content: center;">2.0.0</div>`))
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