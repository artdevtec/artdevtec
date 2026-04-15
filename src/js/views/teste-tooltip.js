MPSO.newView({
    name: "Teste-Tooltip",
    icon: "tooltip",
    showInNavigation: false,

    main() {
        const section = $("#m-main section")
        section.className = "piece-surface background-color-auto-02"
        section.innerHTML = ""
        section.appendAll(MPSO.globalFns.create(this.template()))
    },

    template() {
        const btn = (label, tooltip) => `
            <div style="display:grid;place-items:center;">
                <button class="piece-button piece-small piece-surface piece-primary
                    background-color-auto-06 background-color-auto-07-hover
                    text-color-auto-18 ripple-color-auto-18">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">${label}</span>
                    <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">
                        ${tooltip}
                    </span>
                </button>
            </div>`

        return /*html*/`
        <div id="view-teste-tooltip-inner">

            <h2 style="font-size:20px;font-weight:800;margin-bottom:4px;">Teste — tooltips automáticos</h2>
            <p style="font-size:13px;opacity:.5;margin-bottom:32px;">
                O JS escolhe o lado com mais espaço disponível. Passe o mouse em cada botão.
            </p>

            <!-- ── Grade 3×3 cobrindo o viewport ────────────────── -->
            <div id="tt-grid">
                ${btn('Topo esquerda',   'Tooltip aqui')}
                ${btn('Topo centro',     'Tooltip aqui')}
                ${btn('Topo direita',    'Tooltip aqui')}

                ${btn('Meio esquerda',   'Tooltip aqui')}
                ${btn('Centro',          'Tooltip aqui')}
                ${btn('Meio direita',    'Tooltip aqui')}

                ${btn('Base esquerda',   'Tooltip aqui')}
                ${btn('Base centro',     'Tooltip aqui')}
                ${btn('Base direita',    'Tooltip aqui')}
            </div>

            <!-- ── Overflow hidden: tooltip deve escapar ────────── -->
            <div style="margin-top:48px;">
                <p style="font-size:13px;font-weight:600;margin-bottom:12px;">
                    Container com <code>overflow: hidden</code> — tooltip deve escapar:
                </p>
                <div style="overflow:hidden;border-radius:12px;padding:24px;
                    background:hsla(0,0%,50%,0.08);display:flex;gap:16px;flex-wrap:wrap;">
                    <button class="piece-button piece-small piece-surface piece-secondary
                        background-color-auto-11 background-color-auto-12-hover
                        text-color-auto-00 ripple-color-auto-00">
                        <span class="piece-ripple"></span>
                        <span class="piece-label">Salvar</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">
                            Salva as alterações
                        </span>
                    </button>
                    <button class="piece-button piece-small piece-surface piece-tertiary
                        background-color-auto-06 background-color-auto-07-hover
                        text-color-auto-18 ripple-color-auto-18">
                        <span class="piece-ripple"></span>
                        <span class="piece-label">Cancelar</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">
                            Descarta as alterações
                        </span>
                    </button>
                    <button class="piece-button piece-small piece-surface piece-primary
                        piece-border border-color-auto-06 piece-background-alpha-00
                        text-color-auto-18 ripple-color-auto-18">
                        <span class="piece-ripple"></span>
                        <span class="piece-label">Exportar</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">
                            Exporta como PDF
                        </span>
                    </button>
                </div>
            </div>

            <!-- ── Icon buttons com tooltip ──────────────────────── -->
            <div style="margin-top:48px;">
                <p style="font-size:13px;font-weight:600;margin-bottom:12px;">Icon buttons:</p>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button class="piece-icon-button piece-small piece-surface piece-s-40 piece-primary
                        background-color-auto-04 background-color-auto-05-hover text-color-auto-18">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">Editar</span>
                    </button>
                    <button class="piece-icon-button piece-small piece-surface piece-s-40 piece-secondary
                        background-color-auto-04 background-color-auto-05-hover text-color-auto-18">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">delete</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">Excluir</span>
                    </button>
                    <button class="piece-icon-button piece-small piece-surface piece-s-40 piece-tertiary
                        background-color-auto-04 background-color-auto-05-hover text-color-auto-18">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">share</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">Compartilhar</span>
                    </button>
                    <button class="piece-icon-button piece-small piece-surface piece-s-40 piece-primary
                        background-color-auto-04 background-color-auto-05-hover text-color-auto-18">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">download</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">Baixar arquivo</span>
                    </button>
                    <button class="piece-icon-button piece-small piece-surface piece-s-40 piece-secondary
                        background-color-auto-04 background-color-auto-05-hover text-color-auto-18">
                        <span class="piece-ripple"></span>
                        <span class="material-symbols-rounded piece-icon" translate="no">settings</span>
                        <span class="piece-tooltip piece-surface background-color-auto-20 text-color-auto-00">Configurações</span>
                    </button>
                </div>
            </div>

        </div>
        `
    }
})
