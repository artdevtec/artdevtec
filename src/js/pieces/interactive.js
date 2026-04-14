//piece interactive
document.addEventListener('click', e => {
    document.querySelectorAll('.piece-interactive').forEach(el => {
        const clickedInside = el.contains(e.target);
        const clickedInNoInteractive = e.target.closest('.piece-not-interactive');
        // Desativa se for fora ou dentro de .piece-not-interactive
        const shouldDeactivate = !clickedInside || clickedInNoInteractive;
        el.classList.toggle('piece-actived', !shouldDeactivate);
    });
});