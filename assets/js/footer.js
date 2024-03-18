//Atualiza o ano do copyright automaticamente

document.addEventListener("DOMContentLoaded", function() {
    // Pega o elemento do copyright no rodapé
    var copyrightSpan = document.getElementById("copyright");

    // Pega o ano atual
    var currentYear = new Date().getFullYear();

    // Atualiza o texto para incluir o ano atual
    copyrightSpan.textContent += " " + currentYear;
}); 