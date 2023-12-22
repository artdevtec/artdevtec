//disabled
document.addEventListener("click", function(event) {
    let target = event.target.classList.contains('disabled')
    if(target) {
        event.stopImmediatePropagation()
        event.preventDefault()
    }
})

//Ripple
document.addEventListener("click", function(event) {
    let target = event.target.children
    Array.from(target).forEach((c) => {
        if(c.classList.contains("ripple")){

            let x,y

            if(event.pointerType == "") {
                const a = event.target.getBoundingClientRect()
                x = a.width/2
                y = a.height/2
            }
            else {
                x = event.offsetX
                y = event.offsetY
            }

            
            const w = event.target.offsetWidth
            
            const effect = document.createElement("span")
            c.appendChild(effect)

            effect.className = 'effect'
            effect.style.left = x + 'px'
            effect.style.top  = y + 'px'
            effect.style.setProperty('--scale', w)
            
            effect.onanimationend = () => effect.remove()
        }
    })
})

// chip filter list
document.addEventListener("click", function(event) {

    const target = event.target

    let isChip = ["md-chip", "filter", "list"].every(className => [...target.classList].includes(className))
    if(isChip) { 
        const posicaoReferencia = target.getBoundingClientRect();
        target.querySelector("[popover]").style.left = posicaoReferencia.left + window.scrollX +'px';
        target.querySelector("[popover]").style.top = posicaoReferencia.bottom + window.scrollY + 4 +'px';
        return false
    }
    
    const isRadioPop = target?.type == "radio" && !!document.querySelector(`#${target.name}`)
    if(isRadioPop) {
        // const chip = document.querySelector(`.md-chip.filter.list[popovertarget="${target.name}"]`)
        const chip = document.querySelector(`.md-chip.filter[popovertarget="${target.name}"]`)

        const label = chip.querySelector(".label")
        label.innerText = target.value

        const popover = chip.querySelector(`[popover]`)
        if(target.dataset.default != undefined) setTimeout(()=>popover.hidePopover(),0)
    }
})