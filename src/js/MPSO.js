// Globais
const $  = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

Element.prototype.$  = function (sel) { return this.querySelector(sel) }
Element.prototype.$$ = function (sel) { return [...this.querySelectorAll(sel)] }
Document.prototype.$  = Element.prototype.$
Document.prototype.$$ = Element.prototype.$$

Node.prototype.appendAll = function(nodes) { nodes.forEach(node => this.appendChild(node)) }

const MPSO = {
    name: "Pieces",
    version: '1.0.0',
    views: [],
    currentView: null,

    globalFns: {
        create: h => [...Object.assign(document.createElement("template"), { innerHTML: h.trim() }).content.children],
        normalize: str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
        getPlatform() {
            const ua = navigator.userAgent.toLowerCase()
            if (/iphone|ipad|ipod/.test(ua)) return "ios"
            if (/android/.test(ua)) return "android"
            if (/windows/.test(ua)) return "windows"
            if (/macintosh|mac os x/.test(ua)) return "mac"
            if (/linux/.test(ua)) return "linux"
            return "desktop"
        }
    },

    newView(config) {
        const view = {
            ...config,
            ...this.globalFns,
            main(params = []) {
                $(`head>title`).innerHTML = `Pieces — ${this.name}`
                $(`#m-header h2`).innerHTML = this.name
                $(`#m-aside h2`).innerHTML = this.name
                if (!$(`#m-main>#view-${this.normalize(this.name).replaceAll(" ", "")}`)) {
                    $(`#m-main`).innerHTML = `<section id="view-${this.normalize(this.name).replaceAll(" ", "")}"></section>`
                }
                config.main.call(this, params)
            }
        }
        this.views.push(view)
    },

    renderView(hash) {
        const cleanHash = decodeURIComponent(hash).replace(/^#/, "").replace(/^\/+|\/+$/g, "")
        const [viewName, ...params] = cleanHash.split("/").filter(Boolean)
        const view = this.views.find(v => this.globalFns.normalize(v.name) === this.globalFns.normalize(viewName))

        // ─── tema ───────────────────────────────────────────
        document.querySelector('style#view-tema')?.remove()
        ;[...document.body.classList]
            .filter(c => c.endsWith('-tema'))
            .forEach(c => document.body.classList.remove(c))

        const paleta = `piece-${MPSO.storage.paleta.get()}`

        if (view?.tema) {
            const themeName = `view-${this.globalFns.normalize(view.name).replaceAll(' ', '')}-tema`
            document.body.classList.remove(paleta)
            document.body.classList.add(themeName)
            const style = document.createElement('style')
            style.id = 'view-tema'
            style.textContent = `.${themeName} { --piece-primary: ${view.tema.primary}; --piece-secondary: ${view.tema.secondary}; --piece-tertiary: ${view.tema.tertiary}; }`
            document.head.appendChild(style)
        } else {
            document.body.classList.add(paleta)
        }
        // ────────────────────────────────────────────────────

        if (view) {
            this.currentView = view
            view.main(params)
        } else {
            $("#m-main").innerHTML = `<p style="padding:32px;opacity:.5;">Página não encontrada</p>`
        }

        const nav = $(`.piece-item input[value="${this.globalFns.normalize(viewName)}"]`) || $(`.piece-item input[value="${this.globalFns.normalize(this.views[0]?.name)}"]`)
        if (nav) nav.checked = true
    },

    initRouter() {
        let initial = location.hash.replace("#", "")
        if (!initial) {
            initial = this.globalFns.normalize(this.views[0]?.name)
            location.hash = initial
        }
        this.renderView(initial)
        window.addEventListener("hashchange", () => {
            const pageName = location.hash.replace("#", "") || this.globalFns.normalize(this.views[0]?.name)
            this.renderView(pageName)
        })
    }
}

// ─── LocalStorage ──────────────────────────────────────────
MPSO.storage = {}

MPSO.defineLocalStorage = function () {
    const key = MPSO.name
    if (!localStorage[key]) {
        localStorage[key] = JSON.stringify({
            dark: true,
            HUEMainColor: 248,
            paleta: "analoga",
            developerMode: false,
            screen_size: "default"
        })
    }
    return JSON.parse(localStorage[key])
}

MPSO.updateStorage = function (newData) {
    localStorage[MPSO.name] = JSON.stringify(newData)
}

MPSO.storage.data = MPSO.defineLocalStorage()

MPSO.storage.darkMode = {
    get() { return MPSO.storage.data.dark },
    set() {
        MPSO.storage.data.dark = !MPSO.storage.data.dark
        MPSO.updateStorage(MPSO.storage.data)
    }
}

MPSO.storage.HUEMainColor = {
    get() { return MPSO.storage.data.HUEMainColor },
    set(value) {
        MPSO.storage.data.HUEMainColor = value
        MPSO.updateStorage(MPSO.storage.data)
    }
}

MPSO.storage.paleta = {
    get() { return MPSO.storage.data.paleta },
    set(value) {
        MPSO.storage.data.paleta = value
        MPSO.updateStorage(MPSO.storage.data)
    }
}

MPSO.storage.devMode = {
    get() { return MPSO.storage.data.developerMode },
    set() {
        MPSO.storage.data.developerMode = !MPSO.storage.data.developerMode
        MPSO.updateStorage(MPSO.storage.data)
    }
}

MPSO.storage.screenSize = {
    get() { return MPSO.storage.data.screen_size },
    set(value) {
        MPSO.storage.data.screen_size = value
        MPSO.updateStorage(MPSO.storage.data)
    }
}

// ─── Offline ───────────────────────────────────────────────
MPSO.offline = {
    init() {
        this.update()
        window.addEventListener('online',  () => this.update())
        window.addEventListener('offline', () => this.update())
    },
    update() {
        const offline = !navigator.onLine
        document.body.classList.toggle('is-offline', offline)
        $$('[data-offline="disable"]').forEach(el => el.classList.toggle('piece-disabled', offline))
        $$('[data-offline="show"]').forEach(el => el.classList.toggle('piece-show', offline))
    }
}
