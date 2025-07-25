art.pages.push({
    name: 'Início',
    icon: 'home',
    showInNavigation: true,
    main() {
        //m-header
        // document.querySelector('#m-header #titulo h2').innerText = this.name
        //m-main
        const mMain = document.querySelector(`#m-main`)
        //inserir m-layout da pagina
        mMain.innerHTML = /*html*/`
            <section id="page-home" class="
                piece-surface
                scrollbar-track-outline-color-auto-04
                scrollbar-thumb-background-color-auto-10
                scrollbar-thumb-border-color-auto-00
                webkit-scrollbar-display-1
            ">
                <section id="recents-section">
                    <article
                        id="banner-pieces"
                        class="
                            piece-surface
                            border-color-auto-06
                        "
                    >
                        <h1 class="s-40">Adaptável e fexível, como <span class="piece-surface text-color-auto-12" style="background:transparent;">Peças</span>!
                        </h1>
                        <p class="s-40">Stay connected with ease, share memories and have fun with our user-friendly
                            messaging app designed to simplify communication for everyone.</p>
                        <label for="nav-btn-1" class="piece-surface piece-button piece-extra-small background-color-auto-12 background-color-auto-11-hover text-color-auto-25">
                            <span class="piece-label">Conheça agora o Material Pieces</span>
                            <span class="piece-ripple"></span>
                        </label>
                    </article>
                    <article id="harpa" class="piece-surface background-color-088 border-color-auto-06">
                        <img id="harpa_app" src="src/img/harpa_app.png">
                        <img id="harpa_icon" src="src/img/harpa icon.png">
                        <h1>Harpa Cristã</h1>
                    </article>
                    <article id="card-button" class="piece-surface background-color-088 border-color-auto-06">
                        <header></header>
                        <main class="piece-surface bg-dot">
                            <button 
                                class="
                                    piece-small
                                    piece-button
                                    piece-surface
                                    background-color-auto-12
                                    background-color-auto-11-hover
                                    text-color-auto-00
                                "
                            >
                                <span class="material-symbols-rounded piece-icon" translate="no">download</span>
                                <span class="piece-label">Button</span>
                            </button>
                            <button 
                                class="
                                    piece-small
                                    piece-button
                                    piece-surface
                                    background-color-auto-12
                                    background-color-auto-11-hover
                                    text-color-auto-00
                                "
                            >
                                <span class="piece-label">Button</span>
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
                                <span class="material-symbols-rounded piece-icon" translate="no">download</span>
                                <span class="piece-label">Outlined</span>
                            </button>
                        </main>
                        <footer></footer>
                    </article>
                    <article class="piece-surface background-color-088 border-color-auto-06">
                        <label id="export-exel-jestor-completo" class="
                            piece-icon-button
                            piece-surface
                            piece-small
                            piece-narrow
                            piece-wide-active
                            background-color-096
                            text-color-004
                            border-color-056
                            ripple-color-100
                            background-color-092-hover
                        ">
                            <input type="checkbox">
                            <span class="material-symbols-rounded piece-icon" translate="no">download</span>
                        </label>
                        <label id="export-exel-jestor-completo" class="
                            piece-icon-button
                            piece-surface
                            piece-large
                            piece-narrow
                            background-color-096
                            text-color-004
                            border-color-056
                            ripple-color-100
                            background-color-092-hover
                        ">
                            <span class="material-symbols-rounded piece-icon" translate="no">download</span>
                        </label>
                    </article>
                    <article class="piece-surface background-color-088 border-color-auto-06"></article>
                    <article class="piece-surface background-color-088 border-color-auto-06"></article>
                    <article class="piece-surface background-color-088 border-color-auto-06"></article>
                    <article class="piece-surface background-color-088 border-color-auto-06"></article>
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