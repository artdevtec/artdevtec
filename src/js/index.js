(() => {
    const body = document.body
    const header = document.querySelector('header')
    let timeout // variável para evitar execuções acumuladas

    function updateMetaThemeColor() {
        const color = header ? getComputedStyle(header).backgroundColor : '#ffffff'
        let meta = document.querySelector('meta[name="theme-color"]')
        if (!meta) {
            meta = document.createElement('meta')
            meta.name = 'theme-color'
            document.head.appendChild(meta)
        }
        meta.content = color
    }

    // Atualiza imediatamente na inicialização
    updateMetaThemeColor()

    // Observa mudanças nas classes do body
    const observer = new MutationObserver(() => {
        clearTimeout(timeout) // se houver uma mudança anterior, cancela o timer
        timeout = setTimeout(() => {
            updateMetaThemeColor()
        }, 300)
    })

    observer.observe(body, { attributes: true, attributeFilter: ['class'] })
})()



// ------------------ Start ------------------
cl(MPSO)

// Fill m-nav
MPSO.views
.filter(view=>view.showInNavigation)
.forEach((view, i)=>{

    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    const template = /*html*/`
        <label class="piece-item piece-surface">
            <span class="
                piece-indicator
                piece-surface
                piece-parent

                background-color-auto-02
                background-color-auto-04-hover

                background-color-auto-11-active
                background-color-auto-13-hover-active
                piece-s-40
                piece-secondary
                ripple-color-auto-00
            "></span>
            <span class="material-symbols-rounded piece-icon" translate="no">${view.icon}</span>
            <span class="piece-label">${view.name}</span>
            <input id="nav-btn-${i}" type="radio" name="nav" value="${normalize(view.name)}" class="piece-controller">
        </label>
    `
    $(`#m-aside .piece-items`).appendAll(MPSO.globalFns.create(template))
})

$$("#m-aside .piece-item").forEach(item=>{
    item.addEventListener('click', ()=> {
        window.location.hash = item.$('input').value.toLowerCase()
    })
})

// 🚀 Novo fluxo: animação primeiro, router depois
window.addEventListener("DOMContentLoaded", () => {

    // 🔹 Aplica o tema antes da animação
    if (MPSO.storage.darkMode.get()) {
        document.body.classList.add("piece-dark")
        document.body.classList.remove("piece-light")
    } else {
        document.body.classList.add("piece-light")
        document.body.classList.remove("piece-dark")
    }

    // inicia controle offline
    MPSO.offline.init()


    const animationTime = 2500 // tempo da animação em ms

    setTimeout(() => {
        $("body>.animation-container")?.remove()
        $("body").classList.remove("load-end")

        // inicia o router só depois da animação
        MPSO.initRouter()
        // criarAnimacao('#m-header .icon', "56", "56", 60)
        // criarAnimacao('#m-aside header .icon', "56", "56", 60)
    }, animationTime)
})

const create = h => [...Object.assign(document.createElement("template"), { innerHTML: h.trim() }).content.children];

// --- Código principal ---

// Lista de tamanhos de tela
const screenSizes = [
  { label: "Padrão",  cls: "screen-size-default" },
  { label: "SVGA",    cls: "screen-size-svga" },
  { label: "HD",      cls: "screen-size-hd" },
  { label: "Full HD", cls: "screen-size-fullhd" },
  { label: "Mobile",  cls: "screen-size-mobile" }
];

// Cria a janela flutuante
const windowEl = create(`
  <div class="floating-window glass">
    <h3>Tamanho da Tela</h3>
    <form class="screen-selector"></form>
  </div>
`)[0];

// Adiciona os botões de rádio
const form = windowEl.$('.screen-selector');

screenSizes.forEach(({ label, cls }, i) => {
  const id = `radio-${cls}`;
  const item = create(`
    <label for="${id}">
      <input type="radio" name="screen-size" id="${id}" value="${cls}" ${i === 4 ? "checked" : ""}>
      ${label}
    </label>
  `)[0];
  form.appendChild(item);
});

// Estilos básicos da janela
const stylee = document.createElement("style");
stylee.textContent = `
  .floating-window {
    position: fixed;
    bottom: 16px;
    right: 16px;
    padding: 12px 16px;
    border-radius: 12px;

    font-family: sans-serif;
    font-size: 14px;
    z-index: 9999;
    user-select: none;
  }

  .floating-window h3 {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 600;
  }

  .floating-window label {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 4px 0;
    cursor: pointer;
  }

  .floating-window input[type="radio"] {
    accent-color: #09f;
  }
`;
document.head.appendChild(stylee);

// Lógica de troca de classe no body
form.addEventListener('change', e => {
  if (!e.target.matches('input[type="radio"]')) return;
  const cls = e.target.value;

  // Remove todas as classes de tamanho
  screenSizes.forEach(s => document.body.classList.remove(s.cls));

  // Adiciona a selecionada
  document.body.classList.add(cls);
});

// Adiciona a janela ao body
// document.body.appendChild(windowEl);
