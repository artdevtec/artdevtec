// ─────────────────────────────────────────────────────────────
//  piece-toast — dispara toasts posicionados corretamente
//
//  ▸ Se mobile (≤768px): sobe acima da bottom bar (#m-aside)
//  ▸ Se desktop: 16px do rodapé
//  ▸ Só um toast ativo por vez
// ─────────────────────────────────────────────────────────────

const PieceToast = {
    _active:  null,
    _timeout: null,

    show(message, icon = '') {
        // Cancela toast anterior se existir
        if (this._active) {
            clearTimeout(this._timeout)
            this._active.remove()
            this._active = null
        }

        // Calcula bottom baseado na bottom bar (mobile) ou padrão (desktop)
        // Usa body.offsetWidth para respeitar as classes screen-size-* (container queries)
        // Breakpoint 799px espelha o @container (max-width: 799px) da navigation
        const isMobile = document.body.offsetWidth <= 799
        const nav      = document.getElementById('m-aside')
        const navH     = (isMobile && nav) ? nav.offsetHeight : 0
        const bottom   = navH + 16

        // Monta o elemento
        const el = document.createElement('div')
        el.className = 'piece-toast piece-surface background-color-inverse-00 text-color-inverse-25 piece-toast-enter'
        el.style.bottom = bottom + 'px'

        if (icon) {
            const ic = document.createElement('span')
            ic.className = 'material-symbols-rounded piece-icon'
            ic.setAttribute('translate', 'no')
            ic.textContent = icon
            el.appendChild(ic)
        }

        const lbl = document.createElement('span')
        lbl.className = 'piece-label'
        lbl.textContent = message
        el.appendChild(lbl)

        document.body.appendChild(el)
        this._active = el

        // Após 2.5s → animação de saída → remove
        this._timeout = setTimeout(() => {
            el.classList.remove('piece-toast-enter')
            el.classList.add('piece-toast-exit')
            el.addEventListener('animationend', () => {
                if (this._active === el) this._active = null
                el.remove()
            }, { once: true })
        }, 2500)
    }
}
