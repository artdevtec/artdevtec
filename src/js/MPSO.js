// Globais
const $  = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

Element.prototype.$  = function (sel) { return this.querySelector(sel) }
Element.prototype.$$ = function (sel) { return [...this.querySelectorAll(sel)] }
Document.prototype.$  = Element.prototype.$
Document.prototype.$$ = Element.prototype.$$

Node.prototype.appendAll = function(nodes) {nodes.forEach(node => this.appendChild(node))}

let cl = (v) => console.log(v)

const MPSO = {
    name: "Art",
    views: [],
    currentView: null, // ✅ guarda a view atual

    // Funções globais disponíveis em todas as views
    globalFns: {
        create: h => [...Object.assign(document.createElement("template"), { innerHTML: h.trim() }).content.children],
        normalize: str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
        getPlatform() {
            const userAgent = navigator.userAgent.toLowerCase();
        
            if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
            if (/android/.test(userAgent)) return "android";
            if (/windows/.test(userAgent)) return "windows";
            if (/macintosh|mac os x/.test(userAgent)) return "mac";
            if (/linux/.test(userAgent)) return "linux";
        
            return "desktop"; // fallback genérico
        }
    },

    // Cria uma nova view
    newView(config){
        const view = {
            ...config,
            ...this.globalFns,
            main(params = []){
                $(`head>title`).innerHTML = `${MPSO.name} - ${this.name}`;
                $(`#m-header h2`).innerHTML = this.name;
                $(`#m-aside h2`).innerHTML = this.name;
                // se a view ainda não existe no DOM, cria o container
                if(!$(`#m-main>#view-${this.normalize(this.name)}`)){
                    $(`#m-main`).innerHTML = `<section id="view-${this.normalize(this.name)}"></section>`;
                }

                // executa a lógica específica da view
                config.main.call(this, params);
            }
        }
        this.views.push(view);
    },

    // Renderiza uma view com base no hash da URL <ia>
    renderView(hash){
        const cleanHash = decodeURIComponent(hash).replace(/^#/, "").replace(/^\/+|\/+$/g, "");
        const [viewName, ...params] = cleanHash.split("/").filter(Boolean);

        const view = this.views.find(v => this.globalFns.normalize(v.name) === this.globalFns.normalize(viewName));

        if (view) {
            this.currentView = view;   // atualiza a referência
            view.main(params);         // chama sempre o main da view
        } else {
            $("#m-main").innerHTML = "<p>Página não encontrada</p>";
        }

        let nav = $(`.piece-item input[value="${this.globalFns.normalize(viewName)}"]`)
        nav.checked = true;
    },

    // Inicia o router <ia>
    initRouter(){
        let initial = location.hash.replace("#", "");

        if (!initial) {
            initial = this.globalFns.normalize(this.views[0]?.name);
            location.hash = initial;
        }

        this.renderView(initial);

        window.addEventListener("hashchange", () => {
            const pageName = location.hash.replace("#", "") || this.globalFns.normalize(this.views[0]?.name);
            this.renderView(pageName);
        });
    }
}

// ------------------ LocalStorage MPSO ------------------
MPSO.storage = {}

// Define e inicializa o localStorage se não existir
MPSO.defineLocalStorage = function() {
    const key = MPSO.name; // usa o name do MPSO como chave
    if (!localStorage[key]) {
        localStorage[key] = JSON.stringify({
            dark: true,
            HUEMainColor: 248,
            paleta: "analoga",
            fontSize: 1,
            favoritos: [],
            presentation: "null",
            developerMode: false,
            mainApp: null,
            iconThemed: true,
            event_snow: false
        });
    }
    return JSON.parse(localStorage[key]);
}

// Atualiza o localStorage
MPSO.updateStorage = function(newData) {
    const key = MPSO.name;
    localStorage[key] = JSON.stringify(newData);
}

// Inicializa storage
MPSO.storage.data = MPSO.defineLocalStorage();

// ------------------ Getters / Setters ------------------
MPSO.storage.darkMode = {
    get() { return MPSO.storage.data.dark },
    set() { 
        MPSO.storage.data.dark = !MPSO.storage.data.dark;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.HUEMainColor = {
    get() { return MPSO.storage.data.HUEMainColor },
    set(value) { 
        MPSO.storage.data.HUEMainColor = value;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.paleta = {
    get() { return MPSO.storage.data.paleta },
    set(value) { 
        MPSO.storage.data.paleta = value;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.fontSize = {
    get() { return MPSO.storage.data.fontSize },
    set(value) { 
        MPSO.storage.data.fontSize = value;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.presentation = {
    get() { return MPSO.storage.data.presentation },
    set(value) { 
        MPSO.storage.data.presentation = value;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.favoritos = {
    get() { return MPSO.storage.data.favoritos },
    set(value) {
        const idx = MPSO.storage.data.favoritos.indexOf(value)
        if(idx >= 0) MPSO.storage.data.favoritos.splice(idx, 1)
        else MPSO.storage.data.favoritos.push(value)
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.devMode = {
    get() { return MPSO.storage.data.developerMode },
    set() { 
        MPSO.storage.data.developerMode = !MPSO.storage.data.developerMode;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.iconThemed = {
    get() { return MPSO.storage.data.iconThemed },
    set(value) { 
        MPSO.storage.data.iconThemed = value === "default" ? false : true;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

MPSO.storage.event_snow = {
    get() { return MPSO.storage.data.event_snow },
    set() { 
        MPSO.storage.data.event_snow = !MPSO.storage.data.event_snow;
        MPSO.updateStorage(MPSO.storage.data);
    }
}

// Função para executar event_snow
MPSO.event_snow_function = function () {
    if(MPSO.storage.event_snow.get()) {
        const template = `
            <div id="event-snow">
                <div class="snow"></div>
            </div>
        `
        document.body.appendChild(MPSO.create(template)[0]);
    } else {
        document.querySelector('#event-snow')?.remove();
    }
}

// ------------------ Offline Control ------------------
MPSO.offline = {
    // inicializa a escuta
    init() {
        // roda uma vez ao carregar
        this.update()

        // escuta mudanças
        window.addEventListener('online',  () => this.update())
        window.addEventListener('offline', () => this.update())
    },

    // lógica de atualização
    update() {
        const offline = !navigator.onLine

        // Classe global para estilizar quando offline
        document.body.classList.toggle('is-offline', offline)

        // 🔹 Adiciona/Remove a classe piece-disabled
        $$('[data-offline="disable"]').forEach(el => {
            el.classList.toggle('piece-disabled', offline)
        })

        // 🔹 Mostra/esconde elementos de alerta
        $$('[data-offline="show"]').forEach(el => {
            el.classList.toggle('piece-show', offline)
        })
    }

}