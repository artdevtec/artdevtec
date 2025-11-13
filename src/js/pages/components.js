MPSO.newView({
    name: "Components",
    icon: "widgets",
    showInNavigation: true,

    // Agora é um ARRAY de componentes
    components: [],

    main(params) {
        const viewId = `view-${this.normalize(this.name)}`;
        const view = $(`#${viewId}`);

        if (!view.$("aside") || !view.$(`#${this.normalize(this.name)}-details`)) {
            view.innerHTML = `
                <aside id="${this.normalize(this.name)}-list" class="piece-surface background-color-auto-06"></aside>
                <div class="piece-divider piece-surface background-color-auto-06"></div>
                <div id="${this.normalize(this.name)}-details" class="piece-surface background-color-auto-02"></div>
            `;

            // Renderiza todos os componentes registrados (via push)
            this.components.forEach((component) => {
                const html = component.card();
                const wrapper = document.createElement("div");
                wrapper.innerHTML = html.trim();

                const item = wrapper.firstElementChild;
                item.addEventListener("click", () => {
                    MPSO.lastClicked = item;
                    location.hash = `#${this.normalize(this.name)}/${component.name}`;
                });

                view.$("aside").append(item);
            });
        }

        // Se tem parâmetro → abre componente
        if (params.length) {
            this.abrirComponente(params[0]);
        } else {
            this.fecharComponente();
        }
    },

    abrirComponente(nome) {
        const container = $(`#${this.normalize(this.name)}-details`);

        const component = this.components.find((c) => c.name === nome);

        if (component) {
            container.classList.add("open");
            container.innerHTML = component.page();
            $(`#m-header h2`).innerHTML = `${this.name} > ${nome}`;
            $(`#m-aside h2`).innerHTML = `${this.name} > ${nome}`;

            // Executa o init() se existir
            if (typeof component.init === "function") {
                component.init();
            }
        } else {
            container.classList.remove("open");
            container.innerHTML = `<p>Componente "${nome}" não encontrado</p>`;
        }
    },

    fecharComponente() {
        const container = $(`#${this.normalize(this.name)}-details`);
        container.classList.remove("open");
        container.innerHTML = "";
    }
});


