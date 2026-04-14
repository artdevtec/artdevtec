MPSO.newView({
    name: "Configurações",
    icon: "settings",
    showInNavigation: true,

    main() {
        const section = $("#m-main section")
        section.innerHTML = ""
        this.initThemeToggle("#m-main section")

        if (MPSO.storage.devMode.get()) {
            this.initHUE("#m-main section")
            this.initPaleta("#m-main section")
            this.initScreenSize("#m-main section")
            this.initDevMode("#m-main section")
        } else {
            this.initDevMode("#m-main section")
        }

        this.initVersion("#m-main section")
    },

    // ─── VERSION ───────────────────────────────────────────
    initVersion(sel) {
        $(sel).appendAll(this.create(/*html*/`
            <div style="display:grid;padding:16px;place-content:center;">
                <span class="piece-surface background-color-auto-06" style="padding: 0 16px;border-radius: 16px;">${MPSO.version}</span>
            </div>
        `))
    },

    // ─── DARK MODE ─────────────────────────────────────────
    initThemeToggle(sel) {
        const container = $(sel)

        container.appendAll(this.create(/*html*/`
            <style>
                #view-configuracoes #tema {
                    display: grid;
                    border-radius: 16px;
                    gap: 16px;
                    grid-template-rows: auto 1fr;
                    h1 { font-size: 20px; font-weight: 900; }
                    #tgg-mm {
                        border-radius: 40px;
                        display: grid;
                        grid-template-columns: 1fr auto;
                        padding: 16px;
                        gap: 4px;
                        cursor: var(--cursor-pointer);
                        & *:active { pointer-events: none; }
                        & .label {
                            display: grid;
                            place-content: center start;
                            padding: 0 16px;
                            font-weight: 500;
                        }
                        & input { display: none; }
                        .active-indicator {
                            border-radius: 40px;
                            position: absolute;
                            width: calc(50% - 8px);
                            height: calc(100% - 8px);
                            top: 4px; left: 4px;
                            transition: left .3s;
                            z-index: 1;
                        }
                        &:has(input:checked) .active-indicator {
                            left: calc(50% + 4px);
                        }
                    }
                }
            </style>
            <div id="tema" class="piece-surface background-color-auto-04 text-color-012" style="padding:16px;">
                <h1>Tema</h1>
                <label id="tgg-mm" class="piece-surface background-color-auto-02 piece-s-40">
                    <span class="label">Modo Escuro</span>
                    <div class="piece-switch piece-surface background-color-auto-04 background-color-auto-05-hover background-color-auto-11-active background-color-auto-12-active-hover border-color-auto-08 border-color-auto-11-active ripple-to-fg ripple-to-accent-active">
                        <input type="checkbox" class="piece-controller" name="dark" value="dark">
                        <span class="piece-indicator piece-surface piece-parent background-color-auto-12 background-color-auto-00-active"></span>
                    </div>
                    <span class="piece-ripple"></span>
                </label>
            </div>
        `))

        const cb = container.$('input[name="dark"]')
        cb.checked = MPSO.storage.darkMode.get()
        this._applyTheme(cb.checked)

        cb.addEventListener('change', () => {
            MPSO.storage.darkMode.set()
            this._applyTheme(cb.checked)
        })
    },

    _applyTheme(isDark) {
        document.body.classList.toggle("piece-dark", isDark)
        document.body.classList.toggle("piece-light", !isDark)
        document.documentElement.classList.add("tema-transition")
        setTimeout(() => document.documentElement.classList.remove("tema-transition"), 300)
    },

    // ─── HUE ───────────────────────────────────────────────
    initHUE(sel) {
        const container = $(sel)

        container.appendAll(this.create(/*html*/`
            <div class="piece-surface background-color-auto-04 text-color-012" style="padding:16px;border-radius:16px;display:grid;gap:16px;">
                <h1 style="font-size:20px;font-weight:900;">Cor Principal</h1>
                <input type="range" name="hue" min="0" max="360" value="${MPSO.storage.HUEMainColor.get()}"
                    style="width:100%;cursor:var(--cursor-pointer);">
            </div>
        `))

        container.$('input[name="hue"]').addEventListener('input', e => {
            const v = Number(e.target.value)
            MPSO.storage.HUEMainColor.set(v)
            document.querySelector('html').style.setProperty('--piece-main-color', v)
        })
    },

    // ─── PALETA ────────────────────────────────────────────
    initPaleta(sel) {
        const container = $(sel)
        const opcoes = ["analoga", "complementar", "triádica"]

        container.appendAll(this.create(/*html*/`
            <div class="piece-surface background-color-auto-04 text-color-012" style="padding:16px;border-radius:16px;display:grid;gap:16px;">
                <h1 style="font-size:20px;font-weight:900;">Paleta</h1>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    ${opcoes.map(op => `
                        <label style="cursor:var(--cursor-pointer);">
                            <input type="radio" name="paleta" value="${op}" style="display:none;"
                                ${MPSO.storage.paleta.get() === op ? "checked" : ""}>
                            <span class="piece-surface background-color-auto-02 piece-s-40"
                                style="padding:8px 16px;border-radius:40px;display:block;">
                                ${op}
                            </span>
                        </label>
                    `).join("")}
                </div>
            </div>
        `))

        container.$$('input[name="paleta"]').forEach(radio => {
            radio.addEventListener('change', e => {
                MPSO.storage.paleta.set(e.target.value)
            })
        })
    },

    // ─── SCREEN SIZE ───────────────────────────────────────
    initScreenSize(sel) {
        const container = $(sel)
        const opcoes = ["compact", "default", "large"]

        container.appendAll(this.create(/*html*/`
            <div class="piece-surface background-color-auto-04 text-color-012" style="padding:16px;border-radius:16px;display:grid;gap:16px;">
                <h1 style="font-size:20px;font-weight:900;">Tamanho de Tela</h1>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    ${opcoes.map(op => `
                        <label style="cursor:var(--cursor-pointer);">
                            <input type="radio" name="screensize" value="${op}" style="display:none;"
                                ${MPSO.storage.screenSize.get() === op ? "checked" : ""}>
                            <span class="piece-surface background-color-auto-02 piece-s-40"
                                style="padding:8px 16px;border-radius:40px;display:block;">
                                ${op}
                            </span>
                        </label>
                    `).join("")}
                </div>
            </div>
        `))

        container.$$('input[name="screensize"]').forEach(radio => {
            radio.addEventListener('change', e => {
                MPSO.storage.screenSize.set(e.target.value)
            })
        })
    },

    // ─── DEV MODE ──────────────────────────────────────────
    initDevMode(sel) {
        const container = $(sel)

        container.appendAll(this.create(/*html*/`
            <div class="piece-surface background-color-auto-04 text-color-012" style="padding:16px;border-radius:16px;display:grid;gap:16px;">
                <h1 style="font-size:20px;font-weight:900;">Dev Mode</h1>
                <label style="display:grid;grid-template-columns:1fr auto;cursor:var(--cursor-pointer);padding:8px;border-radius:40px;"
                    class="piece-surface background-color-auto-02 piece-s-40">
                    <span style="display:grid;place-content:center start;padding:0 16px;font-weight:500;">
                        Modo Desenvolvedor
                    </span>
                    <div class="piece-switch piece-surface background-color-auto-04 background-color-auto-05-hover background-color-auto-11-active border-color-auto-08 border-color-auto-11-active ripple-to-fg ripple-to-accent-active">
                        <input type="checkbox" class="piece-controller" name="devmode" value="devmode">
                        <span class="piece-indicator piece-surface piece-parent background-color-auto-12 background-color-auto-00-active"></span>
                    </div>
                    <span class="piece-ripple"></span>
                </label>
            </div>
        `))

        const cb = container.$('input[name="devmode"]')
        cb.checked = MPSO.storage.devMode.get()

        cb.addEventListener('change', () => {
            MPSO.storage.devMode.set()
            MPSO.currentView.main()
        })
    }
})
