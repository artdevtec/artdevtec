art.pages.push({
    name: 'Material',
    icon: 'extension',
    showInNavigation: true,
    main() {
        //m-header
        document.querySelector('#m-header #titulo h2').innerText = this.name
        //m-main
        const mMain = document.querySelector(`#m-main`)
        //inserir m-layout da pagina
        mMain.innerHTML = /*html*/`
            <section id="page-material" class="piece-surface background-color-096 text-color-004">
                <style>
                    #page-material {
                        #dad {
                            display: grid;
                            place-content: center;
                            place-self: center;
                            gap: 16px;
                            grid-template-columns: repeat(2, auto);
                            width: 300px;
                            height: 300px;
                            border-radius: 50px;
                            border-width: 16px;
                            border-style: solid;
                            transition: .3s;

                            &:has(input:checked) {
                                .piece-parent {
                                    height: 100px;
                                }
                            }
                        }

                        input { display: none;}

                        .piece-parent {
                            width: 50px;
                            height: 10px;
                            border-radius: 16px;
                            transition: .3s;
                        }
                    }
                </style>
                <label id="dad" class="
                    piece-surface
                    
                    background-color-080

                    background-color-secondary-active
                    background-color-056-active

                    surface-border-color-secondary-active
                    border-color-088
                    border-color-028-active

                    ripple-color-056
                    ripple-color-100-active
                ">
                    <span class="piece-ripple"></span>
                    <input type="checkbox" class="piece-controller"/>
                    <div id="first" class="piece-surface background-color-092 piece-parent"></div>
                    <div id="last" class="piece-surface background-color-092 piece-parent"></div>
                </label>
                <style>
                    .prop {border-radius: 8px;padding: 0 8px;}
                    .p16 {margin-left: 16px;}
                    .p32 {margin-left: 32px;}
                </style>
                <pre style="display: grid; gap: 4px; place-items: start; place-self: start;">
                    <b>&lt;label class="</b>
                        <b class="piece-surface background-color-088 text-color-012 prop p16 inverse">piece-surface</b>
                        <b class="piece-surface background-color-080 text-color-020 prop p16">background-color-080</b>

                        <b class="piece-surface background-color-080 text-color-020 background-color-secondary prop p16 secondary">background-color-secondary-active</b>
                        <b class="piece-surface background-color-056 background-color-secondary text-color-secondary text-color-100 prop p16">background-color-056-active</b>
                        
                        <b class="piece-surface background-color-088 text-color-012 prop p16">border-color-mg</b>
                        <b class="piece-surface background-color-056 text-color-100 prop p16">border-color-accent-active</b>
                        <b class="piece-surface background-color-056 text-color-100 prop p16 background-color-secondary text-color-secondary">border-color-secondary-active</b>
                        
                        <b class="piece-surface background-color-088 text-color-012 prop p16 inverse">ripple-to-fg</b>
                        <b class="piece-surface background-color-088 text-color-012 prop p16 inverse">ripple-to-accent-active</b>
                    <b class="aaaaaaaaaaa">"&gt;</b>
                        <b class="p16">&lt;span class="<b class="piece-surface background-color-056 text-color-100 prop tertiary">piece-ripple</b>"&gt;&lt;/span&gt;</b>
                        <b class="p16">&lt;input type="checkbox" class="<b class="piece-surface background-color-056 text-color-100 prop">surface-controller</b>"&gt;</b>
                        <b class="p16">&lt;span class="</b>
                            <b class="piece-surface background-color-080 text-color-020 prop p32 secondary">active-indicator</b>
                            <b class="piece-surface background-color-056 text-color-100 prop p32">piece-surface</b>
                            <b class="piece-surface background-color-056 text-color-100 prop p32">surface-parent</b>
                        <b class="p16">">&lt;/span&gt;</b>
                    <b class="aaaaaaaaaaa">&lt;/label&gt;</b>
                </pre>
            </section>
        `
    }
})