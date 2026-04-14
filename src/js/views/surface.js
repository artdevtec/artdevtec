MPSO.newView({
    name: "Surface",
    icon: "layers",
    showInNavigation: true,

    main() {
        const section = $("#m-main section")
        section.className = "piece-surface background-color-auto-02"
        section.innerHTML = ""
        section.appendAll(this.create(this.template()))
        this.initEditor()
    },

    template() {
        const swatches = Array.from({ length: 26 }, (_, i) => {
            const n = String(i).padStart(2, "0")
            const light = i < 13
            return `<div class="surf-swatch piece-surface background-color-auto-${n}" style="color:${light ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.8)'}">${n}</div>`
        }).join("")

        return /*html*/`

            <!-- ── HERO ── -->
            <div class="surf-section">
                <h1 style="font-size:28px;font-weight:900;line-height:1.1;" class="text-color-auto-21">
                    Surface &amp; Tema
                </h1>
                <p style="font-size:14px;line-height:1.7;opacity:.65;max-width:560px;">
                    <strong>piece-surface</strong> é a classe base de todo o sistema.
                    Ela injeta as variáveis de cor, texto, borda, sombra e ripple usando um sistema
                    HSL dinâmico que gera temas claro e escuro automaticamente.
                </p>
            </div>

            <!-- ── O QUE É PIECE-SURFACE ── -->
            <div class="surf-section">
                <p class="surf-section-title">Fundação</p>
                <div class="surf-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <p class="surf-card-title text-color-auto-21">O que é piece-surface?</p>
                    <p class="surf-card-desc">
                        Toda superfície do Pieces herda de <span class="surf-code piece-surface background-color-auto-06">.piece-surface</span>.
                        Ela define variáveis CSS que controlam cor de fundo, texto, borda e ripple — tudo a partir de um único valor de matiz (H).
                        Elementos filhos que também têm <span class="surf-code piece-surface background-color-auto-06">.piece-surface</span>
                        recebem um contexto de cor isolado automaticamente.
                    </p>
                    <div class="surf-code-block piece-surface background-color-auto-06 text-color-auto-18">/* Aplicar em qualquer elemento */
.piece-surface {
  --piece-background-color-h: var(--piece-h);
  --piece-text-color-h:       var(--piece-h);
  --piece-border-color-h:     var(--piece-h);
  --piece-ripple-color-h:     var(--piece-h);

  background: hsla(var(--piece-h), var(--piece-s),
                   var(--piece-background-color), 1);
  color:      hsla(var(--piece-h), var(--piece-s),
                   var(--piece-text-color), 1);
}</div>
                </div>

                <div class="surf-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <p class="surf-card-title text-color-auto-21">Variáveis principais</p>
                    <div class="surf-var-table">
                        <div class="surf-var-row piece-surface background-color-auto-02">
                            <span class="surf-var-name text-color-auto-18">--piece-main-color</span>
                            <span class="surf-var-desc">Matiz base (0–360). Padrão: 248</span>
                        </div>
                        <div class="surf-var-row piece-surface background-color-auto-06">
                            <span class="surf-var-name text-color-auto-18">--piece-h</span>
                            <span class="surf-var-desc">Matiz ativo (herda de primary/secondary/tertiary)</span>
                        </div>
                        <div class="surf-var-row piece-surface background-color-auto-02">
                            <span class="surf-var-name text-color-auto-18">--piece-s</span>
                            <span class="surf-var-desc">Saturação. 16% padrão, 40% com <code>.piece-s-40</code></span>
                        </div>
                        <div class="surf-var-row piece-surface background-color-auto-06">
                            <span class="surf-var-name text-color-auto-18">--piece-theme</span>
                            <span class="surf-var-desc">100% no light, 0% no dark</span>
                        </div>
                        <div class="surf-var-row piece-surface background-color-auto-02">
                            <span class="surf-var-name text-color-auto-18">--piece-theme-inverse</span>
                            <span class="surf-var-desc">Inverso de --piece-theme</span>
                        </div>
                        <div class="surf-var-row piece-surface background-color-auto-06">
                            <span class="surf-var-name text-color-auto-18">--piece-blur</span>
                            <span class="surf-var-desc">backdrop-filter blur. Padrão: 0px</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── ESCALA auto-00 a auto-25 ── -->
            <div class="surf-section">
                <p class="surf-section-title">Escala de Luminosidade</p>
                <div class="surf-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <p class="surf-card-title text-color-auto-21">background-color-auto-00 → auto-25</p>
                    <p class="surf-card-desc">
                        Os valores <strong>auto-XX</strong> calculam luminosidade automaticamente com base no tema.
                        No modo escuro: <code>auto-00</code> = mais escuro, <code>auto-25</code> = mais claro.
                        No modo claro: o inverso. Combine com <code>.text-color-auto-XX</code> para contraste garantido.
                    </p>
                    <div class="surf-scale">${swatches}</div>
                    <div class="surf-code-block piece-surface background-color-auto-06 text-color-auto-18">&lt;div class="piece-surface background-color-auto-04"&gt;
  &lt;span class="text-color-auto-18"&gt;Texto&lt;/span&gt;
&lt;/div&gt;

/* Hover e Active também disponíveis */
background-color-auto-04-hover
background-color-auto-11-active
background-color-auto-12-hover-active</div>
                </div>
            </div>

            <!-- ── LIGHT / DARK ── -->
            <div class="surf-section">
                <p class="surf-section-title">Temas</p>
                <div class="surf-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <p class="surf-card-title text-color-auto-21">piece-light / piece-dark</p>
                    <p class="surf-card-desc">
                        Aplique no <code>&lt;body&gt;</code>. Toda a escala auto-XX se inverte automaticamente —
                        não é necessário nenhuma classe adicional nos elementos filhos.
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                        <div style="border-radius:12px;overflow:hidden;">
                            <div style="padding:16px;background:#f8f8ff;color:#1a1a2e;">
                                <span style="font-size:12px;font-weight:700;opacity:.5;display:block;margin-bottom:8px;">LIGHT</span>
                                <div style="height:8px;border-radius:4px;background:rgba(0,0,0,.08);margin-bottom:6px;"></div>
                                <div style="height:8px;border-radius:4px;background:rgba(0,0,0,.12);width:70%;margin-bottom:6px;"></div>
                                <div style="height:8px;border-radius:4px;background:rgba(0,0,0,.06);width:50%;"></div>
                            </div>
                        </div>
                        <div style="border-radius:12px;overflow:hidden;">
                            <div style="padding:16px;background:#0e0e1a;color:#e8e8ff;">
                                <span style="font-size:12px;font-weight:700;opacity:.5;display:block;margin-bottom:8px;">DARK</span>
                                <div style="height:8px;border-radius:4px;background:rgba(255,255,255,.08);margin-bottom:6px;"></div>
                                <div style="height:8px;border-radius:4px;background:rgba(255,255,255,.12);width:70%;margin-bottom:6px;"></div>
                                <div style="height:8px;border-radius:4px;background:rgba(255,255,255,.06);width:50%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="surf-code-block piece-surface background-color-auto-06 text-color-auto-18">&lt;body class="piece-dark"&gt;  /* ou piece-light */
  &lt;div class="piece-surface background-color-auto-02"&gt;...&lt;/div&gt;
&lt;/body&gt;

.piece-dark  { --piece-theme: 0%;   --piece-theme-inverse: 100%; }
.piece-light { --piece-theme: 100%; --piece-theme-inverse: 0%;   }</div>
                </div>
            </div>

            <!-- ── ROLES ── -->
            <div class="surf-section">
                <p class="surf-section-title">Roles de Cor</p>
                <div class="surf-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <p class="surf-card-title text-color-auto-21">Primary / Secondary / Tertiary</p>
                    <p class="surf-card-desc">
                        Cada <em>role</em> define um matiz (H) diferente derivado da paleta ativa.
                        Aplique no container pai para que todos os filhos herdem aquele matiz.
                    </p>
                    <div class="surf-roles">
                        <div class="surf-role-card">
                            <div class="surf-role-main piece-surface piece-primary piece-s-40 background-color-auto-11">Primary</div>
                            <div class="surf-role-container piece-surface piece-primary background-color-auto-04">Container</div>
                        </div>
                        <div class="surf-role-card">
                            <div class="surf-role-main piece-surface piece-secondary piece-s-40 background-color-auto-11">Secondary</div>
                            <div class="surf-role-container piece-surface piece-secondary background-color-auto-04">Container</div>
                        </div>
                        <div class="surf-role-card">
                            <div class="surf-role-main piece-surface piece-tertiary piece-s-40 background-color-auto-11">Tertiary</div>
                            <div class="surf-role-container piece-surface piece-tertiary background-color-auto-04">Container</div>
                        </div>
                    </div>
                    <div class="surf-code-block piece-surface background-color-auto-06 text-color-auto-18">/* Roles definem --piece-h a partir da paleta */
.piece-primary   { --piece-h: var(--piece-primary);   }
.piece-secondary { --piece-h: var(--piece-secondary); }
.piece-tertiary  { --piece-h: var(--piece-tertiary);  }

/* Uso */
&lt;div class="piece-surface piece-primary background-color-auto-11"&gt;
  Fundo primário
&lt;/div&gt;</div>
                </div>
            </div>

            <!-- ── PALETAS ── -->
            <div class="surf-section">
                <p class="surf-section-title">Paletas</p>
                <div class="surf-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <p class="surf-card-title text-color-auto-21">Analógica / Complementar / Triádica</p>
                    <p class="surf-card-desc">
                        Aplicadas no <code>&lt;body&gt;</code>, definem como os 3 roles são calculados a partir do matiz base.
                        O sistema usa aritmética CSS pura — sem JavaScript para calcular cores.
                    </p>
                    <div style="display:grid;gap:8px;">
                        <div style="display:flex;gap:8px;align-items:center;">
                            <span style="font-size:12px;font-weight:700;width:110px;opacity:.55;">piece-analoga</span>
                            <div style="display:flex;gap:4px;">
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(248,40%,50%);"></div>
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(278,40%,50%);"></div>
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(338,40%,50%);"></div>
                            </div>
                            <span style="font-size:11px;opacity:.5;font-family:monospace;">+0° / +30° / +90°</span>
                        </div>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <span style="font-size:12px;font-weight:700;width:110px;opacity:.55;">piece-complementar</span>
                            <div style="display:flex;gap:4px;">
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(248,40%,50%);"></div>
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(368,40%,50%);"></div>
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(398,40%,50%);"></div>
                            </div>
                            <span style="font-size:11px;opacity:.5;font-family:monospace;">+0° / +120° / +150°</span>
                        </div>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <span style="font-size:12px;font-weight:700;width:110px;opacity:.55;">piece-triade</span>
                            <div style="display:flex;gap:4px;">
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(248,40%,50%);"></div>
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(368,40%,50%);"></div>
                                <div style="width:40px;height:40px;border-radius:10px;background:hsl(488,40%,50%);"></div>
                            </div>
                            <span style="font-size:11px;opacity:.5;font-family:monospace;">+0° / +120° / +240°</span>
                        </div>
                    </div>
                    <div class="surf-code-block piece-surface background-color-auto-06 text-color-auto-18">&lt;body class="piece-analoga"&gt;  /* piece-complementar | piece-triade */

.piece-analoga {
  --piece-primary:   var(--piece-main-color);
  --piece-secondary: calc(var(--piece-primary) + 30);
  --piece-tertiary:  calc(var(--piece-secondary) + 60);
}</div>
                </div>
            </div>

            <!-- ── EDITOR AO VIVO ── -->
            <div class="surf-section">
                <p class="surf-section-title">Editor ao Vivo</p>
                <div class="surf-card piece-surface background-color-auto-02 piece-border border-color-auto-06">
                    <p class="surf-card-title text-color-auto-21">Experimente em tempo real</p>
                    <div class="surf-editor">
                        <!-- HUE slider -->
                        <div>
                            <p class="surf-editor-label">Matiz base (--piece-main-color)</p>
                            <div class="surf-hue-strip" style="margin-bottom:8px;"></div>
                            <div style="display:flex;gap:12px;align-items:center;">
                                <input id="surf-hue-slider" type="range" min="0" max="360"
                                    value="${MPSO.storage.HUEMainColor.get()}"
                                    style="flex:1;cursor:var(--cursor-pointer);">
                                <span id="surf-hue-value" style="font-family:monospace;font-size:13px;font-weight:700;min-width:32px;" class="text-color-auto-18">${MPSO.storage.HUEMainColor.get()}</span>
                            </div>
                        </div>
                        <!-- Paleta -->
                        <div>
                            <p class="surf-editor-label">Paleta</p>
                            <div class="surf-palettes">
                                ${["analoga","complementar","triade"].map(p => `
                                    <button data-paleta="${p}" class="surf-palette-btn piece-surface piece-s-40
                                        ${MPSO.storage.paleta.get() === p || (p === 'triade' && MPSO.storage.paleta.get() === 'triádica')
                                            ? 'background-color-auto-11 text-color-auto-00 piece-primary'
                                            : 'background-color-auto-06 background-color-auto-07-hover text-color-auto-18'
                                        }">${p}</button>
                                `).join("")}
                            </div>
                        </div>
                        <!-- Preview ao vivo -->
                        <div>
                            <p class="surf-editor-label">Preview da paleta</p>
                            <div class="surf-preview-chips" id="surf-preview-chips">
                                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-primary">
                                    <span class="piece-ripple"></span>
                                    <span class="material-symbols-rounded piece-icon" translate="no">star</span>
                                    <span class="piece-label">Primary</span>
                                </button>
                                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-secondary">
                                    <span class="piece-ripple"></span>
                                    <span class="piece-label">Secondary</span>
                                </button>
                                <button class="piece-button piece-medium piece-surface piece-s-40 background-color-auto-11 background-color-auto-12-hover text-color-auto-00 ripple-color-auto-00 piece-tertiary">
                                    <span class="piece-ripple"></span>
                                    <span class="piece-label">Tertiary</span>
                                </button>
                                <label style="cursor:var(--cursor-pointer)">
                                    <div class="piece-switch piece-surface piece-s-40 background-color-auto-04 background-color-auto-11-active border-color-auto-08 border-color-auto-11-active piece-primary">
                                        <input type="checkbox" checked>
                                        <span class="piece-indicator piece-surface piece-parent background-color-auto-12 background-color-auto-00-active"></span>
                                    </div>
                                </label>
                                <div style="width:40px;height:40px;border-radius:50%;display:grid;place-content:center;font-size:12px;font-weight:700;" class="piece-surface piece-primary piece-s-40 background-color-auto-11 text-color-auto-00">P</div>
                                <div style="width:40px;height:40px;border-radius:50%;display:grid;place-content:center;font-size:12px;font-weight:700;" class="piece-surface piece-secondary piece-s-40 background-color-auto-11 text-color-auto-00">S</div>
                                <div style="width:40px;height:40px;border-radius:50%;display:grid;place-content:center;font-size:12px;font-weight:700;" class="piece-surface piece-tertiary piece-s-40 background-color-auto-11 text-color-auto-00">T</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    initEditor() {
        const slider = $("#surf-hue-slider")
        const hueVal = $("#surf-hue-value")

        if (!slider) return

        slider.addEventListener("input", () => {
            const v = Number(slider.value)
            hueVal.textContent = v
            document.querySelector("html").style.setProperty("--piece-main-color", v)
            MPSO.storage.HUEMainColor.set(v)
        })

        document.querySelectorAll(".surf-palette-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const p = btn.dataset.paleta
                // Atualizar classes visuais dos botões
                document.querySelectorAll(".surf-palette-btn").forEach(b => {
                    b.className = b.className
                        .replace("background-color-auto-11 text-color-auto-00 piece-primary", "background-color-auto-06 background-color-auto-07-hover text-color-auto-18")
                })
                btn.className = btn.className
                    .replace("background-color-auto-06 background-color-auto-07-hover text-color-auto-18", "background-color-auto-11 text-color-auto-00 piece-primary")

                // Aplicar paleta
                document.body.classList.remove("piece-analoga", "piece-complementar", "piece-triade", "piece-mono")
                document.body.classList.add(`piece-${p}`)
                MPSO.storage.paleta.set(p === "triade" ? "triádica" : p)
            })
        })
    }
})
