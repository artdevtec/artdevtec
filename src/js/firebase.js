// src/js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2Gkim-k9GNZk02t414bZcPSO-z7QlzDE",
  authDomain: "yahweh-shammah-74033.firebaseapp.com",
  projectId: "yahweh-shammah-74033",
  storageBucket: "yahweh-shammah-74033.firebasestorage.app",
  messagingSenderId: "1090658649746",
  appId: "1:1090658649746:web:927ffb00842f52d7d2084b",
  measurementId: "G-NTX3KHD3FN"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore(app);

// Função de carregar letras
export async function carregarLetrasNoLocalStorage() {
  const letrasRef = collection(db, "letras");
  const snapshot = await getDocs(letrasRef);

  const letras = [];
  snapshot.forEach((doc) => letras.push(doc.data()));

  // Ordenar
  letras.sort((a, b) => {
    const nomeA = a.nome?.toLowerCase() || "";
    const nomeB = b.nome?.toLowerCase() || "";
    if (nomeA < nomeB) return -1;
    if (nomeA > nomeB) return 1;

    const cantorA = a.cantor?.toLowerCase() || "";
    const cantorB = b.cantor?.toLowerCase() || "";
    return cantorA.localeCompare(cantorB);
  });

  letras.forEach((letra, index) => letra.numero = index + 1);

  localStorage.setItem("letras-db", JSON.stringify(letras));
  console.log("✅ Letras carregadas no LocalStorage.");

  // Chama home automaticamente
//   document.querySelector('#m-nav .piece-item').click();
}

// 🔥 Executa automaticamente na primeira vez
if (!window.yahwehShammah?.letrasDB?.get()) {
  carregarLetrasNoLocalStorage();
}

window.carregarLetrasNoLocalStorage = carregarLetrasNoLocalStorage;