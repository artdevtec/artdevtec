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

            <!-- ── SHOWCASE ─────────────────────────────────────────── -->
            <div id="inicio-showcase">
                <p class="inicio-section-label">Prévia dos componentes</p>

                <div class="sc-bento">

                    <!-- Botões -->
                    <div class="sc-cell sc-btns piece-surface background-color-auto-04">
                        <div class="sc-row">
                            <button class="piece-button piece-small piece-surface piece-s-40 piece-primary
                                piece-border piece-background-alpha-02 piece-background-alpha-04-hover
                                border-color-auto-06 text-color-auto-18">
                                <span class="piece-ripple"></span>
                                <span class="piece-label">Back</span>
                            </button>
                            <button class="piece-button piece-small piece-surface piece-s-40 piece-primary
                                background-color-auto-11 background-color-auto-12-hover text-color-auto-00">
                                <span class="piece-ripple"></span>
                                <span class="piece-label">Complete</span>
                            </button>
                        </div>
                        <div class="sc-row">
                            <button class="piece-button piece-small piece-surface piece-s-40 piece-secondary
                                background-color-auto-11 background-color-auto-12-hover text-color-auto-00">
                                <span class="piece-ripple"></span>
                                <span class="material-symbols-rounded piece-icon" translate="no">send</span>
                                <span class="piece-label">Send</span>
                            </button>
                            <button class="piece-button piece-small piece-surface piece-s-40 piece-tertiary
                                piece-border piece-background-alpha-02 piece-background-alpha-04-hover
                                border-color-auto-06 text-color-auto-18">
                                <span class="piece-ripple"></span>
                                <span class="material-symbols-rounded piece-icon" translate="no">open_in_new</span>
                                <span class="piece-label">Open</span>
                            </button>
                        </div>
                    </div>

                    <!-- FAB (hero) -->
                    <div class="sc-cell sc-fab-wrap piece-surface piece-tertiary piece-s-40 background-color-auto-04">
                        <button class="piece-FAB piece-large piece-surface piece-tertiary piece-s-40
                            background-color-auto-11 background-color-auto-12-hover text-color-auto-00">
                            <span class="piece-ripple"></span>
                            <span class="material-symbols-rounded piece-icon" translate="no">add</span>
                        </button>
                    </div>

                    <!-- Icon buttons -->
                    <div class="sc-cell sc-ibtns piece-surface background-color-auto-02 piece-border border-color-auto-06">
                        <button class="piece-icon-button piece-small piece-surface piece-s-40 piece-primary
                            background-color-auto-11 background-color-auto-12-hover text-color-auto-00">
                            <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                            <span class="piece-ripple"></span>
                        </button>
                        <button class="piece-icon-button piece-extra-small piece-surface piece-s-40 piece-secondary
                            background-color-auto-06 background-color-auto-07-hover text-color-auto-18">
                            <span class="material-symbols-rounded piece-icon" translate="no">palette</span>
                            <span class="piece-ripple"></span>
                        </button>
                        <button class="piece-icon-button piece-extra-small piece-surface piece-s-40 piece-tertiary
                            background-color-auto-11 background-color-auto-12-hover text-color-auto-00">
                            <span class="material-symbols-rounded piece-icon" translate="no">edit</span>
                            <span class="piece-ripple"></span>
                        </button>
                    </div>

                    <!-- Controles + Progress -->
                    <div class="sc-cell sc-form piece-surface background-color-auto-04">
                        <div class="sc-row">

                            <!-- Checkboxes -->
                            <label class="piece-checkbox piece-small piece-surface piece-s-40 piece-primary
                                background-color-auto-04 background-color-auto-05-hover
                                background-color-auto-11-active text-color-auto-18 text-color-auto-00-active
                                ripple-color-auto-18 ripple-color-auto-00-active">
                                <input type="checkbox" class="piece-controller" checked>
                                <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
                                <span class="material-symbols-rounded piece-icon piece-true" translate="no">check_box</span>
                                <span class="piece-ripple"></span>
                            </label>
                            <label class="piece-checkbox piece-small piece-surface piece-s-40 piece-secondary
                                background-color-auto-04 background-color-auto-05-hover
                                background-color-auto-11-active text-color-auto-18 text-color-auto-00-active
                                ripple-color-auto-18 ripple-color-auto-00-active">
                                <input type="checkbox" class="piece-controller">
                                <span class="material-symbols-rounded piece-icon piece-false" translate="no">check_box_outline_blank</span>
                                <span class="material-symbols-rounded piece-icon piece-true" translate="no">check_box</span>
                                <span class="piece-ripple"></span>
                            </label>

                            <div class="sc-sep"></div>

                            <!-- Radios -->
                            <label class="piece-radio piece-small piece-surface piece-s-40 piece-primary
                                background-color-auto-04 background-color-auto-05-hover
                                background-color-auto-11-active text-color-auto-18 text-color-auto-00-active
                                ripple-color-auto-18 ripple-color-auto-00-active">
                                <input type="radio" class="piece-controller" name="sc-radio" checked>
                                <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
                                <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
                                <span class="piece-ripple"></span>
                            </label>
                            <label class="piece-radio piece-small piece-surface piece-s-40 piece-tertiary
                                background-color-auto-04 background-color-auto-05-hover
                                background-color-auto-11-active text-color-auto-18 text-color-auto-00-active
                                ripple-color-auto-18 ripple-color-auto-00-active">
                                <input type="radio" class="piece-controller" name="sc-radio">
                                <span class="material-symbols-rounded piece-icon piece-false" translate="no">radio_button_unchecked</span>
                                <span class="material-symbols-rounded piece-icon piece-true" translate="no">radio_button_checked</span>
                                <span class="piece-ripple"></span>
                            </label>

                            <div class="sc-sep"></div>

                            <!-- Switch -->
                            <label class="piece-switch piece-surface piece-s-40 piece-secondary
                                background-color-auto-04 background-color-auto-11-active
                                border-color-auto-08 border-color-auto-11-active
                                text-color-light-00 text-color-light-11-active">
                                <input type="checkbox" class="piece-controller" checked>
                                <span class="piece-indicator piece-surface piece-parent
                                    background-color-auto-12 background-color-auto-00-active">
                                </span>
                            </label>

                            <div class="sc-sep"></div>

                            <!-- Progress bar -->
                            <div class="piece-progress-indicator piece-bar piece-active piece-surface background-color-auto-06"
                                style="flex:1;min-width:60px;--piece-percentage:60%;">
                                <div class="piece-indicator piece-surface piece-primary piece-s-40 background-color-auto-11"></div>
                            </div>

                            <!-- Progress circles -->
                            <div class="piece-progress-indicator piece-circle piece-active piece-surface piece-secondary piece-s-40 background-color-auto-11"
                                style="--piece-percentage:75%;width:36px;height:36px;flex-shrink:0;">
                                <div class="piece-indicator"></div>
                            </div>
                            <div class="piece-progress-indicator piece-circle piece-active piece-surface piece-tertiary piece-s-40 background-color-auto-11"
                                style="--piece-percentage:40%;width:36px;height:36px;flex-shrink:0;">
                                <div class="piece-indicator"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Chips -->
                    <div class="sc-cell sc-chips piece-surface background-color-auto-02 piece-border border-color-auto-06">
                        <button class="piece-button piece-extra-small piece-surface piece-s-40 piece-primary
                            piece-border piece-background-alpha-02 piece-background-alpha-04-hover
                            border-color-auto-06 text-color-auto-18">
                            <span class="piece-ripple"></span>
                            <span class="material-symbols-rounded piece-icon" translate="no">calendar_month</span>
                            <span class="piece-label">Add to Calendar</span>
                        </button>
                        <button class="piece-button piece-extra-small piece-surface piece-s-40 piece-primary
                            background-color-auto-06 background-color-auto-07-hover text-color-auto-20">
                            <span class="piece-ripple"></span>
                            <span class="material-symbols-rounded piece-icon" translate="no">check</span>
                            <span class="piece-label">Free Shipping</span>
                        </button>
                        <button class="piece-button piece-extra-small piece-surface piece-s-40 piece-secondary
                            background-color-auto-06 background-color-auto-07-hover text-color-auto-20">
                            <span class="piece-ripple"></span>
                            <span class="material-symbols-rounded piece-icon" translate="no">account_circle</span>
                            <span class="piece-label">Mr. Kitters</span>
                            <span class="material-symbols-rounded" translate="no" style="font-size:16px;opacity:.45;pointer-events:none;">close</span>
                        </button>
                    </div>

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
