// copy-code — injeta botão de copiar em todo <pre id="*-code">
;(function () {

    function inject(pre) {
        if (pre.dataset.copyInjected) return
        pre.dataset.copyInjected = '1'

        const wrap = pre.parentElement
        wrap.style.position = 'relative'

        const btn = document.createElement('button')
        btn.className = [
            'piece-icon-button piece-extra-small piece-surface piece-s-40 piece-secondary',
            'background-color-auto-04 background-color-auto-06-hover',
            'text-color-auto-16 text-color-auto-18-hover',
        ].join(' ')
        btn.title = 'Copiar código'
        btn.style.cssText = 'position:absolute;top:8px;right:8px;'
        btn.innerHTML = `
            <span class="material-symbols-rounded piece-icon" translate="no">content_copy</span>
            <span class="piece-ripple"></span>`

        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
                const icon = btn.querySelector('.material-symbols-rounded')
                icon.textContent = 'check'
                btn.classList.add('piece-actived')
                setTimeout(() => {
                    icon.textContent = 'content_copy'
                    btn.classList.remove('piece-actived')
                }, 2000)
            })
        })

        wrap.appendChild(btn)
    }

    function scan(root) {
        root.querySelectorAll('pre[id$="-code"]').forEach(inject)
    }

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

})()