// =============================================================
// 🔹 EXEMPLOS DE COMPONENTES (agora usando push)
// =============================================================
MPSO.views.find(v => v.name === "Components").components.push({
    name: "button",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="button"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Button</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot">
                        <button class="
                            piece-button
                            piece-extra-large
                            piece-surface
                            piece-s-40
                            background-color-auto-11
                            background-color-auto-12-hover
                            text-color-auto-00
                            ripple-color-auto-00
                            piece-tertiary
                        ">
                            <span class="piece-ripple"></span>
                            <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                            <span class="piece-label">Button</span>
                        </button>
                    </div>
                    <p>Os botões são responsáveis pela maior parte das ações em uma interface de usuário.</p>
                </main>
                <footer></footer>
                <span class="piece-ripple"></span>
            </div>
        `;
    },
    page() {

        // Geração dinâmica dos botões de tamanho
        const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large'];
        const sizeButtons = sizes.map(size => `
            <label class="
                piece-button
                piece-small
                piece-surface
                piece-s-40
                background-color-auto-06
                background-color-auto-07-hover
                background-color-auto-11-active
                background-color-auto-12-hover-active
                text-color-auto-19
                text-color-auto-00-active
                ripple-color-auto-00
            ">
                <span class="piece-ripple"></span>
                <span class="piece-label">${size}</span>
                <input
                    type="radio"
                    name="btn-size"
                    value="${size}"
                    class="piece-controller"
                    ${size === 'small' ? 'checked' : ''}
                >
            </label>
        `).join('');

        const sizesHTML = `
            <div id="sizes">
                <div class="piece-surface piece-group-button">
                    ${sizeButtons}
                </div>
            </div>
        `;

        // Geração dinâmica dos botões de tamanho
        const colors = ['primary', 'secondary', 'tertiary',];
        const colorButtons = colors.map(color => `
            <label class="
                piece-button
                piece-small
                piece-surface
                piece-s-40
                background-color-auto-06
                background-color-auto-07-hover
                background-color-auto-11-active
                background-color-auto-12-hover-active
                text-color-auto-19
                text-color-auto-00-active
                ripple-color-auto-00
            ">
                <span class="piece-ripple"></span>
                <span class="piece-label">${color}</span>
                <input
                    type="radio"
                    name="btn-color"
                    value="${color}"
                    class="piece-controller"
                    ${color === 'tertiary' ? 'checked' : ''}
                >
            </label>
        `).join('');
        
        const colorsHTML = `
            <div id="sizes">
                <div class="piece-surface piece-group-button">
                    ${colorButtons}
                </div>
            </div>
        `;

        // Geração dinâmica dos botões de tamanho
        const tipos = ['filled', 'outlined', 'elevated', 'text'];
        const tipoButtons = tipos.map(tipo => `
            <label class="
                piece-button
                piece-small
                piece-surface
                piece-s-40
                background-color-auto-06
                background-color-auto-07-hover
                background-color-auto-11-active
                background-color-auto-12-hover-active
                text-color-auto-19
                text-color-auto-00-active
                ripple-color-auto-00
            ">
                <span class="piece-ripple"></span>
                <span class="piece-label">${tipo}</span>
                <input
                    type="radio"
                    name="btn-tipo"
                    value="${tipo}"
                    class="piece-controller"
                    ${tipo === 'filled' ? 'checked' : ''}
                >
            </label>
        `).join('');
        
        const tiposHTML = `
            <div id="sizes">
                <div class="piece-surface piece-group-button">
                    ${tipoButtons}
                </div>
            </div>
        `;

        // Retorna a página
        return `
            <style>
                #teste {
                    display: grid;
                    gap: 16px;
                    align-content: start;
                }
                #component {
                    border-style: solid;
                    border-width: 1px;
                    border-radius: 4px;
                    padding: 16px;
                    display: grid;
                    place-items: center;
                    height: 170px;
                }
                #styles {
                    display: grid;
                    gap: 4px;
                    align-content: start;
                }
                #styles .prop {
                    border-style: solid;
                    border-width: 1px;
                    border-radius: 100px;
                    display: grid;
                    grid-auto-flow: column;
                    gap: 4px;
                    padding: 4px 12px 4px 4px;
                    place-self: start;
                    place-items: center;
                }
                #styles .color {
                    width: 24px;
                    height: 24px;
                    border-radius: 24px;
                    display: grid;
                    place-items: center;
                }
                #sizes {
                    overflow-x: scroll;
                    margin-inline: -16px;
                    padding-inline: 16px;
                }

                

                #tgg-mm {
                    border-radius: 40px;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    padding:16px;
                    gap: 4px;
                    cursor: var(--cursor-pointer);
                    & *:active {pointer-events: none;}
                    & .label {
                        display: grid;
                        place-content: center start;
                        padding: 0 16px;
                        font-weight: 500;
                    }
                    & input {display: none;}
                    .active-indicator {
                        border-radius: 40px;
                        position: absolute;
                        width: calc(50% - 8px);
                        height: calc(100% - 8px);
                        top: 4px;
                        left: 4px;
                        transition: left .3s;
                        z-index: 1;
                    }
                    &:has(input:checked) {
                        .active-indicator {
                            left: calc(50% + 4px);
                        }
                    }
                }
                
            
            </style>

            <div id="teste">
                <div class="title piece-surface background-color-auto-04 text-color-auto-21" style="
                    border-radius: calc(191px / 6);
                    display: grid;
                    justify-content: start;
                    padding: 16px;
                ">
                    <span style="
                        font-size: 64px;
                        font-weight: 900;
                    ">Buttons</span>
                    <p>Os botões são responsáveis pela maior parte das ações em uma interface de usuário.</p>
                </div>

                <div
                    id="component"
                    class="
                        piece-surface
                        border-color-auto-06
                        bg-dot
                    "
                >
                    <button
                        id="btn-model"
                        class="
                            piece-button
                            piece-small
                            piece-surface
                            piece-s-40
                            background-color-auto-11
                            background-color-auto-12-hover
                            text-color-auto-00
                            ripple-color-auto-00
                            piece-tertiary
                        "
                    >
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                        <span class="piece-label">Button</span>
                    </button>
                </div>

                <p>Tamanhos</p>

                ${sizesHTML}

                <p>Colors</p>
                
                ${colorsHTML}

                <p>Tipos</p>
                
                ${tiposHTML}

                <p>Icon</p>

                <label id="tgg-mm" class="
                    piece-surface
                    background-color-auto-04
                    background-color-auto-05-hover
                    piece-s-40
                ">
                <span class="label">Icon</span>
                <div class="
                            piece-switch
                            piece-surface

                            background-color-auto-04
                            background-color-auto-05-hover

                            background-color-auto-11-active
                            background-color-auto-12-active-hover


                            border-color-auto-08
                            border-color-auto-11-active
                            
                            ripple-to-fg
                            ripple-to-accent-active
                        ">
                            
                            <input type="checkbox" class="piece-controller" name="switch" value="switch">
                            <span class="
                                piece-indicator
                                piece-surface
                                piece-parent
                                background-color-auto-12
                                background-color-auto-00-active
                            "></span>
                        </div>
                    <span class="piece-ripple"></span>
                </label>

                <div id="styles">
                    <div class="prop piece-surface border-color-auto-06">
                        <span class="color piece-surface background-color-auto-11 text-color-auto-00 piece-tertiary piece-s-40"></span>
                        <span class="Label">piece-tertiary</span>
                    </div>
                    <div class="prop piece-surface border-color-auto-06">
                        <span class="color piece-surface background-color-auto-11 text-color-auto-00 piece-tertiary piece-s-40">11</span>
                        <span class="Label">background-color-auto-00</span>
                    </div>
                    <div class="prop piece-surface border-color-auto-06">
                        <span class="color piece-surface background-color-auto-12 text-color-auto-00 piece-tertiary piece-s-40">12</span>
                        <span class="Label">background-color-auto-00-hover</span>
                    </div>
                    <div class="prop piece-surface border-color-auto-06">
                        <span class="color piece-surface background-color-auto-00 text-color-auto-25">00</span>
                        <span class="Label">text-color-auto-00</span>
                    </div>
                    <div class="prop piece-surface border-color-auto-06">
                        <span class="color piece-surface background-color-auto-00 text-color-auto-25">00</span>
                        <span class="Label">ripple-color-auto-00</span>
                    </div>
                </div>
            </div>
        `;
    },
    init() {



        // Seleciona todos os radios e o botão modelo
        const radios = $$('input[name="btn-size"]');
        const target = $('#btn-model');
    
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                // Remove todas as classes de tamanho com base nos values dos radios
                target.classList.remove(...[...radios].map(r => `piece-${r.value}`));
    
                // Adiciona a classe do tamanho selecionado
                target.classList.add(`piece-${radio.value}`);
            });
        });



        // Seleciona todos os radios e o botão modelo
        const radios2 = $$('input[name="btn-color"]');
    
        radios2.forEach(radio => {
            radio.addEventListener('change', () => {
                // Remove todas as classes de tamanho com base nos values dos radios
                target.classList.remove(...[...radios2].map(r => `piece-${r.value}`));
    
                // Adiciona a classe do tamanho selecionado
                target.classList.add(`piece-${radio.value}`);
            });
        });

        const radios3 = $$('input[name="btn-tipo"]')
        radios3.forEach(radio => {
            radio.addEventListener('change', () => {
                if(radio.value == "filled") {
                    target.className = `
                        piece-button
                        piece-surface
                        piece-s-40
                        background-color-auto-11
                        background-color-auto-12-hover
                        text-color-auto-00
                        ripple-color-auto-00
                        piece-${$('input[name="btn-size"]:checked').value}
                        piece-${$('input[name="btn-color"]:checked').value}
                    `
                }
                if(radio.value == "outlined") {
                    target.className = `
                        piece-button
                        piece-outlined
                        border-color-auto-10
                        piece-surface
                        piece-s-40
                        background-color-auto-02
                        background-color-auto-03-hover
                        text-color-auto-23
                        ripple-color-auto-23
                        piece-${$('input[name="btn-size"]:checked').value}
                        piece-${$('input[name="btn-color"]:checked').value}
                    `
                }
                if(radio.value == "elevated") {
                    target.className = `
                        piece-button
                        piece-elevated
                        box-shadow-color-auto-15
                        piece-surface
                        piece-s-40
                        background-color-auto-02
                        background-color-auto-03-hover
                        text-color-auto-23
                        ripple-color-auto-23
                        piece-${$('input[name="btn-size"]:checked').value}
                        piece-${$('input[name="btn-color"]:checked').value}
                    `
                }
                if(radio.value == "text") {
                    target.className = `
                        piece-button
                        piece-text
                        piece-surface
                        piece-s-40
                        text-color-auto-11
                        ripple-color-auto-11
                        piece-${$('input[name="btn-size"]:checked').value}
                        piece-${$('input[name="btn-color"]:checked').value}
                    `
                }
            })
        })

    }
    
});



// =============================================================
// 🔹 EXEMPLO DE OUTRO COMPONENTE (Switches)
// =============================================================

MPSO.views.find(v => v.name === "Components").components.push({
    name: "switches",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Switches</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot">
                        <label class="
                            piece-switch
                            piece-surface
                            background-color-auto-00
                            background-color-auto-02-hover
                            background-color-auto-12-active
                            background-color-auto-14-active-hover
                            border-color-auto-04
                            border-color-auto-10-active
                            ripple-to-fg
                            ripple-to-accent-active
                        ">
                            <span class="piece-ripple"></span>
                            <input type="checkbox" class="piece-controller" name="switch" value="switch">
                            <span class="
                                piece-indicator
                                piece-surface
                                piece-parent
                                background-color-auto-12
                                background-color-auto-00-active
                            "></span>
                        </label>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});
MPSO.views.find(v => v.name === "Components").components.push({
    name: "Checkbox",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Checkbox</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot" style="display:grid; grid-auto-flow: column; gap: 16px; place-content: center;">
                        <label id="icon-button-presentation" class="
                            piece-checkbox
                            piece-medium
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                        ">
                            <span class="material-symbols-rounded piece-icon piece-true" translate="no">check_box</span>
                            <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
                            <input type="checkbox" class="piece-controller" name="checkbox" checked>
                        </label>
                            <label id="icon-button-presentation" class="
                                piece-checkbox
                                piece-medium
                                piece-surface
                                background-color-auto-04
                                background-color-auto-05-hover
                                text-color-auto-20
                            ">
                            <span class="material-symbols-rounded piece-icon piece-true" translate="no">check_box</span>
                            <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
                            <input type="checkbox" class="piece-controller" name="checkbox" checked>
                        </label>
                            <label id="icon-button-presentation" class="
                                piece-checkbox
                                piece-medium
                                piece-surface
                                background-color-auto-04
                                background-color-auto-05-hover
                                text-color-auto-20
                            ">
                            <span class="material-symbols-rounded piece-icon piece-true" translate="no">check_box</span>
                            <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
                            <input type="checkbox" class="piece-controller" name="checkbox">
                        </label>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});
MPSO.views.find(v => v.name === "Components").components.push({
    name: "Radio",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Radio</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot" style="display:grid; grid-auto-flow: column; gap: 16px; place-content: center;">
                    <label class="
                            piece-radio
                            piece-medium
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                        ">
                        <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
                        <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
                        <input type="radio" class="piece-controller" name="radio">
                    </label>
                    <label class="
                            piece-radio
                            piece-medium
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                        ">
                        <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
                        <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
                        <input type="radio" class="piece-controller" name="radio" checked>
                    </label>
                    <label class="
                            piece-radio
                            piece-medium
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                        ">
                        <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
                        <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
                        <input type="radio" class="piece-controller" name="radio">
                    </label>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});
MPSO.views.find(v => v.name === "Components").components.push({
    name: "Icon Button",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Icon Button</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot" style="display:grid; grid-auto-flow: column; gap: 16px; place-content: center;">
                        <button
                            class="
                                piece-icon-button
                                piece-medium
                                piece-narrow
                                piece-surface
                                background-color-auto-04
                                background-color-auto-05-hover
                                text-color-auto-20
                            "
                        >
                            <span class="material-symbols-rounded piece-icon" translate="no">skip_previous</span>
                        </button>
                        <button
                            class="
                                piece-icon-button
                                piece-extra-large
                                piece-narrow
                                piece-surface
                                background-color-auto-04
                                background-color-auto-05-hover
                                text-color-auto-20
                            "
                        >
                            <span class="material-symbols-rounded piece-icon" translate="no">play_arrow</span>
                        </button>
                        <button
                            class="
                                piece-icon-button
                                piece-medium
                                piece-narrow
                                piece-surface
                                background-color-auto-04
                                background-color-auto-05-hover
                                text-color-auto-20
                            "
                        >
                            <span class="material-symbols-rounded piece-icon" translate="no">skip_next</span>
                        </button>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});
MPSO.views.find(v => v.name === "Components").components.push({
    name: "tooltip",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Tooltip</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot" style="height: 200px; display:grid; grid-auto-flow: column; gap: 16px; place-content: center;">
                        <button class="
                            piece-icon-button
                            piece-large
                            piece-wide
                            piece-surface
                            background-color-auto-04
                            background-color-auto-05-hover
                            text-color-auto-20
                        ">
                        <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 top left piece-visible">top left</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 top piece-visible">top</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 top right piece-visible">top right</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 left piece-visible">left</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 right piece-visible">right</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 bottom left piece-visible">bottom left</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 bottom piece-visible">bottom</span>
                        <span class="piece-tooltip piece-surface background-color-inverse-02 text-color-inverse-25 bottom right piece-visible">bottom right</span>
                    </button>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});
MPSO.views.find(v => v.name === "Components").components.push({
    name: "snackbar",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Snackbar</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot" style="height: 150px; display:grid; grid-auto-flow: column; gap: 16px; place-content: center;">
                        <div style="position: relative; top: 0; left:0;" class="
                            piece-snackbar
                            piece-surface
                            background-color-inverse-02
                            text-color-inverse-22
                        ">
                            <span class="material-symbols-rounded piece-icon" translate="no">info</span>
                            <span class="piece-label">Texto copiado com sucesso!</span>
                        </div>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});
MPSO.views.find(v => v.name === "Components").components.push({
    name: "split button",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Split Button</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot" style="height: 150px; display:grid; grid-auto-flow: column; gap: 16px; place-content: center;">
                        <div class="
                    piece-split-button
                    piece-extra-small
                    piece-interactive
                ">
                <button class="
                        piece-not-interactive
                        piece-leading-button
                        piece-surface
                        background-color-auto-20
                        background-color-auto-21-hover
                        text-color-auto-00
                    ">
                    <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                    <span class="piece-label">Label</span>
                </button>
                <button class="
                        piece-trailing-button
                        piece-surface
                        background-color-auto-20
                        background-color-auto-21-hover
                        text-color-auto-00
                    ">
                    <span class="material-symbols-rounded piece-icon" translate="no">keyboard_arrow_down</span>
                </button>
                <ul class="
                        piece-surface
                        background-color-auto-00
                        text-color-auto-22
                    ">
                    <li>primeiro</li>
                    <li>segundo</li>
                    <li>terceiro</li>
                </ul>
            </div>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});
MPSO.views.find(v => v.name === "Components").components.push({
    name: "split button",
    card() {
        return `
            <div 
                class="card-list piece-surface background-color-auto-02"
                data-id="switches"
            >
                <header>
                    <img src="favicon.ico">
                    <span class="piece-label">Split Button</span>
                </header>
                <main>
                    <div class="piece-surface bg-dot" style="height: 230px; display:grid; grid-auto-flow: column; gap: 16px; place-content: center;">
                        <div class="piece-FAB-menu piece-interactive piece-surface">
                            <div>
                                <button class="menu-item piece-surface background-color-auto-04">
                                    <span class="material-symbols-rounded piece-icon" translate="no">table</span>
                                    <span class="piece-label">Excel</span>
                                </button>
                                <button class="menu-item piece-surface background-color-auto-04">
                                    <span class="material-symbols-rounded piece-icon" translate="no">print</span>
                                    <span class="piece-label">Imprimir</span>
                                </button>
                            </div>
                            <button class="
                                piece-toggle-button
                                piece-surface
                                piece-parent
                                background-color-auto-04
                                background-color-auto-05-hover
                                background-color-auto-12-active
                                background-color-auto-13-hover-active
                                text-color-auto-20
                                text-color-auto-00-active
                            ">
                                <span class="material-symbols-rounded piece-icon piece-false" translate="no">close</span>
                                <span class="material-symbols-rounded piece-icon piece-true" translate="no">save</span>
                            </button>
                        </div>
                    </div>
                    <p>Os switches permitem alternar estados binários.</p>
                </main>
            </div>
        `;
    },
    page() {
        return `
            <div class="piece-surface background-color-auto-03 p-4 rounded-xl">
                <p>Este é o conteúdo completo do componente Switch.</p>
            </div>
        `;
    },
    init() {
        console.log("✅ Switches component initialized!");
    }
});


