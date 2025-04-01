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
.forEach(page=>{
    const template = `
        <label class="
            piece-nav-button
            piece-surface
            background-color-088
            background-color-084-hover
            text-color-012

            background-color-secondary-active
            text-color-secondary-active
            
            ripple-color-056
            piece-icon-active
        ">
            <input type="radio" name="nav" value="${page.name}" class="piece-controller">
            <span class="material-symbols-rounded piece-icon" translate="no">${page.icon}</span>
            <span class="piece-label">${page.name}</span>
            <span class="piece-ripple secondary"></span>
            <span class="piece-tooltip piece-surface background-color-096 text-color-004 inverse right hover">${page.name}</span>
        </label>
    `
    document.querySelector(`#m-nav`).appendChild(tools.create(template))
})
document.querySelectorAll("#m-nav input").forEach(input=>{
    input.addEventListener('click', ()=> {
        art.pages.filter(page=>page.name==input.value)[0].main()
    })
})
document.querySelector('#m-nav .piece-nav-button').click()

document.addEventListener("click", (event)=>{
    if(event.target.classList.contains("presentation")) art.presentation.set(event.target.innerHTML)
})