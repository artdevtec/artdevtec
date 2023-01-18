const art = {}

art.info = {
	log: [
		{type: 1, description: `Material Development`, date: `01/12/2022`}
	]
}

art.logo = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="48" height="48"><defs><path d="M18 18h3v3h-3v-3Z" id="e"/><path d="M18 3h3v3h-3V3Z" id="c"/><path d="M3 18h3v3H3v-3Z" id="d"/><path d="M18 6 6 18" id="b"/><path d="m12 12 6 6" id="a"/></defs><use xlink:href="#a" fill-opacity="0" stroke="#000"/><use xlink:href="#b" fill-opacity="0" stroke="#000"/><use xlink:href="#c" fill-opacity="0" stroke="#000"/><use xlink:href="#d" fill-opacity="0" stroke="#000"/><use xlink:href="#e" fill-opacity="0" stroke="#000"/></svg>`

art.version = function() {

	//system update
	let system = this.info.log.filter(f=>f["type"] == 1).length
	//feature update or add
	let feature = this.info.log.filter(f=>f["type"] == 2).length
	//fix bugs
	let fixBug = this.info.log.filter(f=>f["type"] == 3).length

	version = `${system}.${feature}.${fixBug}`

	return version
}

art.info.log.push({type: 2, description: `Seletor DOM`, date: `01/12/2022`})
art.$ = function(selector) {
	return document.querySelectorAll(selector)
}

art.info.log.push({type: 2, description: `Debug`, date: `01/12/2022`})
art.debug = function() {
	document.body.classList.toggle("debug")
}

art.info.log.push({type: 2, description: `Dark theme toggle`, date: `01/12/2022`})
art.dark = function() {
	this.$(`body`)[0].classList.toggle(`dark`)
}

art.info.log.push({type: 2, description: `Create element`, date: `01/12/2022`})
art.createElement = function(obj) {
	const element = document.createElement(obj.tag)
	if(obj.innerHTML) element.innerHTML = obj.innerHTML
	for(let attr in obj.setAttribute) element.setAttribute(attr, obj.setAttribute[attr])
	if(obj.output) this.$(obj.output)[0].appendChild(element)
	return element
}

art.info.log.push({type: 2, description: `Ripple`, date: `01/12/2022`})
art.ripple = function (element) {
	element.addEventListener('mousedown', function(e) {

		const x = e.offsetX;
		const y = e.offsetY;
		const w = this.offsetWidth;

		const ripple = document.createElement('span');

		ripple.className = 'effect';
		ripple.style.left = x + 'px';
		ripple.style.top  = y + 'px';
		ripple.style.setProperty('--scale', w);

		this.querySelector(".ripple").appendChild(ripple)

		ripple.onanimationend = () => ripple.parentNode.removeChild(ripple)

		e.stopPropagation()
	})
}

art.info.log.push({type: 2, description: `Append`, date: `01/12/2022`})
art.append = function(obj) {
	for(let i in obj) {
		obj[i].kids.forEach(kid => obj[i].dad.appendChild(kid))
	}
}


art.md = {}

art.styles = ["elevated", "filled", "outlined", "tonal", "disabled", "density-0", "density-1", "density-2", "density-3", "density-4", "extended", "small", "large", "secondary", "tertiary", "primary", "rail", "bar", "drawer", "md-surface-1", "md-surface-2", "md-surface-3", "md-surface-4", "md-surface-5"]

art.info.log.push({type: 2, description: `Component Button`, date: `01/12/2022`})
art.md.button = function(obj) {

	const component = {}
	const append = []

	component.button = art.createElement({tag: obj.tag ? obj.tag : `button`, setAttribute: { class: `md-button`}, output: obj.output})
	for(let attr in obj.setAttribute) component.button.setAttribute(attr, obj.setAttribute[attr])
	
	for(let prop in obj) if(art.styles.includes(prop)) component.button.classList.add(prop)
	
	let attributes = ["id", "style", "href"].forEach(attr => obj[attr] ? component.button[attr] = obj[attr] : "")
	if(obj.class) obj.class.split(" ").forEach(c=>component.button.classList.add(c))
	
	if(obj.icon) component.icon = art.createElement({ tag:`span`, setAttribute: { class: `material-symbols-outlined icon`}, innerHTML: obj.icon})
	if(obj.label) component.label = art.createElement({ tag:`span`, setAttribute: { class: `label`}, innerHTML: obj.label})
	let condicionalKids = ["icon", "label"].forEach(ck => obj[ck] ? append.push(component[ck]) : "")
	
	let parts = ["surface", "overlay", "outline", "ripple"].forEach(part => {
		append.push(component[part] = art.createElement({ tag:`span`, setAttribute: { class: part}}))
	})

	append.forEach(child => component.button.appendChild(child))

	art.ripple(component.button)
	
	return component
}
art.info.log.push({type: 3, description: `Component Button - fix - criação indevida de elementos`, date: `12/12/2022`})

art.info.log.push({type: 2, description: `Component Card`, date: `01/12/2022`})
art.md.card = function(obj) {
    
    const component = {}
    const append = []
    
    component.card = art.createElement({tag: obj.tag, innerHTML: obj.innerHTML, setAttribute: { class: "md-card"}, output: obj.output})
    for(let attr in obj.setAttribute) component.card.setAttribute(attr, obj.setAttribute[attr])
    
    for(let prop in obj) if(art.styles.includes(prop)) component.card.classList.add(prop)
	
	if(obj.id) component.card.id = obj.id
	if(obj.class) obj.class.split(" ").forEach(c=>component.card.classList.add(c))
	if(obj.style) component.card.style = obj.style
	
	let parts = ["surface", "outline"]
	let states = ["overlay", "ripple"]
	
	if(obj.states) states.forEach(part => parts.push(part))
	
	parts.forEach(part => {
	    append.push(component[part] = art.createElement({ tag: `span`, setAttribute: { class: part } }))
	})
	
	append.forEach(child => component.card.appendChild(child))
	
	if(obj.states) art.ripple(component.card)
	
	return component
}

art.info.log.push({type: 2, description: `Component TextField`, date: `02/12/2022`})
art.md.textField = function(obj) {
    
    const component = {}
    const append = []
    
    component.textField = art.createElement({ tag: `div`, setAttribute: { class: `md-text-field`}, output: obj.output })
	for(let attr in obj.setAttribute) component.textField.setAttribute(attr, obj.setAttribute[attr])
    for(let prop in obj) if(art.styles.includes(prop)) component.textField.classList.add(prop)
    
    component.main = art.createElement({ tag:`main`})
	component.outline = art.createElement({ tag:`span`, setAttribute: { class: `outline`}})
    component.input = art.createElement({ tag:`input`, setAttribute: { required: true}})

    if(obj.icon) component.icon = art.createElement({ tag:`span`, setAttribute: { class: `material-symbols-outlined icon`}, innerHTML: obj.icon})
    if(obj.label) component.label = art.createElement({ tag:`label`, innerHTML: obj.label})
    if(obj.button) component.button = art.md.button({icon: obj.button}).button
    let condicionalKids = ["icon", "label", "button"].forEach(ck => obj[ck] ? append.push({dad: component.main, kids: [component[ck]]}) : "")

	append.push({dad: component.textField, kids: [component.main]},{dad: component.main, kids: [component.outline, component.input]})

	art.append(append)

	let attributes = ["type", "value", "name", "readonly", "placeholder", "id", "style"].forEach(attr => obj[attr] ? component.input[attr] = obj[attr] : "")
	
    return component
}

art.info.log.push({type: 2, description: `Component SegmentedButton`, date: `12/12/2022`})
art.md.segmentedButton = function(obj) {
    
    const component = {}
    const append = []
    
    component.segmentedButton = art.createElement({ tag: obj.tag ? obj.tag : `div`, setAttribute: { class: `md-segmented-button`}, output: obj.output})
    
    for(let prop in obj) if(art.styles.includes(prop)) component.segmentedButton.classList.add(prop)
	
	let attributes = ["id", "style"].forEach(attr => obj[attr] ? component.segmentedButton[attr] = obj[attr] : "")
	if(obj.class) obj.class.split(" ").forEach(c=>component.segmentedButton.classList.add(c))

    // if(obj.disabled) segmentedButton.classList.add(`disabled`)
    // if(obj.id) segmentedButton.id = obj.id
    // if(obj.class) segmentedButton.classList.add(obj.class)
    
    obj.options.forEach((option, i) => {
        let button = art.md.button({ tag: `label`, label: option.label, outlined: true})
        button.button.appendChild(art.createElement({ tag: `input`, setAttribute: { type: `radio`, name: obj.name, value: option.value}}))
        component.segmentedButton.appendChild(button.button)
        component[`option${i}`] = button
    })
        
    return component
}

art.info.log.push({type: 2, description: `Component Checkbox`, date: `05/12/2022`})
art.md.checkbox = function(obj) {
    
    const component = {}
    const append = []
    
    component.checkbox = art.md.button({tag:`div`, class: `md-checkbox`, output: obj.output})

    component.icon1 = art.createElement({ tag: `span`, innerHTML: `check_box_outline_blank`, setAttribute: { class: `material-symbols-outlined icon false`}})
    component.icon2 = art.createElement({ tag: `span`, innerHTML: `check_box`, setAttribute: { class: `material-symbols-outlined icon true`}})
    component.input = art.createElement({ tag: `input`, setAttribute: { type: `checkbox`, name: obj.name, value: obj.value}})
    
    append.push({ dad: component.checkbox.button, kids: [component.icon1, component.icon2, component.input] })
    art.append(append)

    return component
}

art.info.log.push({type: 2, description: `Component RadioButton`, date: `05/12/2022`})
art.md.radioButton = function(obj) {
    
    const component = {}
    const append = []
    
    component.radioButton = art.md.button({tag:`div`, class: `md-radio-button`, output: obj.output})

    component.icon1 = art.createElement({ tag: `span`, innerHTML: `radio_button_unchecked`, setAttribute: { class: `material-symbols-outlined icon false`}})
    component.icon2 = art.createElement({ tag: `span`, innerHTML: `radio_button_checked`, setAttribute: { class: `material-symbols-outlined icon true`}})
    component.input = art.createElement({ tag: `input`, setAttribute: { type: `radio`, name: obj.name, value: obj.value}})
    
    append.push({ dad: component.radioButton.button, kids: [component.icon1, component.icon2, component.input] })
    art.append(append)

    return component
}

art.info.log.push({type: 2, description: `Component Scrim`, date: `05/12/2022`})
art.md.scrim = function(obj) {
    
    const component = {}
    const append = []
    
    component.scrim = art.createElement({tag: `div`, setAttribute: {class: `md-scrim loading`}, output: `body`})
    
    component.close = art.createElement({ tag: `span`})
    
    append.push({ dad: component.scrim, kids: [component.close] })
    art.append(append)
    
    function close() {
        component.close.ontransitionend = ()=> component.scrim.remove()
        component.scrim.classList.add('loading')
    }

    component.close.addEventListener('click', ()=> {
        if(component.scrim.getAttribute("data-confirm") != undefined && component.scrim.getAttribute("data-confirm") == "true") close()
        else if(component.scrim.getAttribute("data-confirm") == undefined) close()
    })

    setTimeout(() => component.scrim.classList.remove('loading'), 100)
    
    return component
}

art.info.log.push({type: 2, description: `Component SheetsBottom`, date: `05/12/2022`})
art.md.sheetsBottom = function(obj) {
    
    const component = {}
    
    component.scrim = art.md.scrim({})
    component.sheetsBottom = art.md.card({tag: `main`, class: `md-sheetsBottom`})
    
    component.scrim.scrim.appendChild(component.sheetsBottom.card)
    
    return component
}

art.info.log.push({type: 2, description: `Component Dialog`, date: `05/12/2022`})
art.md.dialog = function(obj) {

    
    const component = {}
    
    component.scrim = art.md.scrim({})
    component.dialog = art.md.card({tag: `main`, class: `md-dialog`})
    
    component.scrim.scrim.appendChild(component.dialog.card)
    let attributes = ["id", "style"].forEach(attr => obj[attr] ? component.dialog.card[attr] = obj[attr] : "")
    if(obj.class) obj.class.split(" ").forEach(c=>component.dialog.card.classList.add(c))
    
    return component
}

art.info.log.push({type: 2, description: `Component Divider`, date: `05/12/2022`})
art.md.divider = function(obj) {
    
    const component = {}
    
    component.divider = art.createElement({ tag: `span`, class: `md-divider`, output: obj.output})
    
    return component
}

art.info.log.push({type: 2, description: `Component snackbar`, date: `06/12/2022`})
art.md.snackbar = function(obj) {

    const component = {}
    const append = []

    component.snackbar = art.createElement({ tag: `span`, setAttribute: { class:`md-snackbar`}, output: `body`})

    if(obj.label) {
        component.label = art.createElement({ tag: `span`, innerHTML: obj.label, setAttribute: { class: `label`}})
        append.push(component.label)
    }
    if(obj.button) {
        component.button = art.md.button({ label: obj.button})
        append.push(component.button.button)
    }

    append.forEach(child => component.snackbar.appendChild(child))

    setTimeout(() => {
        component.snackbar.classList.add("hideSnackbar")
        component.snackbar.addEventListener("animationend", ()=> component.snackbar.remove())
    }, 3000);

    return component
}

art.info.log.push({type: 2, description: `Component FAB`, date: `21/12/2022`})
art.md.FAB = function(obj) {

    const component = {}
    const append = []

    component.FAB = art.createElement({ tag: `${obj.tag ? obj.tag : "button"}`, setAttribute: { class: `md-FAB`}, output: obj.output })
	for(let attr in obj.setAttribute) component.FAB.setAttribute(attr, obj.setAttribute[attr])
	
	for(let prop in obj) if(art.styles.includes(prop)) component.FAB.classList.add(prop)
	
	let attributes = ["id", "style"].forEach(attr => obj[attr] ? component.FAB[attr] = obj[attr] : "")
	if(obj.class) obj.class.split(" ").forEach(c=>component.FAB.classList.add(c))
	
	if(obj.icon) component.icon = art.createElement({ tag:`span`, setAttribute: { class: `material-symbols-outlined icon`}, innerHTML: obj.icon})
	if(obj.label) component.label = art.createElement({ tag:`span`, setAttribute: { class: `label`}, innerHTML: obj.label})
	let condicionalKids = ["icon", "label"].forEach(ck => obj[ck] ? append.push(component[ck]) : "")
	
	let parts = ["surface", "overlay", "ripple"].forEach(part => {
		append.push(component[part] = art.createElement({ tag:`span`, setAttribute: { class: part}}))
	})

	append.forEach(child => component.FAB.appendChild(child))

    art.ripple(component.FAB)

    return component
}

art.info.log.push({type: 2, description: `Component Progress Indicator`, date: `22/12/2022`})
art.md.progressIndicator = function(obj) {

    const component = {}
    const append = []

    component.progressIndicator = art.createElement({ tag: `div`, setAttribute: { class: `md-progress-indicator`}, output: obj.output})
    component.indicator = art.createElement({ tag: `span`, setAttribute: { class: `indicator`}})

    append.push(component.indicator)
    append.forEach(child => component.progressIndicator.appendChild(child))

    return component
}

art.info.log.push({type: 2, description: `Component Navigation`, date: `23/12/2022`})
art.md.navigation = function(obj) {
    const component = {}
    component.navigation = art.md.card({tag: `${obj.tag ? obj.tag : "nav"}`, class: `md-navigation`, output: obj.output})

    if(obj.class) obj.class.split(" ").forEach(c=>component.navigation.card.classList.add(c))
    for(let prop in obj) if(art.styles.includes(prop)) component.navigation.card.classList.add(prop)
    let attributes = ["id", "style"].forEach(attr => obj[attr] ? component.navigation.card[attr] = obj[attr] : "")

    return component
}

art.info.log.push({type: 2, description: `Component navigation Button`, date: `23/12/2022`})
art.md.navigationButton = function(obj) {
    const component = {}
    let append = []

    component.navigationButton = art.createElement({tag: `label`, setAttribute: {class: `md-navigation-button`}, output: obj.output})

    component.activeIndicator = art.createElement({ tag: `span`, setAttribute: { class: `activeIndicator`}})
    component.navigationButton.appendChild(component.activeIndicator)

    let parts = ["ripple", "indicator", "overlay"].forEach(part => {
        append.push(component[part] = art.createElement({ tag:`span`, setAttribute: { class: part}}))
    })

    append.forEach(child => component.activeIndicator.appendChild(child))
    append = []
    
    append.push(component.icon = art.createElement({ tag: `span`, innerHTML: obj.icon, setAttribute: { class: `material-symbols-outlined icon`}}))
    append.push(component.label = art.createElement({ tag: `span`, innerHTML: obj.label, setAttribute: { class: `label`}}))
    // navigationButtons.appendChild(art.createElement({ tag: `span`, innerHTML: obj.badge, setAttribute: { class: `badge`}}))
    append.push(component.input = art.createElement({ tag: `input`, setAttribute:{type: `radio`, name:`mNavBtn`, value: obj.value}}))
    
    append.forEach(child => component.navigationButton.appendChild(child))

    art.ripple(component.navigationButton)

    return component
}

art.info.log.push({type: 2, description: `Component switch`, date: `26/12/2022`})
art.md.switch = function(obj) {

    const component = {}
    let append = []

    component.switch = art.createElement({ tag: `div`, setAttribute: {class: `md-switches`}, output: obj.output})
    
    component.outline = art.createElement({ tag: `span`, setAttribute: { class: `outline`}})
    component.trail = art.createElement({ tag: `span`, setAttribute: { class: `thumb`}})
    component.false = art.createElement({ tag: `span`, innerHTML: `close`, setAttribute: { class: `material-symbols-outlined false`}})
    component.true = art.createElement({ tag: `span`, innerHTML: `check_small`, setAttribute: { class: `material-symbols-outlined true`}})
    component.input = art.createElement({ tag: `input`, setAttribute: { type: `checkbox`}})

    append.push(component.outline, component.trail, component.input)
    append.forEach(child => component.switch.appendChild(child))

    append = [component.false, component.true]
    append.forEach(child => component.trail.appendChild(child))
    
    return component
}

art.info.log.push({type: 2, description: `Component switch`, date: `26/12/2022`})
art.md.menu = function(obj) {

    const component = {}

    component.menu = art.md.card({tag: `div`, class: `md-menu`, output: `body`, elevated: true})

    obj.ativador.addEventListener(`click`, ()=> {

        //top
        component.menu.card.style.top = `${obj.ativador.getBoundingClientRect().y + obj.ativador.offsetHeight}px`
        //if element position is right

        if(obj.ativador.getBoundingClientRect().x < (document.body.offsetWidth / 2)) {
            component.menu.card.style.left = `${obj.ativador.getBoundingClientRect().x - obj.ativador.offsetWidth + obj.ativador.offsetWidth}px`
        }
        else {
            component.menu.card.style.left = `${obj.ativador.getBoundingClientRect().x - component.menu.card.offsetWidth + obj.ativador.offsetWidth}px`
        }

        component.menu.card.style.opacity = 1
        component.menu.card.style.transform = `translateY(0)`
        component.menu.card.style.pointerEvents = `all`
    })

    obj.ativador.addEventListener(`blur`, ()=> {
        setTimeout(() => {
            component.menu.card.style.opacity = 0
            component.menu.card.style.transform = `translateY(8px)`
            component.menu.card.style.pointerEvents = `none`
        }, 200);
    })

    obj.options.forEach(item => {
        let label = art.md.card({tag: `label`, setAttribute:{ class: `item`}})
        menu.appendChild(label)
            if(item.icon) label.appendChild(art.createElement({tag:`span`, setAttribute: { class: `material-symbols-outlined icon`}, innerHTML: item.icon}))
            label.appendChild(art.createElement({tag:`span`, setAttribute: { class: `label`}, innerHTML: item.label}))
            if(item.shortcut) label.appendChild(art.createElement({tag:`span`, setAttribute: { class: `material-symbols-outlined shortcut`}, innerHTML: item.shortcut}))
            label.appendChild(art.createElement({tag:`input`, setAttribute: { type: `radio`, name: obj.name, value: item.value}}))
            label.appendChild(art.createElement({tag:`span`, setAttribute: { class: `ripple`}}))
            label.appendChild(art.createElement({tag:`span`, setAttribute: { class: `overlay`}}))
            art.ripple(label)
    })

    return component

}

art.info.log.push({type: 2, description: `Component badge`, date: `10/01/2023`})
art.md.badge = function(obj) {
    const component = {}
    
    component.badge = component.card = art.createElement({tag: `span`, innerHTML: obj.innerHTML, setAttribute: { class: "md-badge"}, output: obj.output})
    for(let prop in obj) if(art.styles.includes(prop)) component.badge.classList.add(prop)
	let attributes = ["id", "style"].forEach(attr => obj[attr] ? component.badge[attr] = obj[attr] : "")
	if(obj.class) obj.class.split(" ").forEach(c=>component.badge.classList.add(c))

    return component
}

console.log(art)
console.log(art.version())