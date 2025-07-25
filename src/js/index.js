//Define o tema claro ou escuro
if(localStorage.art) {
    if(art.darkMode.get()) document.body.classList.add("dark")
    else document.body.classList.add("light")
}

//Define o Hue
document.querySelector("html").style.setProperty('--main-color', art.HUEMainColor.get())
//Define o paleta
document.body.classList.add(art.paleta.get())

// Fill m-nav
art.pages
.filter(page=>page.showInNavigation)
.forEach((page, i)=>{
    const template = /*html*/`
        <label class="piece-item piece-surface">
            <span class="
                piece-indicator
                piece-surface
                piece-parent

                background-color-auto-02
                background-color-auto-04-hover

                text-color-auto-04-hover

                background-color-auto-11-active
                background-color-auto-13-hover-active
            "></span>
            <span class="material-symbols-rounded piece-icon" translate="no">${page.icon}</span>
            <span class="piece-label">${page.name}</span>
            <input id="nav-btn-${i}" type="radio" name="nav" value="${page.name}" class="piece-controller">
        </label>
    `
    document.querySelector(`#m-aside .piece-items`).appendChild(tools.create(template))
})
document.querySelectorAll(".piece-items input").forEach(input=>{
    input.addEventListener('click', ()=> {
        art.pages.filter(page=>page.name==input.value)[0].main()
    })
})
document.querySelector('#m-aside .piece-item').click()