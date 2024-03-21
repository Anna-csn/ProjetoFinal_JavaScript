//Atualiza o ano do copyright automaticamente

document.addEventListener("DOMContentLoaded", function () {

    var copyrightSpan = document.getElementById("copyright");


    var currentYear = new Date().getFullYear();


    copyrightSpan.textContent += " " + currentYear;
}); 