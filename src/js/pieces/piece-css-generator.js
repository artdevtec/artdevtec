/* ============================================================
   PIECE – CSS Generator sob demanda
   v3 — alpha por propriedade + blur
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

/* ---------- SELETORES BASE — COR ---------- */
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

/* ---------- SELETORES BASE — ALPHA POR PROPRIEDADE ---------- */
function generateAlphaPieces(property) {
    return [
        `&.piece-${property}-alpha-000`,
        `&.piece-${property}-alpha-000-hover:hover`,
        `&:hover>.piece-parent.piece-${property}-alpha-000-hover`,
        `&.piece-actived.piece-${property}-alpha-000-active`,
        `&.piece-actived.piece-${property}-alpha-000-hover-active:hover`,
        `&.piece-${property}-alpha-000-active:has(.piece-controller:checked)`,
        `&.piece-${property}-alpha-000-active:has(input[type="text"].piece-controller:focus)`,
        `&:has(.piece-controller:checked)>.piece-parent.piece-${property}-alpha-000-active`,
        `&:has(.piece-controller:checked):hover>.piece-parent.piece-${property}-alpha-000-hover`,
        `&:has(.piece-controller:checked):hover>.piece-parent.piece-${property}-alpha-000-hover-active`,
        `&.piece-${property}-alpha-000-hover-active:has(.piece-controller:checked):hover`,
        `&.piece-actived>.piece-parent.piece-${property}-alpha-000-active`,
        `&.piece-actived>.piece-parent.piece-${property}-alpha-000-hover-active:hover`,
        `.piece-loading-controller .piece-${property}-alpha-000-loading`
    ];
}

/* ---------- SELETORES BASE — BLUR ---------- */
function generateBlurPieces() {
    return [
        `&.piece-blur-000`,
        `&.piece-blur-000-hover:hover`,
        `&:hover>.piece-parent.piece-blur-000-hover`,
        `&.piece-actived.piece-blur-000-active`,
        `&.piece-actived.piece-blur-000-hover-active:hover`,
        `&.piece-blur-000-active:has(.piece-controller:checked)`,
        `&.piece-blur-000-active:has(input[type="text"].piece-controller:focus)`,
        `&:has(.piece-controller:checked)>.piece-parent.piece-blur-000-active`,
        `&:has(.piece-controller:checked):hover>.piece-parent.piece-blur-000-hover`,
        `&:has(.piece-controller:checked):hover>.piece-parent.piece-blur-000-hover-active`,
        `&.piece-blur-000-hover-active:has(.piece-controller:checked):hover`,
        `&.piece-actived>.piece-parent.piece-blur-000-active`,
        `&.piece-actived>.piece-parent.piece-blur-000-hover-active:hover`,
        `.piece-loading-controller .piece-blur-000-loading`
    ];
}

const blurSelectors = generateBlurPieces();

/* ---------- PROPRIEDADES DE COR SUPORTADAS ---------- */
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

/* ---------- PROPRIEDADES DE ALPHA SUPORTADAS ---------- */
/* mapeamento: classe → variável CSS */
const alphaProperties = new Map([
    ["background",                  "--piece-background-a"],
    ["text",                        "--piece-text-a"],
    ["border",                      "--piece-border-a"],
    ["box-shadow",                  "--piece-box-shadow-a"],
    ["ripple",                      "--piece-ripple-a"],
    ["scrollbar-track-outline",     "--piece-scrollbar-track-outline-a"],
    ["scrollbar-thumb-background",  "--piece-scrollbar-thumb-background-a"],
    ["scrollbar-thumb-border",      "--piece-scrollbar-thumb-border-a"],
]);

/* ---------- REGEX DE EXTRAÇÃO ---------- */

// Cor: background-color-auto-08
const CLASS_REGEX =
    /^(?<property>background|text|border|box-shadow|ripple|scrollbar-[\w-]+)-color-(?<theme>auto|light|dark|inverse)-(?<token>[\w-]+)$/;

// Alpha por propriedade: piece-background-alpha-06
const ALPHA_REGEX =
    /^piece-(?<property>background|text|border|box-shadow|ripple|scrollbar-track-outline|scrollbar-thumb-background|scrollbar-thumb-border)-alpha-(?<token>\d{2})(?:-(?<suffix>hover|active|hover-active|loading))?$/;

