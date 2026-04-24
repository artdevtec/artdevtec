// ─── Registry global ────────────────────────────────────────────────────────
window.CompPages = {}

// ─── Helpers compartilhados por todos os arquivos de componente ──────────────
window.H = {

    create: h => MPSO.globalFns.create(h),

    header(name, desc, file) {
        return /*html*/`
        <div class="comp-page-header">
            <button class="comp-back-btn piece-surface text-color-auto-16"
                onclick="location.hash='componentes'">
                <span class="material-symbols-rounded" style="font-size:18px;" translate="no">arrow_back</span>
                Componentes
            </button>
            <h1 class="comp-page-title text-color-auto-21">${name}</h1>
            <p class="comp-page-desc">${desc}</p>
            <span class="comp-file-tag piece-surface background-color-auto-06 text-color-auto-14">${file}</span>
        </div>`
    },

    section(title) {
        return `<p class="comp-section-title text-color-auto-14">${title}</p>`
    },

    demo(label, demoHtml, codeStr) {
        return /*html*/`
        <div class="comp-demo-card piece-surface background-color-auto-04">
            ${label ? `<p class="comp-demo-label text-color-auto-21">${label}</p>` : ''}
            <div class="comp-demo-area piece-surface background-color-auto-02">${demoHtml}</div>
            ${codeStr ? `<pre class="comp-demo-code piece-surface background-color-auto-06 text-color-auto-16">${codeStr.trim()}</pre>` : ''}
        </div>`
    },

    ref(rows) {
        return /*html*/`
        <div class="comp-class-table">
            ${rows.map((r, i) => `
            <div class="comp-class-row piece-surface ${i%2===0?'background-color-auto-04':'background-color-auto-06'}">
                <span class="comp-class-name text-color-auto-18">${r[0]}</span>
                <span class="comp-class-desc">${r[1]}</span>
            </div>`).join("")}
        </div>`
    },

    render(c, ...htmlParts) {
        c.appendAll(H.create(htmlParts.join("")))
    }
}

// ─── Catálogo de componentes ─────────────────────────────────────────────────
const CATALOG = [
    { id: "surface",       name: "Surface",            icon: "layers",               file: "surface.css"           },
    { id: "theme",         name: "Theme",              icon: "palette",              file: "theme.css"             },
    { id: "button",        name: "Button",             icon: "smart_button",         file: "button.css"            },
    { id: "group-button",  name: "Group Button",       icon: "view_agenda",          file: "button.css"            },
    { id: "icon-button",   name: "Icon Button",        icon: "touch_app",            file: "icon-button.css"       },
    { id: "fab",           name: "FAB",                icon: "add_circle",           file: "FAB.css"               },
    { id: "fab-menu",      name: "FAB Menu",           icon: "speed_dial",           file: "FAB-menu.css"          },
    { id: "split-button",  name: "Split Button",       icon: "call_split",           file: "split-button.css"      },
    { id: "checkbox",      name: "Checkbox",           icon: "check_box",            file: "checkbox.css"          },
    { id: "radio",         name: "Radio",              icon: "radio_button_checked", file: "radio.css"             },
    { id: "switch",        name: "Switch",             icon: "toggle_on",            file: "switch.css"            },
    { id: "text-field",    name: "Text Field",         icon: "text_fields",          file: "text-field.css"        },
    { id: "textarea",      name: "Textarea",           icon: "notes",                file: "textarea.css"          },
    { id: "search",        name: "Search",             icon: "search",               file: "search.css"            },
    { id: "navigation",    name: "Navigation",         icon: "bottom_navigation",    file: "navigation.css"        },
    { id: "menu",          name: "Menu",               icon: "menu_open",            file: "menu.css"              },
    { id: "divider",       name: "Divider",            icon: "horizontal_rule",      file: "divider.css"           },
    { id: "badge",         name: "Badge",              icon: "counter_1",            file: "badge.css"             },
    { id: "tooltip",       name: "Tooltip",            icon: "tooltip",              file: "tooltip.css"           },
    { id: "snackbar",      name: "Snackbar",           icon: "notifications",        file: "snackbar.css"          },
    { id: "toast",         name: "Toast",              icon: "info",                 file: "toast.css"             },
    { id: "table",         name: "Table",              icon: "table",                file: "table.css"             },
    { id: "progress",      name: "Progress Indicator", icon: "progress_activity",    file: "progressIndicator.css" },
    { id: "ripple",        name: "Ripple",             icon: "water_drop",           file: "ripple.css"            },
]

// ─── View MPSO ───────────────────────────────────────────────────────────────
MPSO.newView({
    name: "Componentes",
    icon: "widgets",
    showInNavigation: true,

    main(params) {
        const section = $("#m-main section")
        section.className = "piece-surface background-color-auto-02"
        section.innerHTML = `<div class="comp-scroll"></div>`

        const id     = params[0]
        const scroll = $("#m-main .comp-scroll")

        // scroll to top ao trocar de view
        $("#m-main").scrollTop = 0

        if (id && CompPages[id]) {
            CompPages[id](scroll)
        } else {
            this.renderOverview(scroll)
        }
    },

    renderOverview(c) {
        const cards = CATALOG.map((comp, i) => `
            <a class="inicio-comp-card piece-surface background-color-auto-02 piece-border border-color-auto-06 background-color-auto-03-hover"
               onclick="location.hash='componentes/${comp.id}'">
                <div class="comp-icon piece-surface piece-s-40 background-color-auto-06 text-color-auto-18
                    ${i % 3 === 0 ? 'piece-primary' : i % 3 === 1 ? 'piece-secondary' : 'piece-tertiary'}">
                    <span class="material-symbols-rounded" translate="no">${comp.icon}</span>
                </div>
                <span class="comp-name text-color-auto-21">${comp.name}</span>
                <span class="comp-file">${comp.file}</span>
            </a>
        `).join("")

        c.appendAll(H.create(`
            <p class="comp-section-title text-color-auto-14" style="margin-bottom:4px;">
                ${CATALOG.length} componentes
            </p>
            <div id="inicio-grid">${cards}</div>
        `))
    }
})
