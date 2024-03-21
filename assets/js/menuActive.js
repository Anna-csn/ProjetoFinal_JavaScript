//código que define o comportamento do menu sublinhado
function setActive(event, element) {
    // Impede o comportamento padrão do clique para evitar recarregar a página
    event.preventDefault();

    // Remove a classe ativa de todos os elementos de menu
    var navItems = document.querySelectorAll('.nav ul li a');
    navItems.forEach(function (item) {
        item.classList.remove('active');
    });

    // Adiciona a classe ativa apenas ao elemento clicado
    element.classList.add('active');
}

var navLinks = document.querySelectorAll('.nav ul li a');
navLinks.forEach(function (link) {
    link.addEventListener('mouseenter', function () {
        navLinks.forEach(function (item) {
            item.classList.remove('active');
        });
        link.classList.add('active');
    });
});
