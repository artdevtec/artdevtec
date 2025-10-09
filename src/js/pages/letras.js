MPSO.newView({
    name: "Letras",
    icon: "genres",
    showInNavigation: true,

    // utilitário para pegar dados de uma letra pelo número
    getLetraById(id) {
        let letras = localStorage.getItem("letras-db");
        if (!letras) return null;

        try {
            letras = JSON.parse(letras);
        } catch (e) {
            alert("Erro ao ler letras do localStorage:", e);
            return null;
        }

        return letras.find(f => f.numero == id) || null;
    },

    main(params){
        const viewId = `view-${this.normalize(this.name)}`;
        let view = $(`#${viewId}`);

        let aside = view.$("aside");
        let detalhe = view.$("#letras-detalhe");

        if(!aside || !detalhe){
            view.innerHTML = `
                <aside id="letras-menu" class="piece-surface background-color-auto-06"></aside>
                <div id="letras-detalhe"></div>
            `;
            
            let letras = localStorage.getItem("letras-db");
            if (!letras) {
                container.innerHTML = "<p>Nenhuma letra encontrada no cache.</p>";
                return;
            }
    
            try {
                letras = JSON.parse(letras);
            } catch (e) {
                console.error("Erro ao ler letras do localStorage:", e);
                container.innerHTML = "<p>Erro ao carregar letras.</p>";
                return;
            }
    
            letras.forEach((letra) => {
                const item = this.create(`
                    <button
                        name="hino"
                        value="${letra.numero}"
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
                        <span class="numero piece-surface background-color-auto-05 text-color-auto-20 piece-tertiary piece-s-40">${letra.numero}</span>
                        <div>
                            <p class="nome">${letra.nome}</p>
                            <p class="cantor">${letra.cantor}</p>
                        </div>
                        <span class="piece-ripple"></span>
                    </button>
                `);
    
                // Ao clicar → atualiza o hash com o id
                item[0].addEventListener("click", (e) => {
                    MPSO.lastClicked = e.currentTarget;
                    location.hash = `#letras/${letra.numero}`;
                });                
    
                view.$("aside").append(...item);
            });

            aside = view.$("aside");
            detalhe = view.$("#letras-detalhe");
        }

        if(params.length){
            const btn = view.$(`button[value="${params[0]}"]`);
            if (btn) {
                MPSO.lastClicked = btn;
        
                const rect = btn.getBoundingClientRect();
                const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
                if (!isVisible) {
                    btn.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            }
        
            this.abrirLetra(params[0]);
        } else {
            this.fecharLetra();
        }     
    },

    abrirLetra(id){
        const container = $("#letras-detalhe");

        const letraObj = this.getLetraById(id);
        if (!letraObj) {
            container.innerHTML = "<p>Hino não encontrado.</p>";
            return;
        }

        const { nome, cantor, numero } = letraObj;

        container.innerHTML = `
            <div class="detalhe-content piece-surface background-color-auto-06">
                <header class="piece-surface background-color-auto-02">
                    <span class="numero piece-surface background-color-auto-10 text-color-auto-00 piece-s-40 piece-tertiary">${numero}</span>
                    <div>
                        <p class="nome">${nome}</p>
                        <p class="cantor">${cantor}</p>
                    </div>
                    <button id="fechar" class="show piece-s-40 piece-icon-button piece-small piece-surface background-color-auto-06 text-color-auto-19 background-color-auto-07-hover piece-secondary">
                        <span class="material-symbols-rounded piece-icon" translate="no">close</span>
                    </button>
                </header>
                <main class="piece-surface background-color-auto-02"></main>
                <footer class="piece-surface background-color-auto-02"></footer>
                <button id="scroll-top-page" style="position: fixed; bottom: 16px; right: 16px; z-index: 10;" class="piece-FAB piece-surface background-color-auto-11 text-color-auto-00 piece-s-40">
                    <span class="material-symbols-rounded piece-icon" translate="no">arrow_upward</span>
                    <span class="piece-ripple"></span>
                </button>
            </div>
        `;

        // gera conteúdo da letra
        this.gerar(id);

        const detalhe = container.$(".detalhe-content");

        let rect = MPSO.lastClicked
            ? MPSO.lastClicked.getBoundingClientRect()
            : { top: window.innerHeight/2, left: window.innerWidth/2, width: 100, height: 100 };

        Object.assign(detalhe.style, {
            top: rect.top + "px",
            left: rect.left + "px",
            width: rect.width + "px",
            height: rect.height + "px",
            position: "absolute"
        });

        requestAnimationFrame(() => {
            Object.assign(detalhe.style, {
                top: "0px",
                left: "0px",
                width: window.innerWidth + "px",
                height: window.innerHeight + "px"
            });
        });

        detalhe.$("#fechar").addEventListener("click", () => {
            detalhe.$("#fechar").classList.add('hide');
            this.fecharLetra();
        });
    },

    fecharLetra() {
        const detalhe = $("#letras-detalhe .detalhe-content");
        if(!detalhe) return;

        ($(".detalhe-content").style.scrollBehavior="auto", $(".detalhe-content").scrollTop=0)

        let rect = MPSO.lastClicked
            ? MPSO.lastClicked.getBoundingClientRect()
            : { top: window.innerHeight, left: window.innerWidth, width: 0, height: 0 };

        Object.assign(detalhe.style, {
            top: rect.top + "px",
            left: rect.left + "px",
            width: rect.width + "px",
            height: rect.height + "px"
        });

        setTimeout(() => {
            $("#letras-detalhe").innerHTML = "";
            if (location.hash !== "#letras") {
                location.hash = "#letras";
            }
        }, 400);
    },

    normalizarMarcador(m) {
        return m
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase();
    },

    gerar(numero_do_hino) {
        const letraObj = this.getLetraById(numero_do_hino);
        if (!letraObj) return console.error("Hino não encontrado no localStorage");

        const { letra } = letraObj;

        const container = $("#letras-detalhe main");
        container.innerHTML = "";

        const blocos = letra.trim().split(/\n\s*\n/);

        blocos.forEach((bloco, i) => {
            const div = document.createElement("div");
            div.className = "bloco";

            const header = document.createElement("header");
            header.classList = "piece-surface background-color-auto-02";
            header.innerHTML = `<span class="marcador-numero piece-surface background-color-auto-11 text-color-auto-00">${i + 1}</span>`;

            const marcadoresSet = new Set();
            const marcadores = [...bloco.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);

            marcadores.forEach(m => {
                const norm = this.normalizarMarcador(m);
                if (!marcadoresSet.has(norm)) {
                    const span = document.createElement("span");
                    span.textContent = m;
                    span.classList = `
                        marcador-${norm}
                        ${norm.length === 1 ? "marcador-aspect-radio-1-1" : ""}
                        piece-surface
                        background-color-auto-04
                        background-color-auto-06-active
                        piece-40
                    `;
                    header.appendChild(span);
                    marcadoresSet.add(norm);
                }
            });

            const mainBloco = document.createElement("main");
            const marcadorPrincipal = marcadores.length > 0 ? marcadores[0] : null;

            bloco.split("\n").forEach(linha => {
                if (linha.trim()) {
                    const marcadoresLinha = [...linha.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
                    let linhaLimpa = linha.replace(/\[([^\]]+)\]/g, "").trim();

                    if (linhaLimpa) {
                        const label = document.createElement("label");
                        label.classList = "piece-surface background-color-auto-04 background-color-auto-06-active piece-40";
                        label.innerHTML = `
                            <span>${linhaLimpa}</span>
                            <input class="piece-controller" type="radio" name="letra-refrão">
                        `;

                        if (marcadoresLinha.length > 0) {
                            marcadoresLinha.forEach(m => label.classList.add("marcador-" + this.normalizarMarcador(m)));
                        } else if (marcadorPrincipal) {
                            label.classList.add("marcador-" + this.normalizarMarcador(marcadorPrincipal));
                        }

                        mainBloco.appendChild(label);
                    }
                }
            });

            div.appendChild(header);
            div.appendChild(mainBloco);
            container.appendChild(div);
        });
    }
});
