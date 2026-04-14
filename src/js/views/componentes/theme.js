CompPages["theme"] = function(c) {

    H.render(c,
        H.header("Theme", "Sistema de temas dark/light e paletas de cor. Tudo controlado por classes no <body> e uma variável CSS.", "theme.css"),

        H.section("DARK / LIGHT"),
        H.demo(null,
            `<div style="display:flex;gap:12px;flex-wrap:wrap;">
                <div class="piece-light piece-surface background-color-auto-02" style="border-radius:16px;padding:20px;min-width:160px;">
                    <p style="font-size:12px;font-weight:700;margin-bottom:8px;">piece-light</p>
                    <div class="piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 piece-primary" style="height:36px;border-radius:8px;display:grid;place-content:center;font-size:12px;">Primary</div>
                    <div class="piece-surface background-color-auto-06" style="height:2px;margin:8px 0;border-radius:2px;"></div>
                    <p style="font-size:11px;opacity:.5;" class="text-color-auto-14">Texto secundário</p>
                </div>
                <div class="piece-dark piece-surface background-color-auto-02" style="border-radius:16px;padding:20px;min-width:160px;">
                    <p style="font-size:12px;font-weight:700;margin-bottom:8px;color:#e0e0e0;">piece-dark</p>
                    <div class="piece-surface piece-s-40 background-color-auto-11 text-color-auto-00 piece-primary" style="height:36px;border-radius:8px;display:grid;place-content:center;font-size:12px;">Primary</div>
                    <div class="piece-surface background-color-auto-06" style="height:2px;margin:8px 0;border-radius:2px;"></div>
                    <p style="font-size:11px;opacity:.5;color:#888;">Texto secundário</p>
                </div>
            </div>`,
            `<!-- Aplicado ao <body> ou a qualquer container -->
<body class="piece-dark">  <!-- tema escuro -->
<body class="piece-light"> <!-- tema claro -->`
        ),

        H.section("PALETAS DE COR"),
        H.demo("Relação angular entre primário, secundário e terciário",
            `<div style="display:flex;gap:12px;flex-wrap:wrap;">
                ${[
                    ['piece-analoga',       'Análoga',      '+30° / +90°'],
                    ['piece-complementar',  'Complementar', '+120° / +150°'],
                    ['piece-triade',        'Tríade',       '+120° / +240°'],
                ].map(([cls, name, desc]) =>
                    `<div class="${cls} piece-surface background-color-auto-04" style="border-radius:16px;padding:16px;min-width:160px;">
                        <p style="font-size:12px;font-weight:700;margin-bottom:8px;">${name}</p>
                        <p style="font-size:10px;opacity:.5;margin-bottom:12px;">${desc}</p>
                        <div style="display:flex;gap:4px;">
                            <div class="piece-surface piece-s-40 background-color-auto-11 piece-primary" style="height:24px;flex:1;border-radius:4px;"></div>
                            <div class="piece-surface piece-s-40 background-color-auto-11 piece-secondary" style="height:24px;flex:1;border-radius:4px;"></div>
                            <div class="piece-surface piece-s-40 background-color-auto-11 piece-tertiary" style="height:24px;flex:1;border-radius:4px;"></div>
                        </div>
                    </div>`
                ).join('')}
            </div>`,
            `<!-- Aplicado ao <body> junto com o tema -->
<body class="piece-dark piece-analoga">
<body class="piece-light piece-complementar">
<body class="piece-dark piece-triade">`
        ),

        H.section("HUE PRINCIPAL"),
        H.demo("--piece-main-color: define o matiz base (0–360)",
            `<div style="display:flex;gap:12px;flex-wrap:wrap;">
                ${[0,30,120,200,280,340].map(hue =>
                    `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:40px;height:40px;border-radius:12px;background:hsl(${hue},40%,50%);"></div>
                        <span style="font-size:10px;opacity:.5;">${hue}°</span>
                    </div>`
                ).join('')}
            </div>`,
            `/* Via CSS */
:root { --piece-main-color: 220; }

/* Via JS */
document.documentElement.style.setProperty('--piece-main-color', '220');

/* Via body style */
document.body.style.setProperty('--piece-main-color', '220');`
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-dark",          "Tema escuro — aplicado ao body ou container"],
            [".piece-light",         "Tema claro — aplicado ao body ou container"],
            [".piece-analoga",       "Paleta análoga: secundário +30°, terciário +90°"],
            [".piece-complementar",  "Paleta complementar: secundário +120°, terciário +150°"],
            [".piece-triade",        "Paleta triádica: secundário +120°, terciário +240°"],
            ["--piece-main-color",   "Variável CSS (0–360) que define o matiz primário"],
        ])
    )
}
