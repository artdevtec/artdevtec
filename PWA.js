// ***** DETECTAR PLATAFORMA *****
function getPlatform() {
	const ua = window.navigator.userAgent.toLowerCase();
	if (/iphone|ipad|ipod/.test(ua)) return "ios";
	if (/android/.test(ua)) return "android";
	if (/windows/.test(ua)) return "windows";
	return "other";
}

// ***** VERIFICAR SE PWA ESTÁ INSTALADO *****
function isInStandaloneMode() {
	return (
		window.matchMedia('(display-mode: standalone)').matches || 
		window.navigator.standalone === true
	);
}

// ***** CRIAR BOTÃO DE INSTALAÇÃO DINÂMICO *****
let deferredPrompt;
window.addEventListener("beforeinstallprompt", e => {
	e.preventDefault();
	deferredPrompt = e;
	showInstallButton();
});

function showInstallButton() {
	if (document.getElementById("pwa-install-btn")) return; // evita duplicar

	const platform = MPSO.globalFns.getPlatform()

	// Se o app já estiver instalado, não mostra o botão
	if (isInStandaloneMode()) return;

	// Cria o botão
	const btn = MPSO.globalFns.create(`
		<button
			style="
				display: grid;
				position: fixed;
				bottom: 80px;
				right: 16px;
			"
			id="install_button"
			class="
                piece-button
                piece-extra-small
                piece-surface
                background-color-auto-11
                background-color-auto-12-hover
                text-color-dark-02
                piece-s-40
                
            ">
            ${platform == "android" ? '<span class="material-symbols-rounded piece-icon install_mobile" translate="no">install_mobile</span>' : ""}
            ${platform == "windows" ? '<span class="material-symbols-rounded piece-icon install_desktop" translate="no">install_desktop</span>' : ""}
            ${platform == "ios" ? '<span class="material-symbols-rounded piece-icon install_IOS" translate="no">add_box</span>' : ""}
            <span class="piece-label" translate="no">Instalar</span>
            <span class="piece-ripple"></span>
        </button>
	`)

	$('body').appendAll(btn)

	// Define comportamento conforme plataforma
	if (platform === "android" || platform === "windows") {
		$("#install_button").addEventListener("click", async () => {
			if (deferredPrompt) {
				deferredPrompt.prompt();
				const choiceResult = await deferredPrompt.userChoice;
				if (choiceResult.outcome === "accepted") {
					console.log("Usuário aceitou instalar o PWA");
					$("#install_button").remove();
				}
				deferredPrompt = null;
			}
		});
	}

	if (platform === "ios") {
		$("#install_button").addEventListener("click", showIosInstallGuide);
	}
}

// ***** POPUP / TUTORIAL PARA iOS *****
function showIosInstallGuide() {
	// Evita duplicar o popover
	if (document.getElementById("ios-popover")) return;

	const pop = document.createElement("div");
	pop.id = "ios-popover";
	pop.innerHTML = `
		<div 
			class="piece-surface background-color-auto-00"
			style="
				position: fixed;
				background: white;
				padding: 32px;
				border-radius: 32px 32px 0 0;
				box-shadow: 0 4px 12px rgba(0,0,0,0.3);
				z-index: 9999;
				text-align: center;
				width: 100%;
				bottom: 0;
				display: grid;
				gap: 16px;
				place-items: center;
			"
		>
			<p>Adicionar à Tela Inicial</p>
			<p>
				Toque no botão <strong>Compartilhar</strong> 
				(ícone <span style="font-size:18px;">&#x1f4e4;</span>) e depois em 
				<strong>“Adicionar à Tela de Início”</strong>.
			</p>
			<button
				id="closePopover"
				class="
					piece-button
					piece-extra-small
					piece-surface
					background-color-auto-11
					background-color-auto-12-hover
					text-color-dark-02
					piece-s-40
					
				">
				<span class="material-symbols-rounded piece-icon install_IOS" translate="no">check_circle</span>
				<span class="piece-label" translate="no">Ok</span>
				<span class="piece-ripple"></span>
			</button>
		</div>
	`;

	document.body.appendChild(pop);
	document.getElementById("closePopover").addEventListener("click", () => {
		pop.remove();
	});
}

// ***** INICIALIZAR *****
window.addEventListener("load", () => {
	const platform = getPlatform();

	// iOS não dispara beforeinstallprompt → cria botão manualmente
	if (platform === "ios" && !isInStandaloneMode()) {
		showInstallButton();
	}
});
