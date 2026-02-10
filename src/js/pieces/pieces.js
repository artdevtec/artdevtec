// Ripple Areia
document.addEventListener("click", ({ target, clientX, clientY }) => {
    Array.from(target.children).forEach((child) => {
        if (child.classList.contains("piece-ripple")) {
        const rect = target.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // maior distância até as bordas = raio máximo necessário
        const maxX = Math.max(x, rect.width - x);
        const maxY = Math.max(y, rect.height - y);
        const radius = Math.sqrt(maxX ** 2 + maxY ** 2);

        const effect = document.createElement("span");
        effect.className = "piece-ripple-effect";
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        effect.style.setProperty("--ripple-size", `${radius * 2}px`);

        child.appendChild(effect);

        void effect.offsetWidth;
        effect.classList.add("animate");

        effect.addEventListener("animationend", () => effect.remove());
        }
    });
});

//disabled
document.addEventListener("click", e => {
    if (e.target.closest(".piece-disabled")) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);

//piece interactive
document.addEventListener('click', e => {
    document.querySelectorAll('.piece-interactive').forEach(el => {
        const clickedInside = el.contains(e.target);
        const clickedInNoInteractive = e.target.closest('.piece-not-interactive');
        // Desativa se for fora ou dentro de .piece-not-interactive
        const shouldDeactivate = !clickedInside || clickedInNoInteractive;
        el.classList.toggle('piece-actived', !shouldDeactivate);
    });
});








// // Seleciona ou cria o elemento <style>
// let style = document.querySelector("#dynamic-styles");
// if (!style) {
//     style = document.createElement("style");
//     style.id = "dynamic-styles";
//     document.head.appendChild(style);
// }

// // Função que gera os seletores de peça com base no tema
// function generatePieces(theme) {
//     const base = [
//         `&.property-color-${theme}-000`,
//         `&.property-color-${theme}-000-hover:hover`,
//         `&:hover>.piece-parent.property-color-${theme}-000-hover`,
//         `&.piece-actived.property-color-${theme}-000-active`,
//         `&.piece-actived.property-color-${theme}-000-hover-active:hover`,
//         `&.property-color-${theme}-000-active:has(.piece-controller:checked)`,
//         `&.property-color-${theme}-000-active:has(input[type="text"].piece-controller:focus)`,
//         `&:has(.piece-controller:checked)>.piece-parent.property-color-${theme}-000-active`,
//         `&:has(.piece-controller:checked):hover>.piece-parent.property-color-${theme}-000-hover`,
//         `&:has(.piece-controller:checked):hover>.piece-parent.property-color-${theme}-000-hover-active`,
//         `&.property-color-${theme}-000-hover-active:has(.piece-controller:checked):hover`,
//         `&.piece-actived>.piece-parent.property-color-${theme}-000-active`,
//         `&.piece-actived>.piece-parent.property-color-${theme}-000-hover-active:hover`,
//         `.piece-loading-controller .property-color-${theme}-000-loading`
//     ];
//     return base;
// }

// const themes = {
//     auto: generatePieces("auto"),
//     inverse: generatePieces("inverse"),
//     light: generatePieces("light"),
//     dark: generatePieces("dark")
// };

// const properties = [
//     "background",
//     "text",
//     "border",
//     "box-shadow",
//     "ripple",
//     "scrollbar-track-outline",
//     "scrollbar-thumb-background",
//     "scrollbar-thumb-border"
// ];

// const colors = ["piece-primary", "piece-secondary", "piece-tertiary"];

// // Função auxiliar para gerar os blocos CSS
// function buildSurfaceBlock(property, selectorGroup, valueRule) {
//     return `.piece-surface { ${selectorGroup.join(", ")
//         .replaceAll("property", property)} { ${valueRule} } }\n`;
// }

// // Montagem do CSS
// let css = "";

// properties.forEach(property => {
//     // AUTO
//     for (let i = 0, count = 0; i <= 100; i += 4, count++) {
//         css += buildSurfaceBlock(
//             property,
//             themes.auto.map(sel => sel.replaceAll("000", String(count).padStart(2, "0"))),
//             `--piece-${property}-color: calc(var(--piece-theme) var(--piece-theme-operator) ${i}%);`
//         );
//     }

//     // INVERSE
//     for (let i = 0, count = 0; i <= 100; i += 4, count++) {
//         css += buildSurfaceBlock(
//             property,
//             themes.inverse.map(sel => sel.replaceAll("000", String(count).padStart(2, "0"))),
//             `--piece-${property}-color: calc(var(--piece-theme-inverse) var(--piece-theme-operator-inverse) ${i}%);`
//         );
//     }

//     // LIGHT
//     for (let i = 100, count = 0; i >= 0; i -= 4, count++) {
//         css += buildSurfaceBlock(
//             property,
//             themes.light.map(sel => sel.replaceAll("000", String(count).padStart(2, "0"))),
//             `--piece-${property}-color: ${i}%;`
//         );
//     }

//     // DARK
//     for (let i = 0, count = 0; i <= 100; i += 4, count++) {
//         css += buildSurfaceBlock(
//             property,
//             themes.dark.map(sel => sel.replaceAll("000", String(count).padStart(2, "0"))),
//             `--piece-${property}-color: ${i}%;`
//         );
//     }

//     // CORES PRINCIPAIS
//     colors.forEach(color => {
//         ["auto", "light", "dark"].forEach(theme => {
//             css += buildSurfaceBlock(
//                 property,
//                 themes[theme].map(sel => sel.replaceAll("000", color)),
//                 `--piece-${property}-color-h: var(--${color});`
//             );
//         });
//     });
// });

// style.textContent = css;


















//importar a fonte de icones do Google
var googleIcons = document.createElement('style');
googleIcons.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
`































/* ============================================================
   PIECE – CSS Generator sob demanda
   ============================================================ */

/* ---------- STYLE ROOT ---------- */
let style = document.querySelector("#dynamic-styles");
if (!style) {
    style = document.createElement("style");
    style.id = "dynamic-styles";
    document.head.appendChild(style);
}

/* ---------- CACHE ---------- */
const generated = new Set();

/* ---------- SELETORES BASE ---------- */
function generatePieces(theme) {
    return [
        `&.property-color-${theme}-000`,
        `&.property-color-${theme}-000-hover:hover`,
        `&:hover>.piece-parent.property-color-${theme}-000-hover`,
        `&.piece-actived.property-color-${theme}-000-active`,
        `&.piece-actived.property-color-${theme}-000-hover-active:hover`,
        `&.property-color-${theme}-000-active:has(.piece-controller:checked)`,
        `&.property-color-${theme}-000-active:has(input[type="text"].piece-controller:focus)`,
        `&:has(.piece-controller:checked)>.piece-parent.property-color-${theme}-000-active`,
        `&:has(.piece-controller:checked):hover>.piece-parent.property-color-${theme}-000-hover`,
        `&:has(.piece-controller:checked):hover>.piece-parent.property-color-${theme}-000-hover-active`,
        `&.property-color-${theme}-000-hover-active:has(.piece-controller:checked):hover`,
        `&.piece-actived>.piece-parent.property-color-${theme}-000-active`,
        `&.piece-actived>.piece-parent.property-color-${theme}-000-hover-active:hover`,
        `.piece-loading-controller .property-color-${theme}-000-loading`
    ];
}

const themes = {
    auto: generatePieces("auto"),
    inverse: generatePieces("inverse"),
    light: generatePieces("light"),
    dark: generatePieces("dark")
};

/* ---------- PROPRIEDADES SUPORTADAS ---------- */
const properties = new Set([
    "background",
    "text",
    "border",
    "box-shadow",
    "ripple",
    "scrollbar-track-outline",
    "scrollbar-thumb-background",
    "scrollbar-thumb-border"
]);

/* ---------- REGEX DE EXTRAÇÃO ---------- */
const CLASS_REGEX =
/^(?<property>background|text|border|box-shadow|ripple|scrollbar-[\w-]+)-color-(?<theme>auto|light|dark|inverse)-(?<token>[\w-]+)$/;

/* ---------- BUILDER ---------- */
function buildSurfaceBlock(property, selectorGroup, valueRule) {
    return `.piece-surface { ${selectorGroup.join(", ")
        .replaceAll("property", property)} { ${valueRule} } }\n`;
}

/* ---------- RESOLUÇÃO DE VALOR ---------- */
function resolveValue(property, theme, token) {
    // token semântico: piece-primary, piece-secondary, etc.
    if (!/^\d+$/.test(token)) {
        return `--piece-${property}-color-h: var(--${token});`;
    }

    const value = Number(token) * 4;

    if (theme === "auto") {
        return `--piece-${property}-color: calc(var(--piece-theme) var(--piece-theme-operator) ${value}%);`;
    }

    if (theme === "inverse") {
        return `--piece-${property}-color: calc(var(--piece-theme-inverse) var(--piece-theme-operator-inverse) ${value}%);`;
    }

    if (theme === "light") {
        return `--piece-${property}-color: ${100 - value}%;`;
    }

    if (theme === "dark") {
        return `--piece-${property}-color: ${value}%;`;
    }

    return "";
}

/* ---------- GERADOR SOB DEMANDA ---------- */
function ensureCSS(property, theme, token) {
    const key = `${property}|${theme}|${token}`;
    if (generated.has(key)) return;

    generated.add(key);

    const selectors = themes[theme].map(sel =>
        sel.replaceAll("000", token)
    );

    style.textContent += buildSurfaceBlock(
        property,
        selectors,
        resolveValue(property, theme, token)
    );
}

/* ---------- SCANNER DE ELEMENTO ---------- */
function scanElement(el) {
    if (!el || !el.classList) return;

    el.classList.forEach(cls => {
        const match = cls.match(CLASS_REGEX);
        if (!match) return;

        const { property, theme, token } = match.groups;
        if (!properties.has(property)) return;

        // remove sufixos: hover, active, hover-active, loading...
        const baseToken = token.split("-")[0];
        ensureCSS(property, theme, baseToken);
    });
}

/* ---------- INIT SEGURO ---------- */
function initPieceCSSGenerator() {

    /* SCAN INICIAL */
    document.querySelectorAll("*").forEach(scanElement);

    /* OBSERVER */
    const observer = new MutationObserver(mutations => {
        for (const m of mutations) {

            if (m.type === "attributes" && m.attributeName === "class") {
                scanElement(m.target);
            }

            if (m.type === "childList") {
                m.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        scanElement(node);
                        node.querySelectorAll?.("*").forEach(scanElement);
                    }
                });
            }
        }
    });

    observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class"]
    });
}

/* ---------- BOOTSTRAP ---------- */
if (document.body) {
    initPieceCSSGenerator();
} else {
    document.addEventListener("DOMContentLoaded", initPieceCSSGenerator);
}
