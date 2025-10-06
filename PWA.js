// ***** Register Service Worker *****

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("sw.js") // Corrigido: era "/sw.js"
		.then(serviceWorker => {
			console.log("Service Worker registered: ", serviceWorker);
		})
		.catch(error => {
			console.error("Error registering the Service Worker: ", error);
		});
}

// navigator.serviceWorker.onmessage = event => {
// 	const message = JSON.parse(event.data);

// 	// detect the type of message and refresh the view
// 	if(message && message.type.includes("/api/users")){
// 		console.log("List of attendees to date", message.data)
// 		renderAttendees(message.data)
// 	}
// };


// ***** Install PWA on device with button *****

let deferredPrompt;
const installButton = document.getElementById("install_button");

window.addEventListener("beforeinstallprompt", e => {
	console.log("beforeinstallprompt fired");
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Show the install button
	installButton.style.display = "grid";
	installButton.classList.remove("none");
	installButton.addEventListener("click", installApp);
});

function installApp() {
	// Show the prompt
	deferredPrompt.prompt();
	installButton.disabled = true;

	// Wait for the user to respond to the prompt
	deferredPrompt.userChoice.then(choiceResult => {
		if (choiceResult.outcome === "accepted") {
			console.log("PWA setup accepted");
			installButton.style.display = "none";
			installButton.classList.add("none");
		} else {
			console.log("PWA setup rejected");
		}
		installButton.disabled = false;
		deferredPrompt = null;
	});
}

window.addEventListener("appinstalled", evt => {
	console.log("appinstalled fired", evt);
});


// ********* Background Sync *************

// Get Permissions
function registerNotification() {
	Notification.requestPermission(permission => {
		if (permission === 'granted') {
			registerBackgroundSync();
		} else {
			console.error("Permission was not granted.");
		}
	});
}

function registerBackgroundSync() {
	if (!navigator.serviceWorker) {
		return console.error("Service Worker not supported");
	}

	navigator.serviceWorker.ready
		.then(registration => registration.sync.register('syncAttendees'))
		.then(() => console.log("Registered background sync"))
		.catch(err => console.error("Error registering background sync", err));
}


// ********* Atualizar PWA Manualmente *************

function atualizarPWA() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.getRegistration().then(registration => {
			if (registration) {
				// ForÃ§a o SW a buscar nova versÃ£o do arquivo sw.js
				registration.update().then(() => {
					if (registration.waiting) {
						console.log("Nova versÃ£o do Service Worker pronta. Ativando...");
						registration.waiting.postMessage({ type: 'SKIP_WAITING' });
					}
				});
			}
		});

		// Aguarda 1s e recarrega a pÃ¡gina para aplicar nova versÃ£o
		setTimeout(() => {
			window.location.reload(true);
		}, 1000);
	}
}


// ********* Desregistrar e forÃ§ar limpeza e reload *************

function forceUpdatePWA() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.getRegistrations().then(registrations => {
			registrations.forEach(registration => {
				registration.unregister().then(success => {
					if (success) {
						console.log("Service Worker desregistrado com sucesso.");
					} else {
						console.warn("Falha ao desregistrar o Service Worker.");
					}
				});
			});
		}).finally(() => {
			// Recarrega a pÃ¡gina para forÃ§ar novo download e registro limpo do SW
			window.location.reload(true);
		});
	}
}