MPSO.newView({
    name: "Início",
    icon: "home",
    showInNavigation: true,
    
    main() {
        this.initPresentation("#m-main section")
    },

    // função modular dentro da view
    initPresentation(containerSelector) {
        const container = $(containerSelector)
        container.appendAll(this.create(/*html*/`
            <article id="banner-pieces" class="
                    piece-surface
                    border-color-auto-06
                ">
                <h1 class="s-40">Adaptável e flexível, como <span class="piece-surface text-color-auto-12 piece-s-40" style="background:transparent;">Peças</span>!
                </h1>
                <p class="s-40">Construa seus sites, programas e apps usando componentes que se encaixam perfeitamente.</p>
                <label for="nav-btn-1" class="piece-surface piece-button piece-small background-color-auto-12 background-color-auto-11-hover text-color-light-00">
                    <span class="piece-label">Conheça agora o Material Pieces</span>
                    <span class="piece-ripple"></span>
                </label>
            </article>
        `))
    },
})