// Blur: piece-blur-08
const BLUR_REGEX =
    /^piece-blur-(?<token>\d{2})(?:-(?<suffix>hover|active|hover-active|loading))?$/;

/* ---------- BUILDERS ---------- */
/* Desugars &-relative selectors to flat selectors for maximum browser compat  */
/* (some browsers discard entire nested blocks when a comma list mixes         */
/* &-relative and bare selectors such as .piece-loading-controller …)          */

function flattenSelectors(rawSelectors) {
    return rawSelectors.map(sel => {
        if (sel.startsWith("&")) return ".piece-surface" + sel.slice(1);
        return sel;            // bare selector (.piece-loading-controller …) kept as-is
    }).join(", ");
}

function buildSurfaceBlock(property, selectorGroup, valueRule) {
    const flat = flattenSelectors(
        selectorGroup.map(sel => sel.replaceAll("property", property))
    );
    return `${flat} { ${valueRule} }\n`;
}

function buildGenericBlock(selectorGroup, valueRule) {
    return `${flattenSelectors(selectorGroup)} { ${valueRule} }\n`;
}

/* ---------- RESOLUÇÃO DE VALOR — COR ---------- */
function resolveColorValue(property, theme, token) {
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

/* ---------- RESOLUÇÃO DE VALOR — ALPHA ---------- */
function resolveAlphaValue(property, token) {
    const cssVar  = alphaProperties.get(property);
    const value   = (Number(token) * 4 / 100).toFixed(2);
    return `${cssVar}: ${value};`;
}

/* ---------- RESOLUÇÃO DE VALOR — BLUR ---------- */
function resolveBlurValue(token) {
    const value = Number(token) * 2;
    return `--piece-blur: ${value}px; backdrop-filter: blur(${value}px); -webkit-backdrop-filter: blur(${value}px);`;
}

/* ---------- GERADOR SOB DEMANDA — COR ---------- */
function ensureColorCSS(property, theme, token) {
    const key = `color|${property}|${theme}|${token}`;
    if (generated.has(key)) return;
    generated.add(key);

    const selectors = themes[theme].map(sel => sel.replaceAll("000", token));

    style.textContent += buildSurfaceBlock(
        property,
        selectors,
        resolveColorValue(property, theme, token)
    );
}

/* ---------- GERADOR SOB DEMANDA — ALPHA ---------- */
function ensureAlphaCSS(property, token) {
    const key = `alpha|${property}|${token}`;
    if (generated.has(key)) return;
    generated.add(key);

    const selectors = generateAlphaPieces(property).map(sel =>
        sel.replaceAll("000", token)
    );

    style.textContent += buildGenericBlock(
        selectors,
        resolveAlphaValue(property, token)
    );
}

/* ---------- GERADOR SOB DEMANDA — BLUR ---------- */
function ensureBlurCSS(token) {
    const key = `blur|${token}`;
    if (generated.has(key)) return;
    generated.add(key);

    const selectors = blurSelectors.map(sel => sel.replaceAll("000", token));

    style.textContent += buildGenericBlock(
        selectors,
        resolveBlurValue(token)
    );
}

/* ---------- SCANNER DE ELEMENTO ---------- */
function scanElement(el) {
    if (!el || !el.classList) return;

    el.classList.forEach(cls => {

        // — COR —
        const colorMatch = cls.match(CLASS_REGEX);
        if (colorMatch) {
            const { property, theme, token } = colorMatch.groups;
            if (properties.has(property)) {
                const baseToken = token.split("-")[0];
                ensureColorCSS(property, theme, baseToken);
            }
            return;
        }

        // — ALPHA POR PROPRIEDADE —
        const alphaMatch = cls.match(ALPHA_REGEX);
        if (alphaMatch) {
            const { property, token } = alphaMatch.groups;
            if (alphaProperties.has(property)) {
                ensureAlphaCSS(property, token);
            }
            return;
        }

        // — BLUR —
        const blurMatch = cls.match(BLUR_REGEX);
        if (blurMatch) {
            ensureBlurCSS(blurMatch.groups.token);
            return;
        }

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