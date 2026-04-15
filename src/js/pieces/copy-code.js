// copy-code — injeta botão de copiar em todo <pre id="*-code">
;(function () {

    function inject(pre) {
        if (pre.dataset.copyInjected) return
        pre.dataset.copyInjected = '1'

        const btn = document.createElement('button')
        btn.className = [
            'piece-button piece-small piece-surface piece-s-40 piece-secondary',
            'background-color-auto-04 background-color-auto-06-hover',
            'text-color-auto-16 text-color-auto-18-hover',
        ].join(' ')
        btn.innerHTML = `
            <span class="material-symbols-rounded piece-icon" translate="no" style="pointer-events:none">content_copy</span>
            <span class="piece-label" style="pointer-events:none">Copiar</span>
            <span class="piece-ripple"></span>`

        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
                const icon  = btn.querySelector('.material-symbols-rounded')
                const label = btn.querySelector('.piece-label')
                icon.textContent  = 'check'
                label.textContent = 'Copiado'
                btn.classList.add('piece-actived')
                setTimeout(() => {
                    icon.textContent  = 'content_copy'
                    label.textContent = 'Copiar'
                    btn.classList.remove('piece-actived')
                }, 2000)
            })
        })

        const bar = document.createElement('div')
        bar.style.cssText = 'display:flex;justify-content:flex-end;'
        pre.parentNode.insertBefore(bar, pre)
        bar.appendChild(btn)
    }

    function scan(root) {
        root.querySelectorAll('pre[id$="-code"]').forEach(inject)
    }

    function init() {
        scan(document)
        new MutationObserver(mutations => {
            for (const m of mutations) {
                m.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return
                    if (node.matches?.('pre[id$="-code"]')) inject(node)
                    else scan(node)
                })
            }
        }).observe(document.body, { childList: true, subtree: true })
    }

    if (document.body) init()
    else document.addEventListener('DOMContentLoaded', init)

})()
