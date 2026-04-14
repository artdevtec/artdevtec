CompPages["table"] = function(c) {

    const mkTable = (size, data) => {
        const rows = data.map(row =>
            `<tr class="piece-surface background-color-auto-04">
                ${row.map(cell => `<td style="padding:4px 12px;">${cell}</td>`).join('')}
            </tr>`
        ).join('')

        return `<table class="piece-table ${size} piece-surface" style="width:100%;">
            <thead class="piece-surface background-color-auto-06">
                <tr>
                    <th style="padding:4px 12px;text-align:left;">Nome</th>
                    <th style="padding:4px 12px;text-align:left;">Tipo</th>
                    <th style="padding:4px 12px;text-align:left;">Status</th>
                    <th style="padding:4px 12px;text-align:right;">Valor</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
            <tfoot class="piece-surface background-color-auto-06">
                <tr>
                    <td colspan="3" style="padding:4px 12px;font-weight:700;">Total</td>
                    <td style="padding:4px 12px;text-align:right;font-weight:700;">R$ 3.450</td>
                </tr>
            </tfoot>
        </table>`
    }

    const data = [
        ['Alpha','Componente','Ativo','R$ 1.200'],
        ['Beta','Surface','Em uso','R$ 980'],
        ['Gamma','Utility','Pendente','R$ 1.270'],
    ]

    const sizes = ['piece-extra-small','piece-small','piece-medium','piece-large','piece-extra-large']
    const sizeLabels = ['Extra Small (40px)','Small (43px)','Medium (46px)','Large (49px)','Extra Large (52px)']

    H.render(c,
        H.header("Table", "Tabela de dados com cabeçalho, corpo e rodapé. 5 tamanhos controlam a altura das linhas.", "table.css"),

        H.section("MEDIUM — Com cabeçalho e rodapé"),
        H.demo(null,
            mkTable('piece-medium', data),
            `<table class="piece-table piece-medium piece-surface">
    <thead class="piece-surface background-color-auto-06">
        <tr><th>Nome</th><th>Status</th></tr>
    </thead>
    <tbody>
        <tr class="piece-surface background-color-auto-04">
            <td>Alpha</td><td>Ativo</td>
        </tr>
    </tbody>
    <tfoot class="piece-surface background-color-auto-06">
        <tr><td colspan="2">Total: R$ 3.450</td></tr>
    </tfoot>
</table>`
        ),

        H.section("TODOS OS TAMANHOS"),
        ...sizes.map((s, i) =>
            H.demo(sizeLabels[i],
                mkTable(s, [data[0]]),
                null
            )
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-table",         "Tabela base — display:table, border-collapse:separate, border-spacing:1px"],
            [".piece-extra-small",   "Linhas tbody 40px, cabeçalho/rodapé 52px"],
            [".piece-small",         "Linhas 43px, cabeçalho/rodapé 55px"],
            [".piece-medium",        "Linhas 46px, cabeçalho/rodapé 58px"],
            [".piece-large",         "Linhas 49px, cabeçalho/rodapé 61px"],
            [".piece-extra-large",   "Linhas 52px, cabeçalho/rodapé 64px"],
            [".piece-center",        "Alinhamento central de célula"],
            [".piece-justify",       "text-align-last: justify"],
        ])
    )
}
