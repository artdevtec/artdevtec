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

// Seleciona ou cria o elemento <style>
let style = document.querySelector("#dynamic-styles");
if (!style) {
    style = document.createElement("style");
    style.id = "dynamic-styles";
    document.head.appendChild(style);
}

// Função que gera os seletores de peça com base no tema
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

const properties = [
    "background",
    "text",
    "border",
    "box-shadow",
    "ripple",
    "scrollbar-track-outline",
    "scrollbar-thumb-background",
    "scrollbar-thumb-border"
];

const colors = ["piece-primary", "piece-secondary", "piece-tertiary"];

// Geração otimizada de todo o CSS
let css = "";

properties.forEach(property => {
    for (let i = 0, count = 0; i <= 100; i += 4, count++) {
        css += `.piece-surface { ${themes.auto.join(", ").replaceAll("property", property).replaceAll("000", String(count).padStart(2, "0"))} { --piece-${property}-color: calc(var(--piece-theme) var(--piece-theme-operator) ${i}%); } }\n`;
    }
    for (let i = 0, count = 0; i <= 100; i += 4, count++) {
        css += `.piece-surface { ${themes.inverse.join(", ").replaceAll("property", property).replaceAll("000", String(count).padStart(2, "0"))} { --piece-${property}-color: calc(var(--piece-theme-inverse) var(--piece-theme-operator-inverse) ${i}%); } }\n`;
    }
    for (let i = 100, count = 0; i >= 0; i -= 4, count++) {
        css += `.piece-surface { ${themes.light.join(", ").replaceAll("property", property).replaceAll("000", String(count).padStart(2, "0"))} { --piece-${property}-color: ${i}%; } }\n`;
    }
    for (let i = 0, count = 0; i <= 100; i += 4, count++) {
        css += `.piece-surface { ${themes.dark.join(", ").replaceAll("property", property).replaceAll("000", String(count).padStart(2, "0"))} { --piece-${property}-color: ${i}%; } }\n`;
    }

    colors.forEach(color => {
        ["auto", "light", "dark"].forEach(theme => {
            css += `.piece-surface { ${themes[theme].join(", ").replaceAll("property", property).replaceAll("000", color)} { --piece-${property}-color-h: var(--${color}); } }\n`;
        });
    });
});

style.textContent = css;

//importar a fonte de icones do Google
var googleIcons = document.createElement('style');
googleIcons.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
`

document.addEventListener('click', e => {
    document.querySelectorAll('.piece-interactive').forEach(el => {
        const clickedInside = el.contains(e.target);
        const clickedInNoInteractive = e.target.closest('.piece-not-interactive');

        // Desativa se for fora ou dentro de .piece-not-interactive
        const shouldDeactivate = !clickedInside || clickedInNoInteractive;
        el.classList.toggle('piece-actived', !shouldDeactivate);
    });
});