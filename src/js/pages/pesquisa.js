MPSO.newView({
    name: "Pesquisa",
    icon: "search",
    showInNavigation: true,

    main(params) {
        const id = params[0] ? parseInt(params[0], 10) : null
    
        const layoutHTML = `
            <section id="busca-lista">
                <header id="busca-header" class="piece-surface background-color-auto-06">
                    <input
                        id="busca-input"
                        type="text"
                        placeholder="Buscar letra..."
                        class="piece-input"
                    />
                </header>
                <main id="busca-resultados" class="piece-surface background-color-auto-02"></main>
            </section>
            <div class="piece-divider piece-surface background-color-auto-06"></div>
            <article id="busca-detalhe" class="piece-surface background-color-auto-02"></article>
        `
        const section = $(`#view-pesquisa`)
        section.innerHTML = layoutHTML
    
        // Se veio um id direto na URL, renderiza a letra selecionada
        if (id) MPSO.renderLetra("#busca-detalhe", id)
    
        // Escuta digitação para filtrar
        $("#busca-input").addEventListener("input", e => {
            const termo = e.target.value.trim().toLowerCase()
            if (termo) {
                this.renderizarResultados(termo)
            } else {
                $("#busca-resultados").innerHTML = "" // esconde lista quando input vazio
            }
        })
    },

    renderizarResultados(filtro = "") {
        const container = $("#busca-resultados")
        container.innerHTML = "" // limpa antes

        let letras = localStorage.getItem("letras-db")
        if (!letras) {
            container.innerHTML = "<p>Nenhuma letra encontrada no cache.</p>"
            return
        }

        try {
            letras = JSON.parse(letras)
        } catch (e) {
            console.error("Erro ao ler letras do localStorage:", e)
            container.innerHTML = "<p>Erro ao carregar letras.</p>"
            return
        }

        // Aplica filtro simples (nome ou cantor)
        const filtradas = letras.filter(letra =>
            letra.nome.toLowerCase().includes(filtro) ||
            letra.cantor.toLowerCase().includes(filtro)
        )

        if (filtradas.length === 0) {
            container.innerHTML = "<p>Nenhum resultado encontrado.</p>"
            return
        }

        filtradas.forEach((letra, i) => {
            const item = this.create(`
                <button
                    name="hino"
                    value="${i + 1}"
                    class="
                        card-list
                        piece-surface
                        background-color-auto-02
                        background-color-auto-03-hover
                        background-color-auto-088-active
                        background-color-auto-084-hover-active
                        background-color-secondary-active
                        text-color-secondary-active
                        ripple-color-inverse-02
                    ">
                    <span class="numero piece-surface background-color-auto-05 text-color-auto-20 piece-tertiary piece-s-40">${i + 1}</span>
                    <span class="nome">${letra.nome}</span>
                    <span class="cantor">${letra.cantor}</span>
                    <span class="piece-ripple"></span>
                </button>
            `)

            // Ao clicar → mostra a letra no aside de detalhe
            item[0].addEventListener("click", () => {
                MPSO.renderLetra("#busca-detalhe", i + 1)
            })

            container.append(...item)
        })
    }
})
