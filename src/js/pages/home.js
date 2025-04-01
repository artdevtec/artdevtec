art.pages.push({
    name: 'Início',
    icon: 'home',
    showInNavigation: true,
    main() {
        //m-header
        document.querySelector('#m-header #titulo h2').innerText = this.name
        //m-main
        const mMain = document.querySelector(`#m-main`)
        //inserir m-layout da pagina
        mMain.innerHTML = /*html*/`
            <section id="page-home" class="
                piece-surface
                background-color-096
                text-color-to-004
                scrollbar-track-outline-color-080
                scrollbar-thumb-background-color-080
                scrollbar-thumb-border-color-096
                webkit-scrollbar-display-1

            ">
                <section id="recents-section">
                    <article
                        id="banner-pieces"
                        class="
                            piece-surface
                            background-color-096
                            text-color-to-004
                            border-color-080
                        "
                    >
                        <h1 class="s-40">Adaptável e fexível, como <span class="piece-surface text-color-044" style="background:transparent;">Peças</span>!
                        </h1>
                        <p class="s-40">Stay connected with ease, share memories and have fun with our user-friendly
                            messaging app designed to simplify communication for everyone.</p>
                        <label for="nav-btn-1" class="piece-surface text-color-100 piece-button accent gradient s-40">
                            <span class="piece-label">Conheça agora o Material Pieces</span>
                            <span class="piece-ripple"></span>
                        </label>
                    </article>
                    <article id="harpa" class="piece-surface background-color-088 border-color-080">
                        <img id="harpa_app" src="src/img/harpa_app.png">
                        <img id="harpa_icon" src="src/img/harpa icon.png">
                        <h1>Harpa Cristã</h1>
                    </article>
                    <article id="card-button" class="piece-surface background-color-088 border-color-080">
                        <header></header>
                        <main class="piece-surface bg-dot">
                            <button id="export-exel-jestor-completo" class="piece-button piece-surface background-color-056 text-color-100 ripple-color-100 background-color-044-hover">
                                <span class="material-symbols-rounded icon" translate="no">download</span>
                                <span class="label">Button</span>
                                <span class="piece-ripple"></span>
                            </button>
                            <button id="export-exel-jestor-completo" class="
                                piece-button
                                piece-surface
                                background-color-096
                                text-color-004
                                border-color-056
                                ripple-color-100
                                background-color-092-hover
                            ">
                                <span class="material-symbols-rounded icon" translate="no">download</span>
                                <span class="piece-ripple"></span>
                            </button>
                            <button id="export-exel-jestor-completo" class="
                                piece-button
                                piece-surface
                                background-color-096
                                text-color-004
                                border-color-056
                                ripple-color-100
                                background-color-092-hover
                            ">
                                <span class="material-symbols-rounded icon" translate="no">download</span>
                                <span class="label">Button</span>
                                <span class="piece-ripple"></span>
                            </button>
                            <button id="export-exel-jestor-completo"
                            style="border-width: 1px; border-style: solid;"
                            class="
                                piece-button
                                piece-surface
                                text-color-004
                                border-color-072
                                ripple-color-100
                                background-color-092-hover
                            ">
                                <span class="material-symbols-rounded icon" translate="no">download</span>
                                <span class="label">Outlined</span>
                                <span class="piece-ripple"></span>
                            </button>
                        </main>
                        <footer></footer>
                    </article>
                    <article class="piece-surface background-color-088 border-color-080"></article>
                    <article class="piece-surface background-color-088 border-color-080"></article>
                    <article class="piece-surface background-color-088 border-color-080"></article>
                    <article class="piece-surface background-color-088 border-color-080"></article>
                    <article class="piece-surface background-color-088 border-color-080"></article>
                </section>
                <section id="harpa-section" style="height: calc(100vh - 81px);">
                    <img id="harpa_app" src="src/img/harpa_app.png">
                    <img id="harpa_icon" src="src/img/harpa icon.png">
                    <img id="qr-light" src="src/img/qr-code to light.png">
                    <h1>Harpa Cristã</h1>
                </section>
                <section id="" style="height: calc(100vh - 81px);"></section>
            </section>
        `
    }
})