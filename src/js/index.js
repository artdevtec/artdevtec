(() => {
    const body = document.body
    const header = document.querySelector('header')

    function updateMetaThemeColor() {
        const color = header ? getComputedStyle(header).backgroundColor : '#ffffff'
        let meta = document.querySelector('meta[name="theme-color"]')
        if (!meta) {
            meta = document.createElement('meta')
            meta.name = 'theme-color'
            document.head.appendChild(meta)
        }
        meta.content = color
    }

    // Atualiza imediatamente na inicialização
    updateMetaThemeColor()

    // Observa mudanças nas classes do body
    const observer = new MutationObserver(() => {
        updateMetaThemeColor()
    })

    observer.observe(body, { attributes: true, attributeFilter: ['class'] })
})()


// ------------------ Start ------------------
cl(MPSO)

// Fill m-nav
MPSO.views
.filter(view=>view.showInNavigation)
.forEach((view, i)=>{

    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    const template = /*html*/`
        <label class="piece-item piece-surface">
            <span class="
                piece-indicator
                piece-surface
                piece-parent

                background-color-auto-02
                background-color-auto-04-hover

                background-color-auto-11-active
                background-color-auto-13-hover-active
                piece-s-40
                piece-secondary
                ripple-color-auto-00
            "></span>
            <span class="material-symbols-rounded piece-icon" translate="no">${view.icon}</span>
            <span class="piece-label">${view.name}</span>
            <input id="nav-btn-${i}" type="radio" name="nav" value="${normalize(view.name)}" class="piece-controller">
        </label>
    `
    $(`#m-aside .piece-items`).appendAll(MPSO.globalFns.create(template))
})

$$("#m-aside .piece-item").forEach(item=>{
    item.addEventListener('click', ()=> {
        window.location.hash = item.$('input').value.toLowerCase()
    })
})

// 🚀 Novo fluxo: animação primeiro, router depois
window.addEventListener("DOMContentLoaded", () => {

    // 🔹 Aplica o tema antes da animação
    if (MPSO.storage.darkMode.get()) {
        document.body.classList.add("piece-dark")
        document.body.classList.remove("piece-light")
    } else {
        document.body.classList.add("piece-light")
        document.body.classList.remove("piece-dark")
    }

    // inicia controle offline
    MPSO.offline.init()


    const animationTime = 2500 // tempo da animação em ms

    setTimeout(() => {
        $("body>.animation-container")?.remove()
        $("body").classList.remove("load-end")

        // inicia o router só depois da animação
        MPSO.initRouter()
        criarAnimacao('#m-header .icon', "56", "56", 60)
        criarAnimacao('#m-aside header .icon', "56", "56", 60)
    }, animationTime)
})