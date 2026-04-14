// ─── Fill navigation ───────────────────────────────────────
$("#m-aside .piece-items").innerHTML = MPSO.views
    .filter(v => v.showInNavigation)
    .map((v, i) => `
        <label class="piece-item piece-surface" onclick="location.hash='${MPSO.globalFns.normalize(v.name)}'">
            <span class="
                piece-indicator piece-surface piece-parent
                background-color-auto-02 background-color-auto-04-hover
                background-color-auto-11-active background-color-auto-13-hover-active
                piece-s-40 piece-background-color-secondary-active ripple-color-auto-00
            "></span>
            <span class="material-symbols-rounded piece-icon" translate="no">${v.icon}</span>
            <span class="piece-label">${v.name}</span>
            <input id="nav-btn-${i}" type="radio" name="nav" value="${MPSO.globalFns.normalize(v.name)}" class="piece-controller">
        </label>
    `)
    .join("")

// ─── Boot ──────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {

    const dark = MPSO.storage.darkMode.get()
    $('body').classList.add(dark ? "piece-dark" : "piece-light")
    $('body').classList.remove(dark ? "piece-light" : "piece-dark")

    const hue = MPSO.storage.HUEMainColor.get()
    $('html').style.setProperty('--piece-main-color', hue)

    MPSO.offline.init()

    setTimeout(() => {
        $("body>.animation-container")?.remove()
        $("body").classList.remove("load-end")
        MPSO.initRouter()
    }, 2500)
})

// ─── Ctrl key state ────────────────────────────────────────
window.addEventListener('keydown', e => e.ctrlKey && $("body").classList.add("piece-ctrl-active"))
window.addEventListener('keyup',   e => !e.ctrlKey && $("body").classList.remove("piece-ctrl-active"))
window.addEventListener('blur',    e => $("body").classList.remove("piece-ctrl-active"))

// ─── Screen size ───────────────────────────────────────────
const developerMode = MPSO.storage.devMode.get()
const screenSize    = MPSO.storage.screenSize.get()
$('body').classList.add(`screen-size-${developerMode ? screenSize : "default"}`)
