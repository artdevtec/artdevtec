MPSO.newView({
    name: "Início",
    icon: "home",
    showInNavigation: true,
    
    main() {
        $(`#m-main section`).innerHTML = ""
        this.initPresentation("#m-main section")
        // this.initTest("#m-main section")
    },

    // função modular dentro da view
    initTest(containerSelector) {
        const container = $(containerSelector)
        container.appendAll(this.create(/*html*/`
            <div class="piece-surface background-color-auto-06">
                bg
                <div class="piece-surface background-color-inverse-04 text-color-inverse-20">inverse</div>
                <div class="piece-surface background-color-auto-12 text-color-light-00">button</div>
                <label class="piece-surface background-color-light-00 background-color-light-04-hover background-color-dark-10-active background-color-light-20-hover-active text-color-dark-00"><input type="checkbox" class="piece-controller"></label>
            </div>
        `))
    },
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