// piece-tooltip — smart position:fixed placement
// Automatically picks the side with most available space.
// Repositions on resize, hides on scroll.
;(function () {
    const GAP = 6
    let currentAnchor  = null
    let currentTooltip = null

    function positionTooltip(anchor, tooltip) {
        const r  = anchor.getBoundingClientRect()
        const tw = tooltip.offsetWidth
        const th = tooltip.offsetHeight
        const vw = window.innerWidth
        const vh = window.innerHeight

        const spaceBottom = vh - r.bottom
        const spaceTop    = r.top
        const spaceRight  = vw - r.right
        const spaceLeft   = r.left

        // Prefer top/bottom — only fall back to left/right if neither fits
        const needV = th + GAP
        let top, left

        if (spaceBottom >= needV || spaceTop >= needV) {
            // vertical placement: pick the side with more room
            if (spaceBottom >= spaceTop) {
                top  = r.bottom + GAP
                left = r.left + r.width  / 2 - tw / 2
            } else {
                top  = r.top - th - GAP
                left = r.left + r.width  / 2 - tw / 2
            }
        } else {
            // fallback to horizontal only when vertical truly doesn't fit
            if (spaceRight >= spaceLeft) {
                top  = r.top + r.height / 2 - th / 2
                left = r.right + GAP
            } else {
                top  = r.top + r.height / 2 - th / 2
                left = r.left - tw - GAP
            }
        }

        // Clamp within viewport
        left = Math.max(4, Math.min(left, vw - tw - 4))
        top  = Math.max(4, Math.min(top,  vh - th - 4))

        tooltip.style.top  = top  + 'px'
        tooltip.style.left = left + 'px'
        tooltip.style.opacity = '1'
    }

    document.addEventListener('mouseenter', e => {
        const tooltip = e.target.querySelector(':scope > .piece-tooltip')
        if (!tooltip) return
        currentAnchor  = e.target
        currentTooltip = tooltip
        positionTooltip(e.target, tooltip)
    }, true)

    document.addEventListener('mouseleave', e => {
        const tooltip = e.target.querySelector(':scope > .piece-tooltip')
        if (!tooltip) return
        tooltip.style.opacity = '0'
        if (currentTooltip === tooltip) {
            currentAnchor  = null
            currentTooltip = null
        }
    }, true)

    // Reposition on resize — recalculates side with most space too
    window.addEventListener('resize', () => {
        if (currentAnchor && currentTooltip) {
            positionTooltip(currentAnchor, currentTooltip)
        }
    })

    // Hide on scroll — element moved, cursor is no longer hovering correctly
    window.addEventListener('scroll', () => {
        if (!currentTooltip) return
        currentTooltip.style.opacity = '0'
        currentAnchor  = null
        currentTooltip = null
    }, true)
})()
