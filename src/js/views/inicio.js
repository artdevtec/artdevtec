MPSO.newView({
    name: "Início",
    icon: "home",
    showInNavigation: true,

    main() {
        const section = $("#m-main section")
        section.className = "piece-surface background-color-auto-02"
        section.innerHTML = ""
        section.appendAll(MPSO.globalFns.create(this.template()))
    },

    template() {
        return /*html*/`

            <!-- ── HERO ─────────────────────────────────────────── -->
            <div id="inicio-hero">
                <div id="inicio-hero-inner">
                    <span class="inicio-eyebrow piece-surface piece-primary piece-s-40 background-color-auto-02 piece-border border-color-auto-06 text-color-auto-18">
                        <span class="material-symbols-rounded" style="font-size:14px;" translate="no">auto_awesome</span>
                        Design System
                    </span>
                    <h1 class="text-color-auto-21">Pieces</h1>
                    <p class="text-color-auto-16">
                        Uma biblioteca de componentes baseada em Material Design 3,
                        construída inteiramente com CSS puro, variáveis HSL e JavaScript
                        vanilla — sem frameworks, sem build step.
                    </p>
                    <div class="inicio-hero-actions">
                        <button onclick="location.hash='componentes'"
                            class="piece-button piece-medium piece-surface piece-s-40
                                   background-color-auto-11 background-color-auto-12-hover
                                   text-color-auto-00 ripple-color-auto-00 piece-primary">
                            <span class="piece-ripple"></span>
                            <span class="material-symbols-rounded piece-icon" translate="no">widgets</span>
                            <span class="piece-label">Ver Componentes</span>
                        </button>
                        <button onclick="location.hash='surface'"
                            class="piece-button piece-medium piece-surface piece-s-40
                                   background-color-auto-04 background-color-auto-05-hover
                                   text-color-auto-18 ripple-color-auto-00 piece-secondary piece-outlined">
                            <span class="piece-ripple"></span>
                            <span class="material-symbols-rounded piece-icon" translate="no">layers</span>
                            <span class="piece-label">Sistema de Cores</span>
                        </button>
                    </div>
                </div>

                <!-- Preview ao vivo -->
                <div id="inicio-preview-live" class="piece-surface piece-border border-color-auto-06">
                    <div class="preview-group">
                        <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary"><span class="piece-ripple"></span><span class="material-symbols-rounded piece-icon" translate="no">add</span><span class="piece-label">Primary</span></button>
                        <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-secondary"><span class="piece-ripple"></span><span class="piece-label">Secondary</span></button>
                        <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-04 background-color-auto-05-hover text-color-auto-18 ripple-color-auto-00 piece-primary piece-outlined"><span class="piece-ripple"></span><span class="piece-label">Outlined</span></button>
                    </div>
                    <div class="preview-group">
                        <label style="cursor:pointer">
                            <div class="piece-switch piece-surface piece-s-40 background-color-auto-04 background-color-auto-11-active border-color-auto-08 border-color-auto-11-active piece-primary">
                                <input type="checkbox" checked>
                                <span class="piece-indicator piece-surface piece-parent background-color-auto-12 background-color-auto-00-active"></span>
                            </div>
                        </label>
                        <label style="cursor:pointer;display:flex;gap:8px;align-items:center;">
                            <div class="piece-checkbox piece-surface piece-s-40 background-color-auto-04 background-color-auto-11-active border-color-auto-08 border-color-auto-11-active">
                                <input type="checkbox" class="piece-controller" checked>
                                <span class="piece-indicator piece-surface piece-parent background-color-auto-04 background-color-auto-00-active"><span class="material-symbols-rounded piece-icon" translate="no">check</span></span>
                                <span class="piece-ripple"></span>
                            </div>
                        </label>
                        <label style="cursor:pointer;display:flex;gap:8px;align-items:center;">
                            <div class="piece-radio piece-surface piece-s-40 background-color-auto-04 background-color-auto-11-active border-color-auto-08 border-color-auto-11-active">
                                <input type="radio" class="piece-controller" checked>
                                <span class="piece-indicator piece-surface piece-parent background-color-auto-04 background-color-auto-00-active"></span>
                                <span class="piece-ripple"></span>
                            </div>
                        </label>
                    </div>
                    <div class="preview-group">
                        <div class="piece-progress-indicator piece-bar piece-active piece-surface background-color-auto-06" style="width:100%;--piece-percentage:65%;">
                            <div class="piece-indicator piece-surface piece-primary piece-s-40 background-color-auto-11"></div>
                        </div>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <div class="piece-progress-indicator piece-circle piece-active piece-surface piece-primary piece-s-40 background-color-auto-11" style="--piece-percentage:75%;width:40px;height:40px;"><div class="piece-indicator"></div></div>
                            <div class="piece-progress-indicator piece-circle piece-active piece-surface piece-secondary piece-s-40 background-color-auto-11" style="--piece-percentage:45%;width:40px;height:40px;"><div class="piece-indicator"></div></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── PILARES ───────────────────────────────────────── -->
            <div id="inicio-pillars">
                <div class="pillar-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <div class="pillar-icon piece-surface piece-primary piece-s-40 background-color-auto-11 text-color-auto-00">
                        <span class="material-symbols-rounded" translate="no">palette</span>
                    </div>
                    <h3 class="text-color-auto-21">HSL Dinâmico</h3>
                    <p>Um único valor de matiz gera toda a paleta — primário, secundário e terciário — automaticamente via CSS puro.</p>
                </div>
                <div class="pillar-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <div class="pillar-icon piece-surface piece-secondary piece-s-40 background-color-auto-11 text-color-auto-00">
                        <span class="material-symbols-rounded" translate="no">dark_mode</span>
                    </div>
                    <h3 class="text-color-auto-21">Dark / Light</h3>
                    <p>Troca de tema com uma classe no body — nenhum elemento filho precisa ser modificado.</p>
                </div>
                <div class="pillar-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <div class="pillar-icon piece-surface piece-tertiary piece-s-40 background-color-auto-11 text-color-auto-00">
                        <span class="material-symbols-rounded" translate="no">widgets</span>
                    </div>
                    <h3 class="text-color-auto-21">Componentes</h3>
                    <p>23 componentes interativos com todas as variantes de tamanho, cor e estado — sem framework.</p>
                </div>
                <div class="pillar-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <div class="pillar-icon piece-surface piece-s-40 background-color-auto-11 text-color-auto-00">
                        <span class="material-symbols-rounded" translate="no">water_drop</span>
                    </div>
                    <h3 class="text-color-auto-21">Ripple</h3>
                    <p>Efeito granulado de onda ao clicar, calculado dinamicamente a partir da cor de tema.</p>
                </div>
            </div>

            <!-- ── STATS ─────────────────────────────────────────── -->
            <div id="inicio-stats">
                <div class="stat-item piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <span class="stat-value text-color-auto-21 piece-primary">23</span>
                    <span class="stat-label">Componentes</span>
                </div>
                <div class="stat-item piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <span class="stat-value text-color-auto-21 piece-secondary">5</span>
                    <span class="stat-label">Tamanhos</span>
                </div>
                <div class="stat-item piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <span class="stat-value text-color-auto-21 piece-tertiary">3</span>
                    <span class="stat-label">Paletas</span>
                </div>
                <div class="stat-item piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <span class="stat-value text-color-auto-21">2</span>
                    <span class="stat-label">Temas</span>
                </div>
            </div>
        `
    }
})
