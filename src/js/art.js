const art = {}

art.pages = []

art.devMode = {
    get(){
        return JSON.parse(localStorage.art).devMode
    },
    set(){
        let LocalStorageArt = JSON.parse(localStorage.art)
        LocalStorageArt.devMode = !LocalStorageArt.devMode
        localStorage.art = JSON.stringify(LocalStorageArt)
    }
}

art.darkMode = {
    get(){
        return JSON.parse(localStorage.art).dark
    },
    set(){
        let LocalStorageArt = JSON.parse(localStorage.art)
        LocalStorageArt.dark = !LocalStorageArt.dark
        localStorage.art = JSON.stringify(LocalStorageArt)
    }
}
art.HUEMainColor = {
    get(){
        return JSON.parse(localStorage.art).HUEMainColor
    },
    set(value){
        let LocalStorageArt = JSON.parse(localStorage.art)
        LocalStorageArt.HUEMainColor = value
        localStorage.art = JSON.stringify(LocalStorageArt)
    }
}
art.paleta = {
    get(){
        return JSON.parse(localStorage.art).paleta
    },
    set(value){
        let LocalStorageArt = JSON.parse(localStorage.art)
        LocalStorageArt.paleta = value
        localStorage.art = JSON.stringify(LocalStorageArt)
    }
}
art.fontSize = {
    get(){
        return JSON.parse(localStorage.art).paleta
    },
    set(value){
        let LocalStorageArt = JSON.parse(localStorage.art)
        LocalStorageArt.fontSize = value
        localStorage.art = JSON.stringify(LocalStorageArt)
    }
}
art.presentation = {
    get(){
        return JSON.parse(localStorage.art).presentation
    },
    set(value){
        let LocalStorageArt = JSON.parse(localStorage.art)
        LocalStorageArt.presentation = value
        localStorage.art = JSON.stringify(LocalStorageArt)
    }
}
art.favoritos = {
    get() {
        return JSON.parse(localStorage.art).favoritos
    },
    set(value){
        let LocalStorageArt = JSON.parse(localStorage.art)
        LocalStorageArt.favoritos = LocalStorageArt.favoritos.includes(value) ? LocalStorageArt.favoritos.filter(f=>f!=value) : [...LocalStorageArt.favoritos, value]
        localStorage.art = JSON.stringify(LocalStorageArt)
    }
}

art.mainApp = function(appName) {
    let LocalStorageArt = JSON.parse(localStorage.art)
    LocalStorageArt.mainApp = appName
    localStorage.art = JSON.stringify(LocalStorageArt)
}

function defineLocalStorage(){

    //se art n existe cria
    if(!!!localStorage.art) localStorage.art = JSON.stringify({})

    let LocalStorageArt = JSON.parse(localStorage.art)

    if(LocalStorageArt.apps == null) LocalStorageArt.apps = {}
    if(LocalStorageArt.dark == null) LocalStorageArt.dark = true
    if(LocalStorageArt.HUEMainColor == null) LocalStorageArt.HUEMainColor = 248
    if(LocalStorageArt.paleta == null) LocalStorageArt.paleta = "analoga"
    if(LocalStorageArt.fontSize == null) LocalStorageArt.fontSize = 1
    if(LocalStorageArt.favoritos == null) LocalStorageArt.favoritos = []
    if(LocalStorageArt.presentation == null) LocalStorageArt.presentation = "null"
    if(LocalStorageArt.developerMode == null) LocalStorageArt.developerMode = false
    if(LocalStorageArt.mainApp == null) LocalStorageArt.mainApp = null

    return JSON.stringify(LocalStorageArt)
}

//Cria art no localStorage caso não exista
localStorage.art = defineLocalStorage()