//disabled
document.addEventListener("click", e => {
    if (e.target.closest(".piece-disabled")) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);