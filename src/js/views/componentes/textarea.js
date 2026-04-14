CompPages["textarea"] = function(c) {

    const mkTA = (color, placeholder, label, rows) => {
        return `<div class="piece-textarea ${color}" style="max-width:360px;width:100%;">
            <div class="piece-surface piece-s-40 background-color-auto-04 border-color-auto-08">
                <textarea rows="${rows || 4}" placeholder="${placeholder}" class="text-color-auto-21"></textarea>
                <label class="piece-label text-color-auto-14" style="padding:4px 16px;font-size:12px;font-weight:600;">${label}</label>
            </div>
        </div>`
    }

    H.render(c,
        H.header("Textarea", "Campo de texto multilinha com borda e foco. A label fica acima do textarea.", "textarea.css"),

        H.section("DEMO"),
        H.demo("Primary",
            mkTA('piece-primary','Digite sua mensagem...','Mensagem', 4),
            `<div class="piece-textarea piece-primary">
    <div class="piece-surface piece-s-40 background-color-auto-04 border-color-auto-08">
        <textarea rows="4" placeholder="Digite aqui..." class="text-color-auto-21"></textarea>
        <label class="piece-label text-color-auto-14">Mensagem</label>
    </div>
</div>`
        ),

        H.section("PALETAS"),
        H.demo(null,
            `<div style="display:flex;gap:16px;flex-wrap:wrap;">
                ${['piece-primary','piece-secondary','piece-tertiary'].map(p =>
                    mkTA(p, `${p.replace('piece-','')}...`, p.replace('piece-',''), 3)
                ).join('')}
            </div>`,
            null
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-textarea",          "Container raiz"],
            ["> div (1º filho)",         "Borda arredondada, cursor text, borda 1px → 2px no focus"],
            ["textarea",                 "all:unset + resize:none + padding 17px"],
            [".piece-label",             "Rótulo acima do textarea (order:-1 via CSS)"],
            ["border-color-auto-08",     "Cor da borda em repouso"],
            ["border-color-auto-11",     "Cor da borda quando focado (via :has(textarea:focus))"],
        ])
    )
}
