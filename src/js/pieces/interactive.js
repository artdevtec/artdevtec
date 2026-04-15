// piece-interactive — toggle piece-actived + anchor fixed menus
document.addEventListener('click', e => {
    document.querySelectorAll('.piece-interactive').forEach(el => {
        const clickedInside      = el.contains(e.target)
        const clickedNotInteract = e.target.closest('.piece-not-interactive')
        const shouldDeactivate   = !clickedInside || clickedNotInteract

        el.classList.toggle('piece-actived', !shouldDeactivate)

        // Position .piece-menu (position:fixed) relative to the element bounds
        if (!shouldDeactivate) {
            const menu = el.querySelector('.piece-menu')
            if (menu) {
                const r          = el.getBoundingClientRect()
                menu.style.top      = (r.bottom + 4) + 'px'
                menu.style.left     = r.left + 'px'
                menu.style.minWidth = r.width + 'px'
            }
        }
    })
})
