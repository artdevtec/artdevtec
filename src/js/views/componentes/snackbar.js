CompPages["snackbar"] = function(c) {

    H.render(c,
        H.header("Snackbar", "Notificação temporária fixada no canto inferior. Contém rótulo e opcionalmente um botão de ação.", "snackbar.css"),

        H.section("DEMO — Estáticos (sem posicionamento fixed)"),
        H.demo("Simples",
            `<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02"
                  style="position:relative;bottom:auto;left:auto;display:inline-flex;width:auto;min-width:240px;">
                <span class="label">Arquivo salvo com sucesso</span>
            </div>`,
            `<!-- Em produção: position:fixed; bottom:16px; left:16px; -->
<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02">
    <span class="label">Arquivo salvo com sucesso</span>
</div>`
        ),

        H.demo("Com botão de ação",
            `<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02"
                  style="position:relative;bottom:auto;left:auto;display:inline-flex;width:auto;min-width:240px;">
                <span class="label">Mensagem enviada</span>
                <button class="piece-button piece-small piece-surface piece-s-40 background-color-auto-18 background-color-auto-17-hover text-color-auto-11 ripple-color-auto-11 piece-primary piece-text"
                        style="min-width:auto;padding:0 8px;">
                    <span class="piece-ripple"></span>
                    <span class="piece-label">Desfazer</span>
                </button>
            </div>`,
            `<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02">
    <span class="label">Mensagem enviada</span>
    <button class="piece-button piece-small ... piece-text">
        <span class="piece-label">Desfazer</span>
    </button>
</div>`
        ),

        H.demo("Com ícone de fechar",
            `<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02"
                  style="position:relative;bottom:auto;left:auto;display:inline-flex;width:auto;min-width:240px;">
                <span class="label">Erro ao conectar</span>
                <div class="piece-icon-button piece-small piece-surface background-color-auto-18 background-color-auto-17-hover text-color-auto-02 ripple-color-auto-02"
                     style="width:36px;height:36px;border-radius:50%;display:grid;place-content:center;cursor:pointer;flex-shrink:0;">
                    <span class="material-symbols-rounded" style="font-size:18px;" translate="no">close</span>
                </div>
            </div>`,
            `<div class="piece-snackbar piece-surface background-color-auto-18 text-color-auto-02">
    <span class="label">Erro ao conectar</span>
    <div class="piece-icon-button piece-small ...">
        <span class="material-symbols-rounded">close</span>
    </div>
</div>`
        ),

        H.section("POSICIONAMENTO — Em uso real"),
        H.demo(null,
            `<div class="piece-surface background-color-auto-04" style="border-radius:16px;padding:16px;font-size:13px;line-height:1.7;">
                <p>O snackbar usa <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">position:fixed; bottom:16px; left:16px;</code></p>
                <p>Para mostrá-lo, adicione a classe <code style="font-family:monospace;background:rgba(128,128,128,.15);padding:1px 6px;border-radius:4px;">piece-visible</code> ou controle com JS/CSS transition.</p>
            </div>`,
            null
        ),

        H.section("REFERÊNCIA DE CLASSES"),
        H.ref([
            [".piece-snackbar",           "Barra de notificação — position:fixed, bottom:16px, left:16px"],
            [".label",                    "Texto principal da notificação"],
            ["background-color-auto-18",  "Fundo invertido (contraste com a tela)"],
            ["text-color-auto-02",        "Texto claro sobre fundo escuro"],
        ])
    )
}